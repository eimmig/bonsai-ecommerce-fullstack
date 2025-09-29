package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.GenericModel;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GenericService<M extends GenericModel> {
    M save(@NonNull  M model) throws Exception;

    List<M> getAll();

    Page<M> getAll(Pageable pageable);

    Optional<M> getById(UUID id);

    void delete(UUID id) throws RuntimeException;

    M update(UUID id, M model) throws RuntimeException;

    M findByIdOrThrow(UUID id);
}