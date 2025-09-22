package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.AddressRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.AddressService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.AddressMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.br.utfpr.edu.bonsaiecommercebackend.services.UserService;
import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import lombok.NonNull;

@Service
public class AddressServiceImpl extends GenericServiceImpl<AddressModel, AddressEntity>
        implements AddressService {
    private final UserService userService;

    public AddressServiceImpl(AddressRepository repository, AddressMapper mapper, UserService userService) {
        super(repository, mapper);
        this.userService = userService;
    }

    @Override
    @Transactional
    public @NonNull AddressModel save(@NonNull AddressModel model) {
        if (model.getUser() == null || model.getUser().getId() == null) {
            throw new ResourceNotFoundException("User is required for the address.");
        }
        UserModel user = userService.findByIdOrThrow(model.getUser().getId());
        model.setUser(user);
        return super.save(model);
    }
}
