import React from 'react';
import Radium from 'radium';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

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

class MainPage extends React.Component {

  constructor() {
    super();
    this.state = {
      drawerOpen: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
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

          {this.props.children}

        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  children: React.PropTypes.node,
};

export default Radium(MainPage);
