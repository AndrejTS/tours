import DataTypes from 'sequelize'

export default (sequelize) => {
  const Person = sequelize.define('person', {
    personId: {
      type: DataTypes.STRING,
      unique: true,
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
      type: DataTypes.STRING,
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
