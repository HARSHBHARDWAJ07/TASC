import React, { useEffect, useState, useCallback } from 'react';
import Card from '../Components/Cards/Card';
import './CSS/Newsapp.css';

const Newsapp = () => {
  const [search, setSearch] = useState('financial news');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newsDatas] = useState(() => [
    {
      title: "Smart Investment Strategies for 2024",
      urlToImage: "/financial-news1.jpg",
      source: { name: "Finance Daily" },
      description: "Explore the latest investment trends and portfolio management techniques...",
      category: "financial news"
    },
     {
      title: "Smart Investment Strategies for 2024",
      urlToImage: "/financial-news1.jpg",
      source: { name: "Finance Daily" },
      description: "Explore the latest investment trends and portfolio management techniques...",
      category: "financial news"
    },
     {
      title: "Smart Investment Strategies for 2024",
      urlToImage: "/financial-news1.jpg",
      source: { name: "Finance Daily" },
      description: "Explore the latest investment trends and portfolio management techniques...",
      category: "financial news"
    },
    {
      title: "Effective Debt Management Solutions",
      urlToImage: "/debt-management.jpg",
      source: { name: "Money Matters" },
      description: "Learn how to prioritize and pay off high-interest debts efficiently...",
      category: "debt management"
    },
    {
      title: "Improving Your Credit Score Basics",
      urlToImage: "/credit-score.jpg",
      source: { name: "Credit Weekly" },
      description: "Essential tips for maintaining and improving your credit health...",
      category: "credit scores"
    },
    // Add 7 more demo articles with different categories
    {
      title: "Budget Planning Essentials",
      urlToImage: "/budgeting.jpg",
      source: { name: "Personal Finance" },
      description: "Step-by-step guide to creating an effective monthly budget...",
      category: "budgeting"
    },
    {
      title: "Tax Saving Investments Guide",
      urlToImage: "/taxes.jpg",
      source: { name: "Tax Today" },
      description: "Best investment options for tax saving in the current fiscal year...",
      category: "taxes"
    }
  ]);

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

   const filteredArticles = newsDatas.filter(article => 
    article.urlToImage && 
    article.title && 
    article.category.toLowerCase() === search.toLowerCase()
  );

  return (
    <div className="news-app">
      <main className="main-content">
        <h2 className="head">Stay Informed with Financial Intelligence</h2>

        <div className="api-key-note">
          <p>🔑 <strong>Demo Notice:</strong> This portfolio site uses a placeholder API key for demonstration. Live news functionality is disabled in production to preserve key integrity. For full experience, please clone the repo and run it locally using your own <code>REACT_APP_NEWS_API_KEY</code>.</p>
        </div>

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
            <p>Curating Financial Insights…</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Data Retrieval Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredArticles.length > 0 && (
              <div className="featured-carousel">
                <h3 className="carousel-heading">Featured Insights</h3>
                <div className="carousel-container">
                  {filteredArticles.map((article, index) => (
                    <figure key={index} className="carousel-item">
                      <img 
                        src={article.urlToImage} 
                        alt={article.title}
                        onError={(e) => {
                          e.target.src = '/placeholder-news.jpg';
                        }}
                      />
                      <figcaption className="carousel-caption">
                        <h4>{article.title.split(' - ')[0]}</h4>
                        <p>{article.source.name}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            <div className="news-grid">
              <Card data={newsData} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Newsapp;
