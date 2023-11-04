//add appolo server
const { AuthenticationError } = require('apollo-server-express');
//add json web token
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes - old code
  // authMiddleware: function (req, res, next) {
    authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers - old code
    // let token = req.query.token || req.headers.authorization;
    let token = req.headers.authorization;

    // ["Bearer", "<tokenvalue>"] - old code
    // if (req.headers.authorization) {
    //   token = token.split(' ').pop().trim();
    // }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data };
      // req.user = data; - old code
    } catch (err) {
      console.log('Invalid token', err);
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    // next(); - old code
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
