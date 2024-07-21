const user_model = require('../models/user.models');

const verifySignUpBody = async (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: "Name not provided in request body"
            });
        }

        if (!req.body.password) {
            return res.status(400).send({
                message: "Password not provided in request body"
            });
        }

        const user = await user_model.findOne({ name: req.body.name });
        if (user) {
            return res.status(400).send({
                message: "User with same name already present"
            });
        }

        next();
    } catch (err) {
        console.error("Error while validating request body", err);
        res.status(500).send({
            message: "Error while validating request body"
        });
    }
};

const verifySignInBody = async (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: "Username not provided in request body"
            });
        }

        if (!req.body.password) {
            return res.status(400).send({
                message: "Password not provided in request body"
            });
        }

        next();
    } catch (err) {
        console.error("Error while validating request body", err);
        res.status(500).send({
            message: "Error while validating request body"
        });
    }
};



module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody
};
