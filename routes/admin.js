const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.user;
const sharp=require('sharp')
const fs = require('fs')
const fileUpload = require('express-fileupload');



router.get('/AddCategory' ,async (req,res)=>{
//render the page
});


router.post('/AddCategory' ,async (req,res)=>{
    //render the page
    let category=req.body['category']
    //error checking

    
    let add= await userData.addCategory(category)
    console.log(add)

});

router.get('/newMenu', (req,res) =>{
res.render('pages/upload')
//render view page

});

router.post('/addMenu', async(req,res) =>{

    let uploadFile=req.files.menuFile;
    
    let itemCategory=req.body['itemCategory']
    let itemTitle=req.body['itemTitle']
    let itemDescription=req.body['itemDescription']
    let itemPrice=req.body['itemPrice']
    let itemCalories=req.body['itemCalories']
    let itemKeywords=req.body['itemKeywords']
    let itemImage=uploadFile.name 

    itemKeywords=itemKeywords.replace(/ /g, "");
    itemKeywords=itemKeywords.replace(/,/g, "")


    let uploadpath='./public/images/Menu/'+uploadFile.name;
    let ext=path.extname(uploadFile.name)
    console.log(ext)
    const allowedExtension=/png|jpg|jpeg|JPG/
    if(!allowedExtension.test(ext)) {
        console.log("wrong ext")
    }

    let add= await userData.addMenu(itemCategory,itemTitle,itemDescription,itemPrice,itemCalories,itemImage,itemKeywords)

    if(add.menuInserted){
        uploadFile.mv(uploadpath, function(err) {
        if (err){
          return res.status(500).send(err);
          }
          sharp(`./public/images/Menu/${uploadFile.name}`).resize(200, 200).toBuffer(function(err, buffer) {
            fs.writeFile(`./public/images/Menu/${uploadFile.name}`, buffer, function(e) {
        
            });
        });
          res.redirect('./viewMenu')
      }); 
    } else {

    }
    
});

router.get('/ViewMenu', async(req,res) =>{
    //res.render('pages/ViewMenu')
    //render view page
    let AllMenu=await userData.getAllMenu();
    console.log(AllMenu.length)
    let json=AllMenu
    res.render('pages/ViewMenu',{json})
    });

    router.post('/update', async(req,res) =>{
        //res.render('pages/ViewMenu')
        //render view page
        id=req.body['updateid']
        let userdetails=await userData.getMenuItem(id)
        res.render('pages/update',userdetails)
        
        });
    
    
        router.post('/updateMenu', async(req,res) =>{
            let uploadFile;
            let itemImage
            try{
      uploadFile=req.files.menuFile;
    itemImage=uploadFile.name
            }catch(e){
             uploadFile=null
             itemImage=null
            }
    let itemCategory=req.body['itemCategory']
    let itemTitle=req.body['itemTitle']
    let itemDescription=req.body['itemDescription']
    let itemPrice=req.body['itemPrice']
    let itemCalories=req.body['itemCalories']
    let itemKeywords=req.body['itemKeywords']
    let itemId=req.body['itemId']


    let itemCategoryold=req.body['itemCategoryold']
    let itemTitleold=req.body['itemTitleold']
    let itemDescriptionold=req.body['itemDescriptionold']
    let itemPriceold=req.body['itemPriceold']
    let itemCaloriesold=req.body['itemCaloriesold']
    let itemKeywordsold=req.body['itemKeywordsold']


    if(uploadFile){

    } else{
        if(itemCategory==itemCategoryold && itemTitle==itemTitleold && itemDescription==itemDescriptionold && itemPrice==itemPriceold && itemCalories==itemCaloriesold && itemKeywords==itemKeywordsold) {
            console.log("all is same")
            res.redirect('./ViewMenu')
            return
        }
    }
    
    itemKeywords=itemKeywords.replace(/ /g, "");
    itemKeywords=itemKeywords.replace(/,/g, "")



    let update= await userData.updateMenu(itemCategory,itemTitle,itemDescription,itemPrice,itemCalories,itemImage,itemKeywords,itemId)
    console.log(update)
    if(update.menuupdated){
        if(uploadFile){ 

            let uploadpath='./public/img/Menu/'+uploadFile.name;
    let ext=path.extname(uploadFile.name)
    console.log(ext)
    const allowedExtension=/png|jpg|jpeg|JPG/
    if(!allowedExtension.test(ext)) {
        console.log("wrong ext")
        //throw error
    }
        uploadFile.mv(uploadpath, function(err) {
        if (err){
          return res.status(500).send(err);
          }
          sharp(`./public/img/Menu/${uploadFile.name}`).resize(200, 200).toBuffer(function(err, buffer) {
            fs.writeFile(`./public/img/Menu/${uploadFile.name}`, buffer, function(e) {
        
            });
        });
          res.redirect('./ViewMenu')
      }); 
    }
    else{
        res.redirect('./ViewMenu')
    }
    } else {
        res.redirect('./ViewMenu')
    }
   
     });
    
    router.post('/deleteitem', async(req,res)=>{
        let id=req.body['deleteid'];

        let deleted = await userData.deleteMenuItem(id);
        if(deleted){
            res.redirect('./ViewMenu')
        }
    });
module.exports=router;
