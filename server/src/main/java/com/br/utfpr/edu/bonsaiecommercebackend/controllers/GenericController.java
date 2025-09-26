package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.GenericEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.GenericModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.GenericService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.DomainMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

public abstract class GenericController<M extends GenericModel, E extends GenericEntity, I, O> {

    protected final GenericService<M> service;
    protected final DomainMapper<M, E, I, O> mapper;

    public GenericController(GenericService<M> service, DomainMapper<M, E, I, O> mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<O> create(@Valid @RequestBody I inputDTO) throws Exception {
        M model = mapper.toModel(inputDTO);
        M savedModel = service.save(model);
        O outputDTO = mapper.toOutputDTO(savedModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(outputDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<O> findById(@PathVariable UUID id) {
        M model = service.findByIdOrThrow(id);
        O outputDTO = mapper.toOutputDTO(model);
        return ResponseEntity.ok(outputDTO);
    }

    @GetMapping
    public ResponseEntity<List<O>> findAll() {
        List<M> models = service.getAll();
        List<O> outputDTOs = models.stream()
                .map(mapper::toOutputDTO)
                .toList();
        return ResponseEntity.ok(outputDTOs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<O> update(@PathVariable UUID id, @Valid @RequestBody I inputDTO) {
        M model = mapper.toModel(inputDTO);
        M updatedModel = service.update(id, model);
        O outputDTO = mapper.toOutputDTO(updatedModel);
        return ResponseEntity.ok(outputDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}