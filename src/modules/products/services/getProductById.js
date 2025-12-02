import { instance } from '../../shared/api/axiosInstance';

export const getProductById = async (id) => {
  try {
    const response = await instance.get(`api/products/${id}`);

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};
