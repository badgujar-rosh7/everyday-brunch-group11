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
    async addFavorite(userId, foodId) {
        try {
            const validatedUserId = errorcheck.validateUserId(userId);
            const validatedFoodId = errorcheck.validateUserId(foodId);

            const addFav = {
                foodId: ObjectId(validatedFoodId),
                userId: ObjectId(validatedUserId),
            };

            const userColl = await usercollection();
            const finduser = await userdata.getUserById(validatedUserId);
            const updatedInfo = await userColl.updateOne(
                { _id: ObjectId(validatedUserId) },
                { $push: { favorite_item: addFav } }
            );

            if (updatedInfo.modifiedCount !== 1) {
                throwError(
                    ErrorCode.INTERNAL_SERVER_ERROR,
                    'Error: Could not add to Favorites.'
                );
            }
            return { addedtoFavorite: true };
        } catch (error) {
            throwCatchError(error);
        }
    },
    async removeFavorite(userId, foodId) {
        try {
            const validatedUserId = errorcheck.validateUserId(userId);
            const validatedFoodId = errorcheck.validateUserId(foodId);

            const userColl = await usercollection();
            const finduser = await userdata.getUserById(validatedUserId);
            if (!finduser) {
                throwError(
                    ErrorCode.NOT_FOUND,
                    'Error: No User found with given Id.'
                );
            } else {
                const deleteFavorite = await userColl.updateOne(
                    { _id: ObjectId(validatedUserId) },
                    {
                        $pull: {
                            favorite_item: {
                                foodId: ObjectId(validatedFoodId),
                            },
                        },
                    }
                );
                if (deleteFavorite.modifiedCount !== 1) {
                    throwError(
                        ErrorCode.INTERNAL_SERVER_ERROR,
                        'Error: Could not delete from Favorites.'
                    );
                } else return { deletedfromFavorite: true };
            }
        } catch (error) {
            throwCatchError(error);
        }
    },
    async getAllfavorite(userId) {
        try {
            const validatedUserId = errorcheck.validateUserId(userId);
            const userColl = await usercollection();
            const finduser = await userdata.getUserById(validatedUserId);
            if (
                finduser.hasOwnProperty('favorite_item') &&
                finduser.favorite_item.length < 1
            ) {
                throwError(
                    ErrorCode.NOT_FOUND,
                    'Error: No favorites found for the given User.'
                );
            }
            let result = [];
            for (let eachFav of finduser.favorite_item) {
                eachFav.foodId = eachFav.foodId.toString();
                eachFav.userId = eachFav.userId.toString();
                result.push(eachFav);
            }
            return result;
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
