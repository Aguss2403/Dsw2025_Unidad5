import { useState } from 'react';
import Button from '../../shared/components/Button';
import diegoImage from '../../../assets/images/diego.png';
import productImage from '../../../assets/images/product.png';

function StoreProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const isDiego = product.description?.toLowerCase().includes('diego');
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const handleAddToCart = () => {
    if (quantity < 1) {
      alert('Debes seleccionar al menos 1 producto');
      return;
    }

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      existingCart.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.currentUnitPrice,
        quantity: quantity
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show feedback
    alert(`${quantity} ${product.name} agregado(s) al carrito`);
    
    // Reset quantity
    setQuantity(0);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-gray-200 aspect-square rounded-md flex items-center justify-center text-gray-400 overflow-hidden">
        <img 
          src={isDiego ? diegoImage : productImage} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
        
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.description}</p>
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <span className="font-bold text-lg">${product.currentUnitPrice}</span>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
            >
              -
            </button>
            <span className="text-sm font-medium w-8 text-center">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
            >
              +
            </button>
          </div>
          <Button size="xs" onClick={handleAddToCart}>Agregar</Button>
        </div>
      </div>
    </div>
  );
}

export default StoreProductCard;
