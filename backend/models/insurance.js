const { DataTypes } = require('sequelize');

export default (sequelize) => {
  const Insurance = sequelize.define('insurance', {});
  return Insurance;
};
