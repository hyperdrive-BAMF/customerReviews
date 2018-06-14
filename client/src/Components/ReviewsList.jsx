import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';

import './../styles/ReviewsList.scss';
//  __________            .__                    .____    .__          __
//  \______   \ _______  _|__| ______  _  _______|    |   |__| _______/  |_
//   |       _// __ \  \/ /  |/ __ \ \/ \/ /  ___/    |   |  |/  ___/\   __\
//   |    |   \  ___/\   /|  \  ___/\     /\___ \|    |___|  |\___ \  |  |
//   |____|_  /\___  >\_/ |__|\___  >\/\_//____  >_______ \__/____  > |__|
//          \/     \/             \/           \/        \/       \/

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
    this.fetchReviews();
  }

  fetchReviews() {
    // Simple GET Request
    fetch(`/api/game/${this.props.gameId}/reviews/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('An error occurred while retrieving the review data. Please try again.');
        }
        return res.json();
      })
      .then((reviews) => {
        // Ensure our Reviews are sorted chronologically
        reviews.sort((reviewA, reviewB) => (
          new Date(reviewB.createdAt) - new Date(reviewA.createdAt)
        ));
        this.setState({ reviews });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const Reviews = this.state.reviews.map(reviewRecord => (
      <Review
        key={ reviewRecord.id }
        content={ reviewRecord.content }
        recommended={ reviewRecord.positive }
        datePosted={ reviewRecord.createdAt }
        authorUsername={ reviewRecord.author.username }
        authorAvatarUrl={ reviewRecord.author.avatar_url }
      />
    ));

    return (
      <section className="reviews-list">
        { Reviews }
      </section>
    );
  }
}
ReviewsList.propTypes = {
  gameId: PropTypes.number.isRequired
};

export default ReviewsList;
