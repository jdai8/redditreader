import React from 'react';
import PostList from './postList';
import client from '../utils/redditClient';

class PostListContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.update(this.props.params.subreddit);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.subreddit !== this.props.params.subreddit) {
      this.update(nextProps.params.subreddit);
    }
  }

  update(subreddit) {

    const url = subreddit ? `/r/${subreddit}` : '/';

    client.get(url).then(resp =>
      this.setState({ posts: resp.data.children })
    );
  }

  render() {
    return <PostList posts={this.state.posts} />;
  }
}

PostListContainer.propTypes = {
  params: React.PropTypes.object,
};

export default PostListContainer;
