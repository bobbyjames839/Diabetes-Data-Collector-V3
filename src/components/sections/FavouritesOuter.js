import { CustomItemsList } from "./CustomItemsList";
import { FavouritesList } from "./FavouritesList";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faPlus, faX, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

library.add(faPlus, faX, faEdit, faStar);

export const FavouritesOuter = ({
  setConsumedFoods,
  consumedFoods,
  setCustomItemsList,
  customItemsList,
  setFavorites,
  favorites,
  setShowFavorites,
  setFormPopup,
}) => {

  const [customItems, setCustomItems] = useState(false);

  return (
    <div className='food_list_outer'>
      <div className='favourites_header'>
        <h3 className='food_title'>Favorites</h3>
        <button className='go_to_searcher' onClick={() => setShowFavorites(false)}>
          Use Search Instead
        </button>
      </div>

      <div className='favourites_selector'>
        <div className='favourites_selector_left'>
          <button
            className='favourites_selector_button'
            style={{ backgroundColor: customItems ? 'white' : 'var(--red)' }}
            onClick={() => setCustomItems(false)}
          >
            Favourites
          </button>
          <button
            className='favourites_selector_button favourites_selector_button_right'
            style={{ backgroundColor: customItems ? 'var(--red)' : 'white' }}
            onClick={() => setCustomItems(true)}
          >
            Custom Items
          </button>
        </div>
        {customItems && (
          <button className='favourites_selector_button' onClick={() => setFormPopup(true)}>
            <FontAwesomeIcon icon='plus' />
          </button>
        )}
      </div>

      {customItems ? (
        <CustomItemsList
          setCustomItemsList={setCustomItemsList}
          setConsumedFoods={setConsumedFoods}
          consumedFoods={consumedFoods}
          customItemsList={customItemsList}
        />
      ) : (
        <FavouritesList
          setFavorites={setFavorites}
          setConsumedFoods={setConsumedFoods}
          consumedFoods={consumedFoods}
          favorites={favorites}
        />
      )}
    </div>
  );
};
