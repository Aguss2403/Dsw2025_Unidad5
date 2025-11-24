import { instance } from '../../shared/api/axiosInstance';

export const register = async (username, email, password) => {
  const response = await instance.post('api/auth/register', { username, email, password });

  return { data: response.data, error: null };
};
