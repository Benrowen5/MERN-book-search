const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// define resolvers
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__V -password')
                    .populate('savedBooks')
                return userData;
            }
            throw new AuthenticationError('You are not logged in.');
        },
        books: async () => {
            return Book.find({})
                .select('-__V')
        }
    },
    // Mutation: {
        loginUser: async (parent, {email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('Incorrect credentials.');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect password.');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookId }, context) => {
            if(context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookId } },
                    { new: true }
                ).populate('savedBooks');
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if(context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId } },
                    { new: true }
                ).populate('savedBooks');
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
};

module.exports = resolvers;