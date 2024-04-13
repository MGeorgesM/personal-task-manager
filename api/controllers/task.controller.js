const { User } = require('../models/user.model');

const createTask = async (req, res) => {
    const { title, description, attachment, tags, columnId } = req.body;
    const userId = req.user._id;

    if (!title || !columnId) return res.status(400).json({ error: 'Title and columnId are required' });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const board = user.boards.find((board) => board.columns.find((column) => column._id.toString() === columnId));
        if (!board) return res.status(404).json({ error: 'Board not found' });

        const column = board.columns.find((column) => column._id.toString() === columnId);
        if (!column) return res.status(404).json({ error: 'Column not found' });

        column.tasks.push({ title, description, attachment, tags });
        await user.save();

        return res.status(201).json(column.tasks[column.tasks.length - 1]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while creating task' });
    }
};

const getTasks = async (req, res) => {
    const columnId = req.params.columnId;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const board = user.boards.find((board) => board.columns.find((column) => column._id.toString() === columnId));
        if (!board) return res.status(404).json({ error: 'Board not found' });

        const column = board.columns.find((column) => column._id.toString() === columnId);
        if (!column) return res.status(404).json({ error: 'Column not found' });

        return res.status(200).json(column.tasks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching tasks' });
    }
};

const updateTask = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    const { title, description, attachment, tags, columnId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        let task;

        if (columnId) {
            let currentColumn;
            let destinationColumn;

            user.boards.forEach((board) => {
                board.columns.forEach((column) => {
                    if (column.tasks.find((task) => task._id.toString() === id)) {
                        currentColumn = column;
                    }
                    if (column._id.toString() === columnId) {
                        destinationColumn = column;
                    }
                });
            });

            if (!currentColumn || !destinationColumn) return res.status(404).json({ error: 'Column not found' });

            if (currentColumn._id.toString() !== destinationColumn._id.toString()) {
                const taskIndex = currentColumn.tasks.findIndex((task) => task._id.toString() === id);
                if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

                [task] = currentColumn.tasks.splice(taskIndex, 1);

                destinationColumn.tasks.push(task);
            }
        }

        if (!task) {
            user.boards.forEach((board) => {
                board.columns.forEach((column) => {
                    const foundTask = column.tasks.find((task) => task._id.toString() === id);
                    if (foundTask) task = foundTask;
                });
            });
        }

        if (!task) return res.status(404).json({ error: 'Task not found' });

        title && (task.title = title);
        description && (task.description = description);
        attachment && (task.attachment = attachment);
        tags && (task.tags = tags);

        await user.save();
        return res.status(200).json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error while updating task' });
    }
};

const deleteTask = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        let taskFound = false;
        
        user.boards.forEach((board) => {
            board.columns.forEach((column) => {
                const taskIndex = column.tasks.findIndex((task) => task._id.toString() === id);
                if (taskIndex !== -1) {
                    column.tasks.splice(taskIndex, 1);
                    taskFound = true;
                }
            });
        });

        if (!taskFound) return res.status(404).json({ error: 'Task not found' });

        await user.save();
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while deleting task' });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
