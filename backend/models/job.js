const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
    },
    title:{
        type:String,
        required:true
    },
    application_no:{
        type:String,
        required:true
    },
    position_no:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:false
    },
    deadline:{
        type:String,
        required:true
    },
    req_skills:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
	duration:{
		type:String,
		required: true
	},
	salary:{
		type:String,
		required:true
	},
	rating:{
		type:String,
		required:true
    },
    list:{
        type:[],
        required:true
    },
    applied:{
        type:String,
        requires:false
    }
});

module.exports = Job = mongoose.model("Jobs", JobSchema);