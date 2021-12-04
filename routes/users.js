const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const usersData = data.user;
const sharp=require('sharp')
const fs = require('fs')
const fileUpload = require('express-fileupload');

router.get('/', async (req, res) => {
    try{
        const menuData = await usersData.getAllMenu();
        //console.log(menuData);
        res.render('pages/menu',{pageHeading:"Menu",data:menuData});
    }
    catch(e){
        res.render('pages/errors');
    }
});  


module.exports = router;