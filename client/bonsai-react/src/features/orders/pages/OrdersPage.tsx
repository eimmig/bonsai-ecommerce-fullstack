import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

import { useOrders } from '@/hooks/use-orders';
import { ROUTES } from '@/constants/routes';
import { Button, Card, CardContent, Spinner, Badge } from '@/components/ui';
import { formatCurrencyBRL } from '@/utils/currency';
import type { OrderStatus } from '@/types/order.types';

const orderStatusConfig: Record<
  OrderStatus,
  { label: string; variant: 'default' | 'success' | 'error' | 'warning'; icon: React.ReactNode }
> = {
  PENDING: {
    label: 'Pendente',
    variant: 'warning',
    icon: <Clock className="h-4 w-4" />,
  },
  PROCESSING: {
    label: 'Processando',
    variant: 'default',
    icon: <Package className="h-4 w-4" />,
  },
  SHIPPED: {
    label: 'Enviado',
    variant: 'default',
    icon: <Package className="h-4 w-4" />,
  },
  DELIVERED: {
    label: 'Entregue',
    variant: 'success',
    icon: <CheckCircle className="h-4 w-4" />,
  },
  CANCELLED: {
    label: 'Cancelado',
    variant: 'error',
    icon: <XCircle className="h-4 w-4" />,
  },
};

export const OrdersPage = () => {
  const { data: ordersResponse, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!ordersResponse || ordersResponse.orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Package className="mx-auto mb-4 h-24 w-24 text-gray-400" />
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Você ainda não fez nenhum pedido
        </h1>
        <p className="mb-8 text-gray-600">Comece a comprar agora!</p>
        <Link to={ROUTES.PRODUCTS}>
          <Button variant="primary" size="lg">
            Ver Produtos
          </Button>
        </Link>
      </div>
    );
  }

  const { orders } = ordersResponse;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Meus Pedidos</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusConfig = orderStatusConfig[order.status];
          
          return (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge variant={statusConfig.variant}>
                    <span className="flex items-center">
                      {statusConfig.icon}
                      <span className="ml-1">{statusConfig.label}</span>
                    </span>
                  </Badge>
                </div>

                <div className="mb-4 space-y-2">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {formatCurrencyBRL(item.totalPrice)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-600">Total do Pedido</p>
                    <p className="text-xl font-bold text-primary">
                      {formatCurrencyBRL(order.totalPrice)}
                    </p>
                  </div>
                  <Link to={ROUTES.ORDER_DETAIL(order.id)}>
                    <Button variant="outline" size="md">
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
