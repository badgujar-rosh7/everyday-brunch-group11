const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;

router.get('/', async (req, res) => {
    try{
        const menuData = await userData.getAllMenu();
        //console.log(menuData);
        res.render('pages/menu',{pageHeading:"Menu",data:menuData});
    }
    catch(e){
        res.render('pages/errors');
    }
});


module.exports = router;