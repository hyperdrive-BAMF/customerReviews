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
      allReviews: [],
      displayedReviews: []
    };

    this.displayMoreReviews = this.displayMoreReviews.bind(this)
  }

  componentDidMount() {
    this.fetchReviews();
  }

  displayMoreReviews() {
    let reviewLimit = this.state.allReviews.length - this.state.displayedReviews.length;
    if (reviewLimit > 10) {
      reviewLimit = 10;
    }

    const newReviews = this.state.allReviews.slice(
      this.state.displayedReviews.length, this.state.displayedReviews.length + reviewLimit - 1);

    const newDisplayedReviews = this.state.displayedReviews.concat(newReviews);

    this.setState({
      displayedReviews: newDisplayedReviews
    });

    setTimeout(() => {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
    }, 150);
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
      .then((allReviews) => {
        // Ensure our Reviews are sorted chronologically
        allReviews.sort((reviewA, reviewB) => (
          new Date(reviewB.createdAt) - new Date(reviewA.createdAt)
        ));

        const reviewLimit = allReviews.length < 10 ? allReviews.length : 10;
        this.setState({ 
          allReviews,
          displayedReviews: allReviews.slice(0, reviewLimit)
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const loadMoreReviewsButton = this.state.displayedReviews.length < this.state.allReviews.length ? (
        <button className="load-button" onClick={ this.displayMoreReviews } >Load More Reviews</button>
      ) : (
        null
      );
    const Reviews = this.state.displayedReviews.map(reviewRecord => (
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
        { loadMoreReviewsButton }
      </section>
    );
  }
}
ReviewsList.propTypes = {
  gameId: PropTypes.number.isRequired
};

export default ReviewsList;
