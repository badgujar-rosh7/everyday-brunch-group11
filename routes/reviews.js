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
router.post('/newreview', async (req, res) => {});
router.get('/:id', async (req, res) => {});
router.get('/review/:id', async (req, res) => {});
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
