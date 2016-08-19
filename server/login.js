const { generateId, ONE_HOUR } = require('./utils');
const { CLIENT_ID, REDIRECT_URI } = process.env;

const URL = 'https://www.reddit.com/api/v1/authorize?' +
  `client_id=${CLIENT_ID}`        +
  `&response_type=code`           +
  `&redirect_uri=${REDIRECT_URI}` +
  `&duration=temporary`           +
  `&scope=read identity mysubreddits`;

// login sets a session cookie, then redirects to reddit authorize page
function login(req, res) {

  const state = generateId();
  const sessionId = generateId();

  req.app.locals.sessions[sessionId] = { state };

  // remove the session after an hour
  setTimeout(() => (req.app.locals.sessions[sessionId] = null), ONE_HOUR);

  res.cookie('sessionId', sessionId, { maxAge: ONE_HOUR });
  res.redirect(URL + `&state=${state}`);
};

module.exports = login;
