const jwt = require('jsonwebtoken');

const { User } = require('../models/user.model');

const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        existingUser && res.status(400).send({ error: 'User already exists' });

        const createdUser = await User.create({ fullName, email, password });
        return res.status(201).json(createdUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error while registering'});
    }
};

const login = async (req, res) => {
    const { email, password: plainTextPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        !user && res.status(400).json('User not found');

        const isPasswordMatch = await user.comparePassword(plainTextPassword);
        !isPasswordMatch && res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error while signing in'});
    }
};

module.exports = { register, login };
