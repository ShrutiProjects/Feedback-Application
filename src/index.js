// const http=require('http');
// const server=http.createServer((req,res)=>{
// // console.log(req.url);
// if(req.url=='/'){
// res.end("Hello from the shruti!Home");
// }
// else if(req.url=='/about'){
//     res.end("welcome to the about page!");
// }
// else if(req.url=='/feedback'){
//     res.end("welcome! to the feedback page!!");
// }
// else if(req.url=='/analysis'){
//     res.end("welcome! to the analysis page!!");
// }
// else if(req.url=='/contact'){
//     res.end("welcome! to the contact page!!");
// }
// else{
//     res.writeHead(404,{"Content-type":"text/html"});
//     res.end("<h1>Page not found !!!</h1>");
// }
// });
// server.listen(8000,"127.0.0.1",()=>{
// console.log("listing to the port 8000");
// });
const express=require("express");
const app=express();
const path=require('path');
const hbs=require('hbs');
const mongoose=require("mongoose");
const validator=require('validator');

require("./db/conn");
const Studentdata=require("./models/students");
const Responsedata=require("./models/response");
const createDocument=async ()=>{
    try{
        // const shreyadata=new Studentdata({
        //     username: "EN18CS301252",
        //     email:"shruti123@gmail.com",
        //     semester:"6th",
        //     branch:"CSE",
        //     password:"1234",
        //     confirmpassword:"1234",
        // }) 
        // const sejaldata=new Studentdata({
        //     username: "EN18CS301253",
        //     email:"shruti123@gmail.com",
        //     semester:"6th",
        //     branch:"CSE",
        //     password:"1234",
        //     confirmpassword:"1234",
        // }) 
        const siyadata=new Studentdata({
            username: "EN18CS301255",
            email:"siya123@gmail.com",
            semester:"6th",
            branch:"CSE",
            password:"1234",
            confirmpassword:"1234",
        }) 
        const result=await Studentdata.insertMany([siyadata]);
    console.log(result);
    }
    catch(err){
        console.log(err);
    }
    
}
// createDocument();
const port=process.env.port||3000;
const staticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../templates/views");
const partialPath=path.join(__dirname,"../templates/partials");
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialPath);
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
    app.get("",(req,res)=>{
        res.render("index");
        });
        app.get("/feedback",(req,res)=>{
            res.render("selectfeedback");
            });
            app.get("/login",(req,res)=>{
                res.render("login");
                });
              
                app.get("/register",(req,res)=>{
                    res.render("register");
                    });
                    app.post("/register",async(req,res)=>{
                        try{
                   const password=req.body.password;
                   const cpassword=req.body.confirmpassword;
                   if(password===cpassword){
                    const registerStudent=new Studentdata({
                        username:req.body.username,
                        email:req.body.email,
                        semester:req.body.semester,
                        branch:req.body.branch,
                        password:password,
                        confirmpassword:cpassword
                    })
                    //password hash
                    const registered=await registerStudent.save();
                    res.status(201).render("login");
                   }
            
                   else{
                       res.send("password are not matching!");
                   }
                        }catch(err){
                            res.status(400).send(err);
                        }
                        });
                        
        app.post("/login",async(req,res)=>{
            try{
           const username=req.body.username;     
            const password=req.body.password;

            const user=await Studentdata.findOne({username:username});
               if(user.password===password){
             res.status(201).render("selectfeedback");
           }
           else{res.send("invalid details!");}
            }
            catch(err){
                res.status(400).send("Invalid login details!");
            }
            });
                    app.get("/academicfeedback",(req,res)=>{
                        res.render("academicfeedback");
                        });
                        app.get("/feedback1",(req,res)=>{
                            res.render("feedback1");
                            });
                            app.post("/feedback1",async(req,res)=>{
                                try{
                            const studentResponse=new Responsedata({
                                mcq1:req.body.mcq1,
                                mcq2:req.body.mcq2,
                                mcq3:req.body.mcq3,
                                mcq4:req.body.mcq4,
                                mcq5:req.body.mcq5,
                                mcq6:req.body.mcq6,
                                mcq7:req.body.mcq7,
                                
                            })
                            //password hash
                            const responsesave=await studentResponse.save();
                            res.status(201).render("academicfeedback");
                                }catch(err){
                                    res.status(400).send(err);
                                }
                                }); 
                        app.get("/busfeedback",(req,res)=>{
                            res.render("busfeedback");
                            });
        
                        app.get("/about",(req,res)=>{
                            res.render("about");
                            });
                            app.get("/logout",(req,res)=>{
                                res.render("index");
                                });
            app.get("*",(req,res)=>{
                res.render("404error",{
                    errormsg:"Opps! Page Not Found"
                });
                })
app.listen(port,()=>{
    console.log(`listening to the port no ${port}`);
});