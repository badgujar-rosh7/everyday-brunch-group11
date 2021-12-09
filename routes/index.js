const path = require('path');
const adminRoutes = require('./admin');
const userRoutes = require('./users');
const reviewsRoutes = require('./reviews');
const searchRoutes = require('./search');
const loginRoutes = require('./login');
const menuRoutes = require('./menu');
const categoryRoutes = require('./category');
const cartRoutes = require('./cart');
const cartDetailRoutes = require('./cartdetails');
const data = require('../data');
const { category } = require('../config/mongoCollections');
const { signup } = require('../data');
const signupRoutes = require('./signup');
const paymentRoutes = require('./payment');
const payRoutes = require('./paymentpage');
const bestRoutes = require('./bestseller');
const userData = data.menu;
const cartData = data.cart;

const constructorMethod = (app) => {
    app.get('/', async (req, res) => {
        let getCategory = await userData.getAllCategory();
        req.session.userid = '78787878';
        // let counterValue;
        // if(req.session.userid){
        //     counterValue = await cartData.getCounter(req.session.userid);
        // } else{
        //     counterValue=0
        // }
        res.render('pages/index', { getCategory,data:getCategory });
    });

    app.use('/cartpage', cartDetailRoutes);

    /////////////////////////////////////////////////////Roshan
    app.use('/admin', adminRoutes);
    app.use('/search', searchRoutes);
    app.use('/category', categoryRoutes);
    app.use('/cart', cartRoutes);
    app.get('/getCounter', async (req, res) => {
        //console.log(req.session.user.userId)
        if (req.session.user) {
            let counterValue = await cartData.getCounter(
                req.session.user.userId
            );
            res.json({ success: true, count: counterValue });
        } else {
            res.json({ success: true, count: 0 });
        }
    });

    app.use('/cartpage', cartDetailRoutes);
    app.use('/payment', paymentRoutes);
    app.use('/paymentpage', payRoutes);
    app.use('/bestseller',bestRoutes);
    /////////////////////////////////////////////////Roshan
    app.use('/menu', menuRoutes);

    /*******************************************************************************Tanay*/
    app.use('/users', userRoutes);
    app.use('/reviews', reviewsRoutes);
    app.use('/login', loginRoutes);
    app.use('/signup', signupRoutes);

    app.use('/logout', async (req, res) => {
        if (!req.session.user) {
            res.redirect('/');
        } else {
            req.session.destroy();
            // res.render('pages/logout');
            res.redirect('/');
        }
    });
    /*******************************************************************************Tanay*/

    app.get('/advertisements', async (req, res) => {
        res.render('pages/advertisements');
    });

    // app.get('/signup', async (req, res) => {
    //     res.render('pages/signupform');
    // });

    app.get('/admin', async (req, res) => {
        res.render('pages/admin');
    });

    app.use('/bestseller',bestRoutes);


    //
    app.use('*', (req, res) => {
        res.status(404).json({ Error: 'Resource Not Found' });
    });
};

module.exports = constructorMethod;
