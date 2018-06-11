import React from 'react';
import ReviewAuthor from './ReviewAuthor.jsx';

//  __________            .__               
//  \______   \ _______  _|__| ______  _  __
//   |       _// __ \  \/ /  |/ __ \ \/ \/ /
//   |    |   \  ___/\   /|  \  ___/\     / 
//   |____|_  /\___  >\_/ |__|\___  >\/\_/  
//          \/     \/             \/        

const Review = (props) => {

  const recommendationHeader = props.recommended ? (
      <header className="recommended">
          Recommended
      </header>
    ) : (
      <header className="not-recommended">
          Recommended
      </header>
    );

  return (
    <div className="review row">
      <div className="col-md-3">
        <ReviewAuthor authorUsername={ props.authorUsername } authorAvatarUrl={ props.authorAvatarUrl } />
      </div>
      <div className="col-md-9">
        { recommendationHeader }
        <article>
          <span>{ props.datePosted }</span>
          { props.content }
        </article>
      </div>
    </div>
  );
}

export default Review;
