var mysql = require('mysql')
var express = require('express')
var app = express()
const session = require('express-session');
var db = require('./database')
const bodyparser = require('body-parser');
const layout = require('express-ejs-layouts')
const path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');



app.use(layout)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout')
app.use('/images', express.static('images'));

app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'secREt$#code$%3245',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1200000 }
}))

var homeRouter = require('./routes/home')
var authRouter = require('./routes/login')
var OrderRouter = require('./routes/order')
var menuRouter = require('./routes/menu')
var cartRouter = require('./routes/checkout')
var adminRouter = require('./routes/admin')
var statusRouter = require('./routes/status')



app.use('/', homeRouter)
app.use('/login', authRouter)
app.use('/order', OrderRouter)
app.use('/menu', menuRouter)
app.use('/cart', cartRouter)
app.use('/admin', adminRouter)
app.use('/status', statusRouter)



db.connect((err) => {
    if (!err)
        console.log('connect to database successfully')
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));

})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

module.exports = app;