import React from 'react';
import PropTypes from 'prop-types';
import ChartVisualization from './ChartVisualization';

import './../styles/ReviewsChart.scss';
//  __________            .__                    _________ .__                   __
//  \______   \ _______  _|__| ______  _  _______\_   ___ \|  |__ _____ ________/  |_
//   |       _// __ \  \/ /  |/ __ \ \/ \/ /  ___/    \  \/|  |  \\__  \\_  __ \   __\
//   |    |   \  ___/\   /|  \  ___/\     /\___ \\     \___|   Y  \/ __ \|  | \/|  |
//   |____|_  /\___  >\_/ |__|\___  >\/\_//____  >\______  /___|  (____  /__|   |__|
//          \/     \/             \/           \/        \/     \/     \/

/*
 Static Helper Method
*/
const getOverallRatingLabel = percentage => {
  if (percentage >= 90) {
    return 'Overwhelmingly Positive';
  } else if (percentage >= 80) {
    return 'Very Positive';
  } else if (percentage >= 70) {
    return 'Positive';
  } else if (percentage >= 60) {
    return 'Mostly Positive';
  } else if (percentage >= 50) {
    return 'Mixed';
  } else if (percentage >= 40) {
    return 'Mostly Negative';
  } else if (percentage >= 30) {
    return 'Negative';
  }
  return 'Very Negative';
};

class ReviewsChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewSummaries: []
    };
  }

  componentDidMount() {
    this.fetchReviewSummaries();
  }

  fetchReviewSummaries() {
    // Simple GET Request
    fetch(`/api/game/${this.props.gameId}/reviews/summary`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('An error occurred while retrieving the review data. Please try again.');
        }
        return res.json();
      })
      .then((reviewSummaries) => {
        // Ensure our Reviews are sorted chronologically by oldest
        reviewSummaries.sort((summaryA, summaryB) => (
          new Date(summaryA.date) - new Date(summaryB.date)
        ));
        this.setState({ reviewSummaries });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    // Don't render if we don't have data yet
    if (this.state.reviewSummaries.length === 0) {
      return null;
    }

    // Tally up the totals
    let totalReviews = 0;
    let totalPositive = 0;

    this.state.reviewSummaries.forEach((reviewSummary) => {
      totalPositive += reviewSummary.positive;
      totalReviews += (reviewSummary.positive + reviewSummary.negative);
    });

    const overallRatingPercentage = Math.floor((totalPositive / totalReviews) * 100);
    const overallRatingLabel = getOverallRatingLabel(overallRatingPercentage);

    const title = `${overallRatingPercentage}% of the ${totalReviews.toLocaleString()}`
      + ' user reviews for this game are positive.';

    return (
      <div className="reviews-chart">
        <header>
          <h5>Overall Reviews:</h5>
          <h4>
            <span
              title={ title }
            >
              { overallRatingLabel }
            </span>
            ({ totalReviews.toLocaleString() } reviews)
          </h4>
        </header>
        <ChartVisualization
          dataset={ this.state.reviewSummaries }
          fullHeight={ 270 }
          fullWidth={ 970 }
        />
      </div>
    );
  }
}
ReviewsChart.propTypes = {
  gameId: PropTypes.number.isRequired
};

export default ReviewsChart;
