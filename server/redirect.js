const request = require('request');
const { ONE_HOUR } = require('./utils');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

// handles redirect from reddit after accept/decline
function redirect(req, res) {

  const session = req.app.locals.sessions[req.cookies.sessionId];

  if (session && session.state &&
    session.state.toString() === req.query.state) {

    if (req.query.code) {

      // request an access token from reddit
      request({
        method: 'POST',
        uri: 'https://www.reddit.com/api/v1/access_token',
        form: {
          grant_type: 'authorization_code',
          code: req.query.code,
          redirect_uri: REDIRECT_URI,
        },
        auth: {
          user: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      },
      (error, response, body) => {

        if (!error) {

          const response = JSON.parse(body);
          session.accessToken = response.access_token;
          res.cookie('accessToken', response.access_token,
            { maxAge: ONE_HOUR }
          );
          res.redirect('/');

        } else {
          // basic auth invalid
          res.send('Error getting access token');
        }
      });

    } else {
      // access declined, or some other error from reddit
      res.redirect('/');
    }

  } else {
    // session doesn't exist or state is incorrect
    res.redirect('/');
    // res.send('Session invalid');
  }
}

module.exports = redirect;
