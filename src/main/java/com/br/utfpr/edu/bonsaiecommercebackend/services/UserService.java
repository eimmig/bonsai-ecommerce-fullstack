package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;
import java.util.UUID;

public interface UserService extends GenericService<UserModel> {
    UserModel findByIdOrThrow(UUID id);
}
