package br.comvarejonline.projetoinicial.data.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import br.comvarejonline.projetoinicial.data.request.ProdutoRequestDto;
import br.comvarejonline.projetoinicial.models.Produto;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    @Mappings({
            @Mapping(target = "id", ignore = true)
    })
    Produto map(ProdutoRequestDto dto);
}
