const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.user;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

router.get('/', async (req, res) => {
    try {
        const getAllUsers = await userData.getAllUsers();
        res.json(getAllUsers);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let getUserById = await userData.getUserById(req.params.id);
        res.json(getUserById);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

module.exports = router;
