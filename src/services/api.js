import axios from 'axios';

export const fetchProducts = async (baseUrl) => {
  const response = await axios.get(`${baseUrl}api/products`);
  return response.data;
};