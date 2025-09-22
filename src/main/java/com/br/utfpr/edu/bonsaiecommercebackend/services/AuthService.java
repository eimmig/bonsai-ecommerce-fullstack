package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.AuthRequestDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.AuthResponseDTO;

public interface AuthService {
    AuthResponseDTO authenticate(AuthRequestDTO request);
}
