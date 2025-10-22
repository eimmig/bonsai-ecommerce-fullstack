package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.UserInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.UserOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.WARN,
    uses = {AddressMapper.class}
)
public interface UserMapper extends DomainMapper<UserModel, UserEntity, UserInputDTO, UserOutputDTO> {

    UserEntity toEntity(UserModel model);
    
    UserModel toModel(UserEntity entity);
    
    List<UserModel> toModelList(List<UserEntity> entities);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    UserModel toModel(UserInputDTO inputDTO);
    
    UserOutputDTO toOutputDTO(UserModel model);
    
    List<UserOutputDTO> toOutputDTOList(List<UserModel> models);
}