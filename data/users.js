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

async function createUser(username, password) {


    if((!username) || username.trim().length==0){
  
        throw "provide valid username"
      }
      if((!password) || password.trim().length==0){
        
        throw "provide valid password"
      
      }
      username=username.trim();
      password=password.trim();
      if(/\s/g.test(username)){
        throw "username cannot contain space in between"
     
      }
      const regex=/^[a-z0-9]+$/i;
      const result=regex.test(username);
      if(!result){
        throw "username should contain only alphabets and numbers only"
     
      }
      if(username.length<4) {
        throw "username should be atleast 4 characters long"
      }
      if(/\s/g.test(password)){
        throw  "password cannot contain space in between"
       
      }
      if(password.length<6){
         throw "password should be atleast 6 characters long"
      }


////////////////////////////////////////////////
const hash = await bcrypt.hash(password, saltrounds);
const userCollection = await users();
let newuser = {
username:username.toLowerCase(),
password:hash
};

const rest = await userCollection.findOne( {username: username.toLowerCase()} );
if (rest === null) {
const insertInfo = await userCollection.insertOne(newuser);
if (insertInfo.insertedCount === 0) {
 return {userInserted:false}
} else {
return {userInserted: true}
}
} else {
    throw 'Select another username. Username already exists'
}
}


async function checkUser(username, password) {
 
    if((!username) || username.trim().length==0){
  
        throw "provide valid username"
      }
      if((!password) || password.trim().length==0){
        
        throw "provide valid password"
      
      }
      username=username.trim();
      password=password.trim();
      if(/\s/g.test(username)){
        throw "username cannot contain space in between"
     
      }
      const regex=/^[a-z0-9]+$/i;
      const result=regex.test(username);
      if(!result){
        throw "username should contain only alphabets and numbers only"
     
      }
      if(username.length<4) {
        throw "username should be atleast 4 characters long"
      }
      if(/\s/g.test(password)){
        throw  "password cannot contain space in between"
       
      }
      if(password.length<6){
         throw "password should be atleast 6 characters long"
      }

    ///////////////////////////////////
const userCollection = await users();
const rest = await userCollection.findOne( {username: username.toLowerCase()} );

if (rest) {
    //compare password
    //bcrypt.compare
    let match = await bcrypt.compare(password, rest.password);

    if(match){
        return {authenticated: true}
    } else {
        throw "Provide Valid username or password"  
    }
} else {
    throw "Provide Valid username or password"  
}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  //console.log(findresult)
return findresult;
}

async function getMenuItem(id){

  let idd=ObjectId(id)
  const MenuCollection = await menus();
  const findresult = await MenuCollection.findOne({_id:idd});
return findresult;
}

async function updateMenu(itemCategory,itemTitle,itemDescription,itemPrice,itemCalories,itemImage,itemKeywords,itemId) {

const MenuCollection = await menus();
let newMenuItem={}
if(itemImage){
 newMenuItem = {
itemCategory:itemCategory,
itemTitle:itemTitle,
itemDescription:itemDescription,
itemPrice:itemPrice,
itemCalories:itemCalories,
itemImage:itemImage,
itemKeywords:itemKeywords
};
} else{
   newMenuItem = {
    itemCategory:itemCategory,
    itemTitle:itemTitle,
    itemDescription:itemDescription,
    itemPrice:itemPrice,
    itemCalories:itemCalories,
    itemKeywords:itemKeywords
    };
}
let itemIdd=ObjectId(itemId)
console.log(itemIdd)
const updatedInfo = await MenuCollection.updateOne(
  { _id:itemIdd },
  { $set: newMenuItem }
);

if (updatedInfo.modifiedCount === 0) {
  return {menuupdated:false}
} else {
 return {menuupdated:true}
}

}

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

module.exports={
    createUser,
    checkUser,
    addCategory,
    addMenu,
    search,
    addAdvertise,
    getAllMenu,
    getMenuItem,
    updateMenu,
    deleteMenuItem
}

