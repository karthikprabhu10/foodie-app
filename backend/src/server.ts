import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import restaurantRoutes from './routes/restaurantRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS Configuration for Production
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend-name.vercel.app', // We'll update this later
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now
    }
  },
  credentials: true
}));

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

app.use('/api/restaurants', restaurantRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});