'use strict'

const app = require('./bin/express');
const variable = require('./bin/configuration/variables');

app.listen(variable.api.port, () => {
    console.info(`Api inicializada na porta: ${variable.api.port} `);
});