'use strict'

const repository = require('../repositories/user-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');

const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables')
const md5 = require('md5');

const _repo = new repository();

function userController() {

}

userController.prototype.get = async (req,res) => {
	ctrlBase.get(_repo,req,res);
}

userController.prototype.getById = async (req,res) => {
	ctrlBase.getById(_repo,req,res);
}

userController.prototype.post = async (req,res) => {
	try{
		let _validationContract = new validation();

			_validationContract.isRequired(req.body.name, 'Informe seu nome');
	        _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
	        _validationContract.isEmail(req.body.email, 'Informe um e-mail valido');
	        _validationContract.isRequired(req.body.password, 'Informe a Senha');
	        _validationContract.isRequired(req.body.confirmed, 'Informe a Senha de Confirmação');
	        _validationContract.isTrue(req.body.password != req.body.confirmed, 'Senha de confirmação não é igual a Senha');

	    req.body.active = true;
	    if(req.body.email){
	    	let exists = await _repo.isEmailExists(req.body.email);
	    	if(exists){
	    		_validationContract.isTrue((exists.name != undefined), `O seu e-mail ${req.body.email}  já está cadastrado`)
	    	}
	    }

	    if(req.body.password){
	    	req.body.password = md5(req.body.password);
	    }
	    return ctrlBase.post(_repo,_validationContract,req,res);
	}catch(error){
		return res.status(500).send({message:'Ocorreu um erro interno',validation:error});
	}
}

userController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.name, 'Informe seu nome');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'Informe um e-mail valido');
    _validationContract.isRequired(req.params.id, 'Informe o código do usuário editado');

    let exists = await _repo.isEmailExists(req.body.email);

    if (exists) {
        _validationContract.isTrue(
            (exists.name != undefined) &&
            (exists._id != req.body.id),
            `Já existe o e-mail ${req.body.email} cadastrado em nossa base`);
    }
    return ctrlBase.put(_repo, _validationContract, req, res);
};

userController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};

userController.prototype.auth = async (req, res) => {

    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'E-mail inválido');
    _validationContract.isRequired(req.body.password, 'Informe sua senha');

    if (!_validationContract.isValid()) {
        res.status(400).send({ message: 'Não foi possivel efetuar o login', validation: _validationContract.errors() });
        return;
    }

    let _user = await _repo.auth(req.body.email, req.body.password);

    if (_user) {
        res.status(200).send({
            user: _user,
            token: jwt.sign({ us: _user }, variables.security.secretKey)
        })
    } else {
        res.status(404).send({ message: 'Usuário invalido' });
    }

}
module.exports = userController;