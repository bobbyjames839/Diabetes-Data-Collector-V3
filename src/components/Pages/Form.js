import { useState } from 'react';
import '../styles/Form.css';
import { CarbCounter } from '../sections/CarbCounter';
import { FormQuestions } from '../sections/FormQuestions';

export const Form = () => {
  const [carbsEatenNumerical, setCarbsEatenNumerical] = useState(null)
  const [firstHalf, setFirstHalf] = useState(true)

  const clearForm = () => {
  document.getElementById('form').reset();
  };

  const submitData = (carbsEatenNumerical) => {
    const formData = {
      insulinInjected: document.getElementById('insulinInjected').value,
      levelBefore: document.getElementById('levelBefore').value,
      levelTwo: document.getElementById('levelTwo').value,
      time: document.getElementById('time').value,
      carbsTwo: document.getElementById('carbsTwo').value,
      exercisePoints: document.getElementById('exercisePoints').value,
      alcoholPoints: document.getElementById('alcoholPoints').value,
      exercisePointsAfter: document.getElementById('exercisePointsAfter').value,
      carbsEatenNumerical: carbsEatenNumerical
    };

    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfF2iyF_ZyY6MEgW0OCpSzb9Bg95Tr8CR15NpgZbyn6hJe-Cg/formResponse";
    const params = new URLSearchParams({
      "entry.500461883": formData.carbsEatenNumerical,
      "entry.901867602": formData.insulinInjected,
      "entry.1878110065": formData.levelBefore,
      "entry.965549412": formData.levelTwo,
      "entry.1268161372": formData.time,
      "entry.868671801": formData.carbsTwo,
      "entry.370463474": formData.exercisePoints,
      "entry.831293466": formData.alcoholPoints,
      "entry.348402611": formData.exercisePointsAfter
    });

    const url = `${formUrl}?${params.toString()}`;
    fetch(url, {
      method: 'POST',
      mode: 'no-cors'
    }).then(() => {
      alert('Data submitted successfully!');
    }).catch((error) => {
      console.error('Error:', error);
    });

    clearForm();
  };
  

  return (
    <div className='form'>
 
        {firstHalf ? <CarbCounter setCarbsEatenNumerical={setCarbsEatenNumerical} setFirstHalf = {setFirstHalf}/> 
        
        :
        <>
         <FormQuestions/>
        <button className="submit_data_button" onClick={() => submitData(carbsEatenNumerical)}>Submit data</button>
        </>}

    </div>
  );
};
