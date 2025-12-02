import { instance } from '../../shared/api/axiosInstance';

export const updateProduct = async (product) => {
  const response = await instance.put(`api/products/${product.id}`, {
    sku: product.sku,
    internalCode: product.internalCode,
    name: product.name,
    description: product.description,
    currentUnitPrice: product.currentUnitPrice,
    stockQuantity: product.stockQuantity,
    isActive: product.isActive,
  });

  return { data: response.data, error: null };
};