'use strict';

var expect = require('expect.js');

describe('models/provider', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.Provider = require('../../models').Provider;
  });

});