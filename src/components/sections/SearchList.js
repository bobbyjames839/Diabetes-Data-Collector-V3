import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faPlus, faX, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '../config/Firebase';
import { collection, addDoc } from 'firebase/firestore'

library.add(faPlus, faX, faEdit, faStar);

export const SearchList = ({
  setError,
  favorites,
  setFavorites,
  setConsumedFoods,
  consumedFoods,
  displayedProducts,
}) => {
  
  const fetchProductDetails = async (barcode) => {

    /*try {
      // Mock data response for testing
      const data = {
        product: {
          product_name: 'Sample Product',
          brands: 'Sample Brand',
          carbohydrates_100g: 10,
          code: barcode,
        }
      };
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));*/

    try {
      const { data } = await axios.get(`https://world.openfoodfacts.net/api/v2/product/${barcode}`, {
        params: { fields: 'product_name,brands,carbohydrates_100g,code' },
      });
      const product = data.product;
      const fullProductName = `${product.product_name || 'N/A'}${product.brands ? ` - ${product.brands}` : ''}`;
      return {
        fullProductName,
        name: product.product_name,
        carbohydrates: product.carbohydrates_100g,
        barcode: product.code,
      };
    } catch (error) {
      setError('Error fetching product details');
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const handleAddToFavorites = async (barcode) => {
    const product = await fetchProductDetails(barcode);
    if (product) {
      const customName = prompt(`Enter a custom name for ${product.fullProductName}:`);
      if (customName) {
        const favorite = { ...product, customName };
        setFavorites([...favorites, favorite]);

        try {
          await addDoc(collection(db, 'favorites'), favorite);
          console.log('Favorite added to Firebase');
        } catch (error) {
          console.error('Error adding favorite to Firebase:', error);
        }
      }
    }
  };

  const handleProductClick = async (barcode) => {
    const product = await fetchProductDetails(barcode);
    if (product) {
      const weight = prompt(`Enter the weight of ${product.name} eaten:`);
      if (weight && !isNaN(weight)) {
        const carbs = (product.carbohydrates * weight) / 100;
        setConsumedFoods([
          ...consumedFoods,
          { fullProductName: product.fullProductName, weight: Math.round(weight * 10) / 10, carbs: Math.round(carbs * 10) / 10 },
        ]);
      }
    }
  };

  return (
    <div className='food_list_outer'>
      <ul className='food_list'>
        {displayedProducts.map((product, index) => (
          <li className='food_list_item' key={index}>
            <span className='food_list_name'>{product.fullProductName}</span>
            <div className='food_buttons'>
              <button className='add_to_favourites_button' onClick={() => handleAddToFavorites(product.barcode)}>
                <FontAwesomeIcon icon="plus" />
              </button>
              <button className='food_item_button' onClick={() => handleProductClick(product.barcode)}>Add</button>
              <button className='food_item_button' onClick={() => window.open(`https://world.openfoodfacts.org/product/${product.barcode}`, '_blank')}>View</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
