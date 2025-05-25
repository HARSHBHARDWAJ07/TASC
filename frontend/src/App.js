
import './App.css';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Game from './Pages/Game';
import Profile from './Pages/Profile';
import Newsapp from './Pages/News';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter , Route ,Routes} from 'react-router-dom';

function App() {
  return (
   <div>
   <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/'element={<Newsapp/>}/>
      <Route  path="/signin" element={<Signin />} />
      <Route  path="/signup" element={<Signup />} />
      <Route  path="/game" element={<Game />}/>
      <Route  path="/profile" element={<Profile />}/>
    
    </Routes>

     <Footer/>
   </BrowserRouter>
    </div>
  );
}

export default App;
