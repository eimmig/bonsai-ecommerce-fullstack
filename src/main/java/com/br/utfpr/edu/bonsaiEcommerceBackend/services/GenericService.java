package com.br.utfpr.edu.bonsaiEcommerceBackend.services;

import com.br.utfpr.edu.bonsaiEcommerceBackend.models.GenericModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public interface GenericService<M extends GenericModel> {
    M save(M model) throws Exception;

    List<M> getAll();

    Optional<M> getById(UUID id);

    void delete(UUID id) throws RuntimeException;

    M update(UUID id, M model) throws RuntimeException;
}