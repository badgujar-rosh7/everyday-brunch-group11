const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const signup = data.signup;
const reviews = data.reviews;

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

    //Review
    let reviewA = {
        userId: userA._id,
        review: 'Love the brunch here!',
        rating: 5,
        dateofReview: 06/06/2021,
    };

    let reviewB = {
        userId: userB._id,
        review: 'I had a large iced Americano and a 6 inch tuna sub, awesome food but the coffee can be better.',
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