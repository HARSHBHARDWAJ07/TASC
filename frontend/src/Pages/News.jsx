import React, { useEffect, useState, useCallback } from 'react';
import Card from '../Components/Cards/Card';
import './CSS/Newsapp.css';

const Newsapp = () => {
  const [search, setSearch] = useState('financial news');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newsDatas] = useState(() =>  [
      // Taxes articles (7)
      {
        title: "Maximizing Deductions: Lesser-Known Tax Breaks",
        urlToImage: "/Images/tax1.jpeg",
        source: { name: "Tax Advisor" },
        description: "Uncover overlooked deductions for education, home office, and healthcare to reduce your liability.",
        category: "taxes"
      },
      {
        title: "Navigating New Tax Law Changes for 2025",
        urlToImage: "/Images/tax2.jpeg",
        source: { name: "Accounting Today" },
        description: "A comprehensive overview of recent federal and state updates impacting individual and business returns.",
        category: "taxes"
      },
      {
        title: "Retirement Contributions and Tax Advantages",
        urlToImage: "/Images/tax3.jpeg",
        source: { name: "Retirement Review" },
        description: "Explore how 401(k), IRA, and HSA contributions can lower taxable income and boost savings.",
        category: "taxes"
      },
      {
        title: "Freelancer Tax Tips: Estimated Payments Explained",
        urlToImage: "/Images/tax4.jpeg",
        source: { name: "Self-Employed Journal" },
        description: "Step-by-step guide to calculating and submitting quarterly estimated taxes to avoid penalties.",
        category: "taxes"
      },
      {
        title: "Estate Planning: Minimizing Inheritance Tax",
        urlToImage: "/Images/tax6.jpeg",
        source: { name: "Wealth Management Weekly" },
        description: "Key strategies for gifting, trusts, and exemptions to preserve more wealth for heirs.",
        category: "taxes"
      },
      {
        title: "International Tax Considerations for Expats",
        urlToImage: "/Images/tax7.jpeg",
        source: { name: "Global Finance Insights" },
        description: "Essential guidance on foreign-earned income exclusions, tax treaties, and reporting requirements.",
        category: "taxes"
      },
      
      // Budgeting articles (7)
      {
        title: "Zero-Based Budgeting: Every Dollar Accounted For",
        urlToImage: "/Images/budgeting1.jpeg",
        source: { name: "BudgetMaster" },
        description: "Allocate every dollar of your income intentionally to maximize savings and control spending.",
        category: "budgeting"
      },
      {
        title: "Envelope System: Cash-Only Spending Control",
        urlToImage: "/Images/budeting2.jpeg",
        source: { name: "Frugal Living" },
        description: "Divide your cash into envelopes per expense category to avoid overspending and stay on track.",
        category: "budgeting"
      },
      {
        title: "50/30/20 Rule: Simple Budget Framework",
        urlToImage: "/Images/budgetingg2.jpeg",
        source: { name: "Smart Finance" },
        description: "Balance needs, wants, and savings by allocating 50%, 30%, and 20% of your income respectively.",
        category: "budgeting"
      },
      {
        title: "Automated Budgeting with Apps and Tools",
        urlToImage: "/Images/budgeting4.jpeg",
        source: { name: "FinTech Review" },
        description: "Leverage modern apps to track spending, set limits, and receive real-time alerts for better discipline.",
        category: "budgeting"
      },
      {
        title: "Annual Budget Planning: Looking Ahead",
        urlToImage: "/Images/budgeting5.png",
        source: { name: "Financial Planner" },
        description: "Forecast income and expenses for the year to prepare for seasonal costs and big goals.",
        category: "budgeting"
      },
      {
        title: "Variable vs. Fixed Expenses: Finding Balance",
        urlToImage: "/Images/budgeting6.jpeg",
        source: { name: "Money Matters" },
        description: "Identify which costs fluctuate versus those that stay constant to improve flexibility and savings.",
        category: "budgeting"
      },
      {
        title: "Budget Review Rituals: Monthly Check-Ins",
        urlToImage: "/Images/budgeting7.jpeg",
        source: { name: "Personal Finance Pro" },
        description: "Establish a monthly review process to adjust allocations, reflect on goals, and celebrate progress.",
        category: "budgeting"
      },
      
      // Credit Scores articles (7)
      {
        title: "Understanding Your FICO Score Components",
        urlToImage: "/Images/credit1.jpeg",
        source: { name: "Credit Insights" },
        description: "Break down the five factors that determine your FICO score and learn how each impacts your overall rating.",
        category: "credit scores"
      },
      {
        title: "How Payment History Drives Your Credit Rating",
        urlToImage: "/Images/credit2.jpeg",
        source: { name: "Finance Fundamentals" },
        description: "Explore why on-time payments are critical and strategies to avoid late marks on your credit report.",
        category: "credit scores"
      },
      {
        title: "Reducing Credit Utilization for Better Scores",
        urlToImage: "/Images/credit3.jpeg",
        source: { name: "Smart Borrower" },
        description: "Learn techniques to keep your credit utilization ratio low and boost your score over time.",
        category: "credit scores"
      },
      {
        title: "The Impact of Hard vs. Soft Inquiries",
        urlToImage: "/Images/credit4.jpeg",
        source: { name: "Credit Wise" },
        description: "Understand the difference between inquiry types and how each affects your credit profile.",
        category: "credit scores"
      },
      {
        title: "Building Credit from Scratch: Starter Tips",
        urlToImage: "/Images/credit5.jpeg",
        source: { name: "Beginner Finance" },
        description: "Step-by-step guide for newcomers on establishing a solid credit history responsibly.",
        category: "credit scores"
      },
      {
        title: "Monitoring Identity Theft to Protect Your Score",
        urlToImage: "/Images/credit6.jpeg",
        source: { name: "Secure Finance Journal" },
        description: "Best practices for credit monitoring and alerts to catch fraudulent activity early.",
        category: "credit scores"
      },
      {
        title: "Common Myths That Hurt Your Credit",
        urlToImage: "/Images/credit7.jpeg",
        source: { name: "Debt & Credit Review" },
        description: "Debunk popular misconceptions about credit scores and learn the facts to keep your rating healthy.",
        category: "credit scores"
      },
      
      // Debt Management articles (7)
      {
        title: "Top Debt Consolidation Strategies for 2025",
        urlToImage: "/Images/debt1.jpeg",
        source: { name: "Debt Relief Today" },
        description: "Learn how to combine multiple debts into a single, lower-interest payment to simplify repayment.",
        category: "debt management"
      },
      {
        title: "Snowball vs. Avalanche: Choosing Your Repayment Method",
        urlToImage: "/Images/debt2.jpeg",
        source: { name: "Credit Coach" },
        description: "Compare the snowball and avalanche methods to find the most motivating and cost-effective payoff plan.",
        category: "debt management"
      },
      {
        title: "Improving Credit Scores Through Responsible Borrowing",
        urlToImage: "/Images/debt3.jpeg",
        source: { name: "Finance Essentials" },
        description: "Actionable tips for using credit wisely to boost your score and access better loan rates.",
        category: "debt management"
      },
      {
        title: "Managing Student Loan Payments After Graduation",
        urlToImage: "/Images/debt4.jpeg",
        source: { name: "EdFinance Journal" },
        description: "Explore income-driven plans, deferment options, and refinancing to ease post-grad debt burdens.",
        category: "debt management"
      },
      {
        title: "Negotiating Lower Interest Rates with Creditors",
        urlToImage: "/Images/debt5.jpeg",
        source: { name: "Money Savvy" },
        description: "Step-by-step guide to contacting lenders and securing rate reductions on your outstanding balances.",
        category: "debt management"
      },
      {
        title: "Emergency Fund vs. Extra Debt Payments: Finding Balance",
        urlToImage: "/Images/debt6.jpeg",
        source: { name: "Personal Finance Pro" },
        description: "Strategies for allocating savings to both your rainy day fund and accelerated debt reduction.",
        category: "debt management"
      },
      {
        title: "When to Use a Professional Debt Management Plan",
        urlToImage: "/Images/debt7.jpeg",
        source: { name: "Consumer Debt Review" },
        description: "Key factors to consider before enrolling in agency-led plans and how they impact your credit.",
        category: "debt management"
      },
      
      // Investment and Saving articles (7)
      {
        title: "Maximizing Returns with High-Yield Savings Accounts",
        urlToImage: "/Images/investmentAndSaving1.jpeg",
        source: { name: "Savings Weekly" },
        description: "Discover top high-yield savings options to grow your emergency fund with minimal risk.",
        category: "investment and saving"
      },
      {
        title: "Building Wealth with Index Fund Investing",
        urlToImage: "/Images/InvestmentAndSaving2.jpeg",
        source: { name: "Market Insights" },
        description: "Learn how low-cost index funds can deliver broad market exposure and consistent returns over time.",
        category: "investment and saving"
      },
      {
        title: "Robo-Advisors: Automated Portfolio Management",
        urlToImage: "/Images/InvestmentAndSaving3.png",
        source: { name: "FinTech Today" },
        description: "Explore how robo-advisors tailor diversified portfolios based on your risk profile and goals.",
        category: "investment and saving"
      },
      {
        title: "Tax-Advantaged Retirement Accounts Explained",
        urlToImage: "/Images/InvestmentAndSaving4.jpeg",
        source: { name: "Retirement Review" },
        description: "Understand IRA, 401(k), and Roth options to maximize your tax benefits and retirement savings.",
        category: "investment and saving"
      },
      {
        title: "Emergency Fund Strategies for Financial Security",
        urlToImage: "/Images/InvestmentandSaving5.jpeg",
        source: { name: "Personal Finance Pro" },
        description: "Step-by-step guide to establishing a 3–6 month expense fund for peace of mind.",
        category: "investment and saving"
      },
      {
        title: "Diversifying with Bond and Fixed-Income Funds",
        urlToImage: "/Images/InvestmentAndSaving6.jpeg",
        source: { name: "Income Strategies Journal" },
        description: "Learn how bonds and fixed-income ETFs can stabilize your portfolio during market swings.",
        category: "investment and saving"
      },
      {
        title: "Dollar-Cost Averaging for Long-Term Growth",
        urlToImage: "/Images/InvestmentAndSaving7.jpeg",
        source: { name: "Investor’s Edge" },
        description: "Implement a disciplined investing approach by regularly buying fixed-dollar amounts of assets.",
        category: "investment and saving"
      },
      
      // Financial News articles (7)
      {
        title: "Fed's Kugler Says Monitoring Markets Amid Big Policy Shifts",
        urlToImage: "/Images/financialnews1.jpeg",
        source: { name: "Reuters" },
        description: "Federal Reserve Governor Adriana Kugler is closely watching markets amid trade policy shifts and potential impacts on U.S. dollar assets.",
        category: "financial news"
      },
      {
        title: "Goldman Sachs Says Deal Outlook Is Good, But Timing Is Uncertain",
        urlToImage: "/Images/financialnews2.jpeg",
        source: { name: "Reuters" },
        description: "Goldman Sachs President John Waldron predicts a strong investment banking pipeline but cautions that deal timing remains unpredictable.",
        category: "financial news"
      },
      {
        title: "Companies Turn to Private Credit During Tariff Turmoil",
        urlToImage: "/Images/financialnews3.jpeg",
        source: { name: "Reuters" },
        description: "Amid market volatility from tariff uncertainty, firms are increasingly tapping private credit for more flexible financing solutions.",
        category: "financial news"
      },
      {
        title: "U.S. Banks See Profits Climb in First Quarter: FDIC",
        urlToImage: "/Images/financialnews4.jpeg",
        source: { name: "Reuters" },
        description: "The U.S. banking industry reported $70.6 billion in Q1 profits—a 5.8% rise quarter-on-quarter—driven by higher noninterest income and strong capital buffers.",
        category: "financial news"
      },
      {
        title: "U.S. Corporate Profits Decrease Sharply in First Quarter",
        urlToImage: "/Images/financialnews5.jpeg",
        source: { name: "Reuters" },
        description: "U.S. corporate profits fell by $118.1 billion in Q1 after inventory valuation and capital consumption adjustments, signaling headwinds for growth.",
        category: "financial news"
      },
      {
        title: "Fed Saw Inflation, Jobless, Stability Risks at May Meeting, Minutes Show",
        urlToImage: "/Images/financialnews7.jpeg",
        source: { name: "Reuters" },
        description: "Fed minutes reveal officials’ concerns over rising inflation, unemployment risks, and financial volatility ahead of a decision to pause extreme tariffs.",
        category: "financial news"
      }
    ]
);

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

    const filteredArticles = newsDatas.filter(
    article => article.urlToImage && article.title && article.category.toLowerCase() === search.toLowerCase()
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

        {!loading && error && (
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
                          e.target.src = '/placeholder-news.jpeg';
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

