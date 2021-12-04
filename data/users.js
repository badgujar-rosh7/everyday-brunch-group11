const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const categorys = mongoCollections.category;
const menus = mongoCollections.menu;
const advertises = mongoCollections.advertise;
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
let { ObjectId } = require('mongodb');
const { menu } = require('../config/mongoCollections');
const saltrounds=16;

async function addCategory(category) {
  const categoryCollection = await categorys();
let newcategory = {
category:category
};

const findresult = await categoryCollection.findOne( {category: category.toLowerCase()} );
if (findresult === null) {
const insertInfo = await categoryCollection.insertOne(newcategory);
if (insertInfo.insertedCount === 0) {
 return {categoryInserted:false}
} else {
return {categoryInserted: true}
}
} else {
    throw 'Category already exists'
}
}


async function addMenu(itemCategory,itemTitle,itemDescription,itemPrice,itemCalories,itemImage,itemKeywords) {

  const MenuCollection = await menus();

let newMenuItem = {
itemCategory:itemCategory,
itemTitle:itemTitle,
itemDescription:itemDescription,
itemPrice:itemPrice,
itemCalories:itemCalories,
itemImage:itemImage,
itemKeywords:itemKeywords
};

const findresult = await MenuCollection.findOne( 
  {itemCategory: itemCategory,
  itemTitle:itemTitle  
  } );
  if (findresult === null) {
  const insertInfo = await MenuCollection.insertOne(newMenuItem);
if (insertInfo.insertedCount === 0) {
 return {menuInserted:false}
} else {
return {menuInserted: true}
}
} else {
    throw 'Menu already exists'
}
}

async function search(searchTerm){

  const MenuCollection = await menus();

  const findresult = await MenuCollection.find( 
    {itemKeywords: {$regex:searchTerm,$options:'$i'}}).toArray();
   // console.log(findresult)
    if(findresult.length=0){
      throw "No Result found"
    } else {
      return findresult
    }
}

async function addAdvertise(advertiseTitle,advertiseDescription,advertiseImage) {

  const AdvertiseCollection = await advertises();

let newAdvertiseItem = {
advertiseTitle:advertiseTitle,
advertiseDescription:advertiseDescription,
advertiseImage:advertiseImage
};

const findresult = await AdvertiseCollection.findOne( 
  {
  advertiseTitle:advertiseTitle  
  } );
if (findresult === null) {
const insertInfo = await AdvertiseCollection.insertOne(newAdvertiseItem);
if (insertInfo.insertedCount === 0) {
 return {advertiseInserted:false}
} else {
return {advertiseInserted: true}
}
} else {
    throw 'Advertise already exists'
}
}

async function getAllMenu(){
  const MenuCollection = await menus();
  const findresult = await MenuCollection.find({}).toArray();
  //console.log(findresult);
  return findresult;
}

async function getMenuItem(id){

  let idd=ObjectId(id);
  const MenuCollection = await menus();
  const findresult = await MenuCollection.findOne({_id:idd});
  return findresult;
}

// async function updateMenu(itemCategory,itemTitle,itemDescription,itemPrice,itemCalories,itemImage,itemKeywords,itemId) {

// const MenuCollection = await menus();
// let newMenuItem={}
// if(itemImage){
//  newMenuItem = {
// itemCategory:itemCategory,
// itemTitle:itemTitle,
// itemDescription:itemDescription,
// itemPrice:itemPrice,
// itemCalories:itemCalories,
// itemImage:itemImage,
// itemKeywords:itemKeywords
// };
// } else{
//    newMenuItem = {
//     itemCategory:itemCategory,
//     itemTitle:itemTitle,
//     itemDescription:itemDescription,
//     itemPrice:itemPrice,
//     itemCalories:itemCalories,
//     itemKeywords:itemKeywords
//     };
// }
// let itemIdd=ObjectId(itemId);
// console.log(itemIdd)
// const updatedInfo = await MenuCollection.updateOne(
//   { _id:itemIdd },
//   { $set: newMenuItem }
// );

// if (updatedInfo.modifiedCount === 0) {
//   return {menuupdated:false}
// } else {
//  return {menuupdated:true}
// }

// }

async function deleteMenuItem(id){

let idd=ObjectId(id)

const MenuCollection = await menus();

const deleteresult= await MenuCollection.deleteOne({_id:idd})

if (deleteresult.deletedCount === 0) {
  return false
}
else{
return true

}
}


async function getAllCategory(){
  const categoryCollection = await categorys();
  let getCategorys=await categoryCollection.find({}).toArray()

  return getCategorys;

}

async function getMenuByCategory(category){
  const MenuCollection = await menus();
  let CategoryMenu=await MenuCollection.find({itemCategory:category}).toArray();

  return CategoryMenu;
}

async function deleteCategory(id){

  let idd=ObjectId(id)
  const categoryCollection = await categorys();
 
const deleteresult= await categoryCollection.deleteOne({_id:idd})

if (deleteresult.deletedCount === 0) {
  return false
}
else{
return true
}

}


async function deleteAdvertise(id){

  let idd=ObjectId(id)
  const AdvertiseCollection = await advertises();
 
const deleteresult= await AdvertiseCollection.deleteOne({_id:idd})

if (deleteresult.deletedCount === 0) {
  return false
}
else{
return true
}

}

async function getAdvertise(){

  let idd=ObjectId(id)
  const AdvertiseCollection = await advertises();
 
const getresult= await AdvertiseCollection.find({}).toArray()

if(getresult.length>0){
  return getresult
} else{
  return false
}

}

module.exports={
    addCategory,
    addMenu,
    search,
    addAdvertise,
    getAllMenu,
    getMenuItem,
    // updateMenu,
    deleteMenuItem,
    getAllCategory,
    getMenuByCategory,
    deleteAdvertise,
    deleteCategory,
    getAdvertise
}

