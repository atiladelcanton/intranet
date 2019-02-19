'use strict'
require('../models/user-model');

const base = require('../bin/base/repository-base');
const md5 = require('md5');
class userRepository {

    constructor() {
        this._base = new base('User');
        this._projection = 'name email _id picture'
    }
    async isEmailExists(email) {
        return await this._base._model.findOne({ email: email }, this._projection);
    }

    async auth(email, password) {
        let _hashPassword = md5(password);
        return this._base._model.findOne({ email: email, password: _hashPassword }, this._projection);
    }
    async create(data) {
        let userCreated = await this._base.create(data);
        return this._base._model.findById(userCreated._id, this._projection);
    }
    async update(id, data) {
        let userUpdated = await this._base.update(id, {
            name: data.name,
            email: data.email,
            picture: data.picture
        });
        return this._base._model.findById(userUpdated._id, this._projection);
    }
    async getAll() {
        return await this._base._model.find({}, this._projection);
    }
    async getById(id) {
        return await this._base._model.findById(id, this._projection)
    }
    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = userRepository;