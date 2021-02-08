const express = require('express')
const fs = require('fs')
const http = require('http')
const bodyParser = require('body-parser')
const url = require('url')
const app = express();

app.use(express.static("public"))

app.set("view engine", "ejs");

const data = fs.readFileSync('dev-data/data.json', 'utf-8')
const test = JSON.parse(data)
// console.log(test);

//routes//
app.get('/home', (req, res) => {
    res.render('home')
})
app.get('/home/node-farm', (req, res) => {
    res.render('overview', { OD: test })
})
app.get('/home/node-farm/productscard', (req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    res.render('productscard', { PC: test, qId: query.id })
})
app.get('/home/pig-game', (req, res) => {
    res.render('game')
})
app.get('/home/budgety', (req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    res.render('budgety')
})
app.get('/home/natours', (req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    res.render('natours')
})
app.listen(process.env.PORT || 3000);