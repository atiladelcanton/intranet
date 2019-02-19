'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const schemaTypes = mongoose.Schema.Types;

const PrefectureModel = new schema({
	name:{type:String, required:true,trim:true,index:index},
	contractVigence:{type:Date},
	valueContract:{type:schemaTypes.Double,required:true},
	contactEmail:{type:String},
	phone:{type:String},
	active: { type: Boolean, required: true },
	contractType:{type:String},
	configurations:{type: ObjectId, ref:'Configurations'},
	createdAt:{type:Date, default: Date.now}
},{versionKey:false});

PrefectureModel.pre('save', next => {
	let noew = new Date();

	if(this.createdAt)
		this.createdAt = now;
	next();
});

module.exports = mongoose.mode('Prefecture',PrefectureModel);