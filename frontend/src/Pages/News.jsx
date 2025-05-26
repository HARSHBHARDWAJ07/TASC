// src/Components/Newsapp/Newsapp.jsx
import React, { useEffect, useState, useCallback } from 'react';
import Card from '../Components/Cards/Card';
import './CSS/Newsapp.css';

const Newsapp = () => {
  const [search,    setSearch]    = useState('financial news');
  const [newsData, setNewsData] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  // NOTE: CRA only exposes env-vars prefixed with REACT_APP_
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // bail early if no key
    if (!API_KEY) {
      setError('No NewsAPI key found. Make sure REACT_APP_NEWS_API_KEY is set.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(search)}&apiKey=${API_KEY}`
      );

      const json = await res.json();

      if (!res.ok || json.status !== 'ok') {
        // NewsAPI returns { status:"error", code:"...", message:"..." }
        throw new Error(json.message || `NewsAPI error ${res.status}`);
      }

      setNewsData(json.articles.slice(0, 10));
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, API_KEY]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleCategorySelect = (category) => {
    setSearch(category);
  };

  return (
    <div className="news-app">
      <main className="main-content">
        <h2 className="head">Stay Updated with News</h2>

        <div className="category-btns">
          {['investment and saving', 'debt management', 'credit scores', 'budgeting', 'taxes']
            .map((cat) => (
              <button key={cat} onClick={() => handleCategorySelect(cat)}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
        </div>

        {loading && (
          <div className="loading">
            <div className="loader" />
            <p>Loading latest news…</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="news-grid">
            <Card data={newsData} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Newsapp;
