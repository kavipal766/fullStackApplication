const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
   mobileNumber:{type:String},
	FirstName:{type:String,default:''},   //entity name
	LastName:{type:String},
	otp:{type:String},
	createdAt:{type:String}
});

//let adminEntry = mongoose.model('Entity',Entity);

module.exports = mongoose.model('User',User);
