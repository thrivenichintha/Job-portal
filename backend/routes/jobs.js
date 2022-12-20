var express = require("express");
var router = express.Router();

// Load User model
const Job = require("../models/job");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Job.find(function(err, jobs) {
		if (err) {
			console.log(err);
		} else {
			res.json(jobs);
		}
	})
});

router.post("/add", (req, res) => {
	//console.log(req);
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


router.post("/edit",(req, res)=>{
    const application_no=req.body.application_no;
    const position_no=req.body.position_no;
    const deadline=req.body.deadline;
    const _id=req.body._id;
    console.log(req);

    Job.findOne({_id}).then(job=>{
        if(!job){
            return res.status(404).json({
				error: "id not found",
			});
        }
        else{
            var check={_id:_id};
            var updatevalues1={$set: {application_no:application_no}};
            var updatevalues2={$set:{position_no:position_no}};
            var updatevalues3={$set:{deadline:deadline}};
            Job.updateOne(check,updatevalues1,function(err,res){
                if(err){
                    console.log(err);
                }
            })
            Job.updateOne(check,updatevalues2,function(err,res){
                if(err){
                    console.log(err);
                }
            })
            Job.updateOne(check,updatevalues3,function(err,res){
                if(err){
                    console.log(err);
                }
            })
        }
    }

    )



});


router.post("/find_one",(req, res)=> {
    Job.findOne({ _id: req.body._id }, function(err, jobs) {
        if (err)
            console.log(err);
        else {
            if (!jobs) {
                //Not found
                console.log("Not registered");
                res.send("1");
            } else {
                res.json(jobs);
            }
        }
    });
});

router.post("/delete_one",(req, res) =>{
    let _id = req.body._id;
    Job.findById(_id, function(err, job) {
        if(err)
            console.log(err);
        else{
            Job.deleteOne(job, function(err, obj) {
                if (err){
                    console.log(error);
                 throw err;
                }
                else 
                {
                    //console.log("the product ot be cancelled is ", prod);
                    console.log("1 document deleted", job);
                    res.json(job);
                }
            });
        }
    });
});


module.exports = router;