var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Ipps.findAll({
    include: [ models.Provider,models.Hospital ]
  }).then(function(ippss) {
    res.render('index', {
      title: 'IPPS: National Healthcare Provider',
      ippss: ippss
    });
  });
});

module.exports = router;
