var express = require('express')
var router = express.Router()
const bodyparser = require('body-parser');
var db = require('../database')

router.use(bodyparser.json()); // for parsing application/json
router.use(bodyparser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', (req, res) => {
    if (req.session.loggedin === true) {
        // let sql = `SELECT ot.id, ot.menu_id, ot.order_num, ot.order_date, ot.quantity, ot.pickup_time,mt.food_nm, mt.price, mt.food_description FROM amberapp3.orders ot, amberapp3.menu mt Where mt.id = ot.menu_id`;
        let sql = `SELECT * FROM amberapp3.orders`;
        db.query(sql, (err, rows) => {
            if (err) throw err;
            res.render('admin/viewOrder', {
                title: 'Notes Table',
                orders: rows

            });
        });
    } else {
        res.redirect('/login')
    }
})


router.get('/delete/:id', (req, res) => {
    let id = req.params.id
    query = `DELETE FROM amberapp3.orders WHERE id = ${id}`
    db.query(query, (err, rows) => {
        if (err) throw err;
        res.redirect('/admin')
    })


})

module.exports = router