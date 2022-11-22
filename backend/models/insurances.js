import DataTypes from 'sequelize'

export default (sequelize) => {
  const Insurance = sequelize.define('insurance', {});
  return Insurance;
};
