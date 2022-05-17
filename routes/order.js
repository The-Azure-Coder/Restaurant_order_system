var express = require('express')
var router = express.Router()
const bodyparser = require('body-parser');
var db = require('../database')

router.use(bodyparser.json()); // for parsing application/json
router.use(bodyparser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', (req, res) => {
    res.render('orders/makeOrder', {
        // user_login: 'User Login'
    })
})

router.post('/add', (req, res) => {
    let rand_num = Math.floor((Math.random() * 2000) + 1000);
    console.log(rand_num);

    let orderData = {
        email: req.body.email,
        order_num: rand_num,
        order_date: req.body.order_date,
        quantity: req.body.quantity,
        ordered_foodItem: req.body.ordered_foodItem,

    };

    let Query = "INSERT INTO orders SET ?";
    db.query(Query, orderData, (err, Results) => {
        if (err) throw err;
        res.redirect('/admin')

    })

})

module.exports = router