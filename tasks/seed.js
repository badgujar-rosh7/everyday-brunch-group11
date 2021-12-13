const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const signup = data.signup;
const menuData = data.menu;
const cartData = data.cart;
const usersinfo = data.user;
const reviews = data.reviews;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

  //  Users
    const userA = await signup.createUser('Akshay', 'Sahasrabuddhe', 'badgujar.roshan.roshan3@gmail.com', '01/01/1995', 'Male', 'LA', 'CA', 'AkshayS', 'AkshaySPW');
    const userB = await signup.createUser('Haoyu', 'Li', 'HaoyuL@gmail.com', '02/02/1996', 'Female', 'Hoboken', 'NJ', 'HaoyuL', 'HaoyuLPW');
    const userC = await signup.createUser('Roshan', 'Badhujar', 'RoshanB@gmail.com', '03/03/1997', 'Male', 'Boston', 'MA', 'RoshanB', 'RoshanBPW');
    const userD = await signup.createUser('Tanay', 'Tadas', 'TanayT@gmail.com', '04/04/1998', 'Male', 'Miami', 'FL', 'TanayT', 'TanayTPW');
    const userE = await signup.createUser('Yongxiang', 'Zhang', 'YongxiangZ@gmail.com', '05/05/1999', 'Male', 'Philadelphia', 'PA', 'YongxiangZ', 'YongxiangZPW')
    
    const getAll=await usersinfo.getAllUsers();
    
    const catA=await menuData.addCategory('Brunch','b.jpg')
    //pancake
    //Double Egg Fry with Cheese
    //Avacado toast
    
    const catB=await menuData.addCategory('Sides','s.jpg')
    //french fries
    //Gluten Free GArlic bread
    //choco lava cake
    const catD=await menuData.addCategory('Beverages','be.jpg') //strawberry banna smoothies
    //kale smoothies
    //watermelon juice
    //chocolate cold brew
    const catE=await menuData.addCategory('Coffee','c.jpg')
    //caramel frappaccino
    //hot brew
    //hazelnut coffee
    const catF=await menuData.addCategory('Combos','s.jpg')
    //kale lettuce with ranch Salad
    //fruit salad 

    const getallcat=await menuData.getAllCategory()
    //console.log(getallcat)
    const menu1=await menuData.addMenu(getallcat[0].category,'Pancake with honey and Strawberry','Three soft freshly baked pancakes with spoon of honey and topped with strawbeery','20','359','abc1.jpg','pancakehoneystrawberry');
    const menu2=await menuData.addMenu(getallcat[0].category,'Double Egg Fry with cheese','Three eggs fried in italian olive oil garnished with chilli flakes and pepper','25','240','abc2.jpg','oliveoileggspepperchillispicy');
    const menu3=await menuData.addMenu(getallcat[0].category,'Avacado Toast','Creamy Avacado smashed and spread across Gluten free Vegan Bread with a dash if lime','40','250','abc3.jpg','avacadospreadbreadlimecreamy');
    const menu4=await menuData.addMenu(getallcat[1].category,'Frech Fries','Freshly Cooked Potato fries tossed in peri peri spice and served with loaded mayo','45','400','sides1.jpg','frenchfriespotatomayocheese');
    const menu5=await menuData.addMenu(getallcat[1].category,'Garlic bread','Roasted garlic spread over bread','31.99','400','sides2.jpg','garlicbreadoregano');
    const menu6=await menuData.addMenu(getallcat[1].category,'Choco Lava Cake','Melted Dark Chocolate inside soft chocolate creamy cake','45','180','sides3.jpg','chocolatelavacreamydark');
    const menu7=await menuData.addMenu(getallcat[2].category,'Strawberry Banana Smoothies','Fresh Strawberry blended with frozen bananas to make a thick delicious smoothies','18','220','beverages1.jpg','strawberrybananathicksmoothies');
    const menu8=await menuData.addMenu(getallcat[2].category,'Kale Smoothie','Green King blended with ample fruits to blend its raw taste','19.99','159','beverages2.jpg','kalegreensmoothiesfruitsfiber');
    const menu9=await menuData.addMenu(getallcat[2].category,'Watermelon juice','Watermelon juice thats it no additives','28.99','399','beverages3.jpg','watermelonfruitnomixing');
    const menu10=await menuData.addMenu(getallcat[2].category,'Chocolcate Cold Brew','Authentic chocolate from Ghana blend to make a thick smoothie','35','399','beverages4.jpg','chocolateghanadarkcoldsmoothiesthick');
    const menu11=await menuData.addMenu(getallcat[3].category,'Caramel Frappacciono','Caramel Frappaccino','29.36','454','coffee1.jpg','caramelFrappaccinohotcoffee');
    const menu12=await menuData.addMenu(getallcat[3].category,'Hot Brew Coffee','Dark coffee to kick your midnight lazines','29.99','191','coffee2.jpg','coffeedarkmidnightkicker');
    const menu13=await menuData.addMenu(getallcat[4].category,'Avacado Toast and Kale Smoothie','Perfect Start to the day with some good fats and punch of fiberous and nutrition Rich veggie juice','39.99','491','combo1.jpg','combokaleavacadotoastbreadcreamyfibergreensmoothie');
    const menu14=await menuData.addMenu(getallcat[4].category,'French Fries and Chocolate Cold Brew','Best Combo fries and Chocolate','35.99','191','combo2.jpg','chocolatecoldfriessaucypotato');
    const menu15=await menuData.addMenu(getallcat[4].category,'Pancake and Egg and Salad','Most bought item of ours Get a little of everything','49.99','591','combo3.jpg','saladpancakeeggbestitem');



    const allmenu=await menuData.getAllMenu();

    const adv1=await menuData.addAdvertise('Olives Pizza','Specially Chef Curated Olives Pizza glimpse of Italian taste','adv1.jpg')
    const adv2=await menuData.addAdvertise('Egg Fun Day','Full EGG MENU Only eggs Day all item will have a part of egg','adv2.jpg')
    const adv3=await menuData.addAdvertise('Surti Gotala','Special Egg Dishes from Authentic Egg Suchefs','adv3.jpg')
    const adv4=await menuData.addAdvertise('Fruit and Toast Only','It fruits and Toast Day only Cleanse yoursel with us','adv4.jpg')



    let reviewA = {
        userId: getAll[0]._id,
        review: 'Love the brunch here!',
        rating: 5,
        dateofReview: 06/06/2021,
    };

    let reviewB = {
        userId: getAll[0]._id,
        review: 'I had a large iced Americano and a 6 inch tuna sub, awesome food but the coffee can be better.',
        rating: 4,
        dateofReview: 07/07/2021,
    };

    let reviewC1 = {
        userId: getAll[1]._id,
        review: 'A great place to eat, always come after morning class.',
        rating: 5,
        dateofReview:08/08/2021,
    };

    let reviewC2 = {
        userId: getAll[2]._id,
        review: 'Best after class brunch!',
        rating: 5,
        dateofReview: 09/09/2021,
    };

    reviewA = await reviews.createReview(reviewA.userId.toString(),reviewA.review,reviewA.rating,'06/06/2021');
    reviewB = await reviews.createReview(reviewB.userId.toString(),reviewB.review,reviewB.rating,`06/06/2021`);
    reviewC1 = await reviews.createReview(reviewC1.userId.toString(),reviewC1.review,reviewC1.rating,`06/06/2021`);
    reviewC2 = await reviews.createReview(reviewC2.userId.toString(),reviewC2.review,reviewC2.rating,`06/06/2021`);
    

    console.log('Done seeding database');
    await db.serverConfig.close();

}

main().catch(console.log);