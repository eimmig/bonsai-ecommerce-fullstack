package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.GenericEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.GenericModel;

import java.util.List;

/**
 * Interface genérica para mappers MapStruct.
 * Substitui o antigo GenericMapper baseado em ModelMapper.
 */
public interface DomainMapper<M extends GenericModel, E extends GenericEntity, I, O> {

    // ==================== Model <-> Entity ====================
    
    E toEntity(M model);
    
    M toModel(E entity);
    
    List<M> toModelList(List<E> entities);

    // ==================== DTO <-> Model ====================
    
    M toModel(I inputDTO);
    
    O toOutputDTO(M model);
    
    List<O> toOutputDTOList(List<M> models);
}