import React from 'react';
import { List } from 'material-ui/List';
import { Card, CardText } from 'material-ui/Card';

const borderColors = [
  'red', 'purple', 'orange', 'green', 'blue', 'yellow', 'black',
];

function getStyles(i) {

  return {
    zDepth: i ? 0 : 1,
    card: {
      marginLeft: 5,
      marginRight: i ? 0 : 5,
      marginBottom: i ? 0 : 5,
    },
    cardText: {
      borderLeft: i ? `medium solid ${borderColors[i - 1]}` : '',
    },
  };
}

function commentTree(node, i) {

  if (!node) {
    return false;
  }

  return node.data.children.map(reply => {

    if (reply.kind === 'more') {
      return false;
    }
    const styles = getStyles(i);
    const children = commentTree(reply.data.replies, i + 1);
    const shouldExpand = Boolean(children[0]);
    // console.group(reply.data.author);
    // console.log(children);
    // console.groupEnd();
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
          <div>{reply.data.body}</div>
        </CardText>

        {children}

      </Card>
    );
  });
}

function CommentList(props) {
  return (
    <List>
      {commentTree(props.data, 0)}
    </List>
  );
}

CommentList.propTypes = {
  data: React.PropTypes.object,
};

export default CommentList;
