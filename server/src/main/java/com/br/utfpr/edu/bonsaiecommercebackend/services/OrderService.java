package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.enums.OrderStatus;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;

import java.util.UUID;

/**
 * Serviço de pedidos
 */
public interface OrderService extends GenericService<OrderModel> {
    
    /**
     * Cancela um pedido
     * @param orderId ID do pedido
     * @param userId ID do usuário (para validação de propriedade)
     * @return pedido cancelado
     */
    OrderModel cancelOrder(UUID orderId, UUID userId);
    
    /**
     * Atualiza o status de um pedido (apenas admin)
     * @param orderId ID do pedido
     * @param status novo status
     * @return pedido atualizado
     */
    OrderModel updateStatus(UUID orderId, OrderStatus status);
}
