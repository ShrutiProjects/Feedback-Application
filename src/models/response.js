 const mongoose=require("mongoose");
 const responseSchema=new mongoose.Schema({
     mcq1:{
         type:String,
         required:true,
     },
     mcq2:{
        type:String,
        required:true,
    },
    mcq3:{
        type:String,
        required:true,
    },
    mcq4:{
        type:String,
        required:true,
    },
    mcq5:{
        type:String,
        required:true,
    },
    mcq6:{
        type:String,
        required:true,
    },
    mcq7:{
        type:String,
        required:true,
    }
 })

 const Response=new mongoose.model("Response",responseSchema);
 module.exports=Response;