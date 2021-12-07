const mongoCollections = require('../config/mongoCollections');
//const categorys = mongoCollections.category;
const carts = mongoCollections.cart;
const menus = mongoCollections.menu;
const orders = mongoCollections.order;
const uuid = require('uuid');
let { ObjectId } = require('mongodb');
let { getMenuItem } = require('./menu');
const menus = mongoCollections.menu;


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

const findresult = await cartCollection.findOne( {itemid: id,userId:userID,order_id:null} );
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
        { itemid:id,userId:userID,order_id:null },
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
    const findresult = await cartCollection.find( {userId:userID,order_id:null} ).toArray();
    //console.log(findresult.length)
    return findresult.length
}

async function getCartUser(userId) {
    const cartCollection = await carts();
    const findresult = await cartCollection.find( {userId:userId,order_id:null} ).toArray();
            return findresult
    
}

async function deleteCartItem(deleteid) {
    const cartCollection = await carts();
    
let idd=ObjectId(deleteid)

const deleteresult= await cartCollection.deleteOne({_id:idd,order_id:null})
console.log(deleteresult)
if (deleteresult.deletedCount === 0) {
  return false
}
else{
return true

}
}


async function updateCartItem(Id,quantity,userID){
    const cartCollection = await carts();

    let idd=ObjectId(Id)
   // console.log(idd)
const findresult = await cartCollection.findOne( {_id: idd,userId:userID,order_id:null} );
let totcost=findresult.totalcost
totcost=(parseFloat(quantity) * parseFloat(findresult.priceOfItem))
    updateCart={
        quantity:quantity,
        totalcost:totcost
    }
    const updatedInfo = await cartCollection.updateOne(
        { _id:idd,userId:userID,order_id:null },
        { $set:updateCart }
      );
      if (updatedInfo.modifiedCount === 0) {
        return {cartupdate:false}
      } else {
       return {cartupdated:true}
      }
}

async function UpdateOrderIdByUserId(userId,orderid) {
const cartCollection = await carts();
updateCart={
  order_id:orderid
}
const updatedInfo = await cartCollection.updateMany(
  {userId:userId,order_id:null },
  { $set:updateCart }
);

if(updatedInfo.modifiedCount ===0){
  return {updated:true}
} else {
    return {updated:false}
}

}

async function createOrder(userId,orderid){
  console.log("insert")
  const orderCollection = await orders() ;
  var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var dateTime = date+' '+time;
  neworder={
    order_id:orderid,
    userId:userId,
    date:dateTime,
  }
  const insertInfo =  await orderCollection.insertOne(neworder);
  if (insertInfo.insertedCount === 0) {
  console.log("yes")
  } else {
    console.log("no")
  }


}

async function getOrderByUserId(userId){
  const orderCollection = await orders() ;

  const findresult = await orderCollection.find( {userId:userId} ).toArray();

  if(findresult.length>0){
    return findresult
  } else{
    return false
  }

}

async function getCartByOrderId(orderId){
  const cartCollection = await carts();

  const findresult = await cartCollection.find( {order_id:orderId} ).toArray();

  if(findresult.length>0){
    return findresult
  } else{
    return false
  }

}

async function getItemDetailsById(itemid){
  const MenuCollection = await menus();
  let idd=ObjectId(itemid);

  const findresult = await MenuCollection.findOne( {_id: idd});

  if(findresult===null){
    return false
  } else{
    return findresult;
  }



}





module.exports={
    createCartItem,
    getCounter,
    getCartUser,
    deleteCartItem,
    updateCartItem,
    UpdateOrderIdByUserId,
    createOrder,
    getOrderByUserId,
    getCartByOrderId,
    getItemDetailsById
}