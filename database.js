
var mysql = require('mysql')
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root',
    database: 'amberapp3',
    dateStrings: true

})