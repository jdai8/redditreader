import React from 'react';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 0.870588)',
};

function MenuLink(props, context) {

  return (
    <Link
      to={props.to} style={styles}
      activeStyle={{ color: context.muiTheme.palette.primary1Color }}
    >
      <MenuItem style={{ color: 'inherit' }}>{props.children}</MenuItem>
    </Link>
  );
}

MenuLink.propTypes = {
  to: React.PropTypes.string,
  children: React.PropTypes.string,
};

MenuLink.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default MenuLink;
