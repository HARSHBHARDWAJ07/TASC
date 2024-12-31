import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

import Signup from './Pages/signups';
import Profile from './Pages/Profile';
import Quiz from './Components/quiz'
import SignupForm from './Components/signup/Signup'
import LoginForm from './Components/Sign-in/auth/LoginForm'
import {newsSection} from './Components/NewsPage/NewsSection'
import NewsArticle from './components/NewsInfo/newsArticle/NewsArticle';
import {JoinNetwork} from './Components/CommunityPage/JoinNetwork'
import {LeaderboardView} from './Components/leaderboard/LeaderboardView'

function App() {
  return (
    <div className="App">
    
      <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/signin" element={<LoginForm />} />
      <Route path="/home/no" element={<newsSection />} />
      <Route path="/home/news" element={<NewsArticle /> } />
      <Route path="/home/community" element={<JoinNetwork />} />
      <Route path="/home/ranking" element={<LeaderboardView />} />
      
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />  
        <Route path="/home" element={<Home />} />
      </Routes>
    
    </div>
  );
}

export default App;
