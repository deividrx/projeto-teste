package br.comvarejonline.projetoinicial.service;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import br.comvarejonline.projetoinicial.data.mappers.EstoqueMapper;
import br.comvarejonline.projetoinicial.data.request.EstoqueFilterDto;
import br.comvarejonline.projetoinicial.data.request.EstoqueRequestDto;
import br.comvarejonline.projetoinicial.data.response.EstoqueReponseDto;
import br.comvarejonline.projetoinicial.models.BadRequestException;
import br.comvarejonline.projetoinicial.models.Estoque;
import br.comvarejonline.projetoinicial.models.enums.TipoMovimento;
import br.comvarejonline.projetoinicial.repository.EstoqueRepository;
import br.comvarejonline.projetoinicial.repository.ProdutoRepository;
import br.comvarejonline.projetoinicial.repository.filter.EstoqueFilter;
import br.comvarejonline.projetoinicial.repository.filter.FilterBuilder;

@Service
public class EstoqueService {

    @Autowired
    private InMemoryUserDetailsManager userDetatils;

    @Autowired
    private EstoqueRepository repository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private EstoqueMapper mapper;

    public void createEstoque(EstoqueRequestDto estoque, Principal principal) {
        var user = userDetatils.loadUserByUsername(principal.getName());

        boolean isGerente = user.getAuthorities()
                .stream().anyMatch(t -> t.getAuthority().equals("ROLE_GERENTE"));

        var tipo = estoque.getTipoMovimento();
        if ((tipo == TipoMovimento.SALDO_INICIAL ||
                tipo == TipoMovimento.AJUSTE_SAIDA ||
                tipo == TipoMovimento.AJUSTE_ENTRADA) && !isGerente) {
            throw new BadRequestException("Usuario não é gerente");
        }

        var produto = produtoRepository.findById(estoque.getProdutoId())
                .orElseThrow((() -> new BadRequestException("Produto não existe")));

        if (tipo == TipoMovimento.SALDO_INICIAL
                && produtoRepository.checkIfProdutoTemEstoque(estoque.getProdutoId())) {
            throw new BadRequestException("Produto já possui lançamentos");
        }

        if (tipo == TipoMovimento.AJUSTE_ENTRADA && tipo == TipoMovimento.AJUSTE_SAIDA
                && !produtoRepository.checkIfProdutoTemEstoque(estoque.getProdutoId())) {
            throw new BadRequestException("Ajuste só pode ser realizado se o produto possuir outros lançamenots");
        }

        if (tipo == TipoMovimento.SALDO_INICIAL && produtoRepository.checkIfProdutoTemInicial(estoque.getProdutoId())) {
            throw new BadRequestException("Produto já possui lançamento inicial");
        }

        if (!(tipo == TipoMovimento.ENTRADA || tipo == TipoMovimento.SAIDA) && estoque.getDocumento() != null) {
            throw new BadRequestException("Documento apenas nos tipos saida e entrada");
        }

        var saldo = getSaldo(estoque.getProdutoId());
        if ((tipo == TipoMovimento.SAIDA 
        || tipo == TipoMovimento.AJUSTE_SAIDA) && (saldo - estoque.getQuantidade()) < 0) {
            throw new BadRequestException("Saldo ficará negativo");
        }

        Estoque entity = mapper.map(estoque);
        entity.setProduto(produto);
        repository.save(entity);
    }

    public Page<EstoqueReponseDto> listEstoque(Pageable pageable, EstoqueFilterDto filters) {
        FilterBuilder<Estoque> filterBuilder = new FilterBuilder<>();
        EstoqueFilter filter = new EstoqueFilter();

        filterBuilder.add(filter.filtrarPorProduto(filters.getProdutoId()));
        filterBuilder.add(filter.filtrarPorTipoMovimento(filters.getTipo()));
        filterBuilder.add(filter.filtrarPorDataFinal(filters.getDataFinal()));
        filterBuilder.add(filter.filtrarPorDataInicial(filters.getDataInicial()));

        return repository.findAll(filterBuilder.build(), pageable).map(estoque -> {
            var dto = mapper.map(estoque);
            dto.setSaldo(getSaldo(estoque.getProduto().getId()));
            return dto;
        });
    }

    public int getSaldo(Long produtoId) {
        // Talvez usar uma view seria uma ideia melhor
        EstoqueFilter filter = new EstoqueFilter();
        var listEstoque = repository.findAll(filter.filtrarPorProduto(produtoId));
        var saldo = 0;
        for (var e : listEstoque) {
            switch (e.getTipoMovimento()) {
                case SALDO_INICIAL:
                    saldo += e.getQuantidade();
                    break;
                case ENTRADA:
                    saldo += e.getQuantidade();
                    break;
                case AJUSTE_ENTRADA:
                    saldo += e.getQuantidade();
                    break;
                case SAIDA:
                    saldo -= e.getQuantidade();
                    break;
                case AJUSTE_SAIDA:
                    saldo -= e.getQuantidade();
                    break;
            }
        }
        return saldo;
    }
}
