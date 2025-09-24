package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;


@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.WARN,
    uses = {UserMapper.class}
)
public interface AddressMapper extends DomainMapper<AddressModel, AddressEntity, AddressInputDTO, AddressOutputDTO> {

    AddressEntity toEntity(AddressModel model);
    
    AddressModel toModel(AddressEntity entity);
    
    List<AddressModel> toModelList(List<AddressEntity> entities);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "user", ignore = true)
    AddressModel toModel(AddressInputDTO inputDTO);
    
    @Mapping(target = "userId", source = "user.id")
    AddressOutputDTO toOutputDTO(AddressModel model);
    
    List<AddressOutputDTO> toOutputDTOList(List<AddressModel> models);
}