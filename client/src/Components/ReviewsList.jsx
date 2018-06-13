import React from 'react';
import Review from './Review.jsx';

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

  fetchReviews() {
    // Simple GET Request
    fetch(`/api/game/${this.props.gameId}/reviews/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occurred while retrieving the review data. Please try again.");
        }
        return res.json(); 
      })
      .then((reviews) => {
        // Ensure our Reviews are sorted chronologically
        reviews.sort((reviewA, reviewB) => {
          return new Date(reviewB.date_posted) - new Date(reviewA.date_posted);
        });
        this.setState({ reviews });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.fetchReviews();
  }

  render() {
    const Reviews = this.state.reviews.map((reviewRecord) => {
      return <Review 
                key={ reviewRecord.id }
                content={ reviewRecord.content }
                recommended={ reviewRecord.positive }
                datePosted={ reviewRecord.date_posted }
                authorUsername={ reviewRecord.author.username }
                authorAvatarUrl={ reviewRecord.author.avatar_url }
              />      
    });

    return (
      <section className="reviews-list">
        { Reviews }
      </section>
    );
  }
}

export default ReviewsList;
