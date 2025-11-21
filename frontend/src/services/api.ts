import axios from 'axios';
import { ApiResponse, RestaurantDetailResponse, Restaurant } from '../types/Restaurant';


const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all restaurants
export const getAllRestaurants = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>('/restaurants');
  return response.data;
};

// Search restaurants
export const searchRestaurants = async (query: string): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>(`/restaurants/search?query=${query}`);
  return response.data;
};

// Filter restaurants
export const filterRestaurants = async (filters: {
  cuisine?: string;
  rating?: number;
  priceRange?: number;
  isVeg?: boolean;
}): Promise<ApiResponse> => {
  const params = new URLSearchParams();
  
  if (filters.cuisine) params.append('cuisine', filters.cuisine);
  if (filters.rating) params.append('rating', filters.rating.toString());
  if (filters.priceRange) params.append('priceRange', filters.priceRange.toString());
  if (filters.isVeg !== undefined) params.append('isVeg', filters.isVeg.toString());

  const response = await api.get<ApiResponse>(`/restaurants/filter?${params.toString()}`);
  return response.data;
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const response = await api.get<RestaurantDetailResponse>(`/restaurants/${id}`);
  return response.data.data;
};

export default api;