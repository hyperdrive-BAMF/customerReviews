import React from 'react';

import './../styles/ReviewAuthor.scss';
//  __________            .__                _____          __  .__                  
//  \______   \ _______  _|__| ______  _  __/  _  \  __ ___/  |_|  |__   ___________ 
//   |       _// __ \  \/ /  |/ __ \ \/ \/ /  /_\  \|  |  \   __\  |  \ /  _ \_  __ \
//   |    |   \  ___/\   /|  \  ___/\     /    |    \  |  /|  | |   Y  (  <_> )  | \/
//   |____|_  /\___  >\_/ |__|\___  >\/\_/\____|__  /____/ |__| |___|  /\____/|__|   
//          \/     \/             \/              \/                 \/              

const ReviewAuthor = (props) => (
  <div className="review-author">
    <img src={ props.authorAvatarUrl } />
    <span>{ props.authorUsername }</span>
  </div>
);

export default ReviewAuthor;
