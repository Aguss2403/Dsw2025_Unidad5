import { useEffect, useState } from 'react';
import Button from '../../shared/components/Button';
import { listOrders } from '../services/listOrders';
import OrderDetailModal from '../components/OrderDetailModal';
import Pagination from '../../shared/components/Pagination';

function ListOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  // Filtrar órdenes por búsqueda y estado
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.shippingAddress?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Paginación
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + pageSize,
  );

  if (loading) return <p className="text-gray-600">Cargando ordenes...</p>;

  if (error)
    return (
      <p className="text-red-600">Error al cargar ordenes: {error.message}</p>
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        {/* Header */}
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6">
          Ordenes
        </h1>

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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
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
          <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
            No se encontraron órdenes
          </p>
        ) : (
          paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl">
                  <span className="font-bold text-gray-900">
                    Número de Orden:{' '}
                  </span>
                  <span className="font-normal text-gray-600">{order.id}</span>
                </h3>

                <h3 className="text-2xl">
                  <span className="font-bold text-gray-900">
                    Nombre y Apellido:{' '}
                  </span>
                  <span className="font-normal text-gray-600">
                    {order.customerFirstName + ' ' + order.customerLastName}
                  </span>
                </h3>
                <h3 className="text-2xl">
                  <span className="font-bold text-gray-900">Dirección: </span>
                  <span className="font-normal text-gray-600">
                    {order.shippingAddress}
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  Estado:{' '}
                  <span className="font-medium text-purple-600">
                    {order.orderStatus}
                  </span>
                </p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="w-full sm:w-auto bg-purple-200 focus:bg-purple-300"
                onClick={() => handleViewOrder(order.id)}
              >
                Ver
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Paginación - Responsiva */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      {/* Modal de Detalle */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        orderId={selectedOrderId}
      />
    </div>
  );
}

export default ListOrdersPage;
