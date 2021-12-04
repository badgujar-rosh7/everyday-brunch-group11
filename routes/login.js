const express = require('express');
const router = express.Router();
const data = require('../data');
const loginData = data.login;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
router.get('/', async (req, res) => {
    res.render('pages/loginform');
});
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkuser = await loginData.checkUser(username, password);
        res.json(checkuser);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});
module.exports = router;
