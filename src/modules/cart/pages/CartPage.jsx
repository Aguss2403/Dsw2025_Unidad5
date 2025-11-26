import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../core/components/MainLayout';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';
import useAuth from '../../auth/hook/useAuth';
import Button from '../../shared/components/Button';
import LoginModal from '../../auth/components/LoginModal';
import RegisterModal from '../../auth/components/RegisterModal';

function CartPage() {
  const { cartItems, total, removeItem, updateQuantity, checkout } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);

      return;
    }

    setCheckoutLoading(true);
    const { error } = await checkout(); // customerId is handled in context

    setCheckoutLoading(false);

    if (error) {
      alert(
        'Error al finalizar la compra: ' +
          (error.message || 'Error desconocido'),
      );
    } else {
      alert('¡Compra realizada con éxito!');
      navigate('/'); // Or wherever you want to redirect
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    // Optionally auto-trigger checkout here, or let user click again
  };

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
          <div className="bg-gray-100 p-6 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            Tu carrito está vacío
          </h2>
          <Button onClick={() => navigate('/')}>Ir a la tienda</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Tu Carrito ({cartItems.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/*Lista de Items */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>

        {/*Resumen de Compra */}
        <div className="h-fit bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
            Resumen
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full py-3 text-lg"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? 'Procesando...' : 'Finalizar Compra'}
          </Button>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-3 text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            Continuar comprando
          </button>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
        onSuccess={handleLoginSuccess}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </MainLayout>
  );
}

export default CartPage;
