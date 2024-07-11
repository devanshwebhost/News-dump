// card.jsx
import React from 'react';

function NewsCard() {
  return (
    <div className='blogContainer'>
       <div className='card'>
        <img src="https://picsum.photos/200/300" alt="image" />
        <h2>News Title</h2>
        <p>News content...</p>
    </div>
    </div>
  );
};

export default NewsCard;
