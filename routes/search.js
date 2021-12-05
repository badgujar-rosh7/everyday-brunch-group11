const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;

router.post('/', async(req,res)=>{
    let searchTerm=req.body['searchTerm'];
    console.log(searchTerm)
    let searchResult=await userData.search(searchTerm);
    if(searchResult.length>0){
        // render result page-------res.json({searchResult})
        res.render('pages/searchresult',{searchResult,pageHeading:`Search Result For: ${searchTerm}`})
    } else {
        ///no result page
        res.render('pages/searchresult',{searchResult,pageHeading:`NO Result For: ${searchTerm}`})
    }

});

module.exports=router;