const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const signup = data.signup;
const reviews = data.reviews;
const menu = data.menu;

async function main() {
    const db = await dbConnection;
    await db.dropDatabase();

    //Users
    const userA = await signup.createUser('Akshay', 'Sahasrabuddhe', 'AkshayS@gmail.com', '01/01/1995', 'male', 'LA', 'CA', 'AkshayS', 'AkshaySPW');
    const userB = await signup.createUser('Haoyu', 'Li', 'HaoyuL@gmail.com', '02/02/1996', 'female', 'Hoboken', 'NJ', 'HaoyuL', 'HaoyuLPW');
    const userC = await signup.createUser('Roshan', 'Badhujar', 'RoshanB@gmail.com', '03/03/1997', 'male', 'Boston', 'MA', 'RoshanB', 'RoshanBPW');
    const userD = await signup.createUser('Tanay', 'Tadas', 'TanayT@gmail.com', '04/04/1998', 'male', 'Miami', 'FL', 'TanayT', 'TanayTPW');
    const userE = await signup.createUser('Yongxiang', 'Zhang', 'YongxiangZ@gmail.com', '05/05/1999', 'male', 'Philadelphia', 'PA', 'YongxiangZ', 'YongxiangZPW');
    const userF = await signup.createUser('Ada', 'Smith', 'AdaS@outlook.com', '06/06/2000', 'other', 'Riverside', 'CA', 'AdaS', 'AdaSPW');
    const userG = await signup.createUser('Jason', 'Karlsson', 'JasonK@gmail.com', '07/07/2001', 'prefer not to say', 'Orlando', 'FL', 'JasonK', 'JasonKPW');

    // let userA = {
    //     firstName: 'Akshay',
    //     lastName: 'Sahasrabuddhe',
    //     email: 'AkshayS@gmail.com',
    //     DateOfBirth: 01/01/1995,
    //     gender: 'male',
    //     City: 'LA',
    //     State: 'CA',
    //     username: 'AkshayS',
    //     password: 'AkshaySPW',
    // }

    // let userB = {
    //     firstName: 'Haoyu',
    //     lastName: 'Li',
    //     email: 'HaoyuL@gmail.com',
    //     DateOfBirth: 02/02/1996,
    //     gender: 'female',
    //     City: 'Hoboken',
    //     State: 'NJ',
    //     username: 'HaoyuL',
    //     password: 'HaoyuLPW',
    // }

    // let userC = {
    //     firstName: 'Roshan',
    //     lastName: 'Badhujar',
    //     email: 'RoshanB@gmail.com',
    //     DateOfBirth: 03/03/1997,
    //     gender: 'male',
    //     City: 'Boston',
    //     State: 'MA',
    //     username: 'RoshanB',
    //     password: 'RoshanBPW',
    // }

    // let userD = {
    //     firstName: 'Tanay',
    //     lastName: 'Tadas',
    //     email: 'TanayT@gmail.com',
    //     DateOfBirth: 04/04/1998,
    //     gender: 'male',
    //     City: 'Miami',
    //     State: 'FL',
    //     username: 'TanayT',
    //     password: 'TanayTPW',
    // }

    // let userE = {
    //     firstName: 'Yongxiang',
    //     lastName: 'Zhang',
    //     email: 'YongxiangZ@gmail.com',
    //     DateOfBirth: 05/05/1999,
    //     gender: 'male',
    //     City: 'Philadelphia',
    //     State: 'PA',
    //     username: 'YongxiangZ',
    //     password: 'YongxiangZPW',
    // }

    // let userF = {
    //     firstName: 'Ada',
    //     lastName: 'Smith',
    //     email: 'AdaS@outlook.com',
    //     DateOfBirth: 06/06/2000,
    //     gender: 'other',
    //     City: 'Riverside',
    //     State: 'CA',
    //     username: 'AdaS',
    //     password: 'AdaSPW',
    // }

    // let userG = {
    //     firstName: 'Jason',
    //     lastName: 'Karlsson',
    //     email: 'JasonK@gmail.com',
    //     DateOfBirth: 07/07/2001,
    //     gender: 'prefer not to say',
    //     City: 'Orlando',
    //     State: 'FL',
    //     username: 'JasonK',
    //     password: 'JasonKPW',
    // }

    // userA = await signup.createUser(userA);
    // userB = await signup.createUser(userB);
    // userC = await signup.createUser(userC);
    // userD = await signup.createUser(userD);
    // userE = await signup.createUser(userE);
    // userF = await signup.createUser(userF);
    // userG = await signup.createUser(userG);


    //Category
    const categoryA = await menu.addCategory('Brunch');
    const categoryB = await menu.addCategory('Side');
    const categoryC = await menu.addCategory('Bakery');
    const categoryD = await menu.addCategory('Coffee');
    const categoryE = await menu.addCategory('Beverage');

    // let categoryA = {
    //     catogory: 'Brunch'
    // }

    // let categoryB = {
    //     catogory: 'Side'
    // }

    // let categoryC = {
    //     catogory: 'Bakery'
    // }

    // let categoryD = {
    //     catogory: 'Coffee'
    // }

    // let categoryE = {
    //     catogory: 'Beverage'
    // }

    // categoryA = await menu.addCategory(categoryA);
    // categoryB = await menu.addCategory(categoryB);
    // categoryC = await menu.addCategory(categoryC);
    // categoryD = await menu.addCategory(categoryD);
    // categoryE = await menu.addCategory(categoryE);


    //Items
    const itemA = await menu.addMenu(categoryA.catogory, 'Avocado Smash', 'Our classic avo smash with feta, heirloom tomatoes & soft herbs on toasted multigrain.', 14.00, 363, 'Avocado Melt');
    const itemB = await menu.addMenu(categoryA.catogory, 'Athletes Burrito', 'Egg whites, sautéed spinach, roasted tomatoes, avocado, lentils, feta & chimichurri mayo served with dressed salad.', 15.00, 552, 'Egg Burrito Melt');
    const itemC = await menu.addMenu(categoryA.catogory, 'Collective Granola', 'Husk Bakeshop GF granola served with greek yogurt, lemon curd & fresh berries.', 11.25, 578, 'Yogurt Granola Fruit');
    const itemD = await menu.addMenu(categoryB.catogory, 'Toast Bar', 'Thick cut multigrain toast served with vegemite & butter, jam & butter or almond butter.', 6.00, 312, 'Toast Butter');
    const itemE = await menu.addMenu(categoryB.catogory, 'Charred Broccoli', 'Char roasted florets with parmesan cheese and drizzled with olive oil, sea salt, chili flakes, cracked pepper, and a lemon wedge.', 6.25, 154, 'Vege Cheese Broccoli');
    const itemF = await menu.addMenu(categoryC.catogory, 'Plain Croissant', 'Freshly baked plain croissants. Light and airy layers of flaky buttery pastry.', 3.25, 300, 'Butter Plain');
    const itemG = await menu.addMenu(categoryC.catogory, 'Almond Croissant', 'Freshly baked almond croissants. Light and airy layers of flaky buttery pastry with toasted slivered almonds.', 3.75, 430, 'Butter Almond');
    const itemH = await menu.addMenu(categoryC.catogory, 'Blueberry Crumb Muffin', 'A super moist fluffy sour cream muffin packed with wild blueberries and crunchy cinnamon crumb topping.', 5.00, 645, 'Muffin Cinnamon');
    const itemI = await menu.addMenu(categoryD.catogory, 'Latte', 'The global café favorite. Double espresso with steamed, silky textured milk and one inch of velvety micro-foam.', 4.25, 120, 'Coffee Milk Foam');
    const itemJ = await menu.addMenu(categoryD.catogory, 'Mocha', 'Double shot of espresso and cocoa spun in a pitcher with steamed, silky textured milk, dusted with chocolate shavings.', 4.50, 120, 'Coffee Milk Chocolate');
    const itemK = await menu.addMenu(categoryD.catogory, 'Cold Brew', 'Our signature flagstaff coffee immersed in water for 12 hours to extract and form a rich concentrate.', 4.25, 0, 'Coffee Black');
    const itemL = await menu.addMenu(categoryD.catogory, 'Affogato', 'Vanilla ice-cream served with a double shot of our signature maverick espresso.', 4.50, 170, 'Coffee Ice-cream');
    const itemM = await menu.addMenu(categoryE.catogory, 'Breakfast Tea', 'Our cold brewed Melbourne Brekky is a smooth, strong blend of organic Ceylon tea. This robust brew provides a refreshing boost for any time of day.', 4.00, 10, 'Tea Iced');
    const itemN = await menu.addMenu(categoryE.catogory, 'Bottled Water', 'Our 100% pure spring water in 24oz bottle. Enjoy Mates!', 2.50, 0, 'Water');
    const itemO = await menu.addMenu(categoryE.catogory, 'Matcha Latte', 'Ceremonial grade matcha green tea powder that naturally detoxifies the body, is rich in antioxidants, and provides a valuable source of fiber and vitamins with almond milk.', 6.00, 60, 'Matcha Almond-milk');

    // itemA = await menu.addMenu(itemA);
    // itemB = await menu.addMenu(itemB);
    // itemC = await menu.addMenu(itemC);
    // itemD = await menu.addMenu(itemD);
    // itemE = await menu.addMenu(itemE);
    // itemF = await menu.addMenu(itemF);
    // itemG = await menu.addMenu(itemG);
    // itemH = await menu.addMenu(itemH);
    // itemI = await menu.addMenu(itemI);
    // itemJ = await menu.addMenu(itemJ);
    // itemK = await menu.addMenu(itemK);
    // itemL = await menu.addMenu(itemL);
    // itemM = await menu.addMenu(itemM);
    // itemN = await menu.addMenu(itemN);
    // itemO = await menu.addMenu(itemO);


    //Review
    const reviewA = await reviews.createReview(userA._id, 'Love the brunch here!', 5, '06/06/2021');
    const reviewB = await reviews.createReview(userB._id, 'I had a large Cold Brew and a Borrito, awesome food but the coffee can be better.', 4, '07/07/2021');
    const reviewC1 = await reviews.createReview(userC._id, 'A great place to eat, always come after morning class.', 5, '08/08/2021');
    const reviewC2 = await reviews.createReview(userC._id, 'Best after class brunch!', 5, '09/09/2021');
    const reviewC3 = await reviews.createReview(userC._id, 'Always come after class, but let me down today. Considering to find a new place for brunch.', 3, '10/10/2021');
    const reviewD = await reviews.createReview(userD._id, 'First time here, pefect salad dressing.', 5, '11/11/2021');
    const reviewE = await reviews.createReview(userE._id, 'On diet, this place made this tough time feel better', 5, '12/12/2021');

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