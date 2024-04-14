const { User } = require('../models/user.model');

const createBoard = async (req, res) => {
    const { title, description } = req.body;
    const user = req.user;
    try {
        user.boards.push({ title, description });
        const updatedUser = await user.save();
        return res.status(201).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while creating board', error });
    }
};

const getBoards = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    try {
        if (id) {
            const board = user.boards.find((board) => board._id.toString() === id);
            !board && res.status(404).json({ error: 'Board not found' });
            return res.status(200).json(board);
        } else {
            return res.status(200).json(user.boards);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching boards' });
    }
};

const updateBoard = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const { title, description } = req.body;

    try {
        const boards = user.boards;
        const boardIndex = boards.findIndex((board) => board._id.toString() === id);
        if (boardIndex === -1) return res.status(404).json({ error: 'Board not found' });

        title && (boards[boardIndex].title = title);
        description && (boards[boardIndex].description = description);
        await user.save();

        return res.status(200).json(boards);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating board' });
    }
};

const deleteBoard = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.boards = user.boards.filter((board) => board._id.toString() !== id);
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while deleting board' });
    }
};

module.exports = { createBoard, getBoards, updateBoard, deleteBoard };
