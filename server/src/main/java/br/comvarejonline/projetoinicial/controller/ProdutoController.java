package br.comvarejonline.projetoinicial.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.comvarejonline.projetoinicial.data.request.ProdutoRequestDto;
import br.comvarejonline.projetoinicial.models.Produto;
import br.comvarejonline.projetoinicial.service.ProdutoService;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    @RolesAllowed("GERENTE")
    public ResponseEntity<?> createProduto(@RequestBody ProdutoRequestDto dto) {
        produtoService.createProduto(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    @RolesAllowed("GERENTE")
    public void updateProduto(@RequestBody Produto dto) {
        produtoService.updateProduto(dto);
    }
    
    @GetMapping
    public Page<Produto> getAllProdutos(Pageable Pageable, @RequestParam(required = false) String search) {
        return produtoService.listProdutos(Pageable, search);
    }
}
