const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SopSchema = new Schema({
	email: {
		type: String,
		required: true
    },
    sop:{
        type:String,
        required:true
    },
    iden:{
        type:String,
        required:false
    }
});

module.exports = Sop = mongoose.model("Sops", SopSchema);