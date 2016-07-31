import React from 'react';
import { List } from 'material-ui/List';
import { Card, CardText } from 'material-ui/Card';
import { grey500 } from 'material-ui/styles/colors';

// const borderColors = [
//   redA700, blueA700, orangeA700, greenA700, yellowA700, indigoA700,
// ];

function getStyles(i) {

  return {
    zDepth: i ? 0 : 1,
    card: {
      marginLeft: 8,
      marginRight: i ? 0 : 8,
      marginBottom: i ? 0 : 8,
    },
    cardText: {
      borderLeft: i ?
        `medium solid ${grey500}`
      // `medium solid ${borderColors[(i - 1) % borderColors.length]}`
        : '',
    },
  };
}

function commentTree(node, i) {

  if (!node.data) {
    return false;
  }

  return node.data.children.map(reply => {

    if (reply.kind === 'more') {
      return false; // <div>Load more</div>
    }
    const styles = getStyles(i);
    const children = commentTree(reply.data.replies, i + 1);
    const shouldExpand = !!children[0];

    return (

      <Card
        key={reply.data.id}
        expandable
        initiallyExpanded
        style={styles.card}
        zDepth={styles.zDepth}
      >

        <CardText
          style={styles.cardText}
          actAsExpander={shouldExpand}
        >
          <div>{reply.data.author}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: reply.data.body_html,
            }}
          />

        </CardText>

        {children}

      </Card>
    );
  });
}

function CommentList(props) {
  return (
    <List>
      {commentTree(props.comments, 0)}
    </List>
  );
}

CommentList.propTypes = {
  comments: React.PropTypes.object,
};

export default CommentList;
