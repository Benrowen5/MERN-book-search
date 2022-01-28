const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// define resolvers
const resolvers = {
    Query: {

    },
    Mutation: {

    }
};

module.exports = resolvers;