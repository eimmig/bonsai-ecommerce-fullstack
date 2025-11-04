package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/**
 * Service para operações de pedidos
 * Todos os métodos buscam userId via AuthenticationUtil.getCurrentUserId()
 */
public interface OrderService {

    /**
     * Cria pedido para o usuário autenticado
     * @param orderModel Dados do pedido
     * @return Pedido criado
     */
    OrderModel createOrder(OrderModel orderModel);

    /**
     * Busca pedido validando propriedade
     * @param orderId ID do pedido
     * @return Pedido encontrado
     * @throws com.br.utfpr.edu.bonsaiecommercebackend.exceptions.UnauthorizedAccessException se não for do usuário
     */
    OrderModel getOrder(UUID orderId);

    /**
     * Lista pedidos do usuário autenticado
     * @param pageable Paginação
     * @return Page de pedidos
     */
    Page<OrderModel> getAllOrders(Pageable pageable);

    /**
     * Cancela pedido do usuário autenticado
     * @param orderId ID do pedido
     * @return Pedido cancelado
     * @throws com.br.utfpr.edu.bonsaiecommercebackend.exceptions.UnauthorizedAccessException se não for do usuário
     */
    OrderModel cancelOrder(UUID orderId);
}

