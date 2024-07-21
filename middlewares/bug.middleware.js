const jwt=require('jsonwebtoken')
const sm_config=require('../configs/sm.configs')
const user_model=require('../models/user.models')
const bug_model=require('../models/bug.models')

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'No token found: Unauthorized'
        });
    }

    jwt.verify(token, sm_config.secretMessage, async (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(401).send({
                message: 'Unauthorized'
            });
        }

        try {
            const user = await user_model.findOne({ _id: decoded.id });
            if (!user) {
                return res.status(400).send({
                    message: "Unauthorized, the user for this token doesn't exist"
                });
            }

            req.user = user; // Pass the user information to the next middleware

            next();
        } catch (dbErr) {
            console.error('Database query failed:', dbErr);
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        }
    });
};

const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.userType === 'ADMIN') {
        next();
    } else {
        return res.status(403).send({
            message: 'Only admin user allowed'
        });
    }
};

const verifyBugBody = async (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: 'Name not provided in request body'
            });
        }

        if (!req.body.description) {
            return res.status(400).send({
                message: 'Description not provided in request body'
            });
        }

        const bug = await bug_model.findOne({ name: req.body.name });
        if (bug) {
            return res.status(400).send({
                message: 'Bug with the same name already present'
            });
        }

        next();
    } catch (err) {
        console.error('Error while validating request body:', err);
        res.status(500).send({
            message: 'Error while validating request body'
        });
    }
};



module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    verifyBugBody: verifyBugBody
};
