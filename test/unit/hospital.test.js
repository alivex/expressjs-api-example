'use strict';

var expect = require('expect.js');

describe('models/hospital', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.Hospital = require('../../models').Hospital;
  });

});