
import './App.css';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Game from './Pages/Game';
import {BrowserRouter , Route ,Routes} from 'react-router-dom';

function App() {
  return (
   <div>
   <BrowserRouter>
    
    <Routes>
      <Route  path="/signin" element={<Signin />} />
      <Route  path="/signup" element={<Signup />} />
      <Route  path="/game" element={<Game />}/>
    </Routes>

   
   </BrowserRouter>
    </div>
  );
}

export default App;
