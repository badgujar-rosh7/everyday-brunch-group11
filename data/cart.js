const mongoCollections = require('../config/mongoCollections');
//const categorys = mongoCollections.category;
const carts = mongoCollections.cart;
const menus = mongoCollections.menu;
const uuid = require('uuid');
let { ObjectId } = require('mongodb');
let { getMenuItem } = require('./menu');


async function createCartItem(id,quantity,price,userID) {
  const cartCollection = await carts();
  const MenuCollection = await menus();
let menudetails= await getMenuItem(id)
  let total=parseInt(quantity) * parseFloat(price);
  price=parseFloat(price)
let newcart = {
itemid:id,
quantity:quantity,
userId:userID,
totalcost:total,
priceOfItem:price,
details:{
    title:menudetails.itemTitle,
    description:menudetails.itemDescription,
    cal:menudetails.itemCalories,
    image:menudetails.itemImage
},
order_id:null
};

const findresult = await cartCollection.findOne( {itemid: id,userId:userID} );
if (findresult === null) {
const insertInfo = await cartCollection.insertOne(newcart);
if (insertInfo.insertedCount === 0) {
 return {cartInserted:false}
} else {
return {cartInserted: true}
}
} else {
    
    findresult.quantity
    let value=parseInt(findresult.quantity)+parseInt(quantity)
    cost=value * findresult.priceOfItem
    let updatecart ={
        quantity:value,
        totalcost:cost
    }
    const updatedInfo = await cartCollection.updateOne(
        { itemid:id,userId:userID },
        { $set:updatecart }
      );
      if (updatedInfo.modifiedCount === 0) {
        return {cartInserted:false}
      } else {
       return {cartInserted:true}
      }
}
}

async function getCounter(userID){
    //console.log(userID)
    const cartCollection = await carts();
    const findresult = await cartCollection.find( {userId:userID} ).toArray();
    //console.log(findresult.length)
    return findresult.length
}

async function getCartUser(userId) {
    const cartCollection = await carts();
    const findresult = await cartCollection.find( {userId:userId} ).toArray();
            return findresult
    
}




module.exports={
    createCartItem,
    getCounter,
    getCartUser
}