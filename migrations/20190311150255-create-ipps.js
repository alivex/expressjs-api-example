const uuid = require('uuid/v4'); // ES5

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ipps', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      totalDischarge: {
        type: Sequelize.INTEGER
      },
      averageCoveredCharges: {
        type: Sequelize.DECIMAL(10, 2)
      },
      averageTotalPayments: {
        type: Sequelize.DECIMAL(10, 2)
      },
      averageMedicarePayments: {
        type: Sequelize.DECIMAL(10, 2)
      },
	  HospitalId: {
		type: Sequelize.UUID,
		onDelete: "CASCADE",
		allowNull: false,
		references: {
		  model: 'Hospitals',
		  key: 'id'
		}
	  },
      ProviderId: {
		type: Sequelize.INTEGER,
		onDelete: "CASCADE",
		allowNull: false,
		references: {
		  model: 'Providers',
		  key: 'id'
		}
	},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ipps');
  }
};