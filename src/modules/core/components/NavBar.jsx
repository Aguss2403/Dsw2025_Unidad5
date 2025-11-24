import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="hidden md:flex gap-4">
      {/* Usamos Link en lugar de <a> para evitar recargas de página */}
      <Link to="/" className="bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition">
        Productos
      </Link>
      <Link to="/cart" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition">
        Carrito de compras
      </Link>
    </nav>
  );
}
export default Navbar;