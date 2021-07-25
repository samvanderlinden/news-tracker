const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.header('auth-token');

    if (!token) return res.status(401).send('Access Denied');

    try {

        const verify = jwt.verify(token, process.env.TOKEN_SECRET); //VERIFY RETURNS 'PAYLOAD' ON JWT TOKEN. TEST AT JWT.IO FOR REFERENCE
        req.user = verify;
        next();

    } catch (error) {

        res.status(400).send(error.message);
    }
}