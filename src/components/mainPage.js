import React from 'react';
import Radium from 'radium';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import client from '../utils/redditClient';
import PostList from './postList';
import loadable from '../utils/loadable';

const styles = {

  content: {
    margin: 'auto',
    width: 800,
    paddingTop: 64,
  },
  whenDrawerOpen: {
    '@media (max-width: 1440px)': {
      marginLeft: 270,
      width: '100%',
      maxWidth: 800,
    },
  },

  drawer: {
    zIndex: 1000,
  },

  appBar: {
    position: 'fixed',
    top: 0,
  },
};

const LoadablePostList = loadable(PostList);

class MainPage extends React.Component {

  constructor() {
    super();
    this.state = {
      drawerOpen: false,
      posts: [],
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    client.get('/r/all').then(resp =>
      this.setState({ posts: resp.data.children })
    );
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    return (
      <div>
        <AppBar
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.toggleDrawer}
          title="Reddit"
        />

        <Drawer
          containerStyle={styles.drawer}
          open={this.state.drawerOpen}
          zDepth={1}
        >
          Hello
        </Drawer>

        <div
          style={[styles.content,
          this.state.drawerOpen && styles.whenDrawerOpen]}
        >
          <LoadablePostList data={this.state.posts} />
        </div>
      </div>
    );
  }
}

export default Radium(MainPage);
