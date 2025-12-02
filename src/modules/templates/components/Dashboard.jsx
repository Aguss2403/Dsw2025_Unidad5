import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import Button from '../../shared/components/Button';

function Dashboard() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenu]);

  // Block scrolling when menu is open
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openMenu]);

  // Close menu when location changes (navigation)
  useEffect(() => {
    setOpenMenu(false);
  }, [location]);

  const navigate = useNavigate();

  const { singout } = useAuth();

  const logout = () => {
    singout();
    navigate('/login');
  };

  const navigateToStore = () => {
    navigate('../');
  };

  const getLinkStyles = ({ isActive }) =>
    `
      pl-4 w-full block  pt-4 pb-4 rounded-4xl transition hover:bg-gray-100
      ${isActive ? 'bg-purple-200 hover:bg-purple-100 ' : ''}
    `;

  const renderLogoutButton = (mobile = false) => (
    <Button
      variant="secondary"
      className={`text-red-600 ${
        mobile ? 'block w-full sm:hidden' : 'hidden sm:block'
      }`}
      onClick={logout}
    >
      Cerrar sesión
    </Button>
  );

  const renderStoreButton = (mobile = false) => (
    <Button
      className={`${mobile ? 'block w-full sm:hidden' : 'hidden sm:block'}`}
      onClick={navigateToStore}
    >
      Tienda
    </Button>
  );

  return (
    <div
      className="
        h-full
        grid
        grid-cols-1
        grid-rows-[auto_1fr]

        sm:gap-3
        sm:grid-cols-[256px_1fr]
      "
    >
      <header
        className="
        flex
        items-center
        justify-between
        p-4
        shadow
        rounded
        bg-white
        sm:col-span-2"
      >
        {/* 1. Elemento Izquierda: El Título */}
        <span className="font-bold text-3xl">Dashboard</span>

        {/* 2. Elemento Derecha: Contenedor para los botones juntos */}
        <div className="flex items-center gap-2">
          {' '}
          {/* gap-2 separa los botones entre sí */}
          {renderStoreButton()}
          {renderLogoutButton()}
          {/* Botón de Menú (Hamburguesa) - Solo visible en móvil */}
          <button
            className="
          bg-transparent
          border-none
          shadow-none
          sm:hidden
          ml-2"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from immediately closing menu via outside click handler
              setOpenMenu(!openMenu);
            }}
          >
            {openMenu ? (
              <span className="text-xl">&#215;</span>
            ) : (
              <span className="text-xl">&#9776;</span>
            )}
          </button>
        </div>
      </header>

      {/* Overlay for mobile menu background dimming (optional but good for UX) */}
      {openMenu && (
        <div
          className="
            fixed
            inset-0
            z-10
            sm:hidden
            backdrop-blur-sm
            bg-black/5
          "
          onClick={() => setOpenMenu(false)}
        />
      )}

      <aside
        ref={menuRef}
        className={`
            fixed
            top-0
            bottom-0
            bg-white
            w-64
            p-6
            transition-transform duration-300 ease-in-out
            ${openMenu ? 'translate-x-0' : '-translate-x-full'}
            z-20
            shadow-lg
            flex
            flex-col
            justify-between

            sm:translate-x-0
            sm:relative
            sm:shadow
            sm:z-auto
          `}
      >
        <nav>
          <ul className="flex flex-col">
            <li>
              <NavLink to="/admin/dashboard" className={getLinkStyles}>
                Principal
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/products" className={getLinkStyles}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders" className={getLinkStyles}>
                Ordenes
              </NavLink>
            </li>
          </ul>
          <hr className="opacity-15 mt-4" />
        </nav>
        <div className="flex flex-col gap-2">
          {renderStoreButton(true)}
          {renderLogoutButton(true)}
        </div>
      </aside>

      <main
        className="
            p-5
            overflow-y-scroll
          "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
