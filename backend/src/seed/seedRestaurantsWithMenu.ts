import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from '../models/Restaurant';

dotenv.config();

const restaurantsWithMenu = [
  // Restaurant 1
  {
    name: "Pizza Palace",
    cuisine: ["Italian", "Pizza"],
    rating: 4.5,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    description: "Authentic Italian pizzas with fresh ingredients and traditional recipes.",
    isVeg: false,
    location: "Koramangala, Bangalore",
    menuItems: [
      { name: "Margherita Pizza", description: "Classic tomato sauce, mozzarella, and fresh basil", price: 299, category: "Pizza", isVeg: true, isPopular: true },
      { name: "Pepperoni Pizza", description: "Spicy pepperoni with extra cheese", price: 399, category: "Pizza", isVeg: false, isPopular: true },
      { name: "BBQ Chicken Pizza", description: "Grilled chicken with BBQ sauce and onions", price: 449, category: "Pizza", isVeg: false },
      { name: "Veggie Supreme", description: "Bell peppers, olives, mushrooms, and corn", price: 349, category: "Pizza", isVeg: true },
      { name: "Four Cheese Pizza", description: "Mozzarella, cheddar, parmesan, and gorgonzola", price: 429, category: "Pizza", isVeg: true },
      { name: "Garlic Bread", description: "Crispy bread with garlic butter and herbs", price: 129, category: "Sides", isVeg: true },
      { name: "Cheesy Garlic Bread", description: "Garlic bread topped with melted cheese", price: 159, category: "Sides", isVeg: true },
      { name: "Caesar Salad", description: "Romaine lettuce with Caesar dressing", price: 199, category: "Salads", isVeg: true },
      { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 179, category: "Desserts", isVeg: true },
      { name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center", price: 149, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 2
  {
    name: "Burger Bros",
    cuisine: ["American", "Fast Food"],
    rating: 4.2,
    priceRange: 2,
    deliveryTime: "20-30 mins",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    description: "Juicy gourmet burgers made with premium ingredients.",
    isVeg: false,
    location: "Indiranagar, Bangalore",
    menuItems: [
      { name: "Classic Beef Burger", description: "Juicy beef patty with lettuce and tomato", price: 249, category: "Burgers", isVeg: false, isPopular: true },
      { name: "Chicken Burger", description: "Crispy fried chicken with mayo", price: 229, category: "Burgers", isVeg: false, isPopular: true },
      { name: "Veggie Burger", description: "Plant-based patty with fresh vegetables", price: 199, category: "Burgers", isVeg: true },
      { name: "Bacon Cheeseburger", description: "Double beef with bacon and cheese", price: 349, category: "Burgers", isVeg: false },
      { name: "Fish Burger", description: "Crispy fish fillet with tartar sauce", price: 259, category: "Burgers", isVeg: false },
      { name: "French Fries", description: "Crispy golden fries", price: 99, category: "Sides", isVeg: true },
      { name: "Loaded Fries", description: "Fries with cheese, bacon, jalapeños", price: 179, category: "Sides", isVeg: false },
      { name: "Onion Rings", description: "Crispy battered onion rings", price: 119, category: "Sides", isVeg: true },
      { name: "Chocolate Milkshake", description: "Thick chocolate milkshake", price: 149, category: "Beverages", isVeg: true },
      { name: "Vanilla Milkshake", description: "Classic vanilla milkshake", price: 149, category: "Beverages", isVeg: true }
    ]
  },
  // Restaurant 3
  {
    name: "Sushi Station",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.7,
    priceRange: 3,
    deliveryTime: "40-50 mins",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    description: "Fresh sushi and authentic Japanese cuisine prepared by expert chefs.",
    isVeg: false,
    location: "Whitefield, Bangalore",
    menuItems: [
      { name: "California Roll", description: "Crab, avocado, and cucumber", price: 399, category: "Sushi", isVeg: false, isPopular: true },
      { name: "Spicy Tuna Roll", description: "Fresh tuna with spicy mayo", price: 449, category: "Sushi", isVeg: false, isPopular: true },
      { name: "Salmon Nigiri", description: "Fresh salmon over sushi rice", price: 299, category: "Nigiri", isVeg: false },
      { name: "Vegetable Tempura Roll", description: "Crispy vegetables in tempura", price: 329, category: "Sushi", isVeg: true },
      { name: "Dragon Roll", description: "Eel and cucumber with avocado", price: 549, category: "Sushi", isVeg: false },
      { name: "Miso Soup", description: "Traditional Japanese soup with tofu", price: 129, category: "Soups", isVeg: true },
      { name: "Edamame", description: "Steamed soybeans with sea salt", price: 149, category: "Appetizers", isVeg: true },
      { name: "Chicken Teriyaki", description: "Grilled chicken with teriyaki glaze", price: 379, category: "Mains", isVeg: false },
      { name: "Gyoza", description: "Pan-fried dumplings", price: 199, category: "Appetizers", isVeg: false },
      { name: "Green Tea Ice Cream", description: "Authentic Japanese matcha ice cream", price: 149, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 4
  {
    name: "Veggie Delight",
    cuisine: ["Indian", "Vegetarian"],
    rating: 4.4,
    priceRange: 1,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    description: "Pure vegetarian Indian cuisine with a variety of healthy options.",
    isVeg: true,
    location: "Jayanagar, Bangalore",
    menuItems: [
      { name: "Paneer Butter Masala", description: "Cottage cheese in rich tomato gravy", price: 249, category: "Main Course", isVeg: true, isPopular: true },
      { name: "Dal Makhani", description: "Black lentils with butter and cream", price: 199, category: "Main Course", isVeg: true, isPopular: true },
      { name: "Palak Paneer", description: "Cottage cheese in spinach gravy", price: 229, category: "Main Course", isVeg: true },
      { name: "Veg Biryani", description: "Aromatic rice with mixed vegetables", price: 199, category: "Rice", isVeg: true },
      { name: "Chole Bhature", description: "Spicy chickpeas with fried bread", price: 149, category: "Combo", isVeg: true },
      { name: "Aloo Gobi", description: "Potato and cauliflower curry", price: 169, category: "Main Course", isVeg: true },
      { name: "Tandoori Roti", description: "Whole wheat flatbread", price: 40, category: "Breads", isVeg: true },
      { name: "Garlic Naan", description: "Leavened bread with garlic", price: 60, category: "Breads", isVeg: true },
      { name: "Raita", description: "Yogurt with cucumber and spices", price: 49, category: "Sides", isVeg: true },
      { name: "Gulab Jamun", description: "Sweet milk dumplings", price: 79, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 5
  {
    name: "Taco Town",
    cuisine: ["Mexican", "Fast Food"],
    rating: 4.3,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    description: "Spicy and delicious Mexican tacos, burritos, and nachos.",
    isVeg: false,
    location: "HSR Layout, Bangalore",
    menuItems: [
      { name: "Chicken Tacos", description: "Soft tacos with grilled chicken", price: 249, category: "Tacos", isVeg: false, isPopular: true },
      { name: "Beef Burrito", description: "Large tortilla with seasoned beef", price: 299, category: "Burritos", isVeg: false, isPopular: true },
      { name: "Veggie Tacos", description: "Soft tacos with grilled vegetables", price: 199, category: "Tacos", isVeg: true },
      { name: "Chicken Quesadilla", description: "Grilled tortilla with chicken", price: 279, category: "Quesadillas", isVeg: false },
      { name: "Nachos Supreme", description: "Chips with cheese and salsa", price: 229, category: "Appetizers", isVeg: true },
      { name: "Burrito Bowl", description: "Rice bowl with chicken and toppings", price: 319, category: "Bowls", isVeg: false },
      { name: "Guacamole & Chips", description: "Fresh avocado dip with chips", price: 159, category: "Appetizers", isVeg: true },
      { name: "Mexican Rice", description: "Flavored rice with tomatoes", price: 99, category: "Sides", isVeg: true },
      { name: "Churros", description: "Fried dough with cinnamon", price: 129, category: "Desserts", isVeg: true },
      { name: "Frozen Margarita", description: "Non-alcoholic lime drink", price: 149, category: "Beverages", isVeg: true }
    ]
  },
  // Restaurant 6
  {
    name: "The Biryani House",
    cuisine: ["Indian", "Biryani"],
    rating: 4.6,
    priceRange: 2,
    deliveryTime: "35-45 mins",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    description: "Aromatic biryanis with authentic Hyderabadi flavors.",
    isVeg: false,
    location: "BTM Layout, Bangalore",
    menuItems: [
      { name: "Chicken Biryani", description: "Fragrant rice with tender chicken", price: 299, category: "Biryani", isVeg: false, isPopular: true },
      { name: "Mutton Biryani", description: "Slow-cooked mutton biryani", price: 399, category: "Biryani", isVeg: false, isPopular: true },
      { name: "Veg Biryani", description: "Mixed vegetables with rice", price: 249, category: "Biryani", isVeg: true },
      { name: "Egg Biryani", description: "Boiled eggs with flavored rice", price: 229, category: "Biryani", isVeg: false },
      { name: "Hyderabadi Dum Biryani", description: "Traditional dum-cooked biryani", price: 349, category: "Biryani", isVeg: false },
      { name: "Raita", description: "Cooling yogurt with onions", price: 49, category: "Sides", isVeg: true },
      { name: "Mirchi Ka Salan", description: "Spicy pepper curry", price: 99, category: "Sides", isVeg: true },
      { name: "Double Ka Meetha", description: "Bread pudding with saffron", price: 119, category: "Desserts", isVeg: true },
      { name: "Chicken 65", description: "Spicy fried chicken", price: 199, category: "Appetizers", isVeg: false },
      { name: "Tandoori Chicken", description: "Chargrilled chicken", price: 279, category: "Appetizers", isVeg: false }
    ]
  },
  // Restaurant 7
  {
    name: "Pasta Paradise",
    cuisine: ["Italian", "Pasta"],
    rating: 4.4,
    priceRange: 2,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    description: "Creamy pastas and Italian specialties that melt in your mouth.",
    isVeg: false,
    location: "Malleshwaram, Bangalore",
    menuItems: [
      { name: "Alfredo Pasta", description: "Fettuccine in creamy Alfredo sauce", price: 299, category: "Pasta", isVeg: true, isPopular: true },
      { name: "Arrabiata Pasta", description: "Penne in spicy tomato sauce", price: 279, category: "Pasta", isVeg: true, isPopular: true },
      { name: "Carbonara", description: "Spaghetti with bacon and eggs", price: 329, category: "Pasta", isVeg: false },
      { name: "Pesto Pasta", description: "Linguine with basil pesto", price: 289, category: "Pasta", isVeg: true },
      { name: "Lasagna", description: "Layered pasta with meat sauce", price: 349, category: "Pasta", isVeg: false },
      { name: "Ravioli", description: "Cheese-filled pasta in sauce", price: 319, category: "Pasta", isVeg: true },
      { name: "Bruschetta", description: "Toasted bread with tomatoes", price: 159, category: "Appetizers", isVeg: true },
      { name: "Minestrone Soup", description: "Italian vegetable soup", price: 129, category: "Soups", isVeg: true },
      { name: "Panna Cotta", description: "Italian cream dessert", price: 149, category: "Desserts", isVeg: true },
      { name: "Gelato", description: "Italian ice cream", price: 129, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 8
  {
    name: "Dosa Corner",
    cuisine: ["South Indian", "Breakfast"],
    rating: 4.5,
    priceRange: 1,
    deliveryTime: "20-30 mins",
    imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
    description: "Crispy dosas and authentic South Indian breakfast items.",
    isVeg: true,
    location: "Banashankari, Bangalore",
    menuItems: [
      { name: "Masala Dosa", description: "Crispy crepe with potato filling", price: 89, category: "Dosa", isVeg: true, isPopular: true },
      { name: "Plain Dosa", description: "Thin crispy rice crepe", price: 69, category: "Dosa", isVeg: true },
      { name: "Ghee Roast Dosa", description: "Dosa roasted in pure ghee", price: 99, category: "Dosa", isVeg: true, isPopular: true },
      { name: "Paper Dosa", description: "Extra large thin dosa", price: 109, category: "Dosa", isVeg: true },
      { name: "Onion Rava Dosa", description: "Crispy semolina dosa", price: 119, category: "Dosa", isVeg: true },
      { name: "Idli Sambar", description: "Steamed rice cakes with soup", price: 69, category: "Breakfast", isVeg: true },
      { name: "Vada Sambar", description: "Fried lentil donuts", price: 79, category: "Breakfast", isVeg: true },
      { name: "Upma", description: "Savory semolina porridge", price: 59, category: "Breakfast", isVeg: true },
      { name: "Filter Coffee", description: "Traditional South Indian coffee", price: 39, category: "Beverages", isVeg: true },
      { name: "Kesari", description: "Sweet semolina dessert", price: 49, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 9
  {
    name: "Chinese Wok",
    cuisine: ["Chinese", "Asian"],
    rating: 4.2,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
    description: "Authentic Chinese cuisine with a perfect blend of flavors.",
    isVeg: false,
    location: "Electronic City, Bangalore",
    menuItems: [
      { name: "Veg Fried Rice", description: "Stir-fried rice with vegetables", price: 199, category: "Rice", isVeg: true, isPopular: true },
      { name: "Chicken Fried Rice", description: "Rice with chicken pieces", price: 249, category: "Rice", isVeg: false, isPopular: true },
      { name: "Hakka Noodles", description: "Stir-fried noodles", price: 189, category: "Noodles", isVeg: true },
      { name: "Chicken Noodles", description: "Noodles with chicken", price: 239, category: "Noodles", isVeg: false },
      { name: "Manchurian", description: "Vegetable balls in gravy", price: 209, category: "Main Course", isVeg: true },
      { name: "Chilli Chicken", description: "Spicy chicken with peppers", price: 279, category: "Main Course", isVeg: false },
      { name: "Spring Rolls", description: "Crispy vegetable rolls", price: 149, category: "Appetizers", isVeg: true },
      { name: "Hot & Sour Soup", description: "Spicy and tangy soup", price: 119, category: "Soups", isVeg: true },
      { name: "Honey Chilli Potato", description: "Crispy potatoes in sauce", price: 179, category: "Appetizers", isVeg: true },
      { name: "Date Pancake", description: "Sweet Chinese pancake", price: 129, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 10
  {
    name: "BBQ Nation",
    cuisine: ["Barbecue", "Grill"],
    rating: 4.6,
    priceRange: 3,
    deliveryTime: "40-50 mins",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    description: "Unlimited grilled delicacies and barbecue specialties.",
    isVeg: false,
    location: "MG Road, Bangalore",
    menuItems: [
      { name: "Grilled Chicken Steak", description: "Juicy chicken steak", price: 399, category: "Grills", isVeg: false, isPopular: true },
      { name: "BBQ Chicken Wings", description: "Smoky grilled wings", price: 349, category: "Grills", isVeg: false, isPopular: true },
      { name: "Grilled Fish", description: "Fresh marinated fish", price: 449, category: "Grills", isVeg: false },
      { name: "Tandoori Paneer Tikka", description: "Cottage cheese in tandoor", price: 299, category: "Grills", isVeg: true },
      { name: "Seekh Kebab", description: "Minced meat skewers", price: 329, category: "Grills", isVeg: false },
      { name: "Corn on the Cob", description: "Grilled corn with butter", price: 149, category: "Grills", isVeg: true },
      { name: "Grilled Prawns", description: "Marinated prawns", price: 499, category: "Grills", isVeg: false },
      { name: "Pineapple Tikka", description: "Grilled pineapple", price: 179, category: "Grills", isVeg: true },
      { name: "Grilled Vegetables", description: "Assorted vegetables", price: 249, category: "Grills", isVeg: true },
      { name: "Kulfi", description: "Traditional Indian ice cream", price: 99, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 11
  {
    name: "Cafe Mocha",
    cuisine: ["Cafe", "Continental"],
    rating: 4.3,
    priceRange: 2,
    deliveryTime: "20-30 mins",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    description: "Cozy cafe with great coffee and continental breakfast options.",
    isVeg: true,
    location: "Koramangala, Bangalore",
    menuItems: [
      { name: "Cappuccino", description: "Classic Italian coffee", price: 149, category: "Beverages", isVeg: true, isPopular: true },
      { name: "Latte", description: "Espresso with steamed milk", price: 159, category: "Beverages", isVeg: true, isPopular: true },
      { name: "Americano", description: "Espresso with hot water", price: 129, category: "Beverages", isVeg: true },
      { name: "Cold Brew", description: "Smooth cold coffee", price: 179, category: "Beverages", isVeg: true },
      { name: "Croissant", description: "Buttery French pastry", price: 119, category: "Bakery", isVeg: true },
      { name: "Blueberry Muffin", description: "Fresh blueberry muffin", price: 99, category: "Bakery", isVeg: true },
      { name: "Avocado Toast", description: "Smashed avocado on bread", price: 249, category: "Food", isVeg: true },
      { name: "Club Sandwich", description: "Triple-decker sandwich", price: 229, category: "Food", isVeg: true },
      { name: "Red Velvet Cake", description: "Classic red velvet", price: 189, category: "Desserts", isVeg: true },
      { name: "Cheesecake", description: "New York style cheesecake", price: 199, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 12
  {
    name: "Tandoori Nights",
    cuisine: ["Indian", "North Indian"],
    rating: 4.5,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    description: "Rich North Indian curries and tandoori specialties.",
    isVeg: false,
    location: "Indiranagar, Bangalore",
    menuItems: [
      { name: "Butter Chicken", description: "Creamy tomato curry", price: 329, category: "Main Course", isVeg: false, isPopular: true },
      { name: "Chicken Tikka Masala", description: "Grilled chicken in gravy", price: 319, category: "Main Course", isVeg: false, isPopular: true },
      { name: "Dal Tadka", description: "Yellow lentils with spices", price: 179, category: "Main Course", isVeg: true },
      { name: "Kadai Paneer", description: "Cottage cheese in gravy", price: 259, category: "Main Course", isVeg: true },
      { name: "Tandoori Chicken", description: "Half chicken marinated", price: 349, category: "Tandoor", isVeg: false },
      { name: "Paneer Tikka", description: "Grilled cottage cheese", price: 279, category: "Tandoor", isVeg: true },
      { name: "Butter Naan", description: "Leavened bread with butter", price: 50, category: "Breads", isVeg: true },
      { name: "Laccha Paratha", description: "Layered flatbread", price: 60, category: "Breads", isVeg: true },
      { name: "Jeera Rice", description: "Basmati rice with cumin", price: 149, category: "Rice", isVeg: true },
      { name: "Ras Malai", description: "Sweet cheese dumplings", price: 99, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 13
  {
    name: "Seafood Sensation",
    cuisine: ["Seafood", "Continental"],
    rating: 4.7,
    priceRange: 3,
    deliveryTime: "45-55 mins",
    imageUrl: "https://images.unsplash.com/photo-1559737558-2f5a35f4523e?w=400",
    description: "Fresh seafood prepared with exotic spices and flavors.",
    isVeg: false,
    location: "Whitefield, Bangalore",
    menuItems: [
      { name: "Grilled Salmon", description: "Fresh salmon with lemon", price: 599, category: "Mains", isVeg: false, isPopular: true },
      { name: "Fish and Chips", description: "Battered fish with fries", price: 449, category: "Mains", isVeg: false, isPopular: true },
      { name: "Prawn Curry", description: "Prawns in coconut curry", price: 499, category: "Mains", isVeg: false },
      { name: "Lobster Thermidor", description: "Lobster in cream sauce", price: 799, category: "Mains", isVeg: false },
      { name: "Calamari Rings", description: "Crispy fried squid", price: 379, category: "Appetizers", isVeg: false },
      { name: "Fish Tacos", description: "Grilled fish in tacos", price: 349, category: "Mains", isVeg: false },
      { name: "Seafood Platter", description: "Mixed seafood", price: 699, category: "Mains", isVeg: false },
      { name: "Clam Chowder", description: "Creamy soup with clams", price: 249, category: "Soups", isVeg: false },
      { name: "Garlic Butter Prawns", description: "Prawns in garlic butter", price: 529, category: "Mains", isVeg: false },
      { name: "Lemon Tart", description: "Tangy lemon dessert", price: 159, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 14
  {
    name: "Salad Bar",
    cuisine: ["Healthy", "Salads"],
    rating: 4.4,
    priceRange: 2,
    deliveryTime: "20-25 mins",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    description: "Fresh and healthy salads with customizable toppings.",
    isVeg: true,
    location: "HSR Layout, Bangalore",
    menuItems: [
      { name: "Greek Salad", description: "Feta, olives, and tomatoes", price: 249, category: "Salads", isVeg: true, isPopular: true },
      { name: "Caesar Salad", description: "Romaine with Caesar dressing", price: 229, category: "Salads", isVeg: true, isPopular: true },
      { name: "Quinoa Bowl", description: "Quinoa with roasted vegetables", price: 279, category: "Bowls", isVeg: true },
      { name: "Buddha Bowl", description: "Mixed grains and veggies", price: 299, category: "Bowls", isVeg: true },
      { name: "Fruit Salad", description: "Fresh seasonal fruits", price: 179, category: "Salads", isVeg: true },
      { name: "Coleslaw", description: "Shredded cabbage salad", price: 129, category: "Sides", isVeg: true },
      { name: "Caprese Salad", description: "Tomato, mozzarella, basil", price: 239, category: "Salads", isVeg: true },
      { name: "Tabbouleh", description: "Middle Eastern herb salad", price: 219, category: "Salads", isVeg: true },
      { name: "Protein Power Bowl", description: "High-protein bowl", price: 319, category: "Bowls", isVeg: true },
      { name: "Smoothie Bowl", description: "Acai smoothie bowl", price: 249, category: "Bowls", isVeg: true }
    ]
  },
// Restaurant 15
  {
    name: "Noodle House",
    cuisine: ["Asian", "Noodles"],
    rating: 4.3,
    priceRange: 2,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    description: "Slurpy noodles and Asian delicacies with authentic taste.",
    isVeg: false,
    location: "Marathahalli, Bangalore",
    menuItems: [
      { name: "Pad Thai", description: "Thai stir-fried noodles", price: 279, category: "Noodles", isVeg: false, isPopular: true },
      { name: "Ramen", description: "Japanese noodle soup", price: 329, category: "Noodles", isVeg: false, isPopular: true },
      { name: "Chow Mein", description: "Crispy Chinese noodles", price: 249, category: "Noodles", isVeg: true },
      { name: "Udon Noodles", description: "Thick Japanese noodles", price: 299, category: "Noodles", isVeg: true },
      { name: "Singapore Noodles", description: "Spicy curry noodles", price: 269, category: "Noodles", isVeg: false },
      { name: "Tom Yum Soup", description: "Spicy Thai soup", price: 179, category: "Soups", isVeg: false },
      { name: "Wonton Soup", description: "Dumplings in broth", price: 159, category: "Soups", isVeg: false },
      { name: "Thai Green Curry", description: "Coconut curry", price: 289, category: "Mains", isVeg: true },
      { name: "Prawn Crackers", description: "Crispy prawn snack", price: 99, category: "Appetizers", isVeg: false },
      { name: "Mango Sticky Rice", description: "Thai dessert", price: 149, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 16
  {
    name: "Dessert Dunes",
    cuisine: ["Desserts", "Bakery"],
    rating: 4.8,
    priceRange: 2,
    deliveryTime: "20-30 mins",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    description: "Heavenly desserts, cakes, and pastries to satisfy your sweet tooth.",
    isVeg: true,
    location: "Jayanagar, Bangalore",
    menuItems: [
      { name: "Chocolate Truffle Cake", description: "Rich chocolate cake", price: 449, category: "Cakes", isVeg: true, isPopular: true },
      { name: "Red Velvet Cake", description: "Classic red velvet", price: 399, category: "Cakes", isVeg: true, isPopular: true },
      { name: "Tiramisu", description: "Italian coffee dessert", price: 249, category: "Desserts", isVeg: true },
      { name: "Cheesecake", description: "New York cheesecake", price: 279, category: "Desserts", isVeg: true },
      { name: "Brownie Sundae", description: "Brownie with ice cream", price: 199, category: "Desserts", isVeg: true },
      { name: "Macarons", description: "French macarons (6 pieces)", price: 299, category: "Bakery", isVeg: true },
      { name: "Croissant", description: "Buttery French pastry", price: 129, category: "Bakery", isVeg: true },
      { name: "Apple Pie", description: "Classic apple pie", price: 179, category: "Desserts", isVeg: true },
      { name: "Churros", description: "Spanish fried dough", price: 159, category: "Desserts", isVeg: true },
      { name: "Ice Cream Sundae", description: "3 scoops with toppings", price: 189, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 17
  {
    name: "Kebab Kingdom",
    cuisine: ["Middle Eastern", "Kebabs"],
    rating: 4.5,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400",
    description: "Authentic Middle Eastern kebabs and shawarma wraps.",
    isVeg: false,
    location: "BTM Layout, Bangalore",
    menuItems: [
      { name: "Chicken Shawarma", description: "Wrapped chicken with garlic sauce", price: 179, category: "Wraps", isVeg: false, isPopular: true },
      { name: "Lamb Kebab", description: "Grilled lamb skewers", price: 349, category: "Kebabs", isVeg: false, isPopular: true },
      { name: "Falafel Wrap", description: "Chickpea balls in wrap", price: 159, category: "Wraps", isVeg: true },
      { name: "Chicken Kebab", description: "Grilled chicken skewers", price: 279, category: "Kebabs", isVeg: false },
      { name: "Beef Shawarma", description: "Sliced beef in wrap", price: 199, category: "Wraps", isVeg: false },
      { name: "Hummus", description: "Chickpea dip with pita", price: 149, category: "Appetizers", isVeg: true },
      { name: "Baba Ganoush", description: "Smoky eggplant dip", price: 159, category: "Appetizers", isVeg: true },
      { name: "Tabbouleh", description: "Fresh herb salad", price: 139, category: "Salads", isVeg: true },
      { name: "Pita Bread", description: "Fresh baked pita", price: 49, category: "Breads", isVeg: true },
      { name: "Baklava", description: "Sweet pastry dessert", price: 129, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 18
  {
    name: "Thai Spice",
    cuisine: ["Thai", "Asian"],
    rating: 4.6,
    priceRange: 3,
    deliveryTime: "35-45 mins",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
    description: "Authentic Thai curries and stir-fries with bold flavors.",
    isVeg: false,
    location: "Koramangala, Bangalore",
    menuItems: [
      { name: "Green Curry", description: "Thai green curry with coconut", price: 329, category: "Curries", isVeg: true, isPopular: true },
      { name: "Red Curry", description: "Spicy red curry", price: 339, category: "Curries", isVeg: false, isPopular: true },
      { name: "Pad Thai", description: "Stir-fried rice noodles", price: 289, category: "Noodles", isVeg: false },
      { name: "Tom Yum Soup", description: "Hot and sour soup", price: 199, category: "Soups", isVeg: false },
      { name: "Thai Basil Chicken", description: "Stir-fried with basil", price: 319, category: "Mains", isVeg: false },
      { name: "Spring Rolls", description: "Crispy Thai rolls", price: 169, category: "Appetizers", isVeg: true },
      { name: "Satay Skewers", description: "Grilled with peanut sauce", price: 229, category: "Appetizers", isVeg: false },
      { name: "Thai Fried Rice", description: "Wok-fried jasmine rice", price: 249, category: "Rice", isVeg: true },
      { name: "Mango Sticky Rice", description: "Sweet coconut rice", price: 179, category: "Desserts", isVeg: true },
      { name: "Thai Iced Tea", description: "Sweet milk tea", price: 99, category: "Beverages", isVeg: true }
    ]
  },
  // Restaurant 19
  {
    name: "South Indian Meals",
    cuisine: ["South Indian", "Traditional"],
    rating: 4.7,
    priceRange: 1,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400",
    description: "Traditional South Indian thali with unlimited servings.",
    isVeg: true,
    location: "Banashankari, Bangalore",
    menuItems: [
      { name: "Full Meals Thali", description: "Complete South Indian meal", price: 149, category: "Thali", isVeg: true, isPopular: true },
      { name: "Mini Meals", description: "Smaller portion thali", price: 99, category: "Thali", isVeg: true, isPopular: true },
      { name: "Curd Rice", description: "Rice with yogurt", price: 79, category: "Rice", isVeg: true },
      { name: "Sambar Rice", description: "Rice with lentil soup", price: 89, category: "Rice", isVeg: true },
      { name: "Rasam Rice", description: "Rice with tangy soup", price: 89, category: "Rice", isVeg: true },
      { name: "Lemon Rice", description: "Tangy lemon flavored rice", price: 99, category: "Rice", isVeg: true },
      { name: "Bisibele Bath", description: "Spicy rice with lentils", price: 109, category: "Rice", isVeg: true },
      { name: "Pongal", description: "Rice and lentil dish", price: 89, category: "Breakfast", isVeg: true },
      { name: "Payasam", description: "Sweet milk dessert", price: 59, category: "Desserts", isVeg: true },
      { name: "Buttermilk", description: "Spiced yogurt drink", price: 39, category: "Beverages", isVeg: true }
    ]
  },
  // Restaurant 20
  {
    name: "Sandwich Hub",
    cuisine: ["Fast Food", "Sandwiches"],
    rating: 4.2,
    priceRange: 1,
    deliveryTime: "15-25 mins",
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
    description: "Fresh and filling sandwiches for a quick meal on the go.",
    isVeg: true,
    location: "Malleshwaram, Bangalore",
    menuItems: [
      { name: "Grilled Cheese Sandwich", description: "Melted cheese on toast", price: 129, category: "Sandwiches", isVeg: true, isPopular: true },
      { name: "Club Sandwich", description: "Triple-decker veggie", price: 179, category: "Sandwiches", isVeg: true, isPopular: true },
      { name: "Paneer Tikka Sandwich", description: "Spiced cottage cheese", price: 159, category: "Sandwiches", isVeg: true },
      { name: "Veggie Sub", description: "6-inch veggie submarine", price: 169, category: "Subs", isVeg: true },
      { name: "Cheese Burst Sandwich", description: "Extra cheesy sandwich", price: 189, category: "Sandwiches", isVeg: true },
      { name: "Corn & Spinach Sandwich", description: "Healthy green sandwich", price: 149, category: "Sandwiches", isVeg: true },
      { name: "Mushroom Melt", description: "Mushroom with cheese", price: 169, category: "Sandwiches", isVeg: true },
      { name: "French Fries", description: "Crispy golden fries", price: 99, category: "Sides", isVeg: true },
      { name: "Coleslaw", description: "Creamy cabbage salad", price: 79, category: "Sides", isVeg: true },
      { name: "Iced Tea", description: "Refreshing cold tea", price: 69, category: "Beverages", isVeg: true }
    ]
  },
  // Restaurant 21
  {
    name: "Steakhouse Grill",
    cuisine: ["American", "Steaks"],
    rating: 4.8,
    priceRange: 4,
    deliveryTime: "50-60 mins",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    description: "Premium steaks grilled to perfection with gourmet sides.",
    isVeg: false,
    location: "MG Road, Bangalore",
    menuItems: [
      { name: "Ribeye Steak", description: "12oz prime ribeye", price: 899, category: "Steaks", isVeg: false, isPopular: true },
      { name: "Filet Mignon", description: "8oz tenderloin", price: 999, category: "Steaks", isVeg: false, isPopular: true },
      { name: "T-Bone Steak", description: "16oz bone-in steak", price: 1099, category: "Steaks", isVeg: false },
      { name: "New York Strip", description: "10oz strip steak", price: 849, category: "Steaks", isVeg: false },
      { name: "Grilled Lamb Chops", description: "Herb-crusted lamb", price: 799, category: "Mains", isVeg: false },
      { name: "Lobster Tail", description: "Butter poached lobster", price: 1199, category: "Seafood", isVeg: false },
      { name: "Creamed Spinach", description: "Classic side dish", price: 199, category: "Sides", isVeg: true },
      { name: "Mashed Potatoes", description: "Creamy mashed potatoes", price: 179, category: "Sides", isVeg: true },
      { name: "Caesar Salad", description: "Classic Caesar", price: 249, category: "Salads", isVeg: true },
      { name: "Chocolate Fondant", description: "Molten chocolate cake", price: 299, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 22
  {
    name: "Paneer Paradise",
    cuisine: ["Indian", "Vegetarian"],
    rating: 4.5,
    priceRange: 2,
    deliveryTime: "30-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
    description: "Delicious paneer dishes with rich Indian gravies.",
    isVeg: true,
    location: "Electronic City, Bangalore",
    menuItems: [
      { name: "Paneer Butter Masala", description: "Creamy tomato curry", price: 269, category: "Main Course", isVeg: true, isPopular: true },
      { name: "Kadai Paneer", description: "Spicy bell pepper curry", price: 259, category: "Main Course", isVeg: true, isPopular: true },
      { name: "Palak Paneer", description: "Spinach gravy", price: 249, category: "Main Course", isVeg: true },
      { name: "Shahi Paneer", description: "Royal creamy curry", price: 279, category: "Main Course", isVeg: true },
      { name: "Paneer Tikka", description: "Grilled cottage cheese", price: 229, category: "Starters", isVeg: true },
      { name: "Paneer Bhurji", description: "Scrambled paneer", price: 219, category: "Main Course", isVeg: true },
      { name: "Paneer Paratha", description: "Stuffed flatbread", price: 99, category: "Breads", isVeg: true },
      { name: "Paneer Biryani", description: "Flavored rice with paneer", price: 249, category: "Rice", isVeg: true },
      { name: "Jeera Rice", description: "Cumin flavored rice", price: 129, category: "Rice", isVeg: true },
      { name: "Rasmalai", description: "Sweet cheese dessert", price: 99, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 23
  {
    name: "Ramen Bowl",
    cuisine: ["Japanese", "Ramen"],
    rating: 4.6,
    priceRange: 2,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400",
    description: "Authentic Japanese ramen with flavorful broths and toppings.",
    isVeg: false,
    location: "Whitefield, Bangalore",
    menuItems: [
      { name: "Tonkotsu Ramen", description: "Pork bone broth ramen", price: 349, category: "Ramen", isVeg: false, isPopular: true },
      { name: "Shoyu Ramen", description: "Soy sauce based ramen", price: 329, category: "Ramen", isVeg: false, isPopular: true },
      { name: "Miso Ramen", description: "Miso paste broth", price: 339, category: "Ramen", isVeg: true },
      { name: "Spicy Ramen", description: "Hot and spicy broth", price: 359, category: "Ramen", isVeg: false },
      { name: "Vegetable Ramen", description: "Veggie broth noodles", price: 299, category: "Ramen", isVeg: true },
      { name: "Chicken Karaage", description: "Japanese fried chicken", price: 229, category: "Appetizers", isVeg: false },
      { name: "Gyoza", description: "Pan-fried dumplings", price: 189, category: "Appetizers", isVeg: false },
      { name: "Edamame", description: "Salted soybeans", price: 129, category: "Appetizers", isVeg: true },
      { name: "Takoyaki", description: "Octopus balls", price: 199, category: "Appetizers", isVeg: false },
      { name: "Matcha Ice Cream", description: "Green tea ice cream", price: 129, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 24
  {
    name: "Falafel Factory",
    cuisine: ["Middle Eastern", "Vegetarian"],
    rating: 4.4,
    priceRange: 2,
    deliveryTime: "25-35 mins",
    imageUrl: "https://images.unsplash.com/photo-1593030668069-d59e67c5423e?w=400",
    description: "Crispy falafels and fresh Mediterranean vegetarian delights.",
    isVeg: true,
    location: "HSR Layout, Bangalore",
    menuItems: [
      { name: "Falafel Wrap", description: "Crispy falafel in pita", price: 179, category: "Wraps", isVeg: true, isPopular: true },
      { name: "Falafel Plate", description: "Falafel with sides", price: 229, category: "Mains", isVeg: true, isPopular: true },
      { name: "Hummus Bowl", description: "Creamy chickpea dip", price: 159, category: "Bowls", isVeg: true },
      { name: "Falafel Salad", description: "Falafel on fresh greens", price: 199, category: "Salads", isVeg: true },
      { name: "Mezze Platter", description: "Assorted dips and pita", price: 299, category: "Platters", isVeg: true },
      { name: "Stuffed Grape Leaves", description: "Rice-stuffed dolmas", price: 169, category: "Appetizers", isVeg: true },
      { name: "Fattoush Salad", description: "Lebanese salad", price: 179, category: "Salads", isVeg: true },
      { name: "Pita Chips", description: "Baked pita crisps", price: 99, category: "Sides", isVeg: true },
      { name: "Lemonade", description: "Fresh squeezed lemon", price: 79, category: "Beverages", isVeg: true },
      { name: "Baklava", description: "Sweet nut pastry", price: 129, category: "Desserts", isVeg: true }
    ]
  },
  // Restaurant 25
  {
    name: "Ice Cream Avenue",
    cuisine: ["Desserts", "Ice Cream"],
    rating: 4.9,
    priceRange: 1,
    deliveryTime: "15-20 mins",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
    description: "Creamy ice creams in a variety of exotic and classic flavors.",
    isVeg: true,
    location: "Indiranagar, Bangalore",
    menuItems: [
      { name: "Belgian Chocolate", description: "Rich chocolate ice cream", price: 129, category: "Ice Cream", isVeg: true, isPopular: true },
      { name: "Vanilla Bean", description: "Classic vanilla", price: 99, category: "Ice Cream", isVeg: true, isPopular: true },
      { name: "Strawberry Swirl", description: "Fresh strawberry", price: 119, category: "Ice Cream", isVeg: true },
      { name: "Mango Madness", description: "Alphonso mango flavor", price: 139, category: "Ice Cream", isVeg: true },
      { name: "Butterscotch Crunch", description: "Crunchy butterscotch", price: 119, category: "Ice Cream", isVeg: true },
      { name: "Sundae Supreme", description: "3 scoops with toppings", price: 199, category: "Sundaes", isVeg: true },
      { name: "Banana Split", description: "Classic banana split", price: 229, category: "Sundaes", isVeg: true },
      { name: "Milkshake", description: "Thick ice cream shake", price: 149, category: "Beverages", isVeg: true },
      { name: "Waffle Cone", description: "Fresh baked cone", price: 29, category: "Add-ons", isVeg: true },
      { name: "Hot Fudge Sauce", description: "Warm chocolate sauce", price: 49, category: "Add-ons", isVeg: true }
    ]
  },
  // Restaurant 26
  {
    name: "Korean BBQ House",
    cuisine: ["Korean", "Barbecue"],
    rating: 4.7,
    priceRange: 3,
    deliveryTime: "40-50 mins",
    imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
    description: "Authentic Korean BBQ with marinated meats and banchan sides.",
    isVeg: false,
    location: "Koramangala, Bangalore",
    menuItems: [
      { name: "Bulgogi", description: "Marinated beef slices", price: 449, category: "BBQ", isVeg: false, isPopular: true },
      { name: "Samgyeopsal", description: "Grilled pork belly", price: 399, category: "BBQ", isVeg: false, isPopular: true },
      { name: "Dakgalbi", description: "Spicy chicken", price: 379, category: "BBQ", isVeg: false },
      { name: "Bibimbap", description: "Mixed rice bowl", price: 299, category: "Rice", isVeg: true },
      { name: "Kimchi Jjigae", description: "Kimchi stew", price: 279, category: "Soups", isVeg: false },
      { name: "Japchae", description: "Glass noodles", price: 259, category: "Noodles", isVeg: true },
      { name: "Kimchi", description: "Fermented vegetables", price: 99, category: "Sides", isVeg: true },
      { name: "Tteokbokki", description: "Spicy rice cakes", price: 199, category: "Sides", isVeg: true },
      { name: "Korean Fried Chicken", description: "Crispy fried chicken", price: 349, category: "Mains", isVeg: false },
      { name: "Bingsu", description: "Shaved ice dessert", price: 199, category: "Desserts", isVeg: true }
    ]
  },
];

const seedRestaurants = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || '';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected!');

    await Restaurant.deleteMany({});
    console.log('🗑️  Cleared existing restaurants');

    await Restaurant.insertMany(restaurantsWithMenu);
    console.log(`✅ Successfully added ${restaurantsWithMenu.length} restaurants with menu items!`);

    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedRestaurants();