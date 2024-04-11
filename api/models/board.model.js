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

boardSchema.pre('remove', async function (next) {
    try {
        const User = mongoose.model('User');
        const user = await User.findById(this.owner);
        user.boards = user.boards.filter((board) => board._id.toString() !== this._id.toString());
        await user.save();

        const Column = mongoose.model('Column');
        await Column.deleteMany({ owner: this._id });

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board, boardSchema };
