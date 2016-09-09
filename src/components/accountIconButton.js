import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import cookies from 'js-cookie';

import client from '../utils/redditClient';

class AccountIconButton extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      open: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    client.get('/api/v1/me').then(({ name }) => this.setState({ name }));
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  logout() {
    cookies.remove('sessionId');
    cookies.remove('accessToken');
    location.reload();
  }

  render() {
    return (
      <div>

        <IconButton
          onTouchTap={this.toggle}
          ref={ref => (this.iconRef = ReactDOM.findDOMNode(ref))}
        >
          <AccountIcon color={this.context.muiTheme.appBar.textColor} />
        </IconButton>
        {/* <Avatar
          onTouchTap={this.toggle}
          ref={ref => (this.avatarRef = ReactDOM.findDOMNode(ref))}
        >
          {this.state.name ? this.state.name.charAt(0) : this.smiley}
          </Avatar> */}
        <Popover
          style={{ padding: 8 }}
          open={this.state.open}
          anchorEl={this.iconRef}
          onRequestClose={this.toggle}
          useLayerForClickAway={false}
        >
          Logged in as {this.state.name}
          <FlatButton label="Log out" onTouchTap={this.logout} />
        </Popover>
      </div>
    );
  }
}

AccountIconButton.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default AccountIconButton;
