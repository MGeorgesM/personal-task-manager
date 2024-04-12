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

    try {
        const columns = await Column.find({ owner: boardId });
        return res.status(200).json(columns);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching columns' });
    }
};

const updateColumn = async (req, res) => {
    const id = req.params.id;
    const { title } = req.body;

    try {
        const column = await Column.findByIdAndUpdate(id, { title }, { new: true });
        !column && res.status(404).json({ error: 'Column not found' });
        return res.status(200).json(column);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating column' });
    }
};

const deleteColumn = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedColumn = await Column.findByIdAndDelete(id);
        return res.status(200).json(deletedColumn);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while deleting column' });
    }
};

module.exports = { createColumn, getColumns, updateColumn, deleteColumn };
