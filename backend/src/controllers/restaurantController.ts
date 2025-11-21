import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';

// Get all restaurants
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find().sort({ rating: -1 });
    
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Search restaurants
export const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // case-insensitive search
        { cuisine: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Filter restaurants
export const filterRestaurants = async (req: Request, res: Response) => {
  try {
    const { cuisine, rating, priceRange, isVeg } = req.query;

    // Build filter object
    const filter: any = {};

    if (cuisine) {
      filter.cuisine = { $in: [cuisine] };
    }

    if (rating) {
      filter.rating = { $gte: parseFloat(rating as string) };
    }

    if (priceRange) {
      filter.priceRange = parseInt(priceRange as string);
    }

    if (isVeg !== undefined) {
      filter.isVeg = isVeg === 'true';
    }

    const restaurants = await Restaurant.find(filter).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get single restaurant by ID
export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get restaurant menu
export const getRestaurantMenu = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        restaurantName: restaurant.name,
        menuItems: restaurant.menuItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};