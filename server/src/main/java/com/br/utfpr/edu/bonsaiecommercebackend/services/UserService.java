package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.UpdateUserProfileDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;

import java.util.UUID;

public interface UserService extends GenericService<UserModel> {
    
    /**
     * Atualiza o perfil do usuário
     * @param userId ID do usuário
     * @param dto dados para atualização
     * @return usuário atualizado
     */
    UserModel updateProfile(UUID userId, UpdateUserProfileDTO dto);
}
