// src/modules/store/pages/StorePage.jsx
import { useEffect, useState } from 'react';
import MainLayout from '../../core/components/MainLayout'; // Importamos el Layout
import StoreProductCard from '../components/StoreProductCard';
import Button from '../../shared/components/Button';
import { getStoreProducts } from '../services/storeService';

function StorePage() {
  // Lógica de datos (Idealmente mover a un custom hook useStoreProducts)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // NOTA: Para conectar la búsqueda del Header con esta página,
  // necesitaríamos elevar el estado a un Context o usar URL Params (recomendado).
  // Por simplicidad en este paso, asumimos carga inicial sin filtro.

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    const { data } = await getStoreProducts(null, page, 20);
    if (data) {
      setProducts(data.items || []);
      setTotalItems(data.total || 0);
      setTotalPages(Math.ceil((data.total || 0) / 20));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Renderizado limpio
  return (
    <MainLayout>
      {loading ? (
        <div className="flex justify-center items-center h-64">
           <p className="text-gray-500 text-lg animate-pulse">Cargando catálogo...</p>
        </div>
      ) : (
        <>
          {/* Grid de Productos - Mobile First (1 col -> 2 col -> 4 col) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <StoreProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600">
                Mostrando {products.length} de {totalItems} productos
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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