const Sequelize = require('sequelize');

const postgres = new Sequelize(
    process.env.POSTGRES_URL,
    {
        quoteIdentifiers: false, // torna nomes das tabelas e atributo case-insensitive
        //operatorsAliases: false,
        logging: false,
        ssl: false,
        dialectOptions: {
            ssl: false
        }
    }
);

module.exports = postgres;