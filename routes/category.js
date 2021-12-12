const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;
const xss=require('xss')

const fileUpload = require('express-fileupload');

router.get('/', async (req, res) => {
    try{
    let name=xss(req.query.name)
    //console.log(getCategory);
    if(req.session.user){
    const menuData = await userData.getMenuByCategory(name);
    //console.log(menuData);
    let getCategory = await userData.getAllCategory();
    res.render('pages/menu',{pageHeading:`Menu for ${name}`,data:menuData,getCategory,id:req.session.user.userId});
    } else{
        const menuData = await userData.getMenuByCategory(name);
        //console.log(menuData);
        let getCategory = await userData.getAllCategory();
        res.render('pages/menu',{pageHeading:`Menu for ${name}`,data:menuData,getCategory});

    }
 }
 catch(error){
     res.status(500).send({errorMessage:error})
 } //res.json({menuData})
});

module.exports=router;
