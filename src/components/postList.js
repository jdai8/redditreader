import React from 'react';
import Post from './post';

function PostList(props) {
  return (
    <div>
      {props.posts.map(post => (
        <Post key={post.data.id} data={post.data} />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: React.PropTypes.array,
};

export default PostList;
