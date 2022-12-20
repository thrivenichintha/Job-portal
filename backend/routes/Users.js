var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db

router.post("/profile",(req, res)=> {
    User.findOne({ email: req.body.email }, function(err, users) {
        if (err)
            console.log(err);
        else {
            if (!users) {
                //Not found
                console.log("Not registered");
                res.send("1");
            } else {
                res.json(users);
            }
        }
    });
});


router.post("/update",(req, res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const inst_name=req.body.inst_name;
    const start=req.body.start;
    const skills=req.body.skills;
    const rating=req.body.rating;
    const phn_numb=req.body.phn_numb;
    const bio=req.body.bio;

    User.findOne({email}).then(user=>{
        if(!user){
            return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            var check={email:email};
            var updatevalues1={$set: {inst_name:inst_name}};
            var updatevalues2={$set:{start:start}};
            var updatevalues3={$set:{skills:skills}};
            var updatevalues4={$set:{rating:rating}};
            var updatevalues5={$set: {phn_numb:phn_numb}};
            var updatevalues6={$set:{bio:bio}};
            User.updateOne(check,updatevalues1,function(err,res){
                if(err){
                    console.log(err);
                }
            })
            User.updateOne(check,updatevalues2,function(err,res){
                if(err){
                    console.log(err);
                }
            })
            User.updateOne(check,updatevalues3,function(err,res){
                if(err){
                    console.log(err);
                }
            })
            User.updateOne(check,updatevalues4,function(err,res){
                if(err){
                    console.log(err);
                }
            })
            User.updateOne(check,updatevalues5,function(err,res){
                if(err){
                    console.log(err);
                }
            })
            User.updateOne(check,updatevalues6,function(err,res){
                if(err){
                    console.log(err);
                }
            })
        }
    }

    )

});
router.post("/add", (req, res) => {
    const newJob = new Job({
		title:req.body.title,
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
		application_no:req.body.application_no,
        position_no:req.body.position_no,
        deadline:req.body.deadline,
        req_skills:req.body.req_skills,
        jobtype:req.body.jobtype,
        duration:req.body.duration,
        salary:req.body.salary,
        rating:req.body.rating,
		
    });

    newJob.save()
        .then(job => {
            res.status(200).json(job);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


/*router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        password:req.body.password,
        usertype:req.body.usertype
    });
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});*/

router.post("/register", (req, res) => {
	//console.log(req);
    const newUser = new User({
		name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        password:req.body.password,
        usertype:req.body.usertype,
		
    });
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(error);
            res.status(400).send(err);
        });
    
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
	// Find user by email
	User.findOne({ email,password }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.send("Email Found");
            return user;
        }
	});
});

module.exports = router;

