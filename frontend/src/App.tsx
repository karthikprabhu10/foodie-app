import React, { useState, useEffect } from 'react';
import RestaurantCard from './components/RestaurantCard';
import SearchBar from './components/SearchBar';
import FilterBar, { FilterOptions } from './components/FilterBar';
import { Restaurant } from './types/Restaurant';
import { getAllRestaurants, searchRestaurants, filterRestaurants } from './services/api';
import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  // Load all restaurants on mount
  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const fetchAllRestaurants = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllRestaurants();
      setRestaurants(response.data);
      setActiveFilters({});
    } catch (err) {
      setError('Failed to load restaurants. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      fetchAllRestaurants();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await searchRestaurants(query);
      setRestaurants(response.data);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filters: FilterOptions) => {
    try {
      setLoading(true);
      setError('');
      setActiveFilters(filters);
      const response = await filterRestaurants(filters);
      setRestaurants(response.data);
    } catch (err) {
      setError('Filter failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    fetchAllRestaurants();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🍽️ Foodie</h1>
        <p className="app-subtitle">Discover the best restaurants near you</p>
      </header>

      <div className="container">
        {/* Search and Filter Bar */}
        <div className="controls-bar">
          <SearchBar onSearch={handleSearch} />
          <FilterBar onFilter={handleFilter} onReset={handleReset} />
        </div>

        {/* Main Content */}
        <main className="restaurants-section">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading delicious restaurants...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>❌ {error}</p>
              <button onClick={fetchAllRestaurants} className="retry-button">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && restaurants.length === 0 && (
            <div className="no-results">
              <h2>😕 No restaurants found</h2>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}

          {!loading && !error && restaurants.length > 0 && (
            <>
              <div className="results-header">
                <h2>{restaurants.length} Restaurants Found</h2>
              </div>
              <div className="restaurants-grid">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;