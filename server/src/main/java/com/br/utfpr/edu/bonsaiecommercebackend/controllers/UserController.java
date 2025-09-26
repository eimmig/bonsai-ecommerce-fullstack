package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.UserInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.UserOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.UserService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.UserMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController extends GenericController<UserModel, UserEntity, UserInputDTO, UserOutputDTO> {
    public UserController(UserService service, UserMapper mapper) {
        super(service, mapper);
    }
}
