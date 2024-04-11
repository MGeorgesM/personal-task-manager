const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            require: 'Full Name is required',
            select: false,
        },
        email: {
            type: String,
            require: 'Email is required',
            unique: true,
        },
        password: {
            type: String,
            require: 'Password is required',
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };
