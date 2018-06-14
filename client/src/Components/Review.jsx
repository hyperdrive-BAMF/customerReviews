import React from 'react';
import PropTypes from 'prop-types';
import ReviewAuthor from './ReviewAuthor';

import './../styles/Review.scss';
//  __________            .__
//  \______   \ _______  _|__| ______  _  __
//   |       _// __ \  \/ /  |/ __ \ \/ \/ /
//   |    |   \  ___/\   /|  \  ___/\     /
//   |____|_  /\___  >\_/ |__|\___  >\/\_/
//          \/     \/             \/

const Review = (props) => {
  const reviewDate = new Date(props.datePosted);

  const recommendationHeader = props.recommended ? (
    <header className="recommended">
      <span>Recommended</span>
    </header>
  ) : (
    <header className="not-recommended">
      <span>Not Recommended</span>
    </header>
  );

  const formatedPostedDate = reviewDate.toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="review row">
      <div className="col-md-3">
        <ReviewAuthor
          authorUsername={ props.authorUsername }
          authorAvatarUrl={ props.authorAvatarUrl }
        />
      </div>
      <div className="col-md-9">
        <article>
          { recommendationHeader }
          <span className="posted-date">
            Posted: { formatedPostedDate }
          </span>
          <div className="content">
            { props.content }
          </div>
        </article>
      </div>
    </div>
  );
};
Review.propTypes = {
  authorUsername: PropTypes.string.isRequired,
  authorAvatarUrl: PropTypes.string.isRequired,
  datePosted: PropTypes.string.isRequired,
  recommended: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired
};

export default Review;
