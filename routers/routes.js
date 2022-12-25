const express   = require('express');
const router    = express.Router();
const userSchema = require("../models/schema")

router.get('/',(err, res) => {
    res.render('register',{title : 'Kindly Fill ',password:'',email:''})
});

router.post('/register',async(req, res) => {
    try{
            const {
                name,
                number,
                email,
                pswd,
                cpswd
            } = req.body;

        if(pswd === cpswd)
        {
            const userData = new userSchema({
                name,
                number,
                email,
                pswd,
                cpswd
            })
            
            userData.save(
            err => {
                if(err){
                    console.log("errorrrrr") 
                }
                else{
                    res.render('register',{title:'Now You Are Registered !!! ',password : '',email:''}) 
                    // window.location.reload(true) 
                }
            })


            const usermail = await userSchema.findOne({email:email});
            if(email === usermail.email)
            {
                res.render('register',{title:'',password : '',email:'This mail is already in use !!!!'})
            }
            else
            {
                console.log('err');
            }
           
            
        }
        else
        {
            res.render('register',{title:'',password : 'passsword not match',email:''})  
        }
    }
    catch(error){
        res.render('register',{title:'Error in code',password : '',email:''}) 
    }
});




// login

router.post('/login',(req,res) => {
    const{
        email,pswd
    }=req.body;

    userSchema.findOne({email:email,pswd:pswd},(err,result) => {
        if((email === result.email) && (pswd === result.pswd))
        {
            res.render('homepage',{name : result.name, email:result.email, number:result.number, pswd:result.pswd, id:result._id})
        }
        else
        {
            res.render('register',{name : 'Please Check Your Mail Or Password !!!'})
        }
    })
})
module.exports = router;
