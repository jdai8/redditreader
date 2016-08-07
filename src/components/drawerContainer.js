import React from 'react';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';

import client from '../utils/redditClient';

const styles = {
  drawer: {
    // app bar has z-index 1100
    paddingTop: 64,
    zIndex: 1000,
  },
  link: {
    textDecoration: 'none',
  },
};

function MenuLink(props) {

  return (
    <Link to={props.to} style={styles.link} >
      <MenuItem>{props.children}</MenuItem>
    </Link>
  );
}

MenuLink.propTypes = {
  to: React.PropTypes.string,
  children: React.PropTypes.string,
};

class DrawerContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      subreddits: [],
    };
  }

  componentDidMount() {
    client.get('/subreddits/default').then(resp =>
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
