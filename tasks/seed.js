const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const signup = data.signup;
const menuData = data.menu;
const cartData = data.cart;
const usersinfo = data.user;
const reviews = data.reviews;

async function main() {
    const db = await dbConnection;
    //await db.dropDatabase();

  //  Users
    const userA = await signup.createUser('Akshay', 'Sahasrabuddhe', 'AkshayS@gmail.com', '01/01/1995', 'Male', 'LA', 'CA', 'AkshayS', 'AkshaySPW');
    const userB = await signup.createUser('Haoyu', 'Li', 'HaoyuL@gmail.com', '02/02/1996', 'Female', 'Hoboken', 'NJ', 'HaoyuL', 'HaoyuLPW');
    const userC = await signup.createUser('Roshan', 'Badhujar', 'RoshanB@gmail.com', '03/03/1997', 'Male', 'Boston', 'MA', 'RoshanB', 'RoshanBPW');
    const userD = await signup.createUser('Tanay', 'Tadas', 'TanayT@gmail.com', '04/04/1998', 'Male', 'Miami', 'FL', 'TanayT', 'TanayTPW');
    const userE = await signup.createUser('Yongxiang', 'Zhang', 'YongxiangZ@gmail.com', '05/05/1999', 'Male', 'Philadelphia', 'PA', 'YongxiangZ', 'YongxiangZPW')
    
    const getAll=await usersinfo.getAllUsers();
    console.log(getAll)
    const catA=await menuData.addCategory('Asianmnnnnnnnnnnn','a.jpg')
    const catB=await menuData.addCategory('Mediterean','b.jpg')
    const catC=await menuData.addCategory('dssddsdsdsdsds','c.jpg')
    const catD=await menuData.addCategory('Beverages','d.jpg')
    const catE=await menuData.addCategory('Coffee','e.jpg')
    const catF=await menuData.addCategory('Salad','f.jpg')

    const getallcat=await menuData.getAllCategory()
    console.log(getallcat)
    const menu1=await menuData.addMenu(getallcat[0].category,'abc','authentic asian taste of spices and tangy flavour of east','25','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu2=await menuData.addMenu(getallcat[0].category,'abcd','authentic asian taste of spices and tangy flavour of east','25.99','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu3=await menuData.addMenu(getallcat[1].category,'abcde','authentic asian taste of spices and tangy flavour of east','25.99','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu4=await menuData.addMenu(getallcat[1].category,'abc','authentic asian taste of spices and tangy flavour of east','25','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu5=await menuData.addMenu(getallcat[2].category,'abcd','authentic asian taste of spices and tangy flavour of east','25.99','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu6=await menuData.addMenu(getallcat[2].category,'abcde','authentic asian taste of spices and tangy flavour of east','25.99','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu7=await menuData.addMenu(getallcat[3].category,'abc','authentic asian taste of spices and tangy flavour of east','25','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu8=await menuData.addMenu(getallcat[3].category,'abcd','authentic asian taste of spices and tangy flavour of east','25.99','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu9=await menuData.addMenu(getallcat[4].category,'abcde','authentic asian taste of spices and tangy flavour of east','25.99','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu10=await menuData.addMenu(getallcat[4].category,'abc','authentic asian taste of spices and tangy flavour of east','25','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu11=await menuData.addMenu(getallcat[5].category,'abcd','authentic asian taste of spices and tangy flavour of east','25.99','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');
    const menu12=await menuData.addMenu(getallcat[5].category,'abcde','authentic asian taste of spices and tangy flavour of east','25.99','359','abc.jpg','asiancuisinespicytangyflavoursauthenticsoutheast');

    const allmenu=await menuData.getAllMenu();

    const adv1=await menuData.addAdvertise('Taco Tuesday','Curated Taco specially from best flour with mouth licking salsa roja and mozarella cheese','adv1.jpg')
    const adv2=await menuData.addAdvertise('Sushi Friday','Curated Taco specially from best flour with mouth licking salsa roja and mozarella cheese','adv1.jpg')
    const adv3=await menuData.addAdvertise('Indian Tadkay','Curated Taco specially from best flour with mouth licking salsa roja and mozarella cheese','adv1.jpg')
    const adv4=await menuData.addAdvertise('Steak Saturday','Curated Taco specially from best flour with mouth licking salsa roja and mozarella cheese','adv1.jpg')


    //Review
    // let reviewA = {
    //     userId: userA._id,
    //     review: 'Love the brunch here!',
    //     rating: 5,
    //     dateofReview: 06/06/2021,
    // };

    // let reviewB = {
    //     userId: userB._id,
    //     review: 'I had a large iced Americano and a 6 inch tuna sub, awesome food but the coffee can be better.',
    //     rating: 4,
    //     dateofReview: 07/07/2021,
    // };

    // let reviewC1 = {
    //     userId: userC._id,
    //     review: 'A great place to eat, always come after morning class.',
    //     rating: 5,
    //     dateofReview:08/08/2021,
    // };

    // let reviewC2 = {
    //     userId: userC._id,
    //     review: 'Best after class brunch!',
    //     rating: 5,
    //     dateofReview: 09/09/2021,
    // };

    // let reviewC3 = {
    //     userId: userC._id,
    //     review: 'Always come after class, but let me down today. Considering to find a new place for brunch.',
    //     rating: 3,
    //     dateofReview: 10/10/2021,
    // };

    // let reviewD = {
    //     userId: userD._id,
    //     review: 'First time here, pefect salad dressing.',
    //     rating: 5,
    //     dateofReview: 11/11/2021,
    // };

    // let reviewE = {
    //     userId: userE._id,
    //     review: 'On diet, this place made this tough time feel better',
    //     rating: 5,
    //     dateofReview: 12/12/2021,
    // };

    // reviewA = await reviews.createReview(reviewA);
    // reviewB = await reviews.createReview(reviewB);
    // reviewC1 = await reviews.createReview(reviewC1);
    // reviewC2 = await reviews.createReview(reviewC2);
    // reviewC3 = await reviews.createReview(reviewC3);
    // reviewD = await reviews.createReview(reviewD);
    // reviewE = await reviews.createReview(reviewE);

    console.log('Done seeding database');
    await db.serverConfig.close();

}

main();