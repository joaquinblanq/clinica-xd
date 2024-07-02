import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './RatingStars.css'; // Estilos CSS para RatingStars

const RatingStars = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className="rating-stars">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <FaStar
            key={index}
            className="star"
            color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
            size={30}
            onClick={() => handleClick(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
