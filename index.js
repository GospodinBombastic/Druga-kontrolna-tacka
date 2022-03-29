var express = require('express');
const res = require('express/lib/response');
var app = express();
const mysql = require('mysql2');
const multer = require('multer');
app.use(express.static('views'));
app.set('view engine', 'ejs');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // So secure way to do this
    password: 'root',
    database: 'frizeraj',
    multipleStatements: true
});
connection.connect();

app.get('/', (req, res) => {
    if (err) throw err;
    res.render('index', { REZULTAT: rows });
});

app.post('/upload', multer().none(), function (req, res) {
    // res.send("ovo je post endpoint " + JSON.stringify(req.body) + " testing attention please " + req.body.cena)
    connection.query(`INSERT INTO termin (dan, sat) VALUES ("${req.body.danTermina}", "${req.body.vremeTermina}"); SELECT * from termin;`, function (err, rows, fields) {
        if (err) throw err;
        console.log(rows)
        res.render('spisaktermina',{REZULTAT: rows});
    });
})

app.listen(3000);