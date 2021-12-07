const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.user;
const signupData = data.signup;
const xss = require('xss');
const moment = require('moment');
const errorcheck = data.error;

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
    let userId = xss(req.session.user.userId);
    try {
        const validateduserId = errorcheck.validateUserId(req.params.id);
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
    res.render('pages/signupform');
});

// router.get('/logout', async (req, res) => {
//     if (!req.session.user) {
//         res.redirect('/');
//     } else {
//         req.session.destroy();
//         res.render('pages/logout');
//     }
// });
module.exports = router;
