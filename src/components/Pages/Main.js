import '../styles/Main.css'
import { useNavigate } from 'react-router-dom'

export const Main = () => {

  const navigate = useNavigate()

  const showAlert = () => {
    alert('The machine learning is currently in development.')
  }

  return (
    <div className="main">
      <h3>Diabetes Data Collector</h3>
      <p>This is an app designed by Bobby to manage his type 1 diabetes, please explore as you wish.</p>
      <div className="access_service_buttons">
        <button className="access_service_button" onClick={() => (navigate('/form'))}>Log Meal</button>
        <button className="access_service_button" onClick={showAlert}>Use Predictor</button>
      </div>
    </div>
  )
}