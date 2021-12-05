const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.user;
const signupData = data.signup;
const xss = require('xss');
const moment = require('moment');

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

router.get('/profile', async (req, res) => {
    let userId = req.session.user.userId;
    try {
        let getUserById = await userData.getUserById(userId);
        res.json(getUserById);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});
router.get('/myprofile', async (req, res) => {});
router.post('/myprofile', async (req, res) => {});
router.get('/signup', async (req, res) => {
    res.render('pages/signup');
});
router.post('/signup', async (req, res) => {
    const firstname = xss(req.body.firstname.trim());
    const lastname = xss(req.body.lastname.trim());
    const email = xss(req.body.email.trim());
    let dob = xss(req.body.dateOfBirth.trim());
    const city = xss(req.body.city.trim());
    const state = xss(req.body.state.trim());
    const username = xss(req.body.username.trim());
    const password = xss(req.body.password.trim());

    dob = moment(dob).format('MM/DD/YYYY');
    console.log(dob);
    try {
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
        res.redirect('/login');
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).render(
            'pages/signup',
            {
                title: 'Signup',
                hasErrors: true,
                error: error.message || 'Internal Server Error',
            }
        );
    }
});
router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.json('Logged out');
    // res.render('users/logged-out', {
    //     username: user.username,
    //     pageTitle: 'Logged out',
    // });
});
module.exports = router;
