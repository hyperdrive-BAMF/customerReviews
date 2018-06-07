const React = require('react');
const ReviewsChart require('./ReviewsChart.jsx');
const ReviewsList require('./ReviewsList.jsx');

// NOTE: This will be refactored into a stateful component with ComponentDidMount API call
const CustomerReviews = (props) => (
  <div class="customer-reviews">
    <header>
      <h3>Customer Reviews</h3>
      <section>
        Overall Reviews:<br />
        <span>{ props.overallRating }</span> ({ props.totalReviews } reviews)
      </section>
    </header>
    <ReviewsChart gameId={ props.gameId } />
    <ReviewsList gameId={ props.gameId } />
  </div>
);

export default CustomerReviews;
