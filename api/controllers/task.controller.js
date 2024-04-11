const { Task } = require('../models/task.model');

const createTask = async (req, res) => {
    const { title, description, attachment, tags, column } = req.body;
    const userId = req.user._id;

    try {
        const createdTask = await Task.create({
            title,
            description,
            attachment,
            tags,
            column,
            owner: userId,
        });
        return res.status(201).json(createdTask);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while creating task' });
    }
};

const getTasks = async (req, res) => {
    const columnId = req.params.columnId;

    try {
        const tasks = await Task.find({ column: columnId });
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching tasks' });
    }
};

const updateTask = async (req, res) => {
    const id = req.params.id;
    const { title, description, attachment, tags, columnId } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, attachment, tags, column: columnId },
            { new: true }
        );

        return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating task' });
    }
};

const deleteTask = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;

    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, owner: userId });
        return res.status(200).json(deletedTask);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while deleting task' });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
