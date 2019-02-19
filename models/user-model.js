'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserModel = new schema({
	name:{type:String, required:true,trim:true,index:true},
	email:{type:String, required:true},
	password:{type:String, required:true},
	picture:{type:String},
	active:{type:Boolean, required:true},
	createdAt:{type:Date, default: Date.now},
},{versionKey:false});

UserModel.pre('save', next => {
	let noew = new Date();

	if(this.createdAt)
		this.createdAt = now;
	next();
});

module.exports = mongoose.mode('User',UserModel);