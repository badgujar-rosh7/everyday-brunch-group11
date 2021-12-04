const path = require('path');
const adminRoutes = require('./admin');
const userRoutes = require('./users');
const reviewsRoutes = require('./reviews');
const searchRoutes = require('./search');
const loginRoutes = require('./login');
const signupRoutes = require('./signup');
const menuRoutes = require('./menu');

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.render('pages/index');
    });  

    app.get('/cart', (req, res) => {
        res.render('pages/cart');
    });

    /////////////////////////////////////////////////////Roshan
    app.use('/admin', adminRoutes);
    app.use('/search', searchRoutes);

    /////////////////////////////////////////////////Roshan
    app.use('/menu', menuRoutes);

    /*******************************************************************************Tanay*/
    app.use('/users', userRoutes);
    app.use('/reviews', reviewsRoutes);
    app.use('/login', loginRoutes);
    app.use('/signup', signupRoutes);
    /*******************************************************************************Tanay*/

    //
    app.use('*', (req, res) => {
        res.status(404).json({ Error: 'Resource Not Found' });
    });
};

module.exports = constructorMethod;
