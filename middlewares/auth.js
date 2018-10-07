const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

module.exports = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    console.log('foo header, ', req.headers.authorization)
    if(!authHeader){
        return res.status(401).send({error:'token não informado'})
    }


    jwt.verify(authHeader,authConfig.secret, (err,decoded)=>{
        if(err) res.status(401).send({error:"Token invalido"})

        req.userId = decoded.id;
        
        return next();
    })
};