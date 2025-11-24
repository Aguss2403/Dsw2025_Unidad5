import { useEffect, useState } from 'react';  
import Card from '../../shared/components/Card';
import { getProducts } from '../../products/services/list';
import { listOrders } from '../../orders/services/listOrders';

function Home() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productsResponse = await getProducts();
      if (productsResponse.data) {
        setProductsCount(productsResponse.data.total);
      }

      const ordersResponse = await listOrders();
      if (ordersResponse.data) {
        setOrdersCount(ordersResponse.data.length);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className='flex flex-col gap-3 sm:grid sm:grid-cols-2'
    >
      <Card>
        <h3>Productos</h3>
        <p>Cantidad: {productsCount}</p>
      </Card>

      <Card>
        <h3>Ordenes</h3>
        <p>Cantidad: {ordersCount}</p>
      </Card>
    </div>
  );
};

export default Home;
