var express = require('express')
var router = express.Router()
const bodyparser = require('body-parser');
var db = require('../database')

router.use(bodyparser.json()); // for parsing application/json
router.use(bodyparser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', (req, res) => {
    res.render('registry/login', {
        user_login: 'User Login',
        title: 'Login',
        email: '',
        password: ''
    })

})

router.post('/auth', function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;


    // connection.query("SELECT * FROM login WHERE  email = '"+ email  +"' AND BINARY password = '"+ password +"'", function(err, rows, fields) {
    db.query(`SELECT * FROM amberapp3.admin WHERE email = ? AND BINARY password = ?`, [email, password], function (err, rows, fields) {
        if (err) throw err
        // if login is incorrect or not found
        if (rows.length <= 0) {
            req.flash('error', 'Invalid credentials Please try again!')
            req.session.loggedin = false
            console.log(req.session);
            res.redirect('/login')
        }
        else { // if login found
            //Assign session variables based on login credentials                
            req.session.loggedin = true;
            req.session.f_name = rows[0].f_name;
            req.session.l_name = rows[0].l_name;
            req.session.is_admin = rows[0].is_admin;
            console.log(req.session);
            res.redirect('/admin');

        }
    })

})



// Logout user
router.get('/logout', function (req, res) {
    req.session.destroy();
    req.flash('success', 'Enter Your Login Credentials');
    res.redirect('/login/');
});

module.exports = router
