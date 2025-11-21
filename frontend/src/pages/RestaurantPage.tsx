import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Restaurant, MenuItem } from '../types/Restaurant';
import { getRestaurantById } from '../services/api';
import '../styles/RestaurantPage.css';

interface MenuFilters {
  category: string;
  dietary: 'all' | 'veg' | 'non-veg';
  priceSort: 'none' | 'low-to-high' | 'high-to-low';
  popularOnly: boolean;
}

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<MenuFilters>({
    category: 'all',
    dietary: 'all',
    priceSort: 'none',
    popularOnly: false,
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError('');
        const data = await getRestaurantById(id);
        setRestaurant(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load restaurant. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  // Get all unique categories
  const categories = useMemo(() => {
    if (!restaurant?.menuItems) return [];
    const cats = new Set(restaurant.menuItems.map(item => item.category));
    return Array.from(cats).sort();
  }, [restaurant]);

  // Filter and sort menu items
  const filteredMenuItems = useMemo(() => {
    if (!restaurant?.menuItems) return [];
    let items: MenuItem[] = [...restaurant.menuItems];
    if (filters.dietary !== 'all') {
      items = items.filter(item => 
        filters.dietary === 'veg' ? item.isVeg : !item.isVeg
      );
    }
    if (filters.popularOnly) {
      items = items.filter(item => item.isPopular);
    }
    if (filters.priceSort !== 'none') {
      items = [...items].sort((a, b) => 
        filters.priceSort === 'low-to-high' ? a.price - b.price : b.price - a.price
      );
    }
    return items;
  }, [restaurant, filters]);

  // Group filtered items by category
  const menuByCategory = useMemo(() => {
    if (filteredMenuItems.length === 0) return {};
    let grouped = filteredMenuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
    if (filters.category !== 'all') {
      const filtered: Record<string, MenuItem[]> = {};
      if (grouped[filters.category]) {
        filtered[filters.category] = grouped[filters.category];
      }
      return filtered;
    }
    return grouped;
  }, [filteredMenuItems, filters.category]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.dietary !== 'all') count++;
    if (filters.priceSort !== 'none') count++;
    if (filters.popularOnly) count++;
    return count;
  }, [filters]);

  if (loading) {
    return (
      <div className="restaurant-page loading-state">
        <div className="spinner"></div>
        <p>Fetching the menu...</p>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="restaurant-page error-state">
        <p>{error || 'Restaurant not found.'}</p>
        <Link to="/" className="back-link">← Back to restaurants</Link>
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      <div className="restaurant-hero">
        <img src={restaurant.imageUrl} alt={restaurant.name} />
        <div className="hero-overlay">
          <div className="hero-content">
            <Link to="/" className="back-link">← Back</Link>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <div className="hero-meta">
              <span className="hero-rating">⭐ {restaurant.rating.toFixed(1)}</span>
              <span className="hero-delivery">🕐 {restaurant.deliveryTime}</span>
              <span className="hero-price">₹₹₹</span>
              <span className="hero-location">{restaurant.location}</span>
            </div>
            <div className="hero-tags">
              {restaurant.cuisine.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-header">
          <div>
            <h2>Menu</h2>
            <p>Choose from {filteredMenuItems.length} delicious options</p>
          </div>
          <button className="filter-trigger-btn" onClick={() => setShowFilterModal(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="8" y1="12" x2="20" y2="12"></line>
              <line x1="12" y1="18" x2="20" y2="18"></line>
              <circle cx="6" cy="12" r="2" fill="currentColor"></circle>
              <circle cx="10" cy="18" r="2" fill="currentColor"></circle>
            </svg>
            Filters
            {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
          </button>
        </div>

        {Object.keys(menuByCategory).length === 0 && (
          <div className="empty-menu"><p>No menu items found.</p></div>
        )}

        {Object.entries(menuByCategory).map(([category, items]) => (
          <section key={category} className="menu-category">
            <h3>{category}</h3>
            <div className="menu-items">
              {items.map((item) => (
                <article key={item.name} className="menu-card">
                  <div className="menu-card-info">
                    <div className="menu-card-top">
                      <span className={`diet-dot ${item.isVeg ? 'veg' : 'non-veg'}`} aria-label={item.isVeg ? 'Vegetarian' : 'Non vegetarian'}></span>
                      <h4>{item.name}</h4>
                      {item.isPopular && <span className="badge">Bestseller</span>}
                    </div>
                    <p className="menu-price">₹{item.price}</p>
                    <p className="menu-description">{item.description}</p>
                  </div>
                  {item.imageUrl && (
                    <div className="menu-card-media">
                      <img src={item.imageUrl} alt={item.name} />
                      <button className="add-button">ADD</button>
                      <span className="customisable-text">Customisable</span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* iOS Style Filter Modal */}
      {showFilterModal && (
        <div className="filter-modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="filter-modal-handle"></div>
            <div className="filter-modal-header">
              <button className="filter-modal-close" onClick={() => setShowFilterModal(false)}>Cancel</button>
              <h3>Filters</h3>
              <button 
                className="filter-modal-reset"
                onClick={() => setFilters({ category: 'all', dietary: 'all', priceSort: 'none', popularOnly: false })}
              >
                Reset
              </button>
            </div>

            <div className="filter-modal-content">
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <div className="filter-chips">
                  <button className={`filter-chip ${filters.category === 'all' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, category: 'all' })}>All</button>
                  {categories.map(cat => (
                    <button key={cat} className={`filter-chip ${filters.category === cat ? 'active' : ''}`} onClick={() => setFilters({ ...filters, category: cat })}>{cat}</button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Dietary</label>
                <div className="filter-chips">
                  <button className={`filter-chip ${filters.dietary === 'all' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, dietary: 'all' })}>All</button>
                  <button className={`filter-chip ${filters.dietary === 'veg' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, dietary: 'veg' })}>🌱 Veg</button>
                  <button className={`filter-chip ${filters.dietary === 'non-veg' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, dietary: 'non-veg' })}>Non-Veg</button>
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort by Price</label>
                <div className="filter-chips">
                  <button className={`filter-chip ${filters.priceSort === 'none' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, priceSort: 'none' })}>Default</button>
                  <button className={`filter-chip ${filters.priceSort === 'low-to-high' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, priceSort: 'low-to-high' })}>Low to High</button>
                  <button className={`filter-chip ${filters.priceSort === 'high-to-low' ? 'active' : ''}`} onClick={() => setFilters({ ...filters, priceSort: 'high-to-low' })}>High to Low</button>
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Options</label>
                <div className="filter-chips">
                  <button className={`filter-chip ${filters.popularOnly ? 'active' : ''}`} onClick={() => setFilters({ ...filters, popularOnly: !filters.popularOnly })}>⭐ Popular Only</button>
                </div>
              </div>
            </div>

            <div className="filter-modal-footer">
              <button className="apply-filters-btn" onClick={() => setShowFilterModal(false)}>
                Show Results ({filteredMenuItems.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;