const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;
const usersinfo = data.user;
const orderinfo = data.cart;
const sharp = require('sharp');
const fs = require('fs');
const fileUpload = require('express-fileupload');


router.get('/dashboard', async (req, res) => {
    let allusers = await usersinfo.getAllUsers();
    let allorders = await orderinfo.getAllOrders();
    let allcategory = await userData.getAllCategory();
    let allMenu = await userData.getAllMenu();
    let usercount = allusers.length;
    let orercount = allorders.length;
    let catcount = allcategory.length;
    let menucount = allMenu.length;
    res.render('pages/admin_dashboard',{layout:'adminhome',count1:usercount,count2:orercount,count3:catcount,count4:menucount})
});

router.get('/ViewCategory', async (req, res) => {
    let getCategory = await userData.getAllCategory();
    res.render('pages/addcategory',{layout:'adminhome'})
});

router.get('/home', async (req, res) => {
    let getCategory = await userData.getAllCategory();
    res.render('pages/errors',{layout:'adminhome'})
});

router.get('/addCategory', async (req, res) => {

    res.render('pages/addcategory',{layout:'adminhome'})
});

router.post('/AddCategory', async (req, res) => {
    //render the page
    let uploadFile = req.files.menuFile;
    let category = req.body['itemCategory'];
    let categoryImage = uploadFile.name;

    let uploadpath = './public/images/Category/' + uploadFile.name;
    let ext = path.extname(uploadFile.name);
    console.log(ext);
    const allowedExtension = /png|jpg|jpeg|JPG/;
    if (!allowedExtension.test(ext)) {
        console.log('wrong ext');
    }

   //insert
   let add = await userData.addCategory(category,categoryImage);

    if (add.categoryInserted) {
        uploadFile.mv(uploadpath, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            sharp(`./public/images/Category/${uploadFile.name}`)
                .resize(200, 200)
                .toBuffer(function (err, buffer) {
                    fs.writeFile(
                        `./public/images/Category/${uploadFile.name}`,
                        buffer,
                        function (e) {}
                    );
                });
            res.redirect('./ViewCategory');
        });
    } else {
    }


    console.log(add);
});

router.get('/newMenu', (req, res) => {
    res.render('pages/newMenu',{layout:'adminhome'});
    //render view page
});

router.post('/addMenu', async (req, res) => {
    let uploadFile = req.files.menuFile;

    let itemCategory = req.body['itemCategory'];
    let itemTitle = req.body['itemTitle'];
    let itemDescription = req.body['itemDescription'];
    let itemPrice = req.body['itemPrice'];
    let itemCalories = req.body['itemCalories'];
    let itemKeywords = req.body['itemKeywords'];
    let itemImage = uploadFile.name;

    itemKeywords = itemKeywords.replace(/ /g, '');
    itemKeywords = itemKeywords.replace(/,/g, '');

    let uploadpath = './public/images/Menu/' + uploadFile.name;
    let ext = path.extname(uploadFile.name);
    console.log(ext);
    const allowedExtension = /png|jpg|jpeg|JPG/;
    if (!allowedExtension.test(ext)) {
        console.log('wrong ext');
    }

    let add = await userData.addMenu(
        itemCategory,
        itemTitle,
        itemDescription,
        itemPrice,
        itemCalories,
        itemImage,
        itemKeywords
    );

    if (add.menuInserted) {
        uploadFile.mv(uploadpath, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            sharp(`./public/images/Menu/${uploadFile.name}`)
                .resize(200, 200)
                .toBuffer(function (err, buffer) {
                    fs.writeFile(
                        `./public/images/Menu/${uploadFile.name}`,
                        buffer,
                        function (e) {}
                    );
                });
            res.redirect('./viewMenu');
        });
    } else {
    }
});

router.get('/ViewMenu', async (req, res) => {
    //res.render('pages/ViewMenu')
    //render view page
    let AllMenu = await userData.getAllMenu();
    console.log(AllMenu.length);
    let json = AllMenu;
    res.render('pages/ViewMenu', { layout:'adminhome',json });
});

router.post('/update', async (req, res) => {
    //res.render('pages/ViewMenu')
    //render view page
    id = req.body['updateid'];
    let userdetails = await userData.getMenuItem(id);
    console.log(userdetails)
    res.render('pages/update', {layout:'adminhome',category:userdetails.itemCategory,title:userdetails.itemTitle,description:userdetails.itemDescription,price:userdetails.itemPrice,calories:userdetails.itemCalories,keywords:userdetails.itemKeywords,image:userdetails.itemImage});
});

router.post('/updateMenu', async (req, res) => {
    let uploadFile;
    let itemImage;
    try {
        uploadFile = req.files.menuFile;
        itemImage = uploadFile.name;
    } catch (e) {
        uploadFile = null;
        itemImage = null;
    }
    let itemCategory = req.body['itemCategory'];
    let itemTitle = req.body['itemTitle'];
    let itemDescription = req.body['itemDescription'];
    let itemPrice = req.body['itemPrice'];
    let itemCalories = req.body['itemCalories'];
    let itemKeywords = req.body['itemKeywords'];
    let itemId = req.body['itemId'];

    let itemCategoryold = req.body['itemCategoryold'];
    let itemTitleold = req.body['itemTitleold'];
    let itemDescriptionold = req.body['itemDescriptionold'];
    let itemPriceold = req.body['itemPriceold'];
    let itemCaloriesold = req.body['itemCaloriesold'];
    let itemKeywordsold = req.body['itemKeywordsold'];

    if (uploadFile) {
    } else {
        if (
            itemCategory == itemCategoryold &&
            itemTitle == itemTitleold &&
            itemDescription == itemDescriptionold &&
            itemPrice == itemPriceold &&
            itemCalories == itemCaloriesold &&
            itemKeywords == itemKeywordsold
        ) {
            console.log('all is same');
            res.redirect('./ViewMenu');
            return;
        }
    }

    itemKeywords = itemKeywords.replace(/ /g, '');
    itemKeywords = itemKeywords.replace(/,/g, '');

    let update = await userData.updateMenu(
        itemCategory,
        itemTitle,
        itemDescription,
        itemPrice,
        itemCalories,
        itemImage,
        itemKeywords,
        itemId
    );
    console.log(update);
    if (update.menuupdated) {
        if (uploadFile) {
            let uploadpath = './public/img/Menu/' + uploadFile.name;
            let ext = path.extname(uploadFile.name);
            console.log(ext);
            const allowedExtension = /png|jpg|jpeg|JPG/;
            if (!allowedExtension.test(ext)) {
                console.log('wrong ext');
                //throw error
            }
            uploadFile.mv(uploadpath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                sharp(`./public/img/Menu/${uploadFile.name}`)
                    .resize(200, 200)
                    .toBuffer(function (err, buffer) {
                        fs.writeFile(
                            `./public/img/Menu/${uploadFile.name}`,
                            buffer,
                            function (e) {}
                        );
                    });
                res.redirect('./ViewMenu');
            });
        } else {
            res.redirect('./ViewMenu');
        }
    } else {
        res.redirect('./ViewMenu');
    }
});

router.post('/deleteitem', async (req, res) => {
    //menu item delete
    let id = req.body['deleteid'];

    let deleted = await userData.deleteMenuItem(id);
    if (deleted) {
        res.redirect('./ViewMenu');
    }
});

router.post('/ViewMenuCategory', async (req, res) => {
    let category = req.body['category'];
    let getCategory = await userData.getMenuByCategory(category);
    console.log(getCategory);
    //can get Menu items as per Category
});

router.post('/deleteCategory', async (req, res) => {
    let id = req.body['deleteid'];
    let category=req.body['deletecategory']
    let getCategory = await userData.deleteCategory(id,category);
    if(getCategory.delete==true) {
        res.redirect('./ViewCategory')
    } else if(getCategory.delete==false){
        res.render('pages/viewCategory',{layout:'adminhome',deleteerror:"Failed to Delete due to some Internal Server Error"})
    }else {
        res.render('pages/viewCategory',{layout:'adminhome',deleteerror:"Cannot Delete Category Directly as it Menu items attached to its Nanme. If you still want to delete the category first delete all Menu items related to this name."})
    }



    //can get Menu items as per Category
});



module.exports = router;
