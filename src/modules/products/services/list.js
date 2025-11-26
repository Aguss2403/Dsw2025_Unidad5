import { instance } from '../../shared/api/axiosInstance';

export const getProducts = async (search = null, status = null, pageNumber = 1, pageSize = 20) => {
  const params = {
    pageNumber,
    pageSize,
  };

  if (search) params.search = search;

  if (status) params.status = status;

  const queryString = new URLSearchParams(params);

  const response = await instance.get(`api/products/admin?${queryString}`);

  return { data: response.data, error: null };
};