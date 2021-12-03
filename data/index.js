const logindata = require('./login');
const signupdata = require('./signup');
const userData = require('./users');
const reviewdata = require('./reviews');

module.exports = {
    login: logindata,
    signup: signupdata,
    user: userData,
    reviews: reviewdata,
};
