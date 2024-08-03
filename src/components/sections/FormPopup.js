import '../styles/FormPopup.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { db } from '../config/Firebase'; // Adjust the import path as necessary
import { collection, addDoc } from 'firebase/firestore';

library.add(faX);

export const FormPopup = ({ setFormPopup, customItemsList, setCustomItemsList }) => {
  const [productName, setProductName] = useState('');
  const [carbs, setCarbs] = useState('');

  const handleAddToCustomItems = async () => {
    const newItem = { productName, carbs };

    // Add to Firestore
    try {
      await addDoc(collection(db, 'customItems'), newItem);
      console.log('Custom item added to Firebase');
    } catch (error) {
      console.error('Error adding custom item to Firebase:', error);
    }

    // Update local state
    setCustomItemsList([...customItemsList, newItem]);
    setFormPopup(false);
  };

  return (
    <div className='form_popup'>
      <div className="form_popup_inner">
        <button className='hide_popup' onClick={() => setFormPopup(false)}>
          <FontAwesomeIcon icon='x' />
        </button>
        <h3 className='form_popup_title'>Create a custom item</h3>
        <div className='form_popup_content'>
          <label className='form_popup_subtitle' htmlFor='name'>Name</label>
          <input
            id='name'
            placeholder='Input name of product'
            className='form_popup_input'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label className='form_popup_subtitle' htmlFor='carbs'>Number of carbs</label>
          <input
            id='carbs'
            placeholder='Input carbs'
            className='form_popup_input'
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />
        </div>
        <button onClick={handleAddToCustomItems} className='form_popup_submit'>Submit</button>
      </div>
    </div>
  );
};
