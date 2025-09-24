package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.AddressRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.AddressService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.AddressMapper;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import com.br.utfpr.edu.bonsaiecommercebackend.services.UserService;

import java.util.UUID;


@Service
public class AddressServiceImpl extends GenericServiceImpl<AddressModel, AddressEntity>
        implements AddressService {
    private final UserService userService;

    public AddressServiceImpl(AddressRepository repository, AddressMapper mapper, UserService userService) {
        super(repository, mapper);
        this.userService = userService;
    }

    @Override
    public @NonNull AddressModel save(@NonNull AddressModel addressModel, @NonNull UUID userId) {
        addressModel.setUser(userService.findByIdOrThrow(userId));
        return super.save(addressModel);
    }
}
