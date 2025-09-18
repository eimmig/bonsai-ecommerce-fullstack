package com.br.utfpr.edu.bonsaiEcommerceBackend.utils;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.user.UserInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.user.UserOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.UserModel;
import org.springframework.stereotype.Component;

@Component
public class UserMapper extends GenericMapper<UserModel, UserEntity, UserInputDTO, UserOutputDTO> {
}
