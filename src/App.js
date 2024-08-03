import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Form } from './components/Pages/Form';
import { Main } from './components/Pages/Main';
import { Predictor } from './components/Pages/Predictor';
import './components/styles/App.css'

function App() {

    return (
        <div className='App'>
            <Router>
                <Routes>
                <Route path = '/' element = {<Main/>}/>
                <Route path = '/form' element = {<Form/>}/>
                <Route path = '/predictor' element = {<Predictor/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
