const React = require('react');

const Author = (props) => (
  <div class="review-author">
    <img src={ props.authorAvatarUrl } />
    { props.authorUsername }
  </div>
);

export default Author;
