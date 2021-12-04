const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const reviewData = data.reviews;

router.get('/delete/:id', async (req, res) => {
    try {
        let deleteReview = await reviewData.removeReviewById(req.params.id);
        res.json(deleteReview);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

module.exports = router;
