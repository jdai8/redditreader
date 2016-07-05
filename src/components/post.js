import React from 'react';
import Radium from 'radium';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import client from '../utils/redditClient';
import loadable from '../utils/loadable';
import CommentList from './commentList';

const styles = {
    a: {
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
    avatar: {
        borderRadius: 2
    },
    card: {
        margin: 8
    }
}

const LoadableCommentList = loadable(CommentList);

class Post extends React.Component {

    constructor() {
        super();
        this.state = {
            comments: []
        };
        this.onExpand = this.onExpand.bind(this);
    }

    onExpand(expanded) {

        if (expanded && this.state.comments.length === 0) {

            client.get(this.props.data.permalink).then(resp => 
                this.setState({ comments: resp[1].data.children })
            );
        }
    };

    render() {
        const href = `https://reddit.com${ this.props.data.permalink }`;

        return (
            <Card style={styles.card} onExpandChange={this.onExpand}>

                <CardHeader
                    title={
                        <a href={href} style={styles.a}> 
                            {this.props.data.title} 
                        </a> 
                    }
                    subtitle={this.props.data.subreddit}
                    avatar={ 
                        <Avatar 
                            style={styles.avatar} 
                            size={70} 
                            src={this.props.data.thumbnail} />
                    }
                    actAsExpander={true}
                />

                <LoadableCommentList 
                    data={this.state.comments} 
                    expandable={true} />
            </Card>
        );
    };
}

export default Radium(Post);
