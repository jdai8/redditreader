import React from 'react';
import Post from './post';

const PostList = props => (
    <div>
        {props.data.map(post => (
            <Post key={post.data.id} data={post.data} />
        ))}
    </div>
);

export default PostList;
