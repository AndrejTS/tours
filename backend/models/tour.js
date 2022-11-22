import DataTypes from 'sequelize'

export default (sequelize) => {
  const Tour = sequelize.define('tour', {
    voucher: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    issueDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    departureDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    returnDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
  });

  return Tour;
};
