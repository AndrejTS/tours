import express, { json, urlencoded } from 'express';
import cors from 'cors';
import db from './models/index.js';
import toursRouter from './routes/tour.js';

const PORT = process.env.PORT || '8000';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/tours', toursRouter);

db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
  db.sequelize.sync({ force: true }).then(() => {
    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true }).then(() => {
      console.log('All models were synchronized successfully.');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
