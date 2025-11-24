import { createContext, useState, useEffect } from "react";

// 1. Creamos el contexto
export const CartContext = createContext();

// 2. Creamos el componente Provider (la "nube" de datos)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Inicialización perezosa: leemos localStorage solo una vez al inicio
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  });

  const [total, setTotal] = useState(0);

  // Efecto para calcular el total y guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    const calcTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(calcTotal);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- FUNCIONES (ACCIONES) ---

  // Agrega item
  const addItem = (product, quantity) => {
    setCartItems((currentItems) => {
      // ¿El producto ya existe en el carrito?
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Si existe, actualizamos la cantidad de forma INMUTABLE
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
        return newItems;
      } else {
        // Si no existe, lo agregamos
        // Aseguramos que quantity no venga en 'product' para evitar duplicación futura
        const { quantity: _, ...productWithoutQuantity } = product;
        return [...currentItems, { ...productWithoutQuantity, quantity }];
      }
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
