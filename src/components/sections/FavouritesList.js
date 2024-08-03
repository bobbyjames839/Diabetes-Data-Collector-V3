import React, { useEffect, useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faX, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '../config/Firebase'; // Adjust the import path as necessary
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

library.add(faPlus, faX, faEdit);

export const FavouritesList = ({ setFavorites, favorites, setConsumedFoods, consumedFoods }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'favorites'));
        const favoritesList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setFavorites(favoritesList);
      } catch (error) {
        console.error('Error fetching favorites from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [setFavorites]);

  const handleDeleteFavorite = async (index) => {
    const favoriteToDelete = favorites[index];
    try {
      await deleteDoc(doc(db, 'favorites', favoriteToDelete.id));
      const newFavorites = favorites.filter((_, i) => i !== index);
      setFavorites(newFavorites);
      console.log('Favorite deleted from Firebase');
    } catch (error) {
      console.error('Error deleting favorite from Firebase:', error);
    }
  };

  const handleAddFavoriteToMeal = (favorite) => {
    const weight = prompt(`Enter the weight of ${favorite.customName} eaten:`);
    if (weight && !isNaN(weight)) {
      const carbs = (favorite.carbohydrates * weight) / 100;
      setConsumedFoods([...consumedFoods, { fullProductName: favorite.customName, weight: Math.round(weight * 10) / 10, carbs: Math.round(carbs * 10) / 10 }]);
    }
  };

  const handleEditFavoriteName = async (index) => {
    const newName = prompt("Enter the new name for this favorite:");
    if (newName) {
      try {
        const favoriteToEdit = favorites[index];
        const updatedFavorite = { ...favoriteToEdit, customName: newName };
        await updateDoc(doc(db, 'favorites', favoriteToEdit.id), updatedFavorite);
        setFavorites(prevFavorites => {
          const updatedFavorites = [...prevFavorites];
          updatedFavorites[index].customName = newName;
          return updatedFavorites;
        });
        console.log('Favorite updated in Firebase');
      } catch (error) {
        console.error('Error updating favorite in Firebase:', error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : favorites.length === 0 ? (
        <p className='empty_list_text'>You currently have no favourites</p>
      ) : (
        <ul className='food_list'>
          {favorites.map((favorite, index) => (
            <li className='food_list_item' key={index}>
              <span className='food_list_name'>{favorite.customName}</span>
              <div className='food_buttons'>
                <button className='food_item_button' onClick={() => handleEditFavoriteName(index)}>
                  <FontAwesomeIcon icon="edit" />
                </button>
                <button className='food_item_button' onClick={() => handleAddFavoriteToMeal(favorite)}>Add</button>
                <button className='food_item_button' onClick={() => window.open(`https://world.openfoodfacts.org/product/${favorite.barcode}`, '_blank')}>View</button>
                <button className='food_item_button' onClick={() => handleDeleteFavorite(index)}>
                  <FontAwesomeIcon icon="x" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
