import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../../cart/hooks/useCart';
import Button from '../../../shared/components/Button';

function UserMenuMobile({ isAuthenticated, username, isAdmin, onLogin, onRegister, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { cartItems } = useCart();

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="md:hidden flex gap-2">
         <Button variant="secondary" size="sm" onClick={onLogin}>Ingresar</Button>
         <Button size="sm" onClick={onRegister} className="hidden sm:block">Registro</Button>
      </div>
    );
  }

  return (
    <div className="md:hidden relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
        {/* Icono Hamburguesa */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">
            Hola, {username}
          </div>
          
          <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
            Productos
          </Link>

          {isAdmin && (
             <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-purple-700 font-semibold hover:bg-purple-50" onClick={() => setIsOpen(false)}>
               Ir al Dashboard
             </Link>
          )}

          <Link to="/cart" className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
            <span>Carrito</span>
            {cartItems.length > 0 && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">{cartItems.length}</span>}
          </Link>

          <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100">
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenuMobile;