const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config({path: './config.env'});

require('./db/conn');

app.use(cookieParser());
app.use(express.json());
app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.get('/contact', (req, res)=>{
	res.cookie('test', 'thapa');
	res.send(`contact`);
});

app.get('/signin', (req, res)=>{
	res.send(`signin`);
});

app.get('/signup', (req, res)=>{
	res.send(`signup`);
});

app.listen(PORT, ()=>{
	console.log(`server running at port ${PORT}`);
});