package br.comvarejonline.projetoinicial.data.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.comvarejonline.projetoinicial.data.request.EstoqueRequestDto;
import br.comvarejonline.projetoinicial.data.response.EstoqueReponseDto;
import br.comvarejonline.projetoinicial.models.Estoque;

@Mapper(componentModel = "spring")
public interface EstoqueMapper {

    @Mapping(target = "produto", ignore = true)
    Estoque map(EstoqueRequestDto dto);    

    @Mapping(target = "saldo", ignore = true)
    EstoqueReponseDto map(Estoque entity);
}
