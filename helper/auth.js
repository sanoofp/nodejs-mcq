module.exports = {
  cookieExtractor: function(req) {
    let token = null;
    if (req && req.headers) {
      token = req.headers['x-auth-token'];
    }
    return token;
  }
}