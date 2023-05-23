package br.comvarejonline.projetoinicial.repository.filter;

import org.springframework.data.jpa.domain.Specification;

import br.comvarejonline.projetoinicial.models.Produto;
import br.comvarejonline.projetoinicial.models.Produto_;

public class ProdutoFilter {

    public Specification<Produto> filtrarPorNome(String name) {
        if (name == null) return null;
        return (root, criteriaQuery, criteriaBuilder) -> {
            var attr = criteriaBuilder.lower(root.get(Produto_.nome));
            return criteriaBuilder.like(attr, "%" + name.toLowerCase() + "%");
        };
    }
}
