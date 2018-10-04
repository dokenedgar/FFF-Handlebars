'use strict';

var Pool = require('pg').Pool;
var dotenv = require('dotenv');

dotenv.config();

var pool = new Pool();

module.exports = {
  query: function query(text, params, callback) {
    pool.query(text, params, callback);
  }

};