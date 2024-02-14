import React from 'react';
import './card.css'; // Import a CSS file for styling (create Card.css in the same folder)

function Card ({ title, content }) {
  return (
    <div className="card-container">
      <div className="card-header">
      <h1>{title}</h1> 
      </div>
      <div className="card-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Card

