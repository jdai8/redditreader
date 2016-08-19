import React from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader } from 'material-ui/Card';

import Thumbnail from './thumbnail';
import CommentList from './commentList';
import PostContent from './postContent';
import Anchor from './anchor';

import client from '../utils/redditClient';

const styles = {

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
    this.onHeaderClick = this.onHeaderClick.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  onHeaderClick(event) {
    if (event.target.tagName !== 'A') {
      this.toggleExpand();
    }
  }

  onDocumentClick(event) {
    if (!this.card.contains(event.target)) {
      this.toggleExpand();
    }
  }

  toggleExpand() {

    const expanded = !this.state.expanded;
    this.setState({ expanded });

    if (expanded) {
      // close on outside click
      document.addEventListener('click', this.onDocumentClick);

      // load comments when expanded for the first time
      if (!this.state.comments.data) {

        client.get(this.props.data.permalink, {
          limit: 20,
          raw_json: 1,
        }).then(resp =>
          this.setState({ comments: resp[1] })
        );
      }
    } else {
      document.removeEventListener('click', this.onDocumentClick);

      // bring the card into view if we scrolled past it
      if (this.card.getBoundingClientRect().top < 0) {
        this.card.scrollIntoView();
        window.scrollBy(0, -64); // for the app bar
      }
    }
  }

  render() {

    const content = this.state.comments.data &&
      <PostContent
        data={this.props.data}
        style={{ display: this.state.expanded ? 'block' : 'none' }}
      />;

    return (
      <Card
        style={styles.card}
        expanded={this.state.expanded}
        zDepth={this.state.expanded ? 2 : 1}
        ref={ref => (this.card = ReactDOM.findDOMNode(ref))}
      >

        <CardHeader
          title={
            <Anchor href={this.props.data.url} >
              {this.props.data.title}
            </Anchor>
          }
          style={styles.header}
          subtitle={this.props.data.subreddit}
          onClick={this.onHeaderClick}
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
