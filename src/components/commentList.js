import React from 'react';
import { List, ListItem } from 'material-ui/List';

const CommentList = props => (
    <List>
        {props.data.map(comment => 
            <ListItem 
                key={comment.data.id}
                primaryText={comment.data.author}
                secondaryText={comment.data.body}
            />
        )}
    </List>
);

export default CommentList;
