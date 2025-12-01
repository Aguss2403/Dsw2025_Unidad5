import { instance } from '../../shared/api/axiosInstance';

export const getOrderById = async (id) => {
  try {
    const response = await instance.get(`api/orders/${id}`);

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
