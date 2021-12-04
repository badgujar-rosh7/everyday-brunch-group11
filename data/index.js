const logindata = require('./login');
const signupdata = require('./signup');
const menuData = require('./menu');
const reviewdata = require('./reviews');
const userData = require('./users');

module.exports = {
    login: logindata,
    signup: signupdata,
    user: userData,
    reviews: reviewdata,
    menu: menuData,
};
