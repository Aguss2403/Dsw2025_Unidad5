import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'; // Asegúrate de la ruta correcta
// Si tienes un servicio para llamar a la API, impórtalo aquí.
// import { getProducts } from '../../services/productService'; 

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulamos la carga de datos (luego lo conectarás con tu fetch a /api/products)
  useEffect(() => {
    fetch('https://localhost:7139/api/products') // ¡Usa el puerto de tu API!
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  const handleAddToCart = (product) => {
    console.log("Agregando al carrito:", product);
    // Aquí iría la lógica de tu Context o Redux para el carrito
  };

  if (loading) return <div className="text-center p-10">Cargando catálogo...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado del Catálogo */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Nuestros Productos</h1>
        
        {/* Aquí podrías poner un Select para ordenar por precio */}
        <select className="border p-2 rounded">
            <option>Ordenar por...</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
        </select>
      </div>

      {/* Grilla de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAdd={handleAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;