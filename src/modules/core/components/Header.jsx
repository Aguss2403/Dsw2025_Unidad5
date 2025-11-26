import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import useGlobalSearch from '../hooks/useGlobalSearch';
import SearchBar from './SearchBar';
import LoginModal from '../../auth/components/LoginModal';
import RegisterModal from '../../auth/components/RegisterModal';
import UserMenuDesktop from './header/UserMenuDesktop';
import UserMenuMobile from './header/UserMenuMobile';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, username, singout, roles } = useAuth();
  const { searchTerm, handleInputChange, handleSearch } = useGlobalSearch();

  // Estados solo para los modales
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const isAdmin = roles && (roles.includes('admin') || roles.includes('Admin'));

  // Funciones de control de modales
  const openLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleLogout = () => {
    singout();
    navigate('/');
  };

  // Props comunes para pasar a los menús
  const menuProps = {
    isAuthenticated,
    username,
    isAdmin,
    onLogin: openLogin,
    onRegister: openRegister,
    onLogout: handleLogout,
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex items-center shrink-0 cursor-pointer" onClick={() => navigate('/')}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
               </svg>
               <span className="hidden md:block ml-2 font-bold text-2xl text-gray-900">MiTienda</span>
            </div>

            {/* Buscador */}
            <div className="flex-1 max-w-2xl px-2 lg:px-8">
              <SearchBar 
                value={searchTerm} 
                onChange={handleInputChange} 
                onSearch={() => handleSearch()}
                className="w-full"
              />
            </div>

            {/* Acciones (Renderizamos ambas versiones, CSS se encarga de ocultar/mostrar) */}
            <div className="flex items-center shrink-0 relative">
              <UserMenuDesktop {...menuProps} />
              <UserMenuMobile {...menuProps} />
            </div>

          </div>
        </div>
      </header>

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