const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool(
	connectionString: process.env.DATABASE_URL
	);

module.exports = {
  query : (text, params, callback) => {
  	pool.query(text, params, callback)
  }
  	
};