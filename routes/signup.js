const express = require('express');
const router = express.Router();
const data = require('../data');
const signupData = data.signup;
const xss = require('xss');

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
        const firstname = xss(req.body.firstname.trim());
        const lastname = xss(req.body.lastname.trim());
        const email = xss(req.body.email.trim());
        const dob = xss(req.body.dob.trim());
        const city = xss(req.body.city.trim());
        const state = xss(req.body.state.trim());

        const username = xss(req.body.username.trim());
        const password = xss(req.body.password.trim());

        const createUser = await signupData.createUser(
            firstname,
            lastname,
            email,
            dob,
            city,
            state,
            username,
            password
        );
        res.json(createUser);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});
module.exports = router;
