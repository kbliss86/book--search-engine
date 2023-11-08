//add appolo server
// const { AuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql');
//add json web token
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not be authenticated.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes - old code
  // authMiddleware: function (req, res, next) {
    authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers - old code
    // let token = req.query.token || req.headers.authorization;
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // ["Bearer", "<tokenvalue>"] - old code
    // if (req.headers.authorization) {
    //   token = token.split(' ').pop().trim();
    // }

    if (!token) {
      return req;
    }
    try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
  }
  return req;
},

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
