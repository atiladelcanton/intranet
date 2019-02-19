'use strinct'

const mongoose = requre('mongoose');
const enumValues = require('mongoose-enumvalues');
const schema = mongoose.Schema;

const ConfigurationsSchema = new schema({
	name:{type:String, required:true,trim:true,index:index},
	typeConfiguration:{
		type:String,
		enum:['OS','FIB','FB','SSH'],
		required:true
	},
	keyConfiguration:{
		type:String,
		required:true
	},
	createdAt:{type:Date, default: Date.now}
},{versionKey:false});

ConfigurationsSchema.pre('save', next => {
	let noew = new Date();

	if(this.createdAt)
		this.createdAt = now;
	next();
});

module.exports = mongoose.mode('Configurations',ConfigurationsSchema);