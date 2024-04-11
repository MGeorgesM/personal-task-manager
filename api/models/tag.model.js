const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

tagSchema.pre('remove', async function (next) {
    try {
        const Task = mongoose.model('Task');
        const tasks = await Task.find({ tags: this._id });
        tasks.forEach(async (task) => {
            task.tags = task.tags.filter((tag) => tag.toString() !== this._id.toString());
            await task.save();
        });
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = { Tag, tagSchema };
