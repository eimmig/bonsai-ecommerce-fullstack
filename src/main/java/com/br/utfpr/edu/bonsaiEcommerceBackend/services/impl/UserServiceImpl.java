package com.br.utfpr.edu.bonsaiEcommerceBackend.services.impl;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.UserModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.repositories.UserRepository;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.UserService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.mappers.UserMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends GenericServiceImpl<UserModel, UserEntity>
        implements UserService {
    public UserServiceImpl(UserRepository repository, UserMapper mapper) {
        super(repository, mapper);
    }

    @Override
    public UserModel save(UserModel model) {
        // Criptografa a senha antes de salvar
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        model.setPassword(encoder.encode(model.getPassword()));
        return super.save(model);
    }
}
