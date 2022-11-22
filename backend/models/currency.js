import DataTypes from 'sequelize'

export default (sequelize) => {
  const Currency = sequelize.define('currency', {
    code: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING(10),
    },
  });
  return Currency;
};
