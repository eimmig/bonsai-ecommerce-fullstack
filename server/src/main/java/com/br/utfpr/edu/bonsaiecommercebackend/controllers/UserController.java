package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.UpdateUserProfileDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.UserOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.UserService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.AuthenticationUtil;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.UserMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Controller para operações de usuários
 * Apenas endpoints de perfil do usuário autenticado
 */
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    /**
     * Atualiza o perfil do usuário autenticado
     */
    @PutMapping("/profile")
    public ResponseEntity<UserOutputDTO> updateProfile(@Valid @RequestBody UpdateUserProfileDTO dto) {
        UUID userId = AuthenticationUtil.getCurrentUserId();
        UserModel updatedUser = userService.updateProfile(userId, dto);
        return ResponseEntity.ok(userMapper.toOutputDTO(updatedUser));
    }

    /**
     * Obtém o perfil do usuário autenticado
     */
    @GetMapping("/profile")
    public ResponseEntity<UserOutputDTO> getProfile() {
        UUID userId = AuthenticationUtil.getCurrentUserId();
        UserModel user = userService.findByIdOrThrow(userId);
        return ResponseEntity.ok(userMapper.toOutputDTO(user));
    }
}
