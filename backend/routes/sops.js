var express = require("express");
var router = express.Router();

// Load User model
const Job = require("../models/sop");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Sop.find(function(err, sops) {
		if (err) {
			console.log(err);
		} else {
			res.json(sops);
		}
	})
});

router.post("/apply", (req, res) => {
	//console.log(req);
    const newSop = new Sop({
        email: req.body.email,
        sop:req.body.sop,	
        iden:req.body._id,
    });
    newSop.save()
        .then(Sop => {
            res.status(200).json(Sop);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    
});

module.exports = router;