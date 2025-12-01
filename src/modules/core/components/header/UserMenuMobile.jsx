import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useCart from "../../../cart/hooks/useCart";
import Button from "../../../shared/components/Button";

function UserMenuMobile({ isAuthenticated, onLogout, onLogin, onRegister }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { cartItems } = useCart();

  // Cerrar al hacer clic fuera (en el overlay)

  const renderBurgerButton = () => {
    if (isOpen === false) {
      return (
        <Button
          onClick={() => setIsOpen(true)}
          variant="secondary"
          className="p-2 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => setIsOpen(false)}
          variant="secondary"
          className="p-2 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      );
    }
  };

  const renderCartButton = () => {
    return (
      <Link
        to="/cart"
        className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all"
        onClick={() => setIsOpen(false)}
      >
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span className="font-medium">Carrito</span>
        </div>
        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {cartItems.length}
        </span>
      </Link>
    );
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isAuthenticated) {
    return (
      <div className="min-md:hidden">
        {renderBurgerButton()}
        {/* Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" />
        )}
        {/* Sidebar */}
        <aside
          ref={menuRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header del Sidebar */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-purple-50">
              <span className="font-semibold text-gray-800">Menú</span>
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col gap-4">
              <div className="text-sm text-gray-500 mb-2">Hola, Invitado</div>
              {cartItems.length > 0 && renderCartButton()}

              <div className="border-t border-gray-100 my-2"></div>

              <div className="flex flex-col gap-3">
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={() => {
                    onLogin();
                    setIsOpen(false);
                  }}
                >
                  Ingresar
                </Button>
                <Button
                  className="w-full justify-center"
                  onClick={() => {
                    onRegister();
                    setIsOpen(false);
                  }}
                >
                  Registrarse
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    );
  } else {
    return (
      <div className="min-md:hidden">
        {renderBurgerButton()}

        {/* Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" />
        )}

        {/* Sidebar */}
        <aside
          ref={menuRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header del Sidebar */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-purple-50">
              <span className="font-semibold text-gray-800">Menú</span>
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2 p-2 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
                  {localStorage.getItem("name")?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {localStorage.getItem("name")}
                  </span>
                  <span className="text-xs text-gray-500">
                    {localStorage.getItem("email")}
                  </span>
                </div>
              </div>

              {cartItems.length > 0 && renderCartButton()}

              <div className="border-t border-gray-100 my-2"></div>

              {localStorage.getItem("role") === "admin" && (
                <Link to="/admin/dashboard">
                  <Button className="w-full justify-center text-bold">
                    Dashboard
                  </Button>
                </Link>
              )}

              <Button
                variant="secondary"
                className="w-full justify-center text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </aside>
      </div>
    );
  }
}

export default UserMenuMobile;
