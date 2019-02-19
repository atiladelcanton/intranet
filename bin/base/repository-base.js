'use strict'

const mongoose = require('mongoose');

class repositoryBase {
    constructor(model) {
        this._model = mongoose.model(model);
    }

    async create(data) {
        try {
            let model = new this._model(data);
            let result = await model.save();
            return result;
        } catch (err) {
            console.log('err repository create', err);
        }

    }
    async update(id, data) {
        try {
            await this._model.findByIdAndUpdate(id, { $set: data });
            let result = await this._model.findById(id);
            return result;
        } catch (err) {
            console.log('err repository update', err);
        }

    }
    async getAll() {
        return await this._model.find();
    }
    async getById(id) {
        return await this._model.findById(id);
    }
    async delete(id) {
        return await this._model.findByIdAndRemove(id);
    }
}

module.exports = repositoryBase;