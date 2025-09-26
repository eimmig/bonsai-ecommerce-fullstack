package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.auth.AuthRequestDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.auth.AuthResponseDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.AuthenticationException;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.UserRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.AuthService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthServiceImpl implements AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        UserEntity user = userRepository.findByEmail(request.email()).orElse(null);
        if (user == null) {
            logger.warn("Tentativa de login com email inexistente: {}", request.email());
            throw new AuthenticationException("Usuário ou senha inválidos");
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(request.password(), user.getPassword())) {
            logger.warn("Senha inválida para o email: {}", request.email());
            throw new AuthenticationException("Usuário ou senha inválidos");
        }
        String token = jwtUtil.generateToken(user.getId());
        return new AuthResponseDTO(token);
    }
}

