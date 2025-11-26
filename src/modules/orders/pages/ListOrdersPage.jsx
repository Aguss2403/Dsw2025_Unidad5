import { useEffect, useState } from 'react';
import Button from '../../shared/components/Button';
import { listOrders } from '../services/listOrders';

function ListOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getLinkStyles = ({ isActive }) => (
      `
        pl-4 w-full block  pt-4 pb-4 rounded-4xl transition hover:bg-gray-100
        ${isActive
        ? 'bg-purple-200 hover:bg-purple-100 '
        : ''
      }
      `
    );

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await listOrders();
      if (error) {
        setError(error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // Filtrar órdenes por búsqueda y estado
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toString().includes(searchTerm) || 
                         order.shippingAddress?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginación
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Generar números de página
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (loading) return <p className="text-gray-600">Cargando ordenes...</p>;
  if (error) return <p className="text-red-600">Error al cargar ordenes: {error.message}</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        {/* Header */}
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6">Ordenes</h1>

        {/* Filtros - Responsivos */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center">
          {/* Búsqueda */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-base px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>

          {/* Filtro de Estado */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-base px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white w-full sm:w-auto"
          >
            <option value="">Estado de Orden</option>
            <option value="Pending">Pendiente</option>
            <option value="Processing">Procesando</option>
            <option value="Shipped">Enviado</option>
            <option value="Delivered">Entregado</option>
            <option value="Cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Lista de Órdenes */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {paginatedOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-sm sm:text-base">No se encontraron órdenes</p>
        ) : (
          paginatedOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">
                  #{order.id} - {order.customerName || 'Nombre de Cliente'}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  Estado: <span className="font-medium text-purple-600">{order.orderStatus}</span>
                </p>
              </div>
              <Button size="sm" variant="secondary" className="w-full sm:w-auto">
                Ver
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Paginación - Responsiva */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>

          {/* Números de página - Compactos en mobile */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
            {getPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-1 text-gray-400 text-sm">...</span>
              )
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}

export default ListOrdersPage;
