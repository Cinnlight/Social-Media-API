const router = require('express').Router();
const { Thought, User } = require('../../models');

// Controller Functions

// Get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create a new thought
const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        // Add thought to user's thoughts array
        await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a thought by ID
const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID!' });
        }
        // Remove thought from user's thoughts array
        await User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );
        res.json({ message: 'Thought deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        ).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        ).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;