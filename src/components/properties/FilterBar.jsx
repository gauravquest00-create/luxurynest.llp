import { useState } from 'react';

export default function FilterBar({ onFilterChange, initialFilters }) {
  const [filters, setFilters] = useState(
    initialFilters || {
      search: '',
      type: 'all',
      bhk: 'all',
      minPrice: '',
      maxPrice: '',
      sort: 'default',
    }
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const reset = {
      search: '',
      type: 'all',
      bhk: 'all',
      minPrice: '',
      maxPrice: '',
      sort: 'default',
    };
    setFilters(reset);
    onFilterChange(reset);
  };

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
  ];

  const selectedSortLabel = sortOptions.find(opt => opt.value === filters.sort)?.label || 'Sort';

  return (
    <div className="filter-bar-wrapper">
      {/* Sticky bar with search, filter toggle, sort toggle */}
      <div className="filter-bar">
        <div className="filter-bar-inputs">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="search-input"
          />
          <button
            className={`filter-toggle ${isFilterOpen ? 'active' : ''}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter {isFilterOpen ? '▲' : '▼'}
          </button>
          <div className="sort-dropdown">
            <button
              className="sort-toggle"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              {selectedSortLabel} ▼
            </button>
            {isSortOpen && (
              <div className="sort-menu">
                {sortOptions.map(opt => (
                  <div
                    key={opt.value}
                    className={`sort-option ${filters.sort === opt.value ? 'active' : ''}`}
                    onClick={() => {
                      handleChange('sort', opt.value);
                      setIsSortOpen(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button className="reset-btn" onClick={resetFilters}>Reset</button>
      </div>

      {/* Expandable filter panel (mobile/tablet) */}
      <div className={`filter-panel ${isFilterOpen ? 'open' : ''}`}>
        <div className="filter-group">
          <label>Property Type</label>
          <select value={filters.type} onChange={(e) => handleChange('type', e.target.value)}>
            <option value="all">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
        <div className="filter-group">
          <label>BHK</label>
          <select value={filters.bhk} onChange={(e) => handleChange('bhk', e.target.value)}>
            <option value="all">All</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Min Price (₹)</label>
          <input type="number" placeholder="e.g., 5000000" value={filters.minPrice} onChange={(e) => handleChange('minPrice', e.target.value)} />
        </div>
        <div className="filter-group">
          <label>Max Price (₹)</label>
          <input type="number" placeholder="e.g., 20000000" value={filters.maxPrice} onChange={(e) => handleChange('maxPrice', e.target.value)} />
        </div>
      </div>
    </div>
  );
}