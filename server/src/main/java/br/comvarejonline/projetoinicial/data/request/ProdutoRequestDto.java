package br.comvarejonline.projetoinicial.data.request;

import java.io.Serializable;

import lombok.Data;

@Data
public class ProdutoRequestDto implements Serializable {

    private String codigoDeBarras;
    private String nome;
    private int quantidadeMinima;
    private int saldoInicial;
}
