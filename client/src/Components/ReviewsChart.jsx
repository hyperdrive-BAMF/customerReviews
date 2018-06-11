import React from 'react';

import './../styles/ReviewsChart.scss';
//  __________            .__                    _________ .__                   __   
//  \______   \ _______  _|__| ______  _  _______\_   ___ \|  |__ _____ ________/  |_ 
//   |       _// __ \  \/ /  |/ __ \ \/ \/ /  ___/    \  \/|  |  \\__  \\_  __ \   __\
//   |    |   \  ___/\   /|  \  ___/\     /\___ \\     \___|   Y  \/ __ \|  | \/|  |  
//   |____|_  /\___  >\_/ |__|\___  >\/\_//____  >\______  /___|  (____  /__|   |__|  
//          \/     \/             \/           \/        \/     \/     \/             

const ReviewsChart = (props) => {

  const overallRatingHeader = (props.overallRating !== undefined && props.totalReviews !== undefined)
    ? (<h4><span>{ props.overallRating }</span> ({ props.totalReviews } reviews)</h4>)
    : (<h4>...one moment...</h4>);

  return (
    <div className="reviews-chart">
      <header>
        <h5>Overall Reviews:</h5>
        { overallRatingHeader }
      </header>
    </div>
  );
};

export default ReviewsChart;
