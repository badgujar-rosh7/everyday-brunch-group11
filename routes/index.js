const path = require('path');
const adminRoutes=require('./admin')

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.render('pages/index');
    });

  app.get('/menu', (req, res) => {
    res.render('pages/menu');
  });

  app.get('/cart', (req, res) => {
    res.render('pages/cart');
  });

/////////////////////////////////////////////////////Roshan
app.use('/admin', adminRoutes);

/////////////////////////////////////////////////Roshan

  app.use('*', (req, res) => {
    res.status(404).json({"Error" : "Resource Not Found"});
  });
};

module.exports = constructorMethod;
