package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceAlreadyExistsException;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.DataIntegrityViolationException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.UserRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.UserService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.UserMapper;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl extends GenericServiceImpl<UserModel, UserEntity>
        implements UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        super(userRepository, userMapper);
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public @NonNull UserModel save(@NonNull UserModel model) {
        try {
            // Verificar se email já existe
            if (userRepository.existsByEmail(model.getEmail())) {
                throw new ResourceAlreadyExistsException("User", "email", model.getEmail());
            }
            
            // Criptografar senha
            model.setPassword(passwordEncoder.encode(model.getPassword()));
            
            return super.save(model);
            
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            if (e.getMessage() != null && e.getMessage().contains("email")) {
                throw new ResourceAlreadyExistsException("User", "email", model.getEmail());
            }
            throw new DataIntegrityViolationException("User", 
                "Erro de integridade ao salvar usuário: " + e.getMessage(), e);
        }
    }

    @Override
    public UserModel update(UUID id, UserModel model) throws RuntimeException {
        try {
            UserModel existingUser = findByIdOrThrow(id);
            
            // Se o email está sendo alterado, verificar se já existe
            if (!existingUser.getEmail().equals(model.getEmail()) && 
                userRepository.existsByEmail(model.getEmail())) {
                throw new ResourceAlreadyExistsException("User", "email", model.getEmail());
            }
            
            // Se a senha foi fornecida, criptografar
            if (model.getPassword() != null && !model.getPassword().trim().isEmpty()) {
                model.setPassword(passwordEncoder.encode(model.getPassword()));
            } else {
                // Manter a senha atual se não foi fornecida uma nova
                model.setPassword(existingUser.getPassword());
            }
            
            return super.update(id, model);
            
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            if (e.getMessage() != null && e.getMessage().contains("email")) {
                throw new ResourceAlreadyExistsException("User", "email", model.getEmail());
            }
            throw new DataIntegrityViolationException("User", 
                "Erro de integridade ao atualizar usuário: " + e.getMessage(), e);
        }
    }

    @Override
    public void delete(UUID id) throws RuntimeException {
        try {
            findByIdOrThrow(id);
            super.delete(id);
            
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("User", 
                "Usuário não pode ser excluído pois possui registros associados (endereços, pedidos, etc.)", e);
        }
    }

    @Override
    public UserModel findByIdOrThrow(UUID id) {
        return userRepository.findById(id)
                .map(userMapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for the provided ID."));
    }

    public UserModel findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userMapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for email: " + email));
    }
}