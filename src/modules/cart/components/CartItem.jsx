import Button from '../../shared/components/Button';

function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-100 py-4 last:border-0">
      <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
        <span className="font-bold text-purple-600 sm:hidden block mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
        >
          -
        </button>
        <span className="w-4 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
        >
          +
        </button>
      </div>

      <div className="flex flex-col gap-1 items-center md:flex-row md:items-center">
        <span className="font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <Button
          onClick={() => onRemove(item.id)}
          variant="secondary"
          className="text-red-500 min-md"
        >
          Quitar del carrito
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
