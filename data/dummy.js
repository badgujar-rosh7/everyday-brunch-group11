const connection = require('../config/mongoConnection');
const signup = require('./signup');
const login = require('./login');
const userdata = require('./userdata');
const main = async () => {
    try {
        const createuser = await signup.createUser(
            '  Tanay',
            '  Tadas',
            ' TANAY@GMAIL.COM',
            '07/16/1999',
            ' HOBOKEN  ',
            '  NJ  ',
            '  TANAY_TADAS  ',
            '  TANAY123'
        );
        console.log(createuser);
    } catch (e) {
        console.log(e);
    }
    // try {
    //     const checkuser = await login.checkUser('tanay_tadas', 'TANAY123');
    //     console.log(checkuser);
    // } catch (e) {
    //     console.log(e);
    // }
    //61a86e32b4a16f125aa6437d
    // try {
    //     const alluser = await userdata.getAllUsers();
    //     console.log(alluser);
    // } catch (e) {
    //     console.log(e);
    // }
    // try {
    //     const eachuser = await userdata.getUserById('61a86e32b4a16f125aa6437d');
    //     console.log(eachuser);
    // } catch (e) {
    //     console.log(e);
    // }

    const db = await connection();
    await db.serverConfig.close();
};
main().catch((error) => {
    console.log(error);
});
