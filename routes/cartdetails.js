const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const cartData = data.cart;

router.get('/', async (req, res) => {
    if (req.session.userid) {
        // console.log(req.session.userid)
    }
    res.render('pages/cart');
});

module.exports = router;
