const bug_model = require('../models/bug.models');

exports.createBug = async (req, res) => {
    try {
        const bug_obj = req.body;
        const bug = await bug_model.create(bug_obj);
        res.status(201).send({
            message: 'Bug created',
            bug: bug
        });
    } catch (err) {
        console.error('Error while creating bug:', err);
        res.status(500).send({
            message: 'Error while creating bug'
        });
    }
};

exports.getBug = async (req, res) => {
    try {
        const bugs = await bug_model.find();
        if (bugs.length > 0) {
            res.status(200).send(bugs);
        } else {
            res.status(404).send({
                message: 'No bugs found'
            });
        }
    } catch (err) {
        console.error('Error while fetching bugs:', err);
        res.status(500).send({
            message: 'Error while fetching bugs'
        });
    }
};

exports.updateBug = async (req, res) => {
    try {
        const bug_name = req.body.name;
        const new_bug_body = req.body;
        const updated_bug = await bug_model.findOneAndUpdate({ name: bug_name }, new_bug_body, { new: true });
        if (updated_bug) {
            res.status(200).send({
                message: 'Bug updated',
                new_bug: updated_bug
            });
        } else {
            res.status(404).send({
                message: 'Bug not found'
            });
        }
    } catch (err) {
        console.error('Error while updating bug:', err);
        res.status(500).send({
            message: 'Error while updating bug'
        });
    }
};

exports.deleteBug = async (req, res) => {
    try {
        const bug_name = req.body.name;
        const bug = await bug_model.findOneAndDelete({ name: bug_name });
        if (bug) {
            res.status(200).send({
                message: 'Bug deleted',
                bug: bug
            });
        } else {
            res.status(404).send({
                message: 'Bug not found'
            });
        }
    } catch (err) {
        console.error('Error while deleting bug:', err);
        res.status(500).send({
            message: 'Error while deleting bug'
        });
    }
};

exports.getPendingBug = async (req, res) => {
    try {
        const bugs = await bug_model.find({ status: 'PENDING' });
        if (bugs.length > 0) {
            res.status(200).send({
                message: 'Pending bugs fetched',
                bugs: bugs
            });
        } else {
            res.status(404).send({
                message: 'No pending bugs found'
            });
        }
    } catch (err) {
        console.error('Error while fetching pending bugs:', err);
        res.status(500).send({
            message: 'Error while fetching pending bugs'
        });
    }
};

exports.getResolvedBug = async (req, res) => {
    try {
        const bugs = await bug_model.find({ status: 'RESOLVED' });
        if (bugs.length > 0) {
            res.status(200).send({
                message: 'Resolved bugs fetched',
                bugs: bugs
            });
        } else {
            res.status(404).send({
                message: 'No resolved bugs found'
            });
        }
    } catch (err) {
        console.error('Error while fetching resolved bugs:', err);
        res.status(500).send({
            message: 'Error while fetching resolved bugs'
        });
    }
};

exports.getBugWithName = async (req, res) => {
    try {
        const bug_name = req.body.name;
        const bugs = await bug_model.find({ name: bug_name });
        if (bugs.length > 0) {
            res.status(200).send({
                message: 'Bug with provided name fetched',
                bugs: bugs
            });
        } else {
            res.status(404).send({
                message: 'Bug with provided name not present'
            });
        }
    } catch (err) {
        console.error('Error while fetching bug of provided name', err);
        res.status(500).send({
            message: 'Error while fetching bug of provided name'
        });
    }
};

