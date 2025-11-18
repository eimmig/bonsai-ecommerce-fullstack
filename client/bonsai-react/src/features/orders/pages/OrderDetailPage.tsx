import { useParams, useNavigate } from 'react-router-dom';
import { Package, MapPin, CreditCard, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

import { useOrder, useCancelOrder } from '@/hooks/use-orders';
import { ROUTES } from '@/constants/routes';
import { Button, Card, CardContent, CardHeader, CardTitle, Spinner, Badge } from '@/components/ui';
import { formatCurrencyBRL } from '@/utils/currency';
import { useToast } from '@/hooks/use-toast';
import type { OrderStatus } from '@/types/order.types';

const orderStatusConfig: Record<
  OrderStatus,
  { label: string; variant: 'default' | 'success' | 'error' | 'warning'; icon: React.ReactNode }
> = {
  PENDING: {
    label: 'Pendente',
    variant: 'warning',
    icon: <Clock className="h-5 w-5" />,
  },
  PROCESSING: {
    label: 'Processando',
    variant: 'default',
    icon: <Package className="h-5 w-5" />,
  },
  SHIPPED: {
    label: 'Enviado',
    variant: 'default',
    icon: <Truck className="h-5 w-5" />,
  },
  DELIVERED: {
    label: 'Entregue',
    variant: 'success',
    icon: <CheckCircle className="h-5 w-5" />,
  },
  CANCELLED: {
    label: 'Cancelado',
    variant: 'error',
    icon: <XCircle className="h-5 w-5" />,
  },
};

const paymentMethodLabels: Record<string, string> = {
  CREDIT_CARD: 'Cartão de Crédito',
  DEBIT_CARD: 'Cartão de Débito',
  PIX: 'PIX',
  BOLETO: 'Boleto Bancário',
};

export const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { data: order, isLoading } = useOrder(id!);
  const cancelOrderMutation = useCancelOrder();

  const handleCancelOrder = async () => {
    if (!order) return;
    
    if (order.status === 'DELIVERED' || order.status === 'CANCELLED') {
      toast.error('Não é possível cancelar este pedido');
      return;
    }

    if (confirm('Tem certeza que deseja cancelar este pedido?')) {
      try {
        await cancelOrderMutation.mutateAsync(order.id);
        toast.success('Pedido cancelado com sucesso');
      } catch (error) {
        toast.error('Erro ao cancelar pedido');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Pedido não encontrado</h1>
        <Button onClick={() => navigate(ROUTES.ORDERS)}>Voltar para Pedidos</Button>
      </div>
    );
  }

  const statusConfig = orderStatusConfig[order.status as OrderStatus];
  const canCancel = order.status !== 'DELIVERED' && order.status !== 'CANCELLED';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(ROUTES.ORDERS)}>
          ← Voltar
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pedido #{order.id.slice(0, 8)}</h1>
          <p className="text-gray-600">
            Realizado em {new Date(order.orderDate).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <Badge variant={statusConfig.variant} className="text-lg">
          <span className="flex items-center gap-2">
            {statusConfig.icon}
            <span>{statusConfig.label}</span>
          </span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Itens do Pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Itens do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantidade: {item.quantity} × {formatCurrencyBRL(item.unitPrice)}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrencyBRL(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Endereço de Entrega */}
          {order.deliveryAddress && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900">
                  {order.deliveryAddress.street}, {order.deliveryAddress.number}
                </p>
                {order.deliveryAddress.complement && (
                  <p className="text-gray-600">{order.deliveryAddress.complement}</p>
                )}
                <p className="text-gray-900">
                  {order.deliveryAddress.neighborhood} - {order.deliveryAddress.city}/
                  {order.deliveryAddress.state}
                </p>
                <p className="text-gray-600">CEP: {order.deliveryAddress.zipCode}</p>
              </CardContent>
            </Card>
          )}

          {/* Método de Pagamento */}
          {order.paymentMethod && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Método de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900">
                  {paymentMethodLabels[order.paymentMethod] || order.paymentMethod}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Resumo do Pedido */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrencyBRL(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="font-medium">{formatCurrencyBRL(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between border-t pt-3 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatCurrencyBRL(order.totalPrice)}</span>
              </div>

              {canCancel && (
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleCancelOrder}
                  isLoading={cancelOrderMutation.isPending}
                  className="mt-4 border-red-500 text-red-500 hover:bg-red-50"
                >
                  Cancelar Pedido
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
