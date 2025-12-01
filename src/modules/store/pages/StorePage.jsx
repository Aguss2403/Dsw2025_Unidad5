import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../../core/components/MainLayout";
import StoreProductCard from "../components/StoreProductCard";
import Pagination from "../../shared/components/Pagination";
import { getStoreProducts } from "../services/storeService";

function StorePage() {
  // Leemos la URL para saber si hay búsqueda activa (?search=zapatillas)
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  // Estado local para productos y paginación
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Función de carga de datos
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    // Pasamos el término de búsqueda (searchQuery) al servicio
    const { data } = await getStoreProducts(searchQuery, page, pageSize);
    // Del objeto que devuelva, solo quiero la propiedad data
    if (data) {
      setProducts(data.items || []);
      setTotalItems(data.total || 0);
      setTotalPages(Math.ceil((data.total || 0) / pageSize));
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, searchQuery, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <MainLayout>
      {/* Título dinámico según búsqueda */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {searchQuery ? (
          <span className="font-bold">
            Resultados para:
            <span className="font-normal"> "{searchQuery}"</span>
          </span>
        ) : (
          "Catálogo de Productos"
        )}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-14 w-14 border-b-3 border-purple-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-100">
          <p className="text-gray-500 text-lg">No se encontraron productos.</p>
        </div>
      ) : (
        <>
          {/* Grid Responsivo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <StoreProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Controles de Paginación */}
          <div className="mt-12 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 mb-4 text-center sm:text-left">
              Mostrando {products.length} de {totalItems} productos
            </p>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default StorePage;
