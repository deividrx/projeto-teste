package br.comvarejonline.projetoinicial.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.comvarejonline.projetoinicial.data.request.EstoqueFilterDto;
import br.comvarejonline.projetoinicial.data.request.EstoqueRequestDto;
import br.comvarejonline.projetoinicial.data.response.EstoqueReponseDto;
import br.comvarejonline.projetoinicial.service.EstoqueService;

@RestController
@RequestMapping("/estoque")
public class EstoqueController {

    @Autowired
    private EstoqueService service;

    @GetMapping
    public Page<EstoqueReponseDto> listEstoque(Pageable pageable, EstoqueFilterDto filters) {
        return service.listEstoque(pageable, filters);
    }

    @PostMapping
    public ResponseEntity<?> createEstoque(@RequestBody EstoqueRequestDto dto, Principal principal) {
        service.createEstoque(dto, principal);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
