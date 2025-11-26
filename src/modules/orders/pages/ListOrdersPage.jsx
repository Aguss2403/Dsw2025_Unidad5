import { useEffect, useState } from "react";
import Button from "../../shared/components/Button";
import { listOrders } from "../services/listOrders";

function ListOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getLinkStyles = ({ isActive }) =>
    `
        pl-4 w-full block  pt-4 pb-4 rounded-4xl transition hover:bg-gray-100
        ${isActive ? "bg-purple-200 hover:bg-purple-100 " : ""}
      `;

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
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.shippingAddress?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginación
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  if (loading) return <p className="text-gray-600">Cargando ordenes...</p>;
  if (error)
    return (
      <p className="text-red-600">Error al cargar ordenes: {error.message}</p>
    );

  return (
    <div className="space-y-6 ">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {/* Header */}

        <h1 className="text-4xl font-bold text-gray-900 m-3 te">Ordenes</h1>

        {/* Filtros */}
        <div className="flex gap-4 items-center">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            <option value="" className="text-xl">
              Estado de Orden
            </option>
            <option value="Pending" className="text-xl">
              Pendiente
            </option>
            <option value="Processing" className="text-xl">
              Procesando
            </option>
            <option value="Shipped" className="text-xl">
              Enviado
            </option>
            <option value="Delivered" className="text-xl">
              Entregado
            </option>
            <option value="Cancelled" className="text-xl">
              Cancelado
            </option>
          </select>
        </div>
      </div>

      {/* Lista de Órdenes */}
      <div className="space-y-3">
        {paginatedOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No se encontraron órdenes
          </p>
        ) : (
          paginatedOrders.map(
            (order) => (
              console.log(order),
              (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="text-2xl">
                      <span className="font-bold text-gray-900">
                        Número de Orden:{" "}
                      </span>
                      <span className="font-normal text-gray-600">
                        {order.id}
                      </span>
                    </h3>

                    <h3 className="text-2xl">
                      <span className="font-bold text-gray-900">
                        Nombre y Apellido:{" "}
                      </span>
                      <span className="font-normal text-gray-600">
                        {order.customerFirstName + " " + order.customerLastName}
                      </span>
                    </h3>
                    <h3 className="text-2xl">
                      <span className="font-bold text-gray-900">
                        Dirección:{" "}
                      </span>
                      <span className="font-normal text-gray-600">
                        {order.shippingAddress}
                      </span>
                    </h3>

                    <p className="text-xl text-gray-500 mt-1">
                      Estado: {order.orderStatus}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-200 w-30"
                  >
                    Ver
                  </Button>
                </div>
              )
            )
          )
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {getPageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-2 text-gray-400">
                ...
              </span>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default ListOrdersPage;
