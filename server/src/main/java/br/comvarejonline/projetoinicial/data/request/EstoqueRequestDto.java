package br.comvarejonline.projetoinicial.data.request;

import java.time.LocalDateTime;

import br.comvarejonline.projetoinicial.models.enums.TipoMovimento;
import lombok.Data;

@Data
public class EstoqueRequestDto {

    private Long id;
    private Long produtoId;
    private TipoMovimento tipoMovimento;    
    private int quantidade;
    private LocalDateTime data;
    private String motivo;
    private String documento;
    
}
