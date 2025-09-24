package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import lombok.NonNull;

import java.util.UUID;

public interface AddressService extends GenericService<AddressModel> {
    @NonNull AddressModel save(@NonNull AddressModel addressModel, @NonNull UUID userId);
}
