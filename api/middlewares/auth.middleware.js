const jwt = require('jsonwebtoken');

const { User } = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (token === 'null') return res.status(401).json({ error: 'Unauthorized. Please sign in.' });

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(!decoded) return res.status(401).json({ error: 'Unauthorized. Invalid token.' });

            const user = await User.findById(decoded._id).select('-password');
            if (!user) return res.status(401).json({ error: 'Unauthorized. User not found.' });

            req.user = user;
            return next();
        } else {
            return res.status(401).json({ error: 'Unauthorized. Please sign in.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while authenticating', error });
    }
};

module.exports = authMiddleware;
