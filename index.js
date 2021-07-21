const express = require('express')

const assert =require('assert')
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const users = require("./routes/userRoute");
const generate = require("./middleware/usermiddleware");


//Connect to mongodb
const mongoUrl="mongodb://localhost:27017"
const database="/Voice_Money"
const databaseUrl=mongoUrl+database
mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Successfully connected to the database ",database);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



//Set up the server


const app=express()


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use("/users", users);

// app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port,(err)=>{
    if(err){
    console.log("Error occured, can't start server")
    }
    else{
        console.log("Listening on port",port);
    }   
})
