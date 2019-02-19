const variable = {
    api: {
        port: process.env.port || 3000
    },
    database:{
        connection: process.env.connection ||  'mongodb://admin:ztascani1978@ds149034.mlab.com:49034/nofoodatila'
    },
    security:{
        secretKey: 'da39a3ee5e6b4b0d3255bfef95601890afd80709$#@!ˆ22d65d5661536cdc*&ˆ%$#@!@#!˜!@#$%ˆ&*(c1fdf5c6de7b41b9f27325ebc61e8557177d705a0ec880151c3a32a00899b8'
    }
}

module.exports = variable;