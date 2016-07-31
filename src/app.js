import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepPurple500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StyleRoot } from 'radium';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import MainPage from './components/mainPage';
import PostListContainer from './components/postListContainer';

injectTapEventPlugin();

const Theme = getMuiTheme({
  palette: {
    primary1Color: deepPurple500,
  },
});

const App = () => (
  <StyleRoot>
    <MuiThemeProvider muiTheme={Theme}>

      <Router history={browserHistory}>
        <Route path="/" component={MainPage}>
          <IndexRoute component={PostListContainer} />
          <Route
            path="/r/:subreddit"
            component={PostListContainer}
          />
        </Route>
      </Router>

    </MuiThemeProvider>
  </StyleRoot>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
