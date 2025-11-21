import React, { useState } from 'react';
import '../styles/FilterBar.css';

interface FilterBarProps {
  onFilter: (filters: FilterOptions) => void;
  onReset: () => void;
}

export interface FilterOptions {
  cuisine?: string;
  rating?: number;
  priceRange?: number;
  isVeg?: boolean;
}

// SVG Filter Icon Component
const FilterIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// SVG Close Icon Component
const CloseIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const FilterBar: React.FC<FilterBarProps> = ({ onFilter, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cuisine, setCuisine] = useState('');
  const [rating, setRating] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [isVeg, setIsVeg] = useState<boolean | undefined>(undefined);

  const cuisineOptions = [
    'Italian', 'Indian', 'Chinese', 'Japanese', 'Mexican',
    'American', 'Thai', 'Middle Eastern', 'South Indian'
  ];

  const handleApplyFilters = () => {
    const filters: FilterOptions = {};
    
    if (cuisine) filters.cuisine = cuisine;
    if (rating) filters.rating = parseFloat(rating);
    if (priceRange) filters.priceRange = parseInt(priceRange);
    if (isVeg !== undefined) filters.isVeg = isVeg;

    onFilter(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setCuisine('');
    setRating('');
    setPriceRange('');
    setIsVeg(undefined);
    onReset();
    setIsOpen(false);
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const hasActiveFilters = cuisine || rating || priceRange || isVeg !== undefined;

  return (
    <div className="filter-container">
      <button 
        onClick={toggleFilter} 
        className={`filter-toggle-button ${hasActiveFilters ? 'has-filters' : ''}`}
      >
        <FilterIcon size={20} />
        <span>Filters</span>
        {hasActiveFilters && <span className="filter-badge">●</span>}
      </button>

      {isOpen && (
        <>
          <div className="filter-overlay" onClick={() => setIsOpen(false)}></div>
          
          <div className={`filter-bar ${isOpen ? 'open' : ''}`}>
            <div className="filter-header">
              <h3 className="filter-title">
                <FilterIcon size={22} />
                Filters
              </h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="close-filter-button"
                aria-label="Close filters"
              >
                <CloseIcon size={24} />
              </button>
            </div>
            
            <div className="filter-content">
              <div className="filter-section">
                <label className="filter-label">Cuisine Type</label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Cuisines</option>
                  {cuisineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-section">
                <label className="filter-label">Minimum Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ ★</option>
                  <option value="4.0">4.0+ ★</option>
                  <option value="3.5">3.5+ ★</option>
                </select>
              </div>

              <div className="filter-section">
                <label className="filter-label">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Any Price</option>
                  <option value="1">₹ - Budget</option>
                  <option value="2">₹₹ - Moderate</option>
                  <option value="3">₹₹₹ - Expensive</option>
                  <option value="4">₹₹₹₹ - Premium</option>
                </select>
              </div>

              <div className="filter-section">
                <label className="filter-label">Food Type</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="vegOption"
                      checked={isVeg === undefined}
                      onChange={() => setIsVeg(undefined)}
                    />
                    <span>All</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="vegOption"
                      checked={isVeg === true}
                      onChange={() => setIsVeg(true)}
                    />
                    <span>🌱 Veg Only</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="vegOption"
                      checked={isVeg === false}
                      onChange={() => setIsVeg(false)}
                    />
                    <span>Non-Veg</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="filter-buttons">
              <button onClick={handleApplyFilters} className="apply-button">
                Apply Filters
              </button>
              <button onClick={handleReset} className="reset-button">
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterBar;