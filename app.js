const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileupload = require('express-fileupload');
app.use(fileupload());
app.use(cookieParser());
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        name: 'AuthCookie',
        secret: 'secretKey',
        saveUninitialized: true,
        resave: false,
        cookie: { maxAge: 600000 },
    })
);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/users/profile');
    } else {
        next();
    }
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
