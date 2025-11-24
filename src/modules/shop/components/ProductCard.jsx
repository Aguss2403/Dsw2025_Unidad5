import React from 'react';
import Card from '../../shared/components/Card';

const ProductCard = ({ product, onAdd }) => {
  return (
    // Usamos el componente Card genérico para un estilo consistente.
    <Card className="flex flex-col h-full justify-between hover:shadow-lg transition-shadow duration-300">

      {/* Sección de la Imagen del Producto */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
        {/* TODO: Reemplazar el SVG con una etiqueta <img> cuando las imágenes estén disponibles desde el backend */}
        {/* <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" /> */}
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      </div>

      {/* Sección de Información del Producto */}
      <div className="mb-4">
        <h3 className="font-bold text-lg text-gray-800">{product.name || "Nombre del producto"}</h3>
        <p className="text-gray-500 text-sm">Stock: {product.stockQuantity}</p>
      </div>

      {/* Footer de la Card: Precio y Controles */}
      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold text-xl text-gray-900">${product.currentUnitPrice}</span>

        <div className="flex items-center gap-2">
          {/* TODO: Implementar la lógica para el control de cantidad */}
          <div className="flex items-center border rounded-md">
            <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
            <span className="px-2 text-sm">1</span>
            <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
          </div>

          {/* Botón para agregar el producto al carrito */}
          <button
            onClick={() => onAdd(product)}
            className="bg-purple-200 text-purple-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-300 transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>

    </Card>
  );
};

export default ProductCard;