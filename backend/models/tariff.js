import DataTypes from 'sequelize'

export default (sequelize) => {
  const Tariff = sequelize.define('tariff', {
    code: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  return Tariff;
};
