import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import restaurantRoutes from './routes/restaurantRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Foodie API is running! 🍕',
    status: 'Server is healthy',
    endpoints: {
      restaurants: '/api/restaurants',
      search: '/api/restaurants/search?query=pizza',
      filter: '/api/restaurants/filter?cuisine=Italian',
    }
  });
});

// API Routes
app.use('/api/restaurants', restaurantRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});