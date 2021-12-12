const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const signup = data.signup;
const reviews = data.reviews;
const menu = data.menu;

async function main() {
    const db = await dbConnection;
    await db.dropDatabase();

    //Users
    //const userA = await signup.createUser('Akshay', 'Sahasrabuddhe', 'AkshayS@gmail.com', '01/01/1995', 'Male', 'LA', 'CA', 'AkshayS', 'AkshaySPW');
    //const userB = await signup.createUser('Haoyu', 'Li', 'HaoyuL@gmail.com', '02/02/1996', 'Female', 'Hoboken', 'NJ', 'HaoyuL', 'HaoyuLPW');
    //const userC = await signup.createUser('Roshan', 'Badhujar', 'RoshanB@gmail.com', '03/03/1997', 'Male', 'Boston', 'MA', 'RoshanB', 'RoshanBPW');
    //const userD = await signup.createUser('Tanay', 'Tadas', 'TanayT@gmail.com', '04/04/1998', 'Male', 'Miami', 'FL', 'TanayT', 'TanayTPW');
    //const userE = await signup.createUser('Yongxiang', 'Zhang', 'YongxiangZ@gmail.com', '05/05/1999', 'Male', 'Philadelphia', 'PA', 'YongxiangZ', 'YongxiangZPW')

    let userA = {
        firstName: 'Akshay',
        lastName: 'Sahasrabuddhe',
        email: 'AkshayS@gmail.com',
        DateOfBirth: 01/01/1995,
        gender: 'male',
        City: 'LA',
        State: 'CA',
        username: 'AkshayS',
        password: 'AkshaySPW',
    }

    let userB = {
        firstName: 'Haoyu',
        lastName: 'Li',
        email: 'HaoyuL@gmail.com',
        DateOfBirth: 02/02/1996,
        gender: 'female',
        City: 'Hoboken',
        State: 'NJ',
        username: 'HaoyuL',
        password: 'HaoyuLPW',
    }

    let userC = {
        firstName: 'Roshan',
        lastName: 'Badhujar',
        email: 'RoshanB@gmail.com',
        DateOfBirth: 03/03/1997,
        gender: 'male',
        City: 'Boston',
        State: 'MA',
        username: 'RoshanB',
        password: 'RoshanBPW',
    }

    let userD = {
        firstName: 'Tanay',
        lastName: 'Tadas',
        email: 'TanayT@gmail.com',
        DateOfBirth: 04/04/1998,
        gender: 'male',
        City: 'Miami',
        State: 'FL',
        username: 'TanayT',
        password: 'TanayTPW',
    }

    let userE = {
        firstName: 'Yongxiang',
        lastName: 'Zhang',
        email: 'YongxiangZ@gmail.com',
        DateOfBirth: 05/05/1999,
        gender: 'male',
        City: 'Philadelphia',
        State: 'PA',
        username: 'YongxiangZ',
        password: 'YongxiangZPW',
    }

    let userF = {
        firstName: 'Ada',
        lastName: 'Smith',
        email: 'AdaS@outlook.com',
        DateOfBirth: 06/06/2000,
        gender: 'other',
        City: 'Riverside',
        State: 'CA',
        username: 'AdaS',
        password: 'AdaSPW',
    }

    let userG = {
        firstName: 'Jason',
        lastName: 'Karlsson',
        email: 'JasonK@gmail.com',
        DateOfBirth: 07/07/2001,
        gender: 'prefer not to say',
        City: 'Orlando',
        State: 'FL',
        username: 'JasonK',
        password: 'JasonKPW',
    }

    userA = await signup.createUser(userA);
    userB = await signup.createUser(userB);
    userC = await signup.createUser(userC);
    userD = await signup.createUser(userD);
    userE = await signup.createUser(userE);
    userF = await signup.createUser(userF);
    userG = await signup.createUser(userG);


    //Category
    let categoryA = {
        catogory: 'Brunch'
    }

    let categoryB = {
        catogory: 'Side'
    }

    let categoryC = {
        catogory: 'Bakery'
    }

    let categoryD = {
        catogory: 'Coffee'
    }

    let categoryE = {
        catogory: 'Beverage'
    }

    categoryA = await menu.addCategory(categoryA);
    categoryB = await menu.addCategory(categoryB);
    categoryC = await menu.addCategory(categoryC);
    categoryD = await menu.addCategory(categoryD);
    categoryE = await menu.addCategory(categoryE);


    //Items
    let itemA = {
        itemCategory: categoryA.catogory,
        itemTitle: 'Avocado Smash',
        itemDescription: 'Our classic avo smash with feta, heirloom tomatoes & soft herbs on toasted multigrain.',
        itemPrice: 14.00,
        itemCalories: 363,
        itemKeywords: 'Avocado Melt'
    };

    let itemB = {
        itemCategory: categoryA.catogory,
        itemTitle: 'Athletes Burrito',
        itemDescription: 'Egg whites, sautéed spinach, roasted tomatoes, avocado, lentils, feta & chimichurri mayo served with dressed salad.',
        itemPrice: 15.00,
        itemCalories: 552,
        itemKeywords: 'Egg Burrito Melt'
    };

    let itemC = {
        itemCategory: categoryA.catogory,
        itemTitle: 'Collective Granola',
        itemDescription: 'Husk Bakeshop GF granola served with greek yogurt, lemon curd & fresh berries.',
        itemPrice: 11.25,
        itemCalories: 578,
        itemKeywords: 'Yogurt Granola Fruit'
    };

    let itemD = {
        itemCategory: categoryB.catogory,
        itemTitle: 'Toast Bar',
        itemDescription: 'Thick cut multigrain toast served with vegemite & butter, jam & butter or almond butter.',
        itemPrice: 6.00,
        itemCalories: 312,
        itemKeywords: 'Toast Butter'
    };

    let itemE = {
        itemCategory: categoryB.catogory,
        itemTitle: 'Charred Broccoli',
        itemDescription: 'Char roasted florets with parmesan cheese and drizzled with olive oil, sea salt, chili flakes, cracked pepper, and a lemon wedge.',
        itemPrice: 6.25,
        itemCalories: 154,
        itemKeywords: 'Vege Cheese Broccoli'
    };

    let itemF = {
        itemCategory: categoryC.catogory,
        itemTitle: 'Plain Croissant',
        itemDescription: 'Freshly baked plain croissants. Light and airy layers of flaky buttery pastry.',
        itemPrice: 3.25,
        itemCalories: 300,
        itemKeywords: 'Butter Plain'
    };

    let itemG = {
        itemCategory: categoryC.catogory,
        itemTitle: 'Almond Croissant',
        itemDescription: 'Freshly baked almond croissants. Light and airy layers of flaky buttery pastry with toasted slivered almonds.',
        itemPrice: 3.75,
        itemCalories: 430,
        itemKeywords: 'Butter Almond'
    };

    let itemH = {
        itemCategory: categoryC.catogory,
        itemTitle: 'Blueberry Crumb Muffin',
        itemDescription: 'A super moist fluffy sour cream muffin packed with wild blueberries and crunchy cinnamon crumb topping.',
        itemPrice: 5.00,
        itemCalories: 645,
        itemKeywords: 'Muffin Cinnamon'
    };

    let itemI = {
        itemCategory: categoryD.catogory,
        itemTitle: 'Latte',
        itemDescription: 'The global café favorite. Double espresso with steamed, silky textured milk and one inch of velvety micro-foam.',
        itemPrice: 4.25,
        itemCalories: 120,
        itemKeywords: 'Coffee Milk Foam'
    };

    let itemJ = {
        itemCategory: categoryD.catogory,
        itemTitle: 'Mocha',
        itemDescription: 'Double shot of espresso and cocoa spun in a pitcher with steamed, silky textured milk, dusted with chocolate shavings.',
        itemPrice: 4.50,
        itemCalories: 120,
        itemKeywords: 'Coffee Milk Chocolate'
    };

    let itemK = {
        itemCategory: categoryD.catogory,
        itemTitle: 'Cold Brew',
        itemDescription: 'Our signature flagstaff coffee immersed in water for 12 hours to extract and form a rich concentrate.',
        itemPrice: 4.25,
        itemCalories: 0,
        itemKeywords: 'Coffee Black'
    };

    let itemL = {
        itemCategory: categoryD.catogory,
        itemTitle: 'Affogato',
        itemDescription: 'Vanilla ice-cream served with a double shot of our signature maverick espresso.',
        itemPrice: 4.50,
        itemCalories: 170,
        itemKeywords: 'Coffee Ice-cream'
    };

    let itemM = {
        itemCategory: categoryE.catogory,
        itemTitle: 'Breakfast Tea',
        itemDescription: 'Our cold brewed Melbourne Brekky is a smooth, strong blend of organic Ceylon tea. This robust brew provides a refreshing boost for any time of day.',
        itemPrice: 4.00,
        itemCalories: 10,
        itemKeywords: 'Tea Iced'
    };

    let itemN = {
        itemCategory: categoryE.catogory,
        itemTitle: 'Bottled Water',
        itemDescription: 'Our 100% pure spring water in 24oz bottle. Enjoy Mates!',
        itemPrice: 2.50,
        itemCalories: 0,
        itemKeywords: 'Water'
    };

    let itemO = {
        itemCategory: categoryE.catogory,
        itemTitle: 'Matcha Latte',
        itemDescription: 'Ceremonial grade matcha green tea powder that naturally detoxifies the body, is rich in antioxidants, and provides a valuable source of fiber and vitamins with almond milk.',
        itemPrice: 6.00,
        itemCalories: 60,
        itemKeywords: 'Matcha Almond-milk'
    };
    
    itemA = await menu.addMenu(itemA);
    itemB = await menu.addMenu(itemB);
    itemC = await menu.addMenu(itemC);
    itemD = await menu.addMenu(itemD);
    itemE = await menu.addMenu(itemE);
    itemF = await menu.addMenu(itemF);
    itemG = await menu.addMenu(itemG);
    itemH = await menu.addMenu(itemH);
    itemI = await menu.addMenu(itemI);
    itemJ = await menu.addMenu(itemJ);
    itemK = await menu.addMenu(itemK);
    itemL = await menu.addMenu(itemL);
    itemM = await menu.addMenu(itemM);
    itemN = await menu.addMenu(itemN);
    itemO = await menu.addMenu(itemO);



    //Review
    let reviewA = {
        review_id: ObjectId()
        userId: userA._id,
        review: 'Love the brunch here!',
        rating: 5,
        dateofReview: 06/06/2021,
    };

    let reviewB = {
        userId: userB._id,
        review: 'I had a large Cold Brew and a Borrito, awesome food but the coffee can be better.',
        rating: 4,
        dateofReview: 07/07/2021,
    };

    let reviewC1 = {
        userId: userC._id,
        review: 'A great place to eat, always come after morning class.',
        rating: 5,
        dateofReview:08/08/2021,
    };

    let reviewC2 = {
        userId: userC._id,
        review: 'Best after class brunch!',
        rating: 5,
        dateofReview: 09/09/2021,
    };

    let reviewC3 = {
        userId: userC._id,
        review: 'Always come after class, but let me down today. Considering to find a new place for brunch.',
        rating: 3,
        dateofReview: 10/10/2021,
    };

    let reviewD = {
        userId: userD._id,
        review: 'First time here, pefect salad dressing.',
        rating: 5,
        dateofReview: 11/11/2021,
    };

    let reviewE = {
        userId: userE._id,
        review: 'On diet, this place made this tough time feel better',
        rating: 5,
        dateofReview: 12/12/2021,
    };

    reviewA = await reviews.createReview(reviewA);
    reviewB = await reviews.createReview(reviewB);
    reviewC1 = await reviews.createReview(reviewC1);
    reviewC2 = await reviews.createReview(reviewC2);
    reviewC3 = await reviews.createReview(reviewC3);
    reviewD = await reviews.createReview(reviewD);
    reviewE = await reviews.createReview(reviewE);

    console.log('Done seeding database');
    await db.serverConfig.close();

}

main();