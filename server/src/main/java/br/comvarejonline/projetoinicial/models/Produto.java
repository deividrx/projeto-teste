package br.comvarejonline.projetoinicial.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String codigoDeBarras;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private int quantidadeMinima;

    @Column(nullable = false)
    private int saldoInicial;
}
