// src/Components/Newsapp/Newsapp.jsx
import React, { useEffect, useState, useCallback } from 'react'
import Card from '../Components/Cards/Card';
import './CSS/Newsapp.css'


const Newsapp = () => {
  const [search, setSearch] = useState('financial news')
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(false)
  const API_KEY = '9c3ed8ee95884dec979460a60f96675b'

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      )
      const json = await res.json()
      setNewsData(json.articles.slice(0, 10))
    } catch (err) {
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    getData()
  }, [getData])


  const handleCategorySelect = (category) => {
    setSearch(category)
    // getData() will run automatically because search changed
  }

  return (
    <div className="news-app">
      <main className="main-content">
        <h2 className="head">Stay Updated with News</h2>

        <div className="category-btns">
          {['investment and saving', 'Debt management', 'Credit scores', 'Budgeting', 'Taxes'].map((cat) => (
            <button key={cat} onClick={() => handleCategorySelect(cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">
            <div className="loader" />
            <p>Loading latest news...</p>
          </div>
        ) : (
          <div className="news-grid">
            <Card data={newsData} />
          </div>
        )}
      </main>
    </div>
  )
}

export default Newsapp
