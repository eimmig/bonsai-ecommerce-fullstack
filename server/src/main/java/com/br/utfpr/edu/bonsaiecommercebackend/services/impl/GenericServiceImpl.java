package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.GenericEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.GenericModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.GenericService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.DomainMapper;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@SuppressWarnings({"SpringJavaInjectionPointsAutowiringInspection"})
public abstract class GenericServiceImpl<M extends GenericModel, E extends GenericEntity>
        implements GenericService<M> {

    private static final Logger logger = LoggerFactory.getLogger(GenericServiceImpl.class);

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
    public Page<M> getAll(Pageable pageable) {
        Page<E> entities = repository.findAll(pageable);
        return entities.map(mapper::toModel);
    }

    @Override
    @NonNull
    public Optional<M> getById(UUID id) {
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
    public void delete(UUID id) throws RuntimeException {
        if (!repository.existsById(id)) {
            String entityName = this.getClass().getSimpleName().replace("ServiceImpl", "");
            logger.warn("Tentativa de deletar {} inexistente. ID: {}", entityName, id);
            throw new ResourceNotFoundException(entityName + " not found with id: " + id);
        }
        String entityName = this.getClass().getSimpleName().replace("ServiceImpl", "");
        logger.info("Deletando {}: {}", entityName, id);
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public M update(UUID id, M model) throws RuntimeException {
        if (!repository.existsById(id)) {
            String entityName = this.getClass().getSimpleName().replace("ServiceImpl", "");
            logger.warn("Tentativa de atualizar {} inexistente. ID: {}", entityName, id);
            throw new ResourceNotFoundException(entityName + " not found with id: " + id);
        }
        String entityName = this.getClass().getSimpleName().replace("ServiceImpl", "");
        logger.info("Atualizando {}: {}", entityName, id);
        model.setId(id);
        E entity = mapper.toEntity(model);
        entity = repository.save(entity);
        return mapper.toModel(entity);
    }
}