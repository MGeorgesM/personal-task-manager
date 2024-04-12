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
    const user = req.user;

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
    const userId = req.user._id;
    const id = req.params.id;
    const { title, description } = req.body;

    try {
        // const board = await Board.findOneAndUpdate(
        //     { _id: id, owner: userId },
        //     { title, description },
        //     { new: true }
        // );
        // !board && res.status(404).json({ error: 'Board not found' });
        // return res.status(200).json(board);

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'boards.$[elem]': { title, description },
                },
            },
            { new: true, arrayFilters: [{ 'elem._id': id }] }
        );

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating board' });
    }
};

const deleteBoard = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    'boards.$._id': id,
                },
            },
            { new: true }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while deleting board' });
    }
};

module.exports = { createBoard, getBoards, updateBoard, deleteBoard };
