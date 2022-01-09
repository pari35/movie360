const express=require('express')
const path = require('path')
const app=express()
const hbs=require('hbs')
require("./src/db")
const Register =require("./src/models/register")
//login
const login= require("./views/login")

const { triggerAsyncId } = require('async_hooks')
const { resolveSoa } = require('dns')
const port= process.env.PORT || 3000

const static_path =path.join(__dirname,"./backend");
// console.log(path.join(__dirname,"../backend/index.html"));
app.use(express.static(static_path))
app.set("view engine","hbs")



app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})
//new user db
app.post("/register",async(req,res)=>{
    try{
        const password =req.body.password;
        const cpassword=req.body.cpassword;
        if(password===cpassword){
const regiuser= new Register({
    firstname:req.body.Fname,
    lastname:req.body.Lname,
    email:req.body.email,
    password:req.body.password,
    c_password:req.body.cpassword,
})
//password hash 


const registered = await regiuser.save();
res.send("Registration succesfull !! Login ")
res.status(201).render("register")
// res.send("Registration succesful ! Please Login")
        }else{
            res.send("Password Not matching !!")
        }
    }catch(e){
        res.status(400).send(e);
    }
})

app.get('/',(req,res)=>{
res.render("login.hbs")
})

app.listen(port,()=>{
    console.log(`Server is running at Port ${port}`);
})

//login check
app.post("/",async(req,res)=>{
    try{
    const email=req.body.email;
    const password =req.body.pwd;
const useremail=  await Register.findOne({email:email});
const ismatch =bcrypt.compare(password,useremail.password)


if(ismatch){
   // res.status(201).render("login")
    res.send("Welcome to movies 360")
}else{
   res.send("Password are NOT matching")
}

    }catch(e){
        res.status(400).send("invalid email")
    }
})

//reg user check

app.post("/",async(req,res)=>{
    try{
    const email=req.body.email;
    
const reguseremail=  await Register.findOne({email:email});

if(useremail.email===email){
    res.send("User already registered")
}

    }catch(e){
        res.status(400).send(e)
    }
}) 


const bcrypt = require("bcryptjs")

const secpwd = async(password) => {
    const paswd =await bcrypt.hash(password,10);
    console.log(paswd)

    const paswdmatch =await bcrypt.compare("123",paswd )
    console.log(paswdmatch)
}

secpwd("123")