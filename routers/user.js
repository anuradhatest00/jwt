const express = require('express');
const res = require('express/lib/response');
const jwt =require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();

let refreshTokens=[];

router.post('/login',(req,res)=>{
   //DB
   //OK
   const username= req.body.username;
   const user= {name:username};

   const accessToken=jwt.sign(user,process.env.TOKEN_KEY,{expiresIn: '10s'});
   const refreshToken= jwt.sign(user,process.env.RE_TOKEN_KEY,{expiresIn: '24h'});
   refreshTokens.push(refreshToken);
   res.send({accessToken,refreshToken});
   
})


router.post('/token',(req,res)=>{
   const refreshToken = req.body.refreshToken;
   if(refreshToken==null) res.sendStatus(401);
   if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
   jwt.verify(refreshToken,process.env.RE_TOKEN_KEY,(err,user)=>{
      if(err) res.sendStatus(403);
      const accessToken=jwt.sign({name:user.name},process.env.TOKEN_KEY,{expiresIn: '10s'});
      res.send({accessToken});
   });
});


router.delete('/logout',(req,res)=>{
   const refreshToken = req.body.refreshToken;
    refreshTokens = refreshTokens.filter(t=> t !== refreshToken);
    res.sendStatus(204);
   });





module.exports = router