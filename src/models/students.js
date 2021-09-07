const mongoose=require("mongoose");
const validator=require("validator");
const studentreg=new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!!");
            }
        }
    },
    semester:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
})

const Studentdata=new mongoose.model("Studentdata",studentreg);
module.exports=Studentdata;