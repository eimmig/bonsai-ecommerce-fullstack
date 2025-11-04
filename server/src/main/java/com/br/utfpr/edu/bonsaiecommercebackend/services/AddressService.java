package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/**
 * Service para operações de endereços
 * Todos os métodos buscam userId via AuthenticationUtil.getCurrentUserId()
 */
public interface AddressService {

    /**
     * Cria endereço para o usuário autenticado
     * @param addressModel Dados do endereço
     * @return Endereço criado
     */
    AddressModel createAddress(AddressModel addressModel);

    /**
     * Busca endereço validando propriedade
     * @param addressId ID do endereço
     * @return Endereço encontrado
     * @throws com.br.utfpr.edu.bonsaiecommercebackend.exceptions.UnauthorizedAccessException se não for do usuário
     */
    AddressModel getAddress(UUID addressId);

    /**
     * Lista endereços do usuário autenticado
     * @param pageable Paginação
     * @return Page de endereços
     */
    Page<AddressModel> getAllAddresses(Pageable pageable);

    /**
     * Atualiza endereço validando propriedade
     * @param addressId ID do endereço
     * @param addressModel Dados atualizados
     * @return Endereço atualizado
     * @throws com.br.utfpr.edu.bonsaiecommercebackend.exceptions.UnauthorizedAccessException se não for do usuário
     */
    AddressModel updateAddress(UUID addressId, AddressModel addressModel);

    /**
     * Deleta endereço validando propriedade
     * @param addressId ID do endereço
     * @throws com.br.utfpr.edu.bonsaiecommercebackend.exceptions.UnauthorizedAccessException se não for do usuário
     */
    void deleteAddress(UUID addressId);
}

