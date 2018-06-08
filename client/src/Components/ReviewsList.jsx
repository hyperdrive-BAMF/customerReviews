import React from 'react';
import Review from './Review.jsx';

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
    // Simple GET Request
    fetch(`/api/game/${this.props.gameId}/reviews/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occurred while retrieving the review data. Please try again.");
        }

        return res.json(); 
      })
      .then((reviews) => {
        this.setState({ reviews });
      })
      .catch((err) => {
        // TODO: Change this to instead create a modal/notice 
        // with the error text for the user (cb from main root Component?)
        console.error(err);
      });
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
