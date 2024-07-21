const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_model = require('../models/user.models');
const sm_config = require('../configs/sm.configs');

exports.signUp = async (req, res) => {
    const req_body = req.body;
    if (req_body.userType == "ADMIN") {
        return res.status(400).send({
            message: "admin already exist"
        });
    }

    const userObj = {
        name: req_body.name,
        userType: req_body.userType,
        password: bcrypt.hashSync(req_body.password, 8)
    };
    try {
        const user = await user_model.create(userObj);

        const resObj = {
            name: user.name,
            userType: user.userType,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(201).send({
            message: "User registered successfully",
            user: resObj
        });
    } catch (err) {
        console.error("Error while creating user:", err);
        res.status(500).send({
            message: "Error while registering user"
        });
    }
};

exports.signIn = async (req, res) => {
    const user = await user_model.findOne({ name: req.body.name });

    if (!user) {
        return res.status(400).send({
            message: "User ID passed is not a valid user ID"
        });
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Wrong password passed"
        });
    }

    const token = jwt.sign({ id: user._id }, sm_config.secretMessage, {
        expiresIn: 12000 // seconds
    });
    

    res.status(200).send({
        name: user.name,
        userType: user.userType,
        accessToken: token
    });
};
