'use strict';

//let request = require('request');
let assert = require('assert');

const expect = require('chai').expect;
// const { expect } = require('chai');

const chai = require('chai');
chai.use(require('chai-http'));
const app = require('../index.js');

describe('test with chai http', function () {
  this.timeout(5000);

  it('api test with chai http', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});