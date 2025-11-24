import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import Button from '../../shared/components/Button';
import SearchBar from './SearchBar';
import Navbar from './NavBar';

function Header({ onSearch, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const { isAuthenticated, username, singout } = useAuth();
  
  // Estado para controlar si el menú desplegable está abierto
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Referencia para detectar clics fuera del menú y cerrarlo
  const menuRef = useRef(null);

  const handleLogout = () => {
    singout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  // Efecto para cerrar el menú si se hace click fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* ---------------------------------------------------- */}
          {/* 1. SECCIÓN IZQUIERDA: Logo + Navbar (Desktop)        */}
          {/* ---------------------------------------------------- */}
          <div className="flex items-center gap-4 lg:gap-8 shrink-0">
            <div 
              className="font-bold text-2xl text-gray-900 cursor-pointer flex items-center gap-2" 
              onClick={() => navigate('/')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
              <span className="hidden md:block">MiTienda</span>
            </div>
            
            {/* Navbar visible solo en pantallas medianas hacia arriba */}
            <div className="hidden md:block">
              <Navbar />
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* 2. SECCIÓN CENTRAL: Barra de Búsqueda                */}
          {/* ---------------------------------------------------- */}
          <div className="flex-1 max-w-2xl px-2 lg:px-8">
            <SearchBar 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              onSearch={onSearch}
              className="w-full"
            />
          </div>

          {/* ---------------------------------------------------- */}
          {/* 3. SECCIÓN DERECHA: Menú Hamburguesa / Usuario       */}
          {/* ---------------------------------------------------- */}
          <div className="flex items-center shrink-0 relative" ref={menuRef}>
            {isAuthenticated ? (
              <>
                 {/* Nombre de usuario (Visible solo en desktop grande) */}
                <span className="text-sm font-medium text-gray-700 mr-4 hidden lg:block">
                  Hola, {username}
                </span>

                {/* Botón Hamburguesa */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 ring-1 ring-black ring-opacity-5">
                    {/* En Mobile, mostramos aquí los links de navegación que se ocultaron */}
                    <div className="md:hidden border-b border-gray-100 mb-1 pb-1">
                      <button 
                        onClick={() => navigate('/')} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Productos
                      </button>
                      <button 
                        onClick={() => navigate('/cart')} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Carrito
                      </button>
                    </div>

                    {/* Opciones de Usuario */}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Si no está autenticado, mostramos botones de acción directa
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>Ingresar</Button>
                <Button size="sm" onClick={() => navigate('/register')} className="hidden sm:block">Registro</Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;