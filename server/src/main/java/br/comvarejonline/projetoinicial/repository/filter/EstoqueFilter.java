package br.comvarejonline.projetoinicial.repository.filter;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import br.comvarejonline.projetoinicial.models.Estoque;
import br.comvarejonline.projetoinicial.models.Estoque_;
import br.comvarejonline.projetoinicial.models.Produto_;
import br.comvarejonline.projetoinicial.models.enums.TipoMovimento;

public class EstoqueFilter {

    public Specification<Estoque> filtrarPorTipoMovimento(TipoMovimento tipoMovimento) {
        if (tipoMovimento == null) return null;
        return (root, criteriaQuery, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Estoque_.tipoMovimento), tipoMovimento);
        };
    }

    public Specification<Estoque> filtrarPorDataInicial(LocalDateTime dataInicial) {
        if (dataInicial == null) return null;
        return (root, criteriaQuery, criteriaBuilder) -> {
            return criteriaBuilder.greaterThanOrEqualTo(root.get(Estoque_.data), dataInicial);
        };
    }

    public Specification<Estoque> filtrarPorDataFinal(LocalDateTime dataFinal) {
        if (dataFinal == null) return null;
        return (root, criteriaQuery, criteriaBuilder) -> {
            return criteriaBuilder.lessThanOrEqualTo(root.get(Estoque_.data), dataFinal);
        };
    }

    public Specification<Estoque> filtrarPorProduto(Long produtoId) {
        if (produtoId == null) return null;
        return (root, criteriaQuery, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Estoque_.produto).get(Produto_.id), produtoId);
        };
    }
}
