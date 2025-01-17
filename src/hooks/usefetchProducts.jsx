import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchProducts = (baseUrl) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange,setDateRange] = useState({
    'first_date':null,
    'last_date':null
  })
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/products`);
        const sortedProducts = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setProducts(sortedProducts);
        setDateRange((prev)=>({
          ...prev,
          "first_date":sortedProducts[0].date,
          "last_date":sortedProducts[sortedProducts.length - 1].date
        }))
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [baseUrl]);

  return { products,dateRange, loading };
};