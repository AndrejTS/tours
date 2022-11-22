const { DataTypes } = require('sequelize');

export default (sequelize) => {
  const Destination = sequelize.define('destination', {
    destination: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  return Destination;
};
