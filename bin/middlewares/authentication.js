const jwt = require('jsonwebtoken');
const variables = require('../configuration/variables')
module.exports = async (req, res, next) => {
    let token = req.body.token || req.body.query || req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({ message: 'Não autenticado' });
        return;
    }
    try {
        let decoded = await jwt.verify(token, variables.security.secretKey);
        req.userAuthenticated = decoded;
        next();
    } catch (err) {
        console.log('Erro ', err);
        res.status(401).send({message:'Invalid Token'});
        return;
    }
}