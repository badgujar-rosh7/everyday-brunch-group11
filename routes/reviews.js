const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const reviewData = data.reviews;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
router.post('/newreview', async (req, res) => {
    try {
        const { userId, review, rating } = req.body;
        const current_datetime = new Date();
        const formatted_date =
            current_datetime.getMonth() +
            1 +
            '/' +
            current_datetime.getDate() +
            '/' +
            current_datetime.getFullYear();
        const createReview = await reviewData.createReview(
            userId,
            review,
            rating,
            formatted_date
        );
        res.json(createReview);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const reviewByUserId = await reviewData.getAllReviewsByUserId(
            req.params.id
        );
        res.json(reviewByUserId);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});
router.get('/review/:id', async (req, res) => {
    try {
        const reviewByreviewId = await reviewData.getReviewByReviewId(
            req.params.id
        );
        res.json(reviewByreviewId);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});
router.get('/delete/:id', async (req, res) => {
    try {
        let deleteReview = await reviewData.removeReviewById(req.params.id);
        res.json(deleteReview);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

module.exports = router;
