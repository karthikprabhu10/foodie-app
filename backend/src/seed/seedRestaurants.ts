import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from '../models/Restaurant';

dotenv.config();

const restaurants = [
  {
    name: "Pizza Palace",
    cuisine: ["Italian", "Pizza"],
    rating: 4.5,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    description: "Authentic Italian pizzas with fresh ingredients and traditional recipes.",
    isVeg: false,
    location: "Koramangala, Bangalore"
  },
  {
    name: "Burger Bros",
    cuisine: ["American", "Fast Food"],
    rating: 4.2,
    priceRange: 2,
    deliveryTime: "20-30 mins",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    description: "Juicy gourmet burgers made with premium ingredients.",
    isVeg: false,
    location: "Indiranagar, Bangalore"
  },
  {
    name: "Sushi Station",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.7,
    priceRange: 3,
    deliveryTime: "40-50 mins",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    description: "Fresh sushi and authentic Japanese cuisine prepared by expert chefs.",
    isVeg: false,
    location: "Whitefield, Bangalore"
  },
  {
    name: "Veggie Delight",
    cuisine: ["Indian", "Vegetarian"],
    rating: 4.4,
    priceRange: 1,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    description: "Pure vegetarian Indian cuisine with a variety of healthy options.",
    isVeg: true,
    location: "Jayanagar, Bangalore"
  },
  {
    name: "Taco Town",
    cuisine: ["Mexican", "Fast Food"],
    rating: 4.3,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    description: "Spicy and delicious Mexican tacos, burritos, and nachos.",
    isVeg: false,
    location: "HSR Layout, Bangalore"
  },
  {
    name: "The Biryani House",
    cuisine: ["Indian", "Biryani"],
    rating: 4.6,
    priceRange: 2,
    deliveryTime: "35-45 mins",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    description: "Aromatic biryanis with authentic Hyderabadi flavors.",
    isVeg: false,
    location: "BTM Layout, Bangalore"
  },
  {
    name: "Pasta Paradise",
    cuisine: ["Italian", "Pasta"],
    rating: 4.4,
    priceRange: 2,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    description: "Creamy pastas and Italian specialties that melt in your mouth.",
    isVeg: false,
    location: "Malleshwaram, Bangalore"
  },
  {
    name: "Dosa Corner",
    cuisine: ["South Indian", "Breakfast"],
    rating: 4.5,
    priceRange: 1,
    deliveryTime: "20-30 mins",
    imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
    description: "Crispy dosas and authentic South Indian breakfast items.",
    isVeg: true,
    location: "Banashankari, Bangalore"
  },
  {
    name: "Chinese Wok",
    cuisine: ["Chinese", "Asian"],
    rating: 4.2,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
    description: "Authentic Chinese cuisine with a perfect blend of flavors.",
    isVeg: false,
    location: "Electronic City, Bangalore"
  },
  {
    name: "BBQ Nation",
    cuisine: ["Barbecue", "Grill"],
    rating: 4.6,
    priceRange: 3,
    deliveryTime: "40-50 mins",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    description: "Unlimited grilled delicacies and barbecue specialties.",
    isVeg: false,
    location: "MG Road, Bangalore"
  },
  {
    name: "Cafe Mocha",
    cuisine: ["Cafe", "Continental"],
    rating: 4.3,
    priceRange: 2,
    deliveryTime: "20-30 mins",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    description: "Cozy cafe with great coffee and continental breakfast options.",
    isVeg: true,
    location: "Koramangala, Bangalore"
  },
  {
    name: "Tandoori Nights",
    cuisine: ["Indian", "North Indian"],
    rating: 4.5,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    description: "Rich North Indian curries and tandoori specialties.",
    isVeg: false,
    location: "Indiranagar, Bangalore"
  },
  {
    name: "Seafood Sensation",
    cuisine: ["Seafood", "Continental"],
    rating: 4.7,
    priceRange: 3,
    deliveryTime: "45-55 mins",
    imageUrl: "https://images.unsplash.com/photo-1559737558-2f5a35f4523e?w=400",
    description: "Fresh seafood prepared with exotic spices and flavors.",
    isVeg: false,
    location: "Whitefield, Bangalore"
  },
  {
    name: "Salad Bar",
    cuisine: ["Healthy", "Salads"],
    rating: 4.4,
    priceRange: 2,
    deliveryTime: "20-25 mins",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    description: "Fresh and healthy salads with customizable toppings.",
    isVeg: true,
    location: "HSR Layout, Bangalore"
  },
  {
    name: "Noodle House",
    cuisine: ["Asian", "Noodles"],
    rating: 4.3,
    priceRange: 2,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    description: "Slurpy noodles and Asian delicacies with authentic taste.",
    isVeg: false,
    location: "Marathahalli, Bangalore"
  },
  {
    name: "Dessert Dunes",
    cuisine: ["Desserts", "Bakery"],
    rating: 4.8,
    priceRange: 2,
    deliveryTime: "20-30 mins",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    description: "Heavenly desserts, cakes, and pastries to satisfy your sweet tooth.",
    isVeg: true,
    location: "Jayanagar, Bangalore"
  },
  {
    name: "Kebab Kingdom",
    cuisine: ["Middle Eastern", "Kebabs"],
    rating: 4.5,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400",
    description: "Authentic Middle Eastern kebabs and shawarma wraps.",
    isVeg: false,
    location: "BTM Layout, Bangalore"
  },
  {
    name: "Thai Spice",
    cuisine: ["Thai", "Asian"],
    rating: 4.6,
    priceRange: 3,
    deliveryTime: "35-45 mins",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
    description: "Authentic Thai curries and stir-fries with bold flavors.",
    isVeg: false,
    location: "Koramangala, Bangalore"
  },
  {
    name: "South Indian Meals",
    cuisine: ["South Indian", "Traditional"],
    rating: 4.7,
    priceRange: 1,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400",
    description: "Traditional South Indian thali with unlimited servings.",
    isVeg: true,
    location: "Banashankari, Bangalore"
  },
  {
    name: "Sandwich Hub",
    cuisine: ["Fast Food", "Sandwiches"],
    rating: 4.2,
    priceRange: 1,
    deliveryTime: "15-25 mins",
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
    description: "Fresh and filling sandwiches for a quick meal on the go.",
    isVeg: true,
    location: "Malleshwaram, Bangalore"
  },
  {
    name: "Steakhouse Grill",
    cuisine: ["American", "Steaks"],
    rating: 4.8,
    priceRange: 4,
    deliveryTime: "50-60 mins",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    description: "Premium steaks grilled to perfection with gourmet sides.",
    isVeg: false,
    location: "MG Road, Bangalore"
  },
  {
    name: "Paneer Paradise",
    cuisine: ["Indian", "Vegetarian"],
    rating: 4.5,
    priceRange: 2,
    deliveryTime: "30-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
    description: "Delicious paneer dishes with rich Indian gravies.",
    isVeg: true,
    location: "Electronic City, Bangalore"
  },
  {
    name: "Ramen Bowl",
    cuisine: ["Japanese", "Ramen"],
    rating: 4.6,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400",
    description: "Authentic Japanese ramen with flavorful broths and toppings.",
    isVeg: false,
    location: "Whitefield, Bangalore"
  },
  {
    name: "Falafel Factory",
    cuisine: ["Middle Eastern", "Vegetarian"],
    rating: 4.4,
    priceRange: 2,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1593030668069-d59e67c5423e?w=400",
    description: "Crispy falafels and fresh Mediterranean vegetarian delights.",
    isVeg: true,
    location: "HSR Layout, Bangalore"
  },
  {
    name: "Ice Cream Avenue",
    cuisine: ["Desserts", "Ice Cream"],
    rating: 4.9,
    priceRange: 1,
    deliveryTime: "15-20 mins",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
    description: "Creamy ice creams in a variety of exotic and classic flavors.",
    isVeg: true,
    location: "Indiranagar, Bangalore"
  }
];

const seedRestaurants = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || '';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected!');

    // Clear existing restaurants
    await Restaurant.deleteMany({});
    console.log('🗑️  Cleared existing restaurants');

    // Insert new restaurants
    await Restaurant.insertMany(restaurants);
    console.log(`✅ Successfully added ${restaurants.length} restaurants!`);

    // Close connection
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedRestaurants();