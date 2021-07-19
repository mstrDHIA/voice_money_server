const express = require("express");

const router = express.Router();
const User = require("../models/userModel");
const { check, validationResult } = require("express-validator");;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const secret="c55508391a36839b3ff6ef9e45f815ca770ec2016219959eb9db054cf24208ef6b7f6713c0ab98462a98dd16997f76c7d6d7b4d81f72f2b0d2a42dff4aa7dc7f"


const validate = [
    check("email").isLength({ min: 10, max: 50 }).withMessage("The email must be between 10 to 50 caracters"),
    // check("age").isNumeric().withMessage("the price must be a number ")
]


function generateAccessToken(user) {
    return jwt.sign(user, secret, { expiresIn: '1800s' });
  }


//@route : /createaccount
//Methode : POST
//Description :poster un house dans la collection house

router.post("/create_account", validate, (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).send({
            errors: errors.array()
        })
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    user.save().then((user) => {
        const token = generateAccessToken({ user: user });
        back = user+token
        res.send({
            message: "User is created with success !",
            data: token
        });
    }).catch(err => {
        console.log(err);
    })

})


//@route : /users
//method :GET
//Description :get all houses 

router.get("/allusers", (req, res) => {
    
    User.find().then(users => {
        res.send(users);
    }).catch(err => {
        console.log(err);
    })

})


//@route : /users/:id
//method :GET
//Description :get one house by id 

router.get("/:id", (req, res) => {
    User.findById(req.params.id).then(user => {
        if (!user) {
            res.status(404).send({error:"Object not found"});
        }
        res.send(user);
    }).catch(err => {
        console.log(err);
    })
})



//@route : /users/:id
//methode: PUT
//Description : update a house by id

router.put("/:id",validate,(req,res)=>{
    const userId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(404).send(errors.array());
    }

    User.findById(userId).then(user => {
        user.username = req.body.username;
        user.email= req.body.email;
        user.password= req.body.password;
        user.age = req.body.age;
        user.sex = req.body.sex;
        user.country = req.body.country;
        user.state = req.body.state;
        user.city = req.body.city;
        user.address = req.body.address;
        user.socialstate = req.body.socialstate;
        user.save().then(resultat => {
            res.send(resultat);
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })

});



// @route : /users/:id
// method :DELETE
// Description : delete one house by id 

router.delete("/:id", (req, res) => {
    
    const userId = req.params.id;
    User.findByIdAndDelete(userId).then(result => {
        res.send(result);        
    }).catch(err =>{
        console.log(err);
    })

})


//@route : /login
//Methode : POST
//Description :poster un house dans la collection house

router.post("/login", (req, res) => {
    
   

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })
        query={username:user.username,password:user.password}
        const result=User.exists(query,null).then(function(future){
            if(future){
                const token = generateAccessToken({ user: user });
        
                res.send({
                    message: "User authorized ",
                    data: token
                });
            }
            else{
                res.send({
                    message: "Access denied",
                });
            }

        })
})

module.exports = router;