const { object, ObjectId } = require('mongodb');
const errorcheck = require('./error');
const mongoCollections = require('../config/mongoCollections');
const usercollection = mongoCollections.users;
const userdata = require('./users');

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
    async addFavorite() {},
    async removeFavorite() {},
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
