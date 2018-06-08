import React from 'react';
import ReviewsChart from './ReviewsChart.jsx';
import ReviewsList from './ReviewsList.jsx';

//  _________                 __                             __________            .__                     
//  \_   ___ \ __ __  _______/  |_  ____   _____   __________\______   \ _______  _|__| ______  _  ________
//  /    \  \/|  |  \/  ___/\   __\/  _ \ /     \_/ __ \_  __ \       _// __ \  \/ /  |/ __ \ \/ \/ /  ___/
//  \     \___|  |  /\___ \  |  | (  <_> )  Y Y  \  ___/|  | \/    |   \  ___/\   /|  \  ___/\     /\___ \ 
//   \______  /____//____  > |__|  \____/|__|_|  /\___  >__|  |____|_  /\___  >\_/ |__|\___  >\/\_//____  >
//          \/           \/                    \/     \/             \/     \/             \/           \/ 

const CustomerReviews = (props) => (
  <div className="customer-reviews">
    <header>
      <h3>Customer Reviews</h3>
    </header>
    <ReviewsChart gameId={ props.gameId } />
    <ReviewsList gameId={ props.gameId } />
  </div>
);

export default CustomerReviews;
