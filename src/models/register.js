const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose=require("mongoose")


const regSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
         
    },
    password:{
        type:String,
        required:true
    },
    c_password:{
        type:String,
        required:true
    },
})

regSchema.pre("save",async function(next){
    if(this.isModified("password")){

    
       // const paswd =await bcrypt.hash(password,10);
        
        console.log(`current password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10)
        console.log(`current password is ${this.password}`);
        this.c_password=undefined;
    }
        next()
})
//create collection

const Register= new mongoose.model("Register",regSchema)
module.exports= Register