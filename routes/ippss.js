var models  = require('../models');
var express = require('express');
var Sequelize = require('sequelize');
var router  = express.Router();

router.get('/', function(req, res) {
  const {gt, lte, like} = Sequelize.Op;
  
  /* TODO: Add attribute filter from client header
  if(req.header('x-result-filters')){
    let providerAtt = req.header('x-result-filters').split(',')
  }
  
  if(req.header('x-result-filters')){
    let hrrdAtt =   req.header('x-hrrd-filters').split(',')
  }
  
  if(req.header('x-result-filters')){
    let ippsAtt = req.header('x-ipps-filters').split(',')
  }
  */
  
  let whereClause = {};
  
  let filterClause = {};
  
  let whereClauseState = {};
  
  var min_discharges = req.query.min_discharges 
  var max_discharges = req.query.max_discharges
  
  var min_average_covered_charges = req.query.min_average_covered_charges
  var max_average_covered_charges = req.query.max_average_covered_charges
  
  var min_average_medicare_payments = req.query.min_average_medicare_payments
  var max_average_medicare_payments = req.query.max_average_medicare_payments
  
  var state = req.query.state
  
  if(min_discharges && max_discharges){
	  whereClause['totalDischarge'] = {
			[gt]: req.query.min_discharges,
			[lte]: req.query.max_discharges 
	  };
  } else if(min_discharges){
		whereClause['totalDischarge'] = {
			[gt]: req.query.min_discharges 
	  };
  } else if(max_discharges){
		whereClause['totalDischarge'] = {
			[lte]: req.query.max_discharges
		};
  }
  
   if(min_average_covered_charges && max_average_covered_charges){
	  whereClause['averageCoveredCharges'] = {
			[gt]: req.query.min_average_covered_charges,
			[lte]: req.query.max_average_covered_charges 
	  };

   } else if(min_average_covered_charges){
	  whereClause['averageCoveredCharges'] += {
		  [gt]: req.query.min_average_covered_charges 
	  };
  
   } else if(max_average_covered_charges){
	  whereClause['averageCoveredCharges'] += {
		  [lte]: req.query.max_average_covered_charges 
	  };
  }
  

   if(min_average_medicare_payments && max_average_medicare_payments){
	  whereClause['averageTotalPayments'] = {
			[gt]: req.query.min_average_medicare_payments,
			[lte]: req.query.max_average_medicare_payments 
	  };

   } else if(min_average_medicare_payments){
	  whereClause['averageTotalPayments'] += {
		  [gt]: req.query.min_average_medicare_payments 
	  };
   } else  if(max_average_medicare_payments){
	  whereClause['averageTotalPayments'] += {
		  [lte]: req.query.max_average_medicare_payments 
	  };
  }
 

  if(state){
	  whereClauseState['state'] = {
		  [like]: req.query.state 
	  };
  }
  
  
  models.Ipps.findAll({		
		include: [
			{
			model: models.Provider,
				attributes: [
					['name', 'Name'],['street', 'Street Address'],['state', 'State'],['city', 'City'],['zipcode', 'Zip Code']
				],
				where: whereClauseState
			},
			{
			model: models.Hospital,
				attributes: [
					['description', 'Referral Region Description']
				]
			}
		],
		
	   attributes: [
			['totalDischarge', 'Total Discharge'],['averageCoveredCharges', 'Average Covered Charges'],['averageTotalPayments', 'Average Total Payments'],['averageMedicarePayments', 'Average Medicare Payments']
		],
		
		where: whereClause,
		
		raw: true
	})
    .then((Ippss) => res.send(Ippss))
    .catch((err) => {
      console.log('There was an error querying providers', JSON.stringify(err))
      return res.send(err)
    });
});

module.exports = router;