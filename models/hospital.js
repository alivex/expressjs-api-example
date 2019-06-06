'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define('Hospital', {
    description: DataTypes.STRING
  }, {});
  Hospital.associate = function(models) {
    // associations can be defined here
    Hospital.hasMany(models.Ipps);
  };
  return Hospital;
};