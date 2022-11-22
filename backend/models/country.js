const { DataTypes } = require('sequelize');

export default (sequelize) => {
  const Country = sequelize.define('country', {
    shortcut: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  return Country;
};
