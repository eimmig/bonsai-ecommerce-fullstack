package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.GenericEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.GenericModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.stream.Collectors;

public abstract class GenericMapper<M extends GenericModel, E extends GenericEntity, I, O> {

    protected final ModelMapper modelMapper;

    private final Class<M> modelClass;
    private final Class<E> entityClass;
    private final Class<O> dtoOutputClass;


    @SuppressWarnings("unchecked")
    protected GenericMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
        this.modelClass = (Class<M>) genericSuperclass.getActualTypeArguments()[0];
        this.entityClass = (Class<E>) genericSuperclass.getActualTypeArguments()[1];
        this.dtoOutputClass = (Class<O>) genericSuperclass.getActualTypeArguments()[3];
    }

    // Conversões Entity <-> Model
    public M toModel(E entity) {
        return entity != null ? modelMapper.map(entity, modelClass) : null;
    }

    public E toEntity(M model) {
        return model != null ? modelMapper.map(model, entityClass) : null;
    }

    // Conversão DTO -> Model
    public M toModel(I dto) {
        return dto != null ? modelMapper.map(dto, modelClass) : null;
    }

    // Conversão Model -> DTO
    public O toDTO(M model) {
        return model != null ? modelMapper.map(model, dtoOutputClass) : null;
    }

    public List<M> toModelList(List<E> entities) {
        return entities != null ? entities.stream()
                .map(this::toModel)
                .collect(Collectors.toList()) : null;
    }

}
