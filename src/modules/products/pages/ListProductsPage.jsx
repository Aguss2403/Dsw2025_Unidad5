import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import { getProducts } from '../services/list';

const productStatus = {
  ALL: 'all',
  ENABLED: 'enabled',
  DISABLED: 'disabled',
};

function ListProductsPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState(productStatus.ALL);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await getProducts(searchTerm, status, pageNumber, pageSize);

      if (error) throw error;

      setTotal(data?.total || 0);
      setProducts(data?.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [status, pageSize, pageNumber]);

  const totalPages = Math.ceil(total / pageSize);

  const handleSearch = async () => {
    await fetchProducts();
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Productos</h1>
          <Button
            className="w-full sm:w-auto rounded-2xl"
            onClick={() => navigate('/admin/products/create')}
          >
            {/* Usar ícono en mobile si es necesario */}
            <span className="inline sm:hidden">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M5 11C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H5Z" fill="#000000"></path>
                  <path d="M9 5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V5Z" fill="#000000"></path>
                </g>
              </svg>
            </span>
            <span className="hidden sm:inline">Crear Producto</span>
          </Button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mt-4">
          <div className="flex items-center gap-2">
            <input
              value={searchTerm}
              onChange={(evt) => setSearchTerm(evt.target.value)}
              type="text"
              placeholder="Buscar"
              className="flex-1 text-base px-3 py-2 border border-gray-300 rounded-md"
            />
            <Button className="px-3 py-2" onClick={handleSearch}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </Button>
          </div>
          <select
            onChange={evt => setStatus(evt.target.value)}
            className="text-base px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value={productStatus.ALL}>Todos</option>
            <option value={productStatus.ENABLED}>Habilitados</option>
            <option value={productStatus.DISABLED}>Inhabilitados</option>
          </select>
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        {
          loading
            ? <div className="text-center py-8"><span className="text-sm text-gray-600">Buscando datos...</span></div>
            : products.map(product => (
              <Card key={product.sku}>
                <h2 className="text-lg sm:text-xl font-semibold">{product.sku} - {product.name}</h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Stock: {product.stockQuantity} - ${product.currentUnitPrice} -
                  <span className={`ml-2 ${product.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {product.isActive ? 'Activado' : 'Desactivado'}
                  </span>
                </p>
              </Card>
            ))
        }
      </div>

      {/* Paginación Responsiva */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center mt-4">
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
          className="text-sm px-3 py-2 bg-gray-200 disabled:bg-gray-100 rounded-md disabled:text-gray-400"
        >
          ← Anterior
        </button>
        <span className="text-sm text-gray-700 text-center">
          {pageNumber} / {totalPages}
        </span>
        <button
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
          className="text-sm px-3 py-2 bg-gray-200 disabled:bg-gray-100 rounded-md disabled:text-gray-400"
        >
          Siguiente →
        </button>

        <select
          value={pageSize}
          onChange={evt => {
            setPageNumber(1);
            setPageSize(Number(evt.target.value));
          }}
          className="text-sm px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="2">2</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>

  );
};

export default ListProductsPage;
