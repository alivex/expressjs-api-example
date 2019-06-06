'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ipps = sequelize.define('Ipps', {
    totalDischarge: DataTypes.INTEGER,
    averageCoveredCharges: DataTypes.DECIMAL(10, 2),
    averageTotalPayments: DataTypes.DECIMAL(10, 2),
    averageMedicarePayments: DataTypes.DECIMAL(10, 2)
  }, {});
  Ipps.associate = function(models) {
    // associations can be defined here

		// Using additional options like CASCADE etc for demonstration
		Ipps.belongsTo(models.Provider, {
		  foreignKey: {
			allowNull: false
		  }
		});
		
		// Using additional options like CASCADE etc for demonstration
		Ipps.belongsTo(models.Hospital, {
		  foreignKey: {
			allowNull: false
		  }
		});

  };
  return Ipps;
};