// src/services/api.ts
import axios from 'axios';
import { Product } from '../types';

export const API_BASE_URL = 'https://backend-api-8egu.onrender.com';

export async function fetchProducts(): Promise<Product[]> {
  const res = await axios.get(`${API_BASE_URL}/api/product`);
  const data = res.data?.payload?.products ?? res.data ?? [];
  
  return data;
}
