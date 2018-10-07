const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')
const router = express.Router();



router.post('/register', async(req,res)=>{
    const {email} = req.body;
    try {
        console.log('try register', {email})
        if(await User.findOne({email})){
            return res.status(400).send({error:'usuario já existe'})
        }
        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({user});
    } catch (err){
        console.log('erro', err)
        return res.status(400).send({error:'registration failed'});
    }
});

router.post('/authenticate', async (req,res)=> {
    const {email,password} = req.body;
   console.log('re body ', req.body)
    const user = await User.findOne({email}).select('+password');
    console.log('/authenticate ', {email,password}, 'user', user)
    if(!user){
        return res.status(400).send({error:"User not found"});
    }
    if(!await bcrypt.compare(password,user.password)){
        return res.status(400).send({error:"Invalid Password"});
    }
    user.password = undefined;
    
    const token = jwt.sign({id:user.id},authConfig.secret, {
        expiresIn:86400,
    })
    res.send({user,token});
})

module.exports = app => app.use('/auth', router)