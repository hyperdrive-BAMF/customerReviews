const React = require('react');
const Review = require('./Review.jsx');

const ReviewsList = (props) => {
  const Reviews = props.reviews.map((review) => {
    return <Review 
              reviewTitle={ review.title }
              reviewContent={ review.content }
              reviewRecommended={ review.positive }
              authorUsername={ review.author.username }
              authorAvatarUrl={ review.author.avatarUrl }
              datePosted={ review.datePosted }
            />
  });

  return (
    <div class="reviews-list">
      { Reviews }
    </div>
  )
};

export default ReviewsList;
