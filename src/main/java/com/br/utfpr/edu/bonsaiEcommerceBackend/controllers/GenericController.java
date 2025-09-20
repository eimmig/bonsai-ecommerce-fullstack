package com.br.utfpr.edu.bonsaiEcommerceBackend.controllers;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.GenericEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.GenericModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.GenericService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.mappers.GenericMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public abstract class GenericController<M extends GenericModel, E extends GenericEntity, I, O> {

    private final GenericService<M> genericService;
    private final GenericMapper<M, E, I, O> genericMapper;

    public GenericController(GenericService<M> genericService, GenericMapper<M, E, I, O> genericMapper) {
        this.genericService = genericService;
        this.genericMapper = genericMapper;
    }

    @PostMapping
    public ResponseEntity<O> save(@RequestBody @Valid I dto) throws Exception {
        M model = genericMapper.toModel(dto);
        M createdItem = genericService.save(model);
        O outputDto = genericMapper.toDTO(createdItem);
        return new ResponseEntity<>(outputDto, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<O> getById(@PathVariable UUID id) {
        Optional<M> item = genericService.getById(id);
        return item.map(value -> ResponseEntity.ok(genericMapper.toDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<O>> getAll() {
        List<M> items = genericService.getAll();
        List<O> outputItems = items.stream()
                .map(genericMapper::toDTO)
                .toList();
        return ResponseEntity.ok(outputItems);
    }

    @PutMapping("/{id}")
    public ResponseEntity<O> update(@PathVariable UUID id, @RequestBody @Valid I dto) {
        M model = genericMapper.toModel(dto);
        M item = genericService.update(id, model);
        O outputDto = genericMapper.toDTO(item);
        return ResponseEntity.ok(outputDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) throws RuntimeException {
        genericService.delete(id);
        return ResponseEntity.noContent().build();
    }
}