const connection = require('../config/mongoConnection');
const signup = require('./signup');
const login = require('./login');
const userdata = require('./users');
const reviewdata = require('./reviews');
const main = async () => {
    ///////////////////////////////////////////////////////////////////////////////////
    //  Create User(signup)
    // try {
    //     const createuser = await signup.createUser(
    //         '  Tanay',
    //         '  Tadas',
    //         ' TANAY@GMAIL.COM',
    //         '07/16/1999',
    //         ' HOBOKEN  ',
    //         '  NJ  ',
    //         '  TANAY_TADAS  ',
    //         '  TANAY123'
    //     );
    //     console.log(createuser);
    // } catch (e) {
    //     console.log(e);
    // }
    ///////////////////////////////////////////////////////////////////////////////////

    ///   Check User (login)
    // try {
    //     const checkuser = await login.checkUser('tanay_tadas', 'TANAY123');
    //     console.log(checkuser);
    // } catch (e) {
    //     console.log(e);
    // }
    //61a86e32b4a16f125aa6437d

    ///////////////////////////////////////////////////////////////////////////////////
    //
    // Get USer By ID
    // try {
    //     const eachuser = await userdata.getUserById('61a86e32b4a16f125aa6437d');
    //     console.log(eachuser);
    // } catch (e) {
    //     console.log(e);
    // }

    ///////////////////////////////////////////////////////////////////////////////////
    // Create New Review

    try {
        let current_datetime = new Date();
        let formatted_date =
            current_datetime.getMonth() +
            1 +
            '/' +
            current_datetime.getDate() +
            '/' +
            current_datetime.getFullYear();
        const createReview = await reviewdata.createReview(
            '   61a54cdc255446d4845aa82e     ',
            '    The food is healthy    ',
            5,
            formatted_date
        );
        console.log(createReview);
    } catch (e) {
        console.log(e);
    }

    ///////////////////////////////////////////////////////////////////////////////////
    // Get review by userID

    // try {
    //     const reviewByUserId = await reviewdata.getAllReviewsByUserId(
    //         '61a86e32b4a16f125aa6437d'
    //     );
    //     console.log(reviewByUserId);
    // } catch (e) {
    //     console.log(e);
    // }
    ///////////////////////////////////////////////////////////////////////////////////
    // Get review by reviewID
    //61a99c22e624992fa55c52dd
    // try {
    //     const reviewByreviewId = await reviewdata.getReviewByReviewId(
    //         '61a99c22e624992fa55c52dd'
    //     );
    //     console.log(reviewByreviewId);
    // } catch (e) {
    //     console.log(e);
    // }
    ///////////////////////////////////////////////////////////////////////////////////
    //get All Users
    // try {
    //     const getalluser = await userdata.getAllUsers();
    //     console.dir(getalluser, { depth: null });
    // } catch (e) {
    //     console.log(e);
    // }
    ///////////////////////////////////////////////////////////////////////////////////

    const db = await connection();
    await db.serverConfig.close();
};
main().catch((error) => {
    console.log(error);
});
