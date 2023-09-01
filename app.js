const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile( __dirname + "/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.fName;
    var secondName = req.body.lName;
    var email = req.body.email;
})

app.listen(5000, function(){
    console.log("Server is running on port 5000");
});
