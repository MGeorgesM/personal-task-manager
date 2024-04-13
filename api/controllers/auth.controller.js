const jwt = require('jsonwebtoken');

const { User } = require('../models/user.model');

const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) return res.status(400).json({ error: 'All fields are required' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User with this email already exists' });

        const createdUser = await User.create({ fullName, email, password });

        const token = jwt.sign({ _id: createdUser._id }, process.env.SECRET_KEY);
        return res.status(201).json({ user: createdUser, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while registering', error });
    }
};

const login = async (req, res) => {
    const { email, password: plainTextPassword } = req.body;

    if (!email || !plainTextPassword) return res.status(400).json({ error: 'Email and password are required' });

    try {
        const user = await User.findOne({ email });
        !user && res.status(400).json('User not found');

        const isPasswordMatch = await user.comparePassword(plainTextPassword);
        !isPasswordMatch && res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        const { password, ...userInfo } = user.toObject();
        return res.status(200).json({ user: userInfo, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while signing in', error });
    }
};

module.exports = { register, login };
