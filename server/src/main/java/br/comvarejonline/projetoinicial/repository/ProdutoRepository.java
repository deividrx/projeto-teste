package br.comvarejonline.projetoinicial.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.comvarejonline.projetoinicial.models.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long>, JpaSpecificationExecutor<Produto> {

    @Query("select CASE WHEN COUNT(1) > 0 THEN true ELSE false end from Produto p where exists "
            + " (select 1 from Estoque e where e.produto.id = p.id ) and p.id = :id")
    public boolean checkIfProdutoTemEstoque(Long id);

    @Query("select CASE WHEN COUNT(1) > 0 THEN true ELSE false end from Produto p where exists "
            + " (select 1 from Estoque e where e.produto.id = p.id and e.tipoMovimento = "
            + "br.comvarejonline.projetoinicial.models.enums.TipoMovimento.SALDO_INICIAL)"
            + " and p.id = :id")
    public boolean checkIfProdutoTemInicial(Long id);

    @Query("select case when count(p)> 0 then true else false end from Produto p where p.codigoDeBarras = :codigoDeBarras")
    public boolean existsByCodigoDeBarras(String codigoDeBarras);
}
