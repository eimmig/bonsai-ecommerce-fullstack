package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.GenericModel;
import lombok.NonNull;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GenericService<M extends GenericModel> {
    M save(@NonNull  M model) throws Exception;

    List<M> getAll();

    Optional<M> getById(UUID id);

    void delete(UUID id) throws RuntimeException;

    M update(UUID id, M model) throws RuntimeException;

    M findByIdOrThrow(UUID id);
}