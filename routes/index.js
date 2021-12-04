const path = require('path');
const adminRoutes = require('./admin');
const userRoutes = require('./users');
const reviewsRoutes = require('./reviews');
const searchRoutes = require('./search');

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.render('pages/index');
    });

    app.get('/menu', (req, res) => {
        res.render('pages/menu', { pageHeading: 'Menu' });
    });

    app.get('/sides', (req, res) => {
        res.render('pages/menu', { pageHeading: 'Sides' });
    });

    app.get('/beverages', (req, res) => {
        res.render('pages/menu', { pageHeading: 'Beverages' });
    });

    app.get('/desserts', (req, res) => {
        res.render('pages/menu', { pageHeading: 'Desserts' });
    });

    app.get('/cart', (req, res) => {
        res.render('pages/cart');
    });

    /////////////////////////////////////////////////////Roshan
    app.use('/admin', adminRoutes);
    app.use('/search', searchRoutes);

    /////////////////////////////////////////////////Roshan

    /*******************************************************************************Tanay*/
    app.use('/users', userRoutes);
    app.use('/reviews', reviewsRoutes);
    /*******************************************************************************Tanay*/

    //
    app.use('*', (req, res) => {
        res.status(404).json({ Error: 'Resource Not Found' });
    });
};

module.exports = constructorMethod;
