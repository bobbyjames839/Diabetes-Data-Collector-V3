import { useNavigate } from "react-router-dom";
import home from '../images/home.png';
import '../styles/Predictor.css';
import { useState } from 'react';

// Define the Question component outside the Predictor component
const Question = ({ question, name, value, onChange }) => (
  <div className={`form_question ${name}`}>
    <h3 className='form_question_title'>{question}</h3>
    <input
      className='form_question_input'
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  </div>
);

export const Predictor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    food_eaten: '',
    level_before: '',
    exercise_points: '',
    alcohol_points: '',
    exercise_points_after: ''
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handlePredict = async () => {
    try {
      console.log("Sending request to /predict with data:", formData);
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log("Received response:", result);
      setPrediction(result.insulinDose.toFixed(1));

      // Clear the form
      setFormData({
        food_eaten: '',
        level_before: '',
        exercise_points: '',
        alcohol_points: '',
        exercise_points_after: ''
      });
    } catch (error) {
      console.error('Error predicting insulin dose:', error);
      alert('Currently only available in localhost.')
    }
  };

  return (
    <div className="predictor">
      <img onClick={() => navigate('/')} className="home_image" src={home} alt='Home image' />

      <h1 className="predictor_title">Insulin Predictor</h1>
      <p className="predictor_title_v2">Input your data below and we will use your own data to give you an insulin dosage.</p>

      <div className="predictor_inner">
        <Question
          question='How many carbs have you eaten?'
          name='food_eaten'
          value={formData.food_eaten}
          onChange={handleChange}
        />
        <Question
          question='What is your current level?'
          name='level_before'
          value={formData.level_before}
          onChange={handleChange}
        />
        <Question
          question='How many exercise points do you have in the previous 24 hours?'
          name='exercise_points'
          value={formData.exercise_points}
          onChange={handleChange}
        />
        <Question
          question='How many units of alcohol have you consumed in the previous 24 hours?'
          name='alcohol_points'
          value={formData.alcohol_points}
          onChange={handleChange}
        />
        <Question
          question='How many exercise points do you plan on doing in the next 2 hours?'
          name='exercise_points_after'
          value={formData.exercise_points_after}
          onChange={handleChange}
        />
      </div>

      <button className="predict_button" onClick={handlePredict}>Predict</button>

      {prediction !== null && (<p className="prediction_text">Predicted Insulin Dose: {prediction}</p>)}

    </div>
  );
};
