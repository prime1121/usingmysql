const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password: '123456',
    database: 'user'
    
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE user';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('users table created...');
    });
});

// Insert post 1
app.get('/adduser1', (req, res) => {
    let post = {name:'new user 1'};
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('user 1 added...');
    });
});

// Insert post 2
app.get('/adduser2', (req, res) => {
    let post = {name:'new user 2'};
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('user 2 added...');
    });
});

// Select users
app.get('/getusers', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('users fetched...');
    });
});

// Select single post
app.get('/getuser/:id', (req, res) => {
    let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('user fetched...');
    });
});


app.listen('8000', () => {
    console.log('Server started on port 8000');
});