import { instance } from '../../shared/api/axiosInstance';

export const register = async (userData) => {
  const response = await instance.post('api/auth/register', userData);

  return { data: response.data, error: null };
};