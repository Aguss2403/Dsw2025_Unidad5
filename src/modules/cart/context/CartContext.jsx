import { createContext, useState, useEffect } from "react";
import { createOrder } from "../services/createOrder";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");

      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      {
        console.log(error);
      }

      return [];
    }
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calcTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotal(calcTotal);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product, quantity) => {
    setCartItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        const newItems = [...currentItems];

        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };

        return newItems;
      } else {
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

  const checkout = async (customerId, notes = "") => {
    if (cartItems.length === 0)
      return { error: { message: "El carrito está vacío" } };

    const idToUse = customerId || localStorage.getItem("customerId");

    if (!idToUse) {
      return {
        error: {
          message: "Usuario no autenticado o ID de cliente no encontrado",
        },
      };
    }

    const orderPayload = {
      customerId: idToUse,
      notes,
      orderItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    const { data, error } = await createOrder(orderPayload);

    if (!error) {
      clearCart();
    }

    return { data, error };
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
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
