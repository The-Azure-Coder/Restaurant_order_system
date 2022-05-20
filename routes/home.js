var express = require('express')
var router = express.Router()
const bodyparser = require('body-parser');
var db = require('../database')

router.use(bodyparser.json()); // for parsing application/json
router.use(bodyparser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


router.get('/', (req, res) => {
    if (req.session.loggedin === true) {
        res.render('home',
            {
                user_session: req.session,

            });

    } else {
        res.redirect('login');
    }
})

// router.get('/', function (request, response) {

//     if (request.session.loggedin) {

//         response.send('Welcome back, ' + request.session.username + '!');
//     } else {

//         response.send('Please login to view this page!');
//     }
//     response.end();
// });

module.exports = router