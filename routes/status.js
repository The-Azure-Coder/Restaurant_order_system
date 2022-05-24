var express = require('express')
var router = express.Router()
var db = require('../database')




router.get('/', (req, res) => {
    res.render('registry/status')
})


router.post('/order', (req, res) => {
    let order_number = req.body.order_num
    let sql = `SELECT * FROM amberapp3.orders WHERE order_num LIKE '${order_number}'`

    db.query(sql, (err, rows) => {
        if (err) throw err
        res.render('orders/viewStatus', {
            orders: rows
        })

        console.log(rows)

    })
})


module.exports = router