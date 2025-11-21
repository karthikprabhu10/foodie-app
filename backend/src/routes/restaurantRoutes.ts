import express from 'express';
import {
  getAllRestaurants,
  searchRestaurants,
  filterRestaurants,
  getRestaurantById,
  getRestaurantMenu,
} from '../controllers/restaurantController';

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/search', searchRestaurants);
router.get('/filter', filterRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/menu', getRestaurantMenu); // New route

export default router;