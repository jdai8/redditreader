import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';

import Thumbnail from './thumbnail';
import CommentList from './commentList';
import PostContent from './postContent';
import Anchor from './anchor';

import client from '../utils/redditClient';

const styles = {

  a: {
  },

  card: {
    margin: 8,
  },
};

class Post extends React.Component {

  constructor() {
    super();
    this.state = {
      expanded: false,
      comments: {},
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand(event) {

    if (event.target.tagName === 'A') {
      return;
    }

    const expanded = !this.state.expanded;
    this.setState({ expanded });

    // load comments when expanded for the first time
    if (expanded && !this.state.comments.data) {

      client.get(this.props.data.permalink).then(resp =>
        this.setState({ comments: resp[1] })
      );
    }
  }

  render() {

    // const href = `https://reddit.com${this.props.data.permalink}`;
    const content = this.state.comments.data &&
      <PostContent
        style={{ display: this.state.expanded ? 'block' : 'none' }}
        media={this.props.data.media}
        html={this.props.data.selftext_html}
        preview={this.props.data.preview}
      />;

    return (
      <Card
        style={styles.card}
        expanded={this.state.expanded}
        zDepth={this.state.expanded ? 2 : 1}
      >

        <CardHeader
          title={
            <Anchor href={this.props.data.url} >
              {this.props.data.title}
            </Anchor>
          }
          style={styles.header}
          subtitle={this.props.data.subreddit}
          onClick={this.toggleExpand}
          className="header" // override cursor: pointer
          avatar={
            <Thumbnail
              title={this.props.data.title}
              src={this.props.data.thumbnail}
            />
          }
        />

        {content}

        <CommentList
          comments={this.state.comments}
          expandable
        />

      </Card>
    );
  }
}

Post.propTypes = {
  data: React.PropTypes.object,
};

export default Post;
