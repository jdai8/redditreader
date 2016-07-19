import React from 'react';
import Radium from 'radium';
import { Card, CardHeader } from 'material-ui/Card';

import client from '../utils/redditClient';
import loadable from '../utils/loadable';
import Thumbnail from './thumbnail';
import CommentList from './commentList';
import PostContent from './postContent';

const styles = {

  a: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },

  card: {
    margin: 8,
  },
};

const LoadableCommentList = loadable(CommentList);

class Post extends React.Component {

  constructor() {
    super();
    this.state = {
      expanded: false,
      comments: [],
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand(event) {

    if (event.target.tagName === 'A') {
      return;
    }

    const expanded = !this.state.expanded;
    this.setState({ expanded });

    if (expanded && this.state.comments.length === 0) {

      client.get(this.props.data.permalink).then(resp =>
        this.setState({ comments: resp[1] })
      );
    }
  }

  render() {
    const href = `https://reddit.com${this.props.data.permalink}`;
    return (
      <Card
        style={styles.card}
        expanded={this.state.expanded}
      >

        <CardHeader
          title={
            <a href={href} target="_blank" style={styles.a}>
              {this.props.data.title}
            </a>
          }

          style={styles.header}
          subtitle={this.props.data.subreddit}
          onClick={this.toggleExpand}
          className="header" // override material-ui with css
          avatar={
            <Thumbnail
              title={this.props.data.title}
              src={this.props.data.thumbnail}
            />
          }
        />

        <PostContent
          expandable
          html={this.props.data.selftext_html}
          preview={this.props.data.preview}
        />

        <LoadableCommentList
          data={this.state.comments}
          expandable
        />

      </Card>
    );
  }
}

Post.propTypes = {
  data: React.PropTypes.object,
};

export default Radium(Post);
