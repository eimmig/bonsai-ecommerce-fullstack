package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.auth.AuthRequestDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.auth.AuthResponseDTO;

public interface AuthService {
    AuthResponseDTO authenticate(AuthRequestDTO request);
    
    void logout(String token);
}
