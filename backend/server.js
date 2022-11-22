import express, { json, urlencoded } from 'express';
import cors from 'cors';
import db from './models/index.js';

PORT = process.env.PORT || '8000';

var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

db.sequelize.sync({ force: true }).then(() => {
  console.log('All models were synchronized successfully.');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
