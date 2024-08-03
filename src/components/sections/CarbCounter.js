import React, { useState, useEffect } from 'react';
import '../styles/CarbCounter.css';
import { FormPopup } from './FormPopup';
import { FavouritesOuter } from './FavouritesOuter';
import { SearchForm } from './SearchForm';
import { SearchList } from './SearchList';
import { MealList } from './MealList';

export const CarbCounter = ({ setCarbsEatenNumerical, setFirstHalf }) => {
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [consumedFoods, setConsumedFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [customItemsList, setCustomItemsList] = useState([]);
  const [formPopup, setFormPopup] = useState(false)

  useEffect(() => {
    calculateTotalCarbs();
  }, [consumedFoods]);

  const calculateTotalCarbs = () => {
    const total = consumedFoods.reduce((acc, food) => acc + food.carbs, 0);
    const roundedTotal = Math.round(total * 10) / 10;
    setCarbsEatenNumerical(roundedTotal);
    setTotalCarbs(roundedTotal);
  };

  return (
    <div className='carb_counter'>

      {formPopup && <FormPopup setFormPopup={setFormPopup} customItemsList = {customItemsList} setCustomItemsList = {setCustomItemsList}/>}

      <h4 className='carb_counter_title'>Calculate your carbs</h4>

      {showFavorites ? (
        <FavouritesOuter setConsumedFoods={setConsumedFoods} consumedFoods={consumedFoods} setCustomItemsList={setCustomItemsList} customItemsList={customItemsList} setFavorites={setFavorites} favorites={favorites} setShowFavorites={setShowFavorites} setFormPopup={setFormPopup}/>
      ) : (
        <>
        <SearchForm setDisplayedProducts={setDisplayedProducts} setLoading={setLoading} setError={setError} productName={productName} setProducts={setProducts} setProductName={setProductName} setShowFavorites={setShowFavorites} showFavorites={showFavorites}/>

          {!loading ? (
            <SearchList setError={setError} favorites={favorites} setFavorites={setFavorites} setConsumedFoods={setConsumedFoods} consumedFoods={consumedFoods} displayedProducts={displayedProducts}/>
          ) : (
            <div className="loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}

          {error && <p className='carbs_error'>{error}</p>}
        </>
      )}
      <MealList setConsumedFoods={setConsumedFoods} consumedFoods={consumedFoods} totalCarbs={totalCarbs} setFirstHalf={setFirstHalf}/>
    </div>
  );
};
