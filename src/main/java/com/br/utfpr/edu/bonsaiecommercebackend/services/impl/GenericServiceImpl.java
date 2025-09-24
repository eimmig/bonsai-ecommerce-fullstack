package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.GenericEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.GenericModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.GenericService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.DomainMapper;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public abstract class GenericServiceImpl<M extends GenericModel, E extends GenericEntity>
        implements GenericService<M> {

    protected final JpaRepository<E, UUID> repository;
    protected final DomainMapper<M, E, ?, ?> mapper;

    protected GenericServiceImpl(JpaRepository<E, UUID> repository, DomainMapper<M, E, ?, ?> mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Transactional
    @NonNull
    public M save(@NonNull M model) {
        E entity = mapper.toEntity(model);
        entity = repository.save(entity);
        return mapper.toModel(entity);
    }

    @Override
    @NonNull
    public List<M> getAll() {
        List<E> entities = repository.findAll();
        return mapper.toModelList(entities);
    }

    @Override
    @NonNull
    public Optional<M> getById(@NonNull UUID id) {
        return repository.findById(id)
                .map(mapper::toModel);
    }

    @Override
    public M findByIdOrThrow(UUID id) {
        return getById(id).orElseThrow(() -> new ResourceNotFoundException(
                this.getClass().getSimpleName().replace("ServiceImpl", "") + " not found with id: " + id));
    }

    @Override
    @Transactional
    public void delete(@NonNull UUID id) throws RuntimeException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return;
        }
        throw new RuntimeException("Item não encontrado");
    }

    @Override
    @Transactional
    @NonNull
    public M update(@NonNull UUID id, @NonNull M model) throws RuntimeException {
        if (repository.existsById(id)) {
            model.setId(id);
            E entity = mapper.toEntity(model);
            entity = repository.save(entity);
            return mapper.toModel(entity);
        }
        throw new RuntimeException("Item não encontrado");
    }
}