const React = require('react');
const Author = require('./Author.jsx');

const Review = (props) => (
  <div class="review row">
    <div class="col-md-3">
      <Author authorUsername={ props.authorUsername } authorAvatarUrl={ props.authorAvatarUrl } />
    </div>
    <div class="col-md-9">
      <header>
        <img src="/images/icon-positive.png" />
        { props.reviewRecommended }
      </header>
      <p>
        <span>{ props.datePosted }</span>
        { props.reviewContent }
      </p>
    </div>
  </div>
);

export default Review;
