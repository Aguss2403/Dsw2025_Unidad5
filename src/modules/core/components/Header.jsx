import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import useCart from '../../cart/hooks/useCart';
import useGlobalSearch from '../hooks/useGlobalSearch';
import Button from '../../shared/components/Button';
import SearchBar from './SearchBar';
import LoginModal from '../../auth/components/LoginModal';     
import RegisterModal from '../../auth/components/RegisterModal'; 

function Header() {
  const navigate = useNavigate();
  
  // 1. EXTRAEMOS 'roles' AQUÍ
  const { isAuthenticated, username, singout, roles } = useAuth();
  
  const { cartItems } = useCart();
  const { searchTerm, handleInputChange, handleSearch } = useGlobalSearch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const menuRef = useRef(null);

  // 2. LÓGICA PARA DETECTAR ADMIN
  const isAdmin = roles && (roles.includes('admin') || roles.includes('Admin'));

  // Cierra registro y abre login
  const openLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  // Cierra login y abre registro
  const openRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleLogout = () => {
    singout();
    setIsMenuOpen(false);
    navigate('/'); 
  };

  // Cierra menú hamburguesa al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const CartIcon = () => (
    <div className="relative text-gray-600 hover:text-purple-600 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
      {cartItems && cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </div>
  );

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            
            {/* 1. Logo (Izquierda) */}
            <div className="flex items-center shrink-0">
              <div 
                className="font-bold text-2xl text-gray-900 cursor-pointer flex items-center gap-2" 
                onClick={() => navigate('/')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>
                <span className="hidden md:block">MiTienda</span>
              </div>
            </div>

            {/* 2. Buscador */}
            <div className="flex-1 max-w-2xl px-2 lg:px-8">
              <SearchBar 
                value={searchTerm} 
                onChange={handleInputChange} 
                onSearch={() => handleSearch()}
                className="w-full"
              />
            </div>

            {/* 3. Acciones */}
            <div className="flex items-center shrink-0 relative" ref={menuRef}>
              {isAuthenticated ? (
                <>
                  {/* Desktop Authenticated */}
                  <div className="hidden md:flex items-center gap-6">
                    <Link to="/cart" title="Ver Carrito">
                      <CartIcon />
                    </Link>
                    <span className="text-sm font-medium text-gray-700">
                      Hola, {username}
                    </span>

                    {/* --- BOTÓN DASHBOARD PARA ADMIN (DESKTOP) --- */}
                    {isAdmin && (
                      <Button 
                        size="sm"
                        onClick={() => navigate('/admin/dashboard')}
                      >
                        Dashboard
                      </Button>
                    )}

                    <Button variant="secondary" size="sm" onClick={handleLogout}>
                      Cerrar Sesión
                    </Button>
                  </div>

                  {/* Mobile Authenticated */}
                  <div className="md:hidden">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 ring-1 ring-black ring-opacity-5 z-50">
                        <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">
                          Hola, {username}
                        </div>
                        
                        <Link 
                          to="/" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Productos
                        </Link>

                        {/* --- LINK DASHBOARD PARA ADMIN (MÓVIL) --- */}
                        {isAdmin && (
                          <Link 
                            to="/admin/dashboard" 
                            className="block px-4 py-2 text-sm text-purple-700 font-semibold hover:bg-purple-50"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Ir al Dashboard
                          </Link>
                        )}

                        <Link 
                          to="/cart" 
                          className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span>Carrito</span>
                          {cartItems.length > 0 && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">{cartItems.length}</span>}
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // NO AUTENTICADO
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={openLogin}
                  >
                    Ingresar
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={openRegister} 
                    className="hidden sm:block"
                  >
                    Registro
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- MODALES RENDERIZADOS AQUÍ --- */}
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSwitchToRegister={openRegister} 
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={openLogin} 
      />
    </>
  );
}

export default Header;