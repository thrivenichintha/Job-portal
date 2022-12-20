const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	password:{
		type:String,
		required:true
	},
	usertype:{
		type:String,
		required:false
	},
	inst_name:{
		type:String,
		required:false
	},
	skills:{
		type:String,
		required:false
	},
	start:{
		type:String,
		required:false
	},
	phn_numb:{
		type:String,
		required:false
	},
	bio:{
		type:String,
		required:false
	},
	rating:{
		type:String,
		required:false
	}

});

module.exports = User = mongoose.model("Users", UserSchema);
