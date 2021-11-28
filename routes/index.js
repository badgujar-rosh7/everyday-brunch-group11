const path = require('path');

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.render('pages/index');
    });

    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;
