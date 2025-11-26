import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import CartIcon from './CartIcon';

function UserMenuDesktop({
  isAuthenticated,
  isAdmin,
  onLogin,
  onRegister,
  onLogout,
}) {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="hidden md:flex item-center gap-6">
        <Link to="/cart" title="Ver Carrito">
          <CartIcon />
        </Link>
        <Button variant="secondary" size="sm" onClick={onLogin}>
          Ingresar
        </Button>
        <Button size="sm" onClick={onRegister}>
          Registro
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-6">
      <Link to="/cart" title="Ver Carrito">
        <CartIcon />
      </Link>

      <span className="text-sm font-medium text-gray-700">
        Hola, {localStorage.getItem('name')}
      </span>

      {isAdmin && (
        <Button
          size="sm"
          onClick={() => navigate('/admin/dashboard')}
          className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
        >
          Dashboard
        </Button>
      )}

      <Button variant="secondary" size="sm" onClick={onLogout}>
        Cerrar Sesión
      </Button>
    </div>
  );
}

export default UserMenuDesktop;
