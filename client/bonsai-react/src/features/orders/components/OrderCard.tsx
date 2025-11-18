import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { formatCurrencyBRL } from '@/utils/currency';
import type { Order, OrderStatus } from '@/types/order.types';

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
    icon: <Truck className="h-4 w-4" />,
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

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const statusConfig = orderStatusConfig[order.status];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Pedido #{order.id.slice(0, 8)}</p>
            <p className="text-sm text-gray-600">
              {new Date(order.orderDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <Badge variant={statusConfig.variant}>
            <span className="flex items-center gap-1">
              {statusConfig.icon}
              <span>{statusConfig.label}</span>
            </span>
          </Badge>
        </div>

        <div className="mb-4 space-y-2">
          {order.orderItems.slice(0, 2).map((item) => (
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
          {order.orderItems.length > 2 && (
            <p className="text-sm text-gray-500">
              + {order.orderItems.length - 2} {order.orderItems.length - 2 === 1 ? 'item' : 'itens'}
            </p>
          )}
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
};
