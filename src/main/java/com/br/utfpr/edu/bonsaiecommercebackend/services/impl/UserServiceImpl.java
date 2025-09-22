package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
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

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        super(userRepository, userMapper);
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public @NonNull UserModel save(@NonNull UserModel model) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        model.setPassword(encoder.encode(model.getPassword()));
        return super.save(model);
    }

    @Override
    public UserModel findByIdOrThrow(UUID id) {
        return userRepository.findById(id)
                .map(userMapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for the provided ID."));
    }
}
