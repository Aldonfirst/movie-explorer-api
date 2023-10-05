require('dotenv').config();

const { JWT_SECRET } = process.env;

const { PORT = 3001 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'production' } = process.env;
module.exports = {
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
  NODE_ENV,
};
