require('dotenv').config();

const { JWT_SECRET } = process.env;
const { PORT = 3000 } = process.env;
const { DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'production' } = process.env;
module.exports = {
  JWT_SECRET,
  PORT,
  DB_URL,
  NODE_ENV,
};
