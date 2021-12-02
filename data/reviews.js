const { object, ObjectId } = require('mongodb');
const errorcheck = require('./error');
const mongoCollections = require('../config/mongoCollections');
const usercollection = mongoCollections.users;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
module.exports = {
    async createReview(userId, review, rating, dateofReview) {
        try {
            const validateArgs = errorcheck.validateArgumentsCreateReview(
                arguments.length
            );
            let newReview = {
                review_id: ObjectId(),
                reviewer_id: userId,
                item_id: foodId,
                dateofReview: dateofReview,
                rating: rating,
                review: review,
            };
        } catch (error) {
            throwCatchError(error);
        }
    },
    async getReviewsByUserId(userId) {},
    async getReviewsByItemId(foodId) {},
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
