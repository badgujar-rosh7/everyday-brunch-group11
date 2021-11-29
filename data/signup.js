const { object } = require('mongodb');
const bcrypt = require('bcryptjs');
const saltRounds = 16;
const errorcheck = require('./error');
const mongoCollections = require('../config/mongoCollections');
const usercollection = mongoCollections.users;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

async function createUser(
    // firstname,
    // lastname,
    // email,
    // dob,
    // city,
    // state,
    username,
    password
) {
    try {
        const validateArgs = errorcheck.validateArgumentsCreateUser(
            arguments.length
        );
        const validateUsername = errorcheck.validateUsername(username);
        const validatePassword = errorcheck.validatePassword(password);

        let usernameLower = username.trim().toLowerCase();
        const userColl = await usercollection();
        const finduser = await userColl.findOne({ username: usernameLower });

        if (finduser === null) {
            const hashPass = await bcrypt.hash(password, saltRounds);
            const newUser = {
                firstName: firstname,
                lastName: lastname,
                email: email,
                DateOfBirth: dob,
                City: city,
                State: state,
                username: usernameLower,
                password: hashPass,
                favorite_item: [],
                reviews: [],
            };
            const insertuser = await userColl.insertOne(newUser);
            if (insertuser) return { userInserted: true };
            else {
                throwError(ErrorCode.INTERNAL_SERVER_ERROR, 'Could not signup');
            }
        } else {
            throwError(
                ErrorCode.BAD_REQUEST,
                'User already exist with username'
            );
        }
    } catch (error) {
        throwCatchError(error);
    }
}
const throwError = (code = 404, message = 'Not found') => {
    throw { code, message };
};
const throwCatchError = (error) => {
    if (error.code && error.message) {
        throwError(error.code, error.message);
    }

    throwError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        'Error: Internal server error.'
    );
};
module.exports = { createUser };
