const { User, Book} = require('../models');
const { signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log("Hit Me Query")
            if (context.user) {
                console.log("Hit Me 2")
                const payload = await User.findOne({ _id: context.user._id }).populate('savedBooks');
                return payload;
            }
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthError('Incorrect email or password!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthError('Incorrect email or password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                   context.user._id,
                   { $push: { savedBooks: bookData } },
                   { new: true }
                );
                return updatedUser;
            }
        },
        removeBook: async (_, { bookId }, context) => {
            console.log("server/schema/resolvers.js/bookId ---> ", bookId);
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
        },
    },
};

module.exports = resolvers;