const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findById({ _id: userId });
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const newUser = await User.create({ username, email, password });

      const token = signToken(newUser);

      return { token, newUser };
    },

    login: async (parent, { email, password }) => {
      console.log(email, password);
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { userId, book }) => {
      return User.findByIdAndUpdate(
        userId,
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );
    },
    deleteBook: async (parent, { userId, book }) => {
      return await User.findByIdAndUpdate(
        userId,
        { $pull: { savedBooks: book } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
