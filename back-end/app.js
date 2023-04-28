const express = require('express');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const mysql = require('mysql');

const app = express();
const port = 3003;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exam'
  })

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//DB


//Login

app.post('/login', (req, res) => {
    const sessionId = uuidv4();

    const sql = `
        UPDATE users
        SET session = ?
        WHERE name = ? AND psw = ?
    `;

    con.query(sql, [sessionId, req.body.name, md5(req.body.password)], (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.cookie('userSession', sessionId);
            res.json({
                status: 'ok',
                name: req.body.name
            });
        } else {
            res.json({
                status: 'error',
            });
        }
    });

});

app.get('/login', (req, res) => {

    const sql = `
        SELECT name
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.cookies.userSession || ''], (err, result) => {
        if (err) throw err;

        if (result.length) {
            res.json({
                status: 'ok',
                name: result[0].name,
            });
        } else {
            res.json({
                status: 'error',
            });
        }

    });

});

app.post('/logout', (req, res) => {
    res.cookie('userSession', '');
    res.json({
        status: 'logout',
    });
});

app.listen(port, () => {
    console.log(`Server is on port number: ${port}`);
});



/*
//box--------------------------
app.get('/box', (req, res) => {
    const sql = `
        SELECT boxId, id, weight, name, isBurnable, isExpiringFast
        FROM box
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/box', (req, res) => {
    const sql = `
        INSERT INTO box (id, weight, name, isBurnable, isExpiringFast)
        VALUES (?,?,?,?,?)
    `;
    con.query(sql, [req.body.id, req.body.weight, req.body.name, req.body.isBurnable, req.body.isExpiringFast], (err) => {
        if (err) throw err;
        res.json({});
    });
});

app.delete('/box/:id', (req, res) => {
    const sql = `
        DELETE FROM box
        WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({});
    });
});

//container--------------------------
app.get('/container', (req, res) => {
    const sql = `
        SELECT id, type
        FROM container
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/container', (req, res) => {
    const sql = `
        INSERT INTO container (type)
        VALUES (?)
    `;
    con.query(sql, [req.body.type], (err) => {
        if (err) throw err;
        res.json({});
    });
});

app.delete('/container/:id', (req, res) => {
    const sql = `
        DELETE FROM container
        WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({});
    });
});

*/