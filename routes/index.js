const path = require('path');

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.render('pages/index');
    });

  app.get('/menu', (req, res) => {
    res.render('pages/menu');
  });

  app.use('*', (req, res) => {
    res.status(404).json({"Error" : "Resource Not Found"});
  });
};

module.exports = constructorMethod;
