import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../core/components/MainLayout';
import StoreProductCard from '../components/StoreProductCard';
import Button from '../../shared/components/Button';
import { getStoreProducts } from '../services/storeService';

function StorePage() {
  // Leemos la URL para saber si hay búsqueda activa (?search=zapatillas)
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  // Estado local para productos y paginación
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Función de carga de datos
  const fetchProducts = useCallback(
    async (page = 1) => {
      setLoading(true);
      // Pasamos el término de búsqueda (searchQuery) al servicio
      const { data } = await getStoreProducts(searchQuery, page, 20);

      if (data) {
        setProducts(data.items || []);
        setTotalItems(data.total || 0);
        setTotalPages(Math.ceil((data.total || 0) / 20));
      }

      setLoading(false);
    },
    [searchQuery],
  );

  // Efecto: Cuando cambia la página o la búsqueda, recargamos
  useEffect(() => {
    // Si cambia la búsqueda, reseteamos a la página 1 primero
    // (Nota: Esto ya lo maneja el hook useGlobalSearch al navegar, pero por seguridad podemos resetear page aquí si fuese necesario)
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]); // <-- Escuchamos cambios en la búsqueda

  // Efecto adicional para resetear a página 1 si la búsqueda cambia drásticamente
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <MainLayout>
      {/* Título dinámico según búsqueda */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {searchQuery
          ? `Resultados para "${searchQuery}"`
          : 'Catálogo de Productos'}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600">
                Mostrando {products.length} de {totalItems} productos
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span className="flex items-center px-4 font-medium text-gray-700">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}

export default StorePage;
