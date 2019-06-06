'use strict';

var app      = require('../../app');
var Bluebird = require('bluebird');
var expect   = require('expect.js');
var request  = require('supertest');

describe('ipps listing page', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });
  
  beforeEach(function () {
    this.models = require('../../models');

    return Bluebird.all([
      this.models.Ipps.destroy({ truncate: true }),
      this.models.Provider.destroy({ truncate: true }),
      this.models.Hospital.destroy({ truncate: true })
    ]);
  });

  it('loads correctly', function (done) {
    request(app).get('/').expect(200, done);
  });

  
  it('list a provider', function (done) {
    this.models.Provider.create({ id: 10001, name: 'SOUTHEAST ALABAMA MEDICAL CENTER', street: '1108 ROSS CLARK CIRCLE', city:'DOTHAN', state: 'AL', zipcode:'36301' }).then(function (provider) {
      request(app).get('/').expect(200, done); 
    });
  });
  
  
  it('list a hospital', function (done) {
    this.models.Hospital.create({description: 'AL - Dothan'}).then(function (hospital) {
      request(app).get('/').expect(200, done);
    })
  });
  

  it('list ipps if available', function (done) {
    this.models.Hospital.create({description: 'AL - Dothan'}).bind(this).then(function (hospital) {
      this.models.Provider.create({ id: 10001, name: 'SOUTHEAST ALABAMA MEDICAL CENTER' }).bind(this).then(function (provider) {
        return this.models.Ipps.create({ totalDischarge: 91, ProviderId: provider.id, HospitalId: hospital.id });
      });
    }).then(function () {
      request(app).get('/').expect(200, done);
    });
  });

  
});