const { User, Book, Auth } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthError('You need to be logged in!');
        }
    },
    Mutation: {
        login: async (_, { email, password }) => {
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
        saveBooke: async (_, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                   context.user._id,
                   { $push: { savedBooks: bookData } },
                   { new: true }
                );
            }
            throw new AuthError('You need to be logged in!');
        },
        removeBook: async (_, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    context.user._id,
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;