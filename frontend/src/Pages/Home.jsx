import React from 'react'
import { NewsSection } from './components/NewsPage/NewsSection.jsx'
import NewsArticle from './components/NewsInfo/newsArticle/NewsArticle.jsx'
import { JoinNetwork } from './components/CommunityPage/JoinNetwork.jsx'
import { LeaderboardView } from './components/leaderboard/LeaderboardView.jsx'


 const Home = () => {
  return (
    <div className='home'>
      <NewsSection/>
      <NewsArticle/>
      <LeaderboardView/>
      <JoinNetwork/>
        
    </div>
  )
}

export default Home
