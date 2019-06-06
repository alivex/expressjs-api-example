'use strict';

var expect = require('expect.js');

describe('models/index', function () {
  
  it('returns the Provider model', function () {
    var models = require('../../models');
    expect(models.Provider).to.be.ok();
  });

  it('returns the Ipps model', function () {
    var models = require('../../models');
    expect(models.Ipps).to.be.ok();
  });
  
  it('returns the Hospital model', function () {
    var models = require('../../models');
    expect(models.Hospital).to.be.ok();
  });
});