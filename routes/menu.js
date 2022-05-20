var express = require('express')
var router = express.Router()
const bodyparser = require('body-parser');
var db = require('../database');
const { set } = require('../app');

router.use(bodyparser.json()); // for parsing application/json
router.use(bodyparser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', (req, res) => {
    sql = `SELECT mt.id, mt.food_nm, mt.food_description,mt.price, mt.image, ct.type FROM amberapp3.menu mt, amberapp3.category ct WHERE mt.category_id = ct.id`
    db.query(sql, (err, rows) => {
        if (err) throw err
        var _categories = []
        rows.forEach(row => {
            _categories.push(row.type)
        });
        var categories = Array.from(new Set(...[_categories]))
        res.render('menu/menuView', {
            heading: 'Explore Our Menu',
            items: rows,
            categories

        })

    })

})

router.post('/add', (req, res) => {
    let rand_num = Math.floor((Math.random() * 2000) + 1000);
    console.log(rand_num);

    let cartData = {
        order_num: rand_num,
        ordered_item: req.body.ordered_item,
        price: req.body.price,
        total: req.body.total,
        quantity: req.body.quantity,
        payment_dt: req.body.payment_dt
    };

    let Query = "INSERT INTO checkout SET ?";
    db.query(Query, cartData, (err, Results) => {
        if (err) throw err;
        res.redirect('checkout/cart')
    })

})

module.exports = router