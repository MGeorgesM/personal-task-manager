const { Board } = require('../models/board.model');

const createBoard = async (req, res) => {
    const { title, description, owner } = req.body;

    try {
        const createdBoard = await Board.create({ title, description, owner });
        return res.status(201).json(createdBoard);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while creating board' });
    }
};

const getBoards = async (req, res) => {
    const userId = req.user._id;
    const boardId = req.params.id;

    try {
        if (boardId) {
            const board = await Board.findOne({ _id: boardId, owner: userId });
            return res.status(200).json(board);
        } else {
            const boards = await Board.find({ owner: userId });
            return res.status(200).json(boards);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching boards' });
    }
};

const updateBoard = async (req, res) => {
    const userId = req.user._id;
    const boardId = req.params.id;
    const { title, description } = req.body;

    try {
        const board = await Board.findOneAndUpdate(
            { _id: boardId, owner: userId },
            { title, description },
            { new: true }
        );
        !board && res.status(404).json({ error: 'Board not found' });
        return res.status(200).json(board);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating board' });
    }
};

const deleteBoard = async (req, res) => {
    const userId = req.user._id;
    const boardId = req.params.id;

    try {
        const deletedBoard = await Board.findOneAndDelete({ _id: boardId, owner: userId });
        return res.status(200).json(deletedBoard);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while deleting board' });
    }
};

module.exports = { createBoard, getBoards, updateBoard, deleteBoard };
