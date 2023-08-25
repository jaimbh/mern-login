const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res)=>{
	res.send(`hello world from router.js`);
});

router.post('/register', async (req, res)=>{
	const {name, email, phone, work, password, cpassword} = req.body;
	
	if(!name || !email || !phone || !work || !password || !cpassword){
		return res.status(422).json({error: 'fill all fields'});
	}
	
	try{
		const userExist = await User.findOne({email: email});
		
		if(userExist){
			return res.status(422).json({error: 'email already exists'});
		}else if(password != cpassword){
			return res.status(422).json({error: 'passwords do not match'});
		}
		
		const user = new User({name, email, phone, work, password, cpassword});
		
		await user.save();
		
		res.status(201).json({message: 'user saved'});
				
	}catch(err){
		res.json({error: err});
	}
});

router.post('/signin', async (req, res)=>{
	const {email, password} = req.body;
	
	try{
		if(!email || !password){
			return res.status(400).json({error: 'fill all fields'});
		}
		
		const userLogin = await User.findOne({email: email});
		
		if(userLogin){
			const isMatch = await bcrypt.compare(password, userLogin.password);
			
			if(!isMatch){
				return res.status(400).json({error: 'invalid credentials pass'});
			}
		
			const token = await userLogin.generateAuthToken();
			//res.send(token);
			res.cookie('jwtoken', token, {
				expires: new Date(Date.now() + 25892000000),
				httpOnly: true
			});
			
			res.json({ message: 'Login successful' });
			
		}else{
			return res.status(400).json({error: 'invalid credentials'});
		}
		
	}catch(err){
		res.json({error: err});
	}
});

router.get('/about', authenticate, (req, res)=>{
	res.send(req.rootUser);
});

router.get('/getdata', authenticate, (req, res)=>{
	res.send(req.rootUser);
});

router.get('/logout', (req, res)=>{
	res.clearCookie('jwtoken', {path:'/'});
	res.status(200).send('user logout');
});

module.exports = router;