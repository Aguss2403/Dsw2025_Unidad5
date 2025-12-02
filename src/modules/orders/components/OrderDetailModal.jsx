import { useEffect, useState } from "react";
import Modal from "../../shared/components/Modal";
import { getOrderById } from "../services/getOrderById";

function OrderDetailModal({ isOpen, onClose, orderId }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && orderId) {
      const fetchOrder = async () => {
        setLoading(true);
        setError(null);
        const { data, error } = await getOrderById(orderId);

        if (error) {
          setError(error);
        } else {
          setOrder(data);
        }

        setLoading(false);
      };

      fetchOrder();
    } else {
      setOrder(null);
    }
  }, [isOpen, orderId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalle de Orden #${orderId || ""}`}
      maxWidth="max-w-6xl !important"
    >
      {loading && (
        <p className="text-gray-500 text-center">Cargando detalles...</p>
      )}

      {error && (
        <p className="text-red-500 text-center">
          Error al cargar la orden: {error.message || "Error desconocido"}
        </p>
      )}

      {!loading && !error && order && (
        <div className="space-y-6 text-lg">
          {/* Información del Cliente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-lg">
            <div>
              <p className="font-semibold text-gray-700">Cliente:</p>
              <p className="text-gray-600">
                {order.customerFirstName} {order.customerLastName}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 text-lg ">Estado:</p>
              <span className="inline-block px-2 py-1 text-lg font-semibold rounded-full bg-purple-100 text-purple-800">
                {order.orderStatus}
              </span>
            </div>
            <div className="sm:col-span-2">
              <p className="font-semibold text-gray-700">Dirección de Envío:</p>
              <p className="text-gray-600">{order.shippingAddress}</p>
            </div>
            {order.notes && (
              <div className="sm:col-span-2">
                <p className="font-semibold text-gray-700">Notas:</p>
                <p className="text-gray-600 italic">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Tabla de Productos */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Productos</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cant.
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.orderItems?.map((item) => (
                    <tr key={item.productId}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.productName}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                        ${item.unitPrice}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        ${item.subTotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan="3"
                      className="px-3 py-3 text-right font-bold text-gray-900"
                    >
                      Total:
                    </td>
                    <td className="px-3 py-3 text-right font-bold text-purple-600">
                      $
                      {order.orderItems
                        ?.reduce((acc, item) => acc + item.subTotal, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default OrderDetailModal;
