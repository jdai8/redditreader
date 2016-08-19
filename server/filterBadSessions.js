// session is 'bad' if request has a sessionId, but haven't gotten an
// access token from reddit (started auth, but didn't finish)
function filterBadSessions(req, res, next) {

  const session = req.app.locals.sessions[req.cookies.sessionId];
  if (session && !session.accessToken) {
    res.clearCookie('sessionId');
  }
  next();
}

module.exports = filterBadSessions;
