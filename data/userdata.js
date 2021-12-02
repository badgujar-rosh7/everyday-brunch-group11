const mongoCollections = require('../config/mongoCollections');
const usercollection = mongoCollections.users;
const errorcheck = require('./error');
var validator = require('validator');
const { ObjectId } = require('mongodb');

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
module.exports = {
    async getAllUsers() {
        try {
            if (arguments.length !== 0) {
                throwError(
                    ErrorCode.BAD_REQUEST,
                    "Error: This function doesn't require to pass parameters."
                );
            }
            const userColl = await usercollection();
            const allUsers = await userColl.find({}).toArray();
            for (let x of allUsers) {
                x._id = x._id.toString();
            }
            return allUsers;
        } catch (error) {
            throwCatchError(error);
        }
    },
    async getUserById(userId) {
        try {
            const isString = errorcheck.isArgumentString(userId);
            const isStringEmpty = errorcheck.isStringEmpty(userId);
            const checkobject = errorcheck.validateObjectId(userId);

            const userCollection = await usercollection();
            let user = await userCollection.findOne({
                _id: ObjectId(userId.trim()),
            });
            if (user === null) throw 'No user found with that id.';
            user._id = user._id.toString();

            return user;
        } catch (error) {
            throwCatchError(error);
        }
    },
};
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
