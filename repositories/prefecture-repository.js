'use strict'

require('../models/prefecture-model');
require('../models/configurations-model');

const base = require('../bin/base/repository-base');

class prefectureRepository{
	
	constructor() {
        this._base = new base('Prefecture');
        this._projection = 'name contractVigence _id valueContract contactEmail phone contractType';
        
        this._secondBase = new base('Configurations');
        this._secondProjection = 'name typeConfiguration _id keyConfiguration';
    }

    async create(data){
    	let configurations = await this._secondBase.create(data.configurations);
    	data.configurations = configurations;
    	let prefecture = await this._base.create(data);
    }

    async update(id,data){

    }

    async getAll(){

    }

    async getById(){

    }

    async delete(id){

    }
}

module.exports = prefectureRepository;