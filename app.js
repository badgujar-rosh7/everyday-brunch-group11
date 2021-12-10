const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
//const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileupload = require('express-fileupload');
app.use(fileupload());
//app.use(cookieParser());
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        name: 'AuthCookie',
        secret: 'secretKey',
        saveUninitialized: true,
        resave: false,
        // cookie: { maxAge: 600000 },
    })
);
app.use(async (req, res, next) => {
    let Timestamp = new Date().toUTCString();
    let Method = req.method;
    let Router = req.originalUrl;
    let authen = 'Authenticated User';
    let nonauthen = 'Non-Authenticated User';
    if (req.session.user) {
        console.log(`${Timestamp} ${Method} ${Router} ${authen}`);
    } else {
        console.log(`${Timestamp} ${Method} ${Router} ${nonauthen}`);
    }
    next();
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    } else {
        next();
    }
});
app.use('/signup', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    } else {
        next();
    }
});
app.use('/logout', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    } else {
        next();
    }
});
app.use('/users/profile', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    } else {
        next();
    }
});


var hbs = exphbs.create({});

// register new function
hbs.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
