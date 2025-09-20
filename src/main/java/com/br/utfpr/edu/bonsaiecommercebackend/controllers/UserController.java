package com.br.utfpr.edu.bonsaiEcommerceBackend.controllers;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.user.UserInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.user.UserOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.UserModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.UserService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.UserMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController extends GenericController<UserModel, UserEntity, UserInputDTO, UserOutputDTO> {
    public UserController(UserService userService, UserMapper userMapper) {
        super(userService, userMapper);
    }
}
