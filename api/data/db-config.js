const knex = require('knex')
const configs = require('../../knexfile')

module.exports = knex(configs[process.env.DATABASE_URL])
