const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        columns: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Column',
            default: [],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board, boardSchema };