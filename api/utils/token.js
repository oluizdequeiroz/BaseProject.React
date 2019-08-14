const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(' ')[1];
            req.token = token;
            jwt.verify(req.token, '$alimenta$', (err, authData) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    next();
                }
            });
        } else {
            res.sendStatus(403);
        }
    },
    jwt
};