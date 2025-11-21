import mongoose, { Document, Schema } from 'mongoose';

// Define MenuItem interface
export interface IMenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  isPopular?: boolean;
  imageUrl?: string;
}

// Define TypeScript interface for Restaurant
export interface IRestaurant extends Document {
  name: string;
  cuisine: string[];
  rating: number;
  priceRange: number;
  deliveryTime: string;
  imageUrl: string;
  description: string;
  isVeg: boolean;
  location: string;
  menuItems: IMenuItem[];
  createdAt: Date;
}

// Define MenuItem Schema
const MenuItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
  },
});

// Define Mongoose Schema
const RestaurantSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
  },
  cuisine: {
    type: [String],
    required: [true, 'At least one cuisine type is required'],
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  priceRange: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
    default: 2,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: true,
  },
  menuItems: {
    type: [MenuItemSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);