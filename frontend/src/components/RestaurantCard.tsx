import React from 'react';
import { Restaurant } from '../types/Restaurant';
import '../styles/RestaurantCard.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const StarIcon = () => (
    <svg
      className="star-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l3.09 6.26 6.91.99-5 4.87L18.18 22 12 18.56 5.82 22 7 14.12l-5-4.87 6.91-.99L12 2z" />
    </svg>
  );

  // Generate price range symbols
  const getPriceRange = (range: number) => {
    return '₹'.repeat(range);
  };

  const ClockIcon = () => (
    <svg
      className="meta-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const LocationIcon = () => (
    <svg
      className="meta-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  const renderStars = (rating: number) => {
    const totalStars = Math.floor(rating);
    return Array.from({ length: totalStars }, (_, index) => (
      <StarIcon key={index} />
    ));
  };

  return (
    <div className="restaurant-card">
      <div className="restaurant-image">
        <img src={restaurant.imageUrl} alt={restaurant.name} />
        {restaurant.isVeg && (
          <span className="veg-badge">🌱 Pure Veg</span>
        )}
      </div>
      
      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        
        <div className="restaurant-meta">
          <span className="rating">
            <span className="rating-stars">{renderStars(restaurant.rating)}</span>
            <span className="rating-value">{restaurant.rating.toFixed(1)}</span>
          </span>
          <span className="price-range">{getPriceRange(restaurant.priceRange)}</span>
          <span className="delivery-time">
            <ClockIcon />
            {restaurant.deliveryTime}
          </span>
        </div>
        
        <div className="cuisine-tags">
          {restaurant.cuisine.map((item, index) => (
            <span key={index} className="cuisine-tag">
              {item}
            </span>
          ))}
        </div>
        
        <p className="restaurant-description">{restaurant.description}</p>
        
        <div className="restaurant-footer">
          <span className="location">
            <LocationIcon />
            {restaurant.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;