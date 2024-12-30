import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Quiz from './Components/quiz';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />  
      </Routes>
    
    </div>
  );
}

export default App;
