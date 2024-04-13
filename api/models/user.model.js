const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        attachments: {
            type: [String],
            default: [],
        },
        tags: {
            type: [String],
            default: [],
        },
    },
);

const columnSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true,
    },
    tasks: {
        type: [taskSchema],
        default: [],
    },
});

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
            type: [columnSchema],
            default: [],
        },
    },
);

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        boards: {
            type: [boardSchema],
            default: [],
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };
