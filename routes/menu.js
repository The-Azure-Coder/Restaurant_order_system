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

router.get('/your-order/:id', (req, res) => {
    let id = req.params.id;
    let rand_num = Math.floor((Math.random() * 2000) + 1000);
    let sqlQuery = `SELECT * FROM amberapp3.menu WHERE id = ${id}`

    db.query(sqlQuery, (err, rows) => {
        if (err) {

        } else {
            res.render('checkout/cart', {
                foodItem: rows[0],
                order_num: rand_num
            })
        }

        console.log(rows)

    })


})

router.post('/add', (req, res) => {
    let cartData = {
        order_num: req.body.order_num,
        order_date: new Date(Date.now()),
        quantity: req.body.quantity,
        food_nm: req.body.food_nm,
        food_description: req.body.food_description,
        price: req.body.price,
        total: req.body.total
    };

    let Query = "INSERT INTO orders SET ?";
    db.query(Query, cartData, (err, Results) => {
        if (err) throw err;
        res.redirect('/admin')
    })
})

module.exports = router