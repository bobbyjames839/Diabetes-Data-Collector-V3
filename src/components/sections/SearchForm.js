import axios from 'axios';
import { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faStar);

export const SearchForm = ({
  setProducts,
  setDisplayedProducts,
  setLoading,
  setError,
  productName,
  setProductName,
  setShowFavorites,
  showFavorites,
}) => {
  const [page, setPage] = useState(1);
  const [moreFoodsButton, setMoreFoodsButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetSearch();
    searchProducts();
  };

  const resetSearch = () => {
    setProducts([]);
    setDisplayedProducts([]);
    setPage(1);
  };

  const searchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
        params: { search_terms: productName, search_simple: 1, json: 1, page_size: 5, page }
      });

      const productsData = data.products.map(product => ({
        fullProductName: `${product.product_name || 'N/A'}${product.brands ? ` -- ${product.brands}` : ''}`,
        barcode: product.code || 'N/A',
      }));

      setProducts(prev => [...prev, ...productsData]);
      setDisplayedProducts(prev => [...prev, ...productsData]);
      setPage(prev => prev + 1);
      setMoreFoodsButton(true);
    } catch (error) {
      setError('Error fetching products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='carb_counter_searcher' onSubmit={handleSubmit}>
      <input
        className='carb_counter_searcher_input'
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter product name"
      />
      <div className='carb_counter_searcher_right'>
        <span className='show_favourites_button' onClick={() => setShowFavorites(!showFavorites)}>
          <FontAwesomeIcon className='star_icon' icon="star" />
        </span>
        {moreFoodsButton && <span className='load_more_foods' onClick={searchProducts}>View More</span>}
        <button className='search_carbs_button' type="submit">Search</button>
      </div>
    </form>
  );
};
