const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const serverless = require("serverless-http");
const router = express.Router();


const app = express();

module.exports.handler = serverless(app);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile( __dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    var email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/6c68e63b4f";

    const options = {
        method: "POST", 
        auth : "sahil9:5c5aa0938f307a6e148267ae25efbb88-us21"
    }


    const request = https.request(url, options , function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure" , function(req,res){
    res.redirect("/")

})

app.use("/.netlify/function/api",router);

app.listen(process.env.PORT || 5000, function(){
    console.log("Server is running on port 5000");
});


