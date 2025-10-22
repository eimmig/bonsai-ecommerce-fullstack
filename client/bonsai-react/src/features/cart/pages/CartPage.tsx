import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routes';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatCurrencyBRL } from '@/utils/currency';

export const CartPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { items, itemCount, total, updateItem, removeItem, isUpdatingItem, isRemovingItem } = useCart();

  const handleUpdateQuantity = useCallback(
    (itemId: string, newQuantity: number) => {
      if (newQuantity < 1) return;

      updateItem(itemId, { quantity: newQuantity });
      toast.success('Quantidade atualizada');
    },
    [updateItem, toast]
  );

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      removeItem(itemId);
      toast.success('Item removido do carrinho');
    },
    [removeItem, toast]
  );

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingBag className="mx-auto mb-4 h-24 w-24 text-gray-400" />
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Seu carrinho está vazio
        </h1>
        <p className="mb-8 text-gray-600">
          Adicione produtos ao seu carrinho para continuar comprando
        </p>
        <Link to={ROUTES.PRODUCTS}>
          <Button variant="primary" size="lg">
            Ver Produtos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-title">Carrinho de Compras</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {/* Table Header */}
              <div className="mb-4 flex border-b border-border-light pb-2">
                <div className="ml-24 flex-1 font-bold text-gray-dark">Produto</div>
                <div className="w-24 text-center font-bold text-gray-dark">Preço</div>
                <div className="w-28 text-center font-bold text-gray-dark">Quantidade</div>
                <div className="w-24 text-center font-bold text-gray-dark">Total</div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="flex items-center border-b border-border-light py-4">
                  <div className="mr-4 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded border border-border-light">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-base text-text">
                      {item.product.name}
                    </h3>
                  </div>

                  <div className="w-24 text-center font-bold text-text">
                    {formatCurrencyBRL(item.unitPrice)}
                  </div>

                  <div className="flex w-28 items-center justify-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={isUpdatingItem}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={isUpdatingItem}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="w-24 text-center font-bold text-text">
                    {formatCurrencyBRL(item.unitPrice * item.quantity)}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isRemovingItem}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4 text-error" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-title">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-dark">
                    <span>Subtotal ({itemCount} itens)</span>
                    <span className="font-bold">{formatCurrencyBRL(total)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-dark">
                    <span>Frete</span>
                    <span className="text-sm">Calculado no checkout</span>
                  </div>

                  <div className="border-t border-border-light pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-title">{formatCurrencyBRL(total)}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => navigate(ROUTES.CHECKOUT)}
                    className="font-bold"
                  >
                    Finalizar Compra
                  </Button>

                  <Link to={ROUTES.PRODUCTS}>
                    <Button variant="outline" size="md" fullWidth>
                      Continuar Comprando
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
