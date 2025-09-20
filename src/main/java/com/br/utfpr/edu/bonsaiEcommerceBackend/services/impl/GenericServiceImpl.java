package com.br.utfpr.edu.bonsaiEcommerceBackend.services.impl;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.GenericEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.GenericModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.GenericService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.mappers.GenericMapper;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public abstract class GenericServiceImpl<M extends GenericModel, E extends GenericEntity>
        implements GenericService<M> {

    protected final JpaRepository<E, UUID> repository;
    protected final GenericMapper<M, E, ?, ?> mapper;

    protected GenericServiceImpl(JpaRepository<E, UUID> repository, GenericMapper<M, E, ?, ?> mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Transactional
    public M save(M model) {
        E entity = mapper.toEntity(model);
        entity = repository.save(entity);
        return mapper.toModel(entity);
    }

    @Override
    public List<M> getAll() {
        List<E> entities = repository.findAll();
        return mapper.toModelList(entities);
    }

    @Override
    public Optional<M> getById(UUID id) {
        return repository.findById(id)
                .map(mapper::toModel);
    }

    @Override
    @Transactional
    public void delete(UUID id) throws RuntimeException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return;
        }
        throw new RuntimeException("Item não encontrado");
    }

    @Override
    @Transactional
    public M update(UUID id, M model) throws RuntimeException {
        if (repository.existsById(id)) {
            model.setId(id);
            E entity = mapper.toEntity(model);
            entity = repository.save(entity);
            return mapper.toModel(entity);
        }
        throw new RuntimeException("Item não encontrado");
    }
}