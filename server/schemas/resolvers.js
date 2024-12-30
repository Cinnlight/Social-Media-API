const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('thoughts').populate('friends');
        },
        user: async (parent, { _id }) => {
            return User.findById(_id).populate('thoughts').populate('friends');
        },
        thoughts: async () => {
            return Thought.find().populate('reactions');
        },
        thought: async (parent, { _id }) => {
            return Thought.findById(_id).populate('reactions');
        },
    },
    Mutation: {
        addUser: async (parent, { username, email }) => {
            return User.create({ username, email });
        },
        updateUser: async (parent, { _id, username, email }) => {
            return User.findByIdAndUpdate(
                _id,
                { username, email },
                { new: true, runValidators: true }
            );
        },
        removeUser: async (parent, { _id }) => {
            return User.findByIdAndDelete(_id);
        },
        addFriend: async (parent, { userId, friendId }) => {
            return User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } },
                { new: true }
            ).populate('friends');
        },
        removeFriend: async (parent, { userId, friendId }) => {
            return User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { new: true }
            ).populate('friends');
        },
        addThought: async (parent, { thoughtText, username }) => {
            const thought = await Thought.create({ thoughtText, username });
            await User.findOneAndUpdate(
                { username },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            return thought;
        },
        updateThought: async (parent, { _id, thoughtText }) => {
            return Thought.findByIdAndUpdate(
                _id,
                { thoughtText },
                { new: true, runValidators: true }
            );
        },
        removeThought: async (parent, { _id }) => {
            return Thought.findByIdAndDelete(_id);
        },
        addReaction: async (parent, { thoughtId, reactionBody, username }) => {
            return Thought.findByIdAndUpdate(
                thoughtId,
                { $addToSet: { reactions: { reactionBody, username } } },
                { new: true, runValidators: true }
            );
        },
        removeReaction: async (parent, { thoughtId, reactionId }) => {
            return Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;
