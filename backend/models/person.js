const { DataTypes } = require('sequelize');

export default (sequelize) => {
  const Person = sequelize.define('person', {
    personID: {
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    idnum: {
      type: DataTypes.STRING,
    },
    birthDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    gender: {
      allowNull: false,
      type: DataTypes.CHAR(1),
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING(1000),
    },
    riskFactor: {
      type: DataTypes.TINYINT,
    },
    remark: {
      type: DataTypes.TEXT,
    },
  });

  return Person;
};
