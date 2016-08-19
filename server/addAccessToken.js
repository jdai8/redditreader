const request = require('request');
const { ONE_HOUR } = require('./utils');
const { CLIENT_ID, CLIENT_SECRET } = process.env;

const getAccessToken = (function() {

  let currentToken;
  return callback => {

    if (!currentToken || currentToken.expirationTime < Date.now()) {
      // current token invalid, so get a new one
      request({
        method: 'POST',
        url: 'https://www.reddit.com/api/v1/access_token',
        body: 'grant_type=client_credentials',
        auth: {
          user: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      },
      (error, response, body) => {
        if (!error) {
          currentToken = JSON.parse(body);
          currentToken.expirationTime = Date.now() + currentToken.expires_in * 1000;

          callback(currentToken.access_token);

        } else callback(null);
      });

    } else {
      // current token is still valid
      callback(currentToken.access_token);
    }
  }
})();

function addAccessTokenCookie(req, res, next) {
  if (req.cookies.accessToken) next();
  else {
    getAccessToken(accessToken => {
      if (accessToken) {
        res.cookie('accessToken', accessToken, { maxAge: ONE_HOUR });
      }
      next();
    });
  }
}

module.exports = addAccessTokenCookie;
