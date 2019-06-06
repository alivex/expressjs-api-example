'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {
    // associations can be defined here
	Provider.hasMany(models.Ipps);
  };
  return Provider;
};