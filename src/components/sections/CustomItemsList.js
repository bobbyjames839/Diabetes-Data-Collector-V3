import React, { useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faX, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '../config/Firebase'; // Adjust the import path as necessary
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

library.add(faPlus, faX, faEdit);

export const CustomItemsList = ({ customItemsList, setCustomItemsList, consumedFoods, setConsumedFoods }) => {
  useEffect(() => {
    const fetchCustomItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'customItems'));
        const customItems = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setCustomItemsList(customItems);
      } catch (error) {
        console.error('Error fetching custom items from Firebase:', error);
      }
    };

    fetchCustomItems();
  }, [setCustomItemsList]);

  const handleEditCustomName = async (index) => {
    const newName = prompt("Enter the new name for this custom item:");
    if (newName) {
      const customItemToEdit = customItemsList[index];
      const updatedCustomItem = { ...customItemToEdit, productName: newName };

      try {
        await updateDoc(doc(db, 'customItems', customItemToEdit.id), updatedCustomItem);
        setCustomItemsList(prevCustomItemsList => {
          const updatedCustomItems = [...prevCustomItemsList];
          updatedCustomItems[index].productName = newName;
          return updatedCustomItems;
        });
        console.log('Custom item updated in Firebase');
      } catch (error) {
        console.error('Error updating custom item in Firebase:', error);
      }
    }
  };

  const handleAddCustomItemToMeal = (customItem) => {
    const carbs = customItem.carbs;
    setConsumedFoods([...consumedFoods, { fullProductName: customItem.productName, weight: NaN, carbs: Math.round(carbs * 10) / 10 }]);
  };

  const handleDeleteCustomItem = async (index) => {
    const customItemToDelete = customItemsList[index];

    try {
      await deleteDoc(doc(db, 'customItems', customItemToDelete.id));
      setCustomItemsList(customItemsList.filter((_, i) => i !== index));
      console.log('Custom item deleted from Firebase');
    } catch (error) {
      console.error('Error deleting custom item from Firebase:', error);
    }
  };

  return (
    <>
      {customItemsList.length === 0 ? (
        <p className='empty_list_text'>You currently have no custom items</p>
      ) : (
        <ul className='food_list'>
          {customItemsList.map((customItem, index) => (
            <li className='food_list_item' key={index}>
              <span className='food_list_name'>{customItem.productName}</span>
              <div className='food_buttons'>
                <button className='food_item_button' onClick={() => handleEditCustomName(index)}>
                  <FontAwesomeIcon icon="edit" />
                </button>
                <button className='food_item_button' onClick={() => handleAddCustomItemToMeal(customItem)}>Add</button>
                <button className='food_item_button' onClick={() => handleDeleteCustomItem(index)}>
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
