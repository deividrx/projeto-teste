package br.comvarejonline.projetoinicial.data.request;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import br.comvarejonline.projetoinicial.models.enums.TipoMovimento;
import lombok.Data;

@Data
public class EstoqueFilterDto {

    private Long produtoId;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime dataInicial;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime dataFinal;

    private TipoMovimento tipo;
}
