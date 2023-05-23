package br.comvarejonline.projetoinicial.data.response;

import java.time.LocalDateTime;

import br.comvarejonline.projetoinicial.models.Produto;
import br.comvarejonline.projetoinicial.models.enums.TipoMovimento;
import lombok.Data;

@Data
public class EstoqueReponseDto {

    private LocalDateTime data;
    private Produto produto;
    private TipoMovimento tipoMovimento;
    private int quantidade;
    private String documento;
    private String motivo;
    private int saldo;
}
