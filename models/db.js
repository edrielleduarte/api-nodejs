const Sequelize = require('sequelize')


// Conexão banco de dados mysql
  const sequelize = new Sequelize('postapp', 'root', 'suasenha', {
    host: "localhost",
    dialect: 'bancoqueusa',
    query:{raw:true}
    })

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}