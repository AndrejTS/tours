import Sequelize from 'sequelize';
import {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect as _dialect,
} from '../config/db.config.js';
import tour from './tour.js';
import country from './country.js';
import destination from './destination.js';
import person from './person.js';
import tariff from './tariff.js';
import insurance from './insurances.js';
import currency from './currency.js';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tour = tour(sequelize);
db.country = country(sequelize);
db.destination = destination(sequelize);
db.person = person(sequelize);
db.tariff = tariff(sequelize);
db.insurance = insurance(sequelize);
db.currency = currency(sequelize);

db.tour.belongsToMany(db.person, {
  through: 'tour_person',
  as: 'persons',
});
db.person.belongsToMany(db.tour, {
  through: 'tour_person',
  as: 'tours',
});

db.country.hasMany(db.tour, {
  foreignKey: {
    allowNull: false,
  },
  as: 'tours',
});
db.tour.belongsTo(db.country, {
  as: 'country',
});

db.country.hasMany(db.destination, {
  foreignKey: {
    allowNull: false,
  },
  as: 'destinations',
});
db.destination.belongsTo(db.country, {
  as: 'country',
});

db.insurance.hasMany(db.tour, {
  foreignKey: {
    allowNull: false,
  },
  as: 'tours',
});
db.tour.belongsTo(db.insurance, {
  as: 'insurance',
});

db.currency.hasMany(db.insurance, {
  foreignKey: {
    allowNull: false,
  },
  as: 'insurances',
});
db.insurance.belongsTo(db.currency, {
  as: 'currency',
});

db.tariff.hasMany(db.person, {
  foreignKey: {
    allowNull: false,
  },
  as: 'persons',
});
db.person.belongsTo(db.tariff, {
  as: 'tariff',
});

export default db;
