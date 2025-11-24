import Button from '../../shared/components/Button';

function StoreProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-gray-200 aspect-square rounded-md flex items-center justify-center text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold text-lg">${product.currentUnitPrice}</span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold">-</button>
          <span className="text-sm font-medium">0</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold">+</button>
          <Button size="sm" className="ml-2">Agregar</Button>
        </div>
      </div>
    </div>
  );
}

export default StoreProductCard;
