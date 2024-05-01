import React from 'react';
import './Card.css';

function Card({ name, image, isFlipped, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        
        {/* Front side: shows image and name when not flipped */}
        {!isFlipped && (
          <div className="card-front" 
               style={{ 
                 backgroundImage: `url(${image})`, 
                 backgroundSize: 'cover', 
                 backgroundRepeat: 'no-repeat', 
                 backgroundPosition: 'center' 
               }}>
            <div className="card-name-section">
            <span className="card-name">{name}</span>
          </div>
          </div>
        )}

        {/* Back side: white when flipped */}
        <div className="card-back" style={{ background: 'white' }}>
          {isFlipped && <div className="blank-face" />}
        </div>
      </div>
    </div>
  );
}

export default Card;
