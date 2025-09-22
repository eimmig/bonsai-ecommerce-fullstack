package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

/**
 * Mapper responsável por converter entre AddressModel, AddressEntity, AddressInputDTO e AddressOutputDTO.
 * Utiliza ModelMapper para facilitar o mapeamento automático.
 */
@Component
public class AddressMapper extends GenericMapper<AddressModel, AddressEntity, AddressInputDTO, AddressOutputDTO> {
    private final UserService userService;

    protected AddressMapper(ModelMapper modelMapper, UserService userService) {
        super(modelMapper);
        this.userService = userService;
    }

    @Override
    public AddressOutputDTO toDTO(AddressModel model) {
        return model != null ? AddressOutputDTO.fromModel(model) : null;
    }

    @Override
    public AddressModel toModel(AddressInputDTO dto) {
        var addressModel = super.toModel(dto);

        var userModel = userService.findByIdOrThrow(dto.userId());

        addressModel.setUser(userModel);

        return addressModel;
    }
}