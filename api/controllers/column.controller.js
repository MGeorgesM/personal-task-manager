const { User } = require('../models/user.model');

const createColumn = async (req, res) => {
    const userId = req.user._id;
    const { title, boardId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const board = user.boards.find((board) => board._id.toString() === boardId);
        if (!board) return res.status(404).json({ error: 'Board not found' });

        const existingColumn = board.columns.find((column) => column.title === title);
        if (existingColumn) return res.status(400).json({ error: 'Column already exists' });

        board.columns.push({ title });
        await user.save();

        return res.status(201).json(board.columns[board.columns.length - 1]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while creating column' });
    }
};

const getColumns = async (req, res) => {
    const boardId = req.params.boardId;
    const user = req.user;
    try {
        const board = user.boards.find((board) => board._id.toString() === boardId);
        if (!board) return res.status(404).json({ error: 'Board not found' });
        return res.status(200).json(board.columns);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching columns' });
    }
};

const updateColumn = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    const { title } = req.body;

    if (!title) return res.status(200).json({ message: 'Nothing to update' });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        let updatedColumn;

        user.boards.forEach((board) => {
            const column = board.columns.find((column) => column._id.toString() === id);
            if (column) {
                column.title = title;
                updatedColumn = column;
            }
        });

        if (!updatedColumn) return res.status(404).json({ error: 'Column not found' });

        await user.save();
        return res.status(200).json(updatedColumn);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating column' });
    }
};

const deleteColumn = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const board = user.boards.find((board) => board.columns.find((column) => column._id.toString() === id));
        if (!board) return res.status(404).json({ error: 'Board not found' });

        board.columns = board.columns.filter((column) => column._id.toString() !== id);
        await user.save();

        return res.status(200).json({ message: 'Column deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while deleting column' });
    }
};

module.exports = { createColumn, getColumns, updateColumn, deleteColumn };
