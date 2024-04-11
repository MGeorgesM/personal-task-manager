const { User } = require('../models/user.model');

const getUser = async (req, res) => {
    const id = req.user._id;

    try {
        const user = await User.findById(id);
        !user && res.status(404).json({ error: 'User not found' });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching user' });
    }
};

module.export = { getUser };