import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  isLoading: false,
  error: null,
  
  // Filters and Sorting state
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'none', // 'none', 'price-asc', 'price-desc', 'title-asc', 'title-desc'

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const data = response.data;
      
      const categories = ['all', ...new Set(data.map(product => product.category))];
      
      set({ 
        products: data, 
        filteredProducts: data,
        categories,
        isLoading: false 
      });
      get().applyFilters();
    } catch (error) {
      set({ error: error.message || 'Failed to fetch products', isLoading: false });
    }
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  setSortBy: (sortType) => {
    set({ sortBy: sortType });
    get().applyFilters();
  },

  applyFilters: () => {
    const { products, searchQuery, selectedCategory, sortBy } = get();
    
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Search by Title
    if (searchQuery.trim() !== '') {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    set({ filteredProducts: result });
  }
}));

export default useProductStore;
