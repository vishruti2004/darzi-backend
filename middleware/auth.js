const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization
     if (!token) {
        return res.status(401).json({
            status: false,
            message: 'Unauthorized user. Token missing.',
        })
    }
     try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        //  const decoded = jwt.verify(token,darzi);

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: false,
                message: 'Token expired',
            });
        }
        return res.status(401).json({
            status: false,
            message: 'Token not valid',
        });
    }
};
