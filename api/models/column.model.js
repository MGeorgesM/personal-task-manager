const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
        },
    },
    { timestamps: true }
);

const Column = mongoose.model('Column', columnSchema);

module.exports = { Column, columnSchema };
