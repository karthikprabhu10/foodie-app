export interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  isPopular?: boolean;
  imageUrl?: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  cuisine: string[];
  rating: number;
  priceRange: number;
  deliveryTime: string;
  imageUrl: string;
  description: string;
  isVeg: boolean;
  location: string;
  menuItems?: MenuItem[];
  createdAt: string;
}

export interface ApiResponse {
  success: boolean;
  count: number;
  data: Restaurant[];
}