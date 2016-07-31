import React from 'react';
import Post from './post';

const PostList = props => (
  <div>
    {props.posts.map(post => (
      <Post key={post.data.id} data={post.data} />
    ))}
  </div>
);

PostList.propTypes = {
  posts: React.PropTypes.array,
};

export default PostList;
