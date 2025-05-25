import React from 'react'
import './Card.css'

const Card = ({ data }) => {
  return (
    <div className='cards-container'>
      {data.map((item, index) => {
        if (!item.urlToImage) return null
        
        return (
          <article className='news-card' key={index}>
            <div className='card-image'>
              <img 
                src={item.urlToImage} 
                alt={item.title}
                loading='lazy'
                onError={(e) => {
                  e.target.src = 'https://source.unsplash.com/random/800x600'
                }}
              />
            </div>
            <div className='card-content'>
              <h3 className='card-title'>
                <a 
                  href={item.url} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='card-link'
                >
                  {item.title}
                </a>
              </h3>
              <p className='card-description'>{item.description}</p>
              <div className='card-footer'>
                <span className='card-source'>{item.source?.name}</span>
                <a
                  href={item.url}
                  className='read-more'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Read More →
                </a>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default Card