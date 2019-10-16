require('dotenv').config();

module.exports = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: null,
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    // dialect: 'postgres'
  }
};