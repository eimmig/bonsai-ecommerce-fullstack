
package com.br.utfpr.edu.bonsaiEcommerceBackend.utils;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.address.AddressOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.AddressModel;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper extends GenericMapper<AddressModel, AddressEntity, AddressInputDTO, AddressOutputDTO> {
}