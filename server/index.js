const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const login = require('./login');
const redirect = require('./redirect');
const addAccessTokenCookie = require('./addAccessToken');
const filterBadSessions = require('./filterBadSessions');

const app = express();

// maps session ids to states and access_tokens
app.locals.sessions = {};

// parse cookies into req.cookies
app.use(cookieParser());

// add the access token if it doesn't exist
app.use(addAccessTokenCookie);

// when user comes back from reddit auth
app.get('/redirect', redirect);

// when user clicks login button
app.get('/login', login);

// remove sessionId if there's no internal accessToken associated with it
app.use(filterBadSessions);

// serve static css, js
app.use(express.static(__dirname + '/../dist'));

// everything else - just send them to the site
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Express started on port ${port}.`));
