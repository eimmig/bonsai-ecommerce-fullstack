import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

import { useOrders } from '@/hooks/use-orders';
import type { Order } from '@/types/order.types';
import { ROUTES } from '@/constants/routes';
import { Button, Spinner } from '@/components/ui';
import { OrderCard } from '../components/OrderCard';

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
        {orders.map((order: Order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
