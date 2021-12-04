const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;
const sharp = require('sharp');
const fs = require('fs');
const fileUpload = require('express-fileupload');

router.get('/', async (req, res) => {
    let name=req.query.name
    //console.log(getCategory);
    
    const menuData = await userData.getMenuByCategory(name);
    //console.log(menuData);
    let getCategory = await userData.getAllCategory();
    //res.render('pages/menu',{pageHeading:`Menu for ${name}`,data:menuData,getCategory});
        res.json({menuData})
});

module.exports=router;