import { instance } from '../../shared/api/axiosInstance';

export const getStoreProducts = async (search = null, pageNumber = 1, pageSize = 20) => {
  const params = {
    pageNumber,
    pageSize,
  };

  if (search) params.search = search;

  params.status = 'enabled';

  const queryString = new URLSearchParams(params);

  const response = await instance.get(`api/products?${queryString}`);

  return { data: response.data, error: null };
};
