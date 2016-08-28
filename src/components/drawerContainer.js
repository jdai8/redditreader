import React from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import cookies from 'js-cookie';

import MenuLink from './menuLink';

import client from '../utils/redditClient';

const styles = {
  drawer: {
    // app bar has height 64px
    marginTop: 64,
    height: 'calc(100% - 64px)',
    // app bar has z-index 1100
    zIndex: 1000,
  },
};

class DrawerContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      subreddits: [],
    };
  }

  componentDidMount() {
    const url = cookies.get('sessionId') ?
      '/subreddits/mine/subscriber' : '/subreddits/default';

    client.get(url, { limit: 100 }).then(resp =>
      this.setState({ subreddits: resp.data.children })
    );
  }

  render() {
    return (

      <Drawer
        containerStyle={styles.drawer}
        open={this.props.open}
        zDepth={1}
      >
        <Subheader>Subreddits</Subheader>

        <MenuLink to="/">Frontpage</MenuLink>
        <MenuLink to="/r/all">All</MenuLink>

        {this.state.subreddits.map(({ data }) =>
          <MenuLink
            key={data.id}
            to={`/r/${data.display_name}`}
          >
            {data.display_name}
          </MenuLink>
          )
        }
      </Drawer>
    );
  }
}

DrawerContainer.propTypes = {
  open: React.PropTypes.bool,
};

export default DrawerContainer;
