import React from 'react';

const ReviewsChart = (props) => (
  <div className="reviews-chart">
    <header>
      <h6>Overall Reviews:</h6>
      <h4><span>{ props.overallRating }</span> ({ props.totalReviews } reviews)</h4>
    </header>
  </div>
);

export default ReviewsChart;
