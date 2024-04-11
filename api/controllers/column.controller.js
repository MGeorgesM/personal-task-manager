const { Column } = require('../models/column.model');

const createColumn = async (req, res) => {
    const { title, boardId } = req.body;

    try {
        const createdColumn = await Column.create({ title, owner: boardId });
        return res.status(201).json(createdColumn);
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
