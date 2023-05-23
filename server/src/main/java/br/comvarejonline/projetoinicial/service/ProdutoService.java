package br.comvarejonline.projetoinicial.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.comvarejonline.projetoinicial.data.mappers.ProdutoMapper;
import br.comvarejonline.projetoinicial.data.request.ProdutoRequestDto;
import br.comvarejonline.projetoinicial.models.BadRequestException;
import br.comvarejonline.projetoinicial.models.Estoque;
import br.comvarejonline.projetoinicial.models.Produto;
import br.comvarejonline.projetoinicial.models.enums.TipoMovimento;
import br.comvarejonline.projetoinicial.repository.EstoqueRepository;
import br.comvarejonline.projetoinicial.repository.ProdutoRepository;
import br.comvarejonline.projetoinicial.repository.filter.ProdutoFilter;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private EstoqueRepository estoqueRepository;

    @Autowired
    private ProdutoMapper mapper;

    public void createProduto(ProdutoRequestDto dto) {
        var produto = mapper.map(dto);

        if (produtoRepository.existsByCodigoDeBarras(produto.getCodigoDeBarras())) {
            throw new BadRequestException("Esse Codigo de barras já existe");
        }

        produtoRepository.save(produto);

        if (produto.getSaldoInicial() > 0) {
            var estoque = Estoque.builder()
                    .produto(produto)
                    .tipoMovimento(TipoMovimento.SALDO_INICIAL)
                    .quantidade(produto.getSaldoInicial())
                    .data(LocalDateTime.now())
                    .motivo("Movimentação incial do produto " + produto.getNome())
                    .build();
            estoqueRepository.save(estoque);
        }
    }

    public Page<Produto> listProdutos(Pageable pageable, String search) {
        var spec = new ProdutoFilter().filtrarPorNome(search);
        return produtoRepository.findAll(spec, pageable);
    }

    public void updateProduto(Produto produto) {
        if (produtoRepository.existsById(produto.getId())) {
            produtoRepository.save(produto);
        } else {
            throw new RuntimeException("Produto não existe!");
        }
    }
}
