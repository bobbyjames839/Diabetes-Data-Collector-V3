import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faPlus, faX, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faPlus, faX, faEdit, faStar);

export const MealList = ({ setConsumedFoods, consumedFoods, totalCarbs, setFirstHalf }) => {

  const handleDeleteFood = (index) => {
    setConsumedFoods(consumedFoods.filter((_, i) => i !== index));
  };

  return (
    <div className='food_list_outer'>
      <h3 className='food_title'>
        My Meal 
        {totalCarbs !== 0 && <span className='my_meal_carbs'> Total Carbs: {totalCarbs.toFixed(1)}g</span>}
      </h3>
      {consumedFoods.length > 0 ? (
        <>
          <ul className='food_list'>
            {consumedFoods.map((food, index) => (
              <li className='food_list_item' key={index}>
                <p className='food_list_name'>{food.fullProductName}</p>
                <div className='food_buttons'>
                  <p className='food_item_metric'>W: {food.weight.toFixed(1)}</p>
                  <p className='food_item_metric'>C: {food.carbs.toFixed(1)}</p>
                  <button className='food_item_button' onClick={() => handleDeleteFood(index)}>
                    <FontAwesomeIcon icon="x" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className='next_section' onClick={() => setFirstHalf(false)}>Next</button>
        </>
      ) : (
        <p className='empty_list_text'>Your meal is currently empty</p>
      )}
    </div>
  );
};
