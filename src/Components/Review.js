import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function Review() {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate / 20);
    // other logic
  };

  return (
    <div>
      <Rating
        onClick={handleRating}
        ratingValue={rating} /* Available Props */
      />
    </div>
  );
}
