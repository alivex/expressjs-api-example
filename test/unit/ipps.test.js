'use strict';

var expect = require('expect.js');

describe('models/ipps', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.Ipps = require('../../models').Ipps;
  });

});