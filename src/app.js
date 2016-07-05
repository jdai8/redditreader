import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepPurple500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {StyleRoot} from 'radium';

import MainPage from './components/mainPage';

injectTapEventPlugin();

const Theme = getMuiTheme({
    palette: {
        primary1Color: deepPurple500
    }
});

const App = () => (
    <StyleRoot>
        <MuiThemeProvider muiTheme={Theme}>
            <MainPage />
        </MuiThemeProvider>
    </StyleRoot>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
