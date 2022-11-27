import express from 'express';
import multer from 'multer';
import xml2js from 'xml2js';
import db from '../models/index.js';
import personCheck from '../helpers/personCheck.js';

const router = express.Router();

const upload = multer();

router.post('/import', upload.single('upfile'), (req, res) => {
  const parser = new xml2js.Parser();

  parser.parseString(req.file.buffer, async (error, parsed) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Parser error' });
      return;
    }
    try {
      await db.sequelize.transaction(async (t) => {
        for (const tour of parsed.root.tour) {
          const countryShortcut = tour.trip[0].country[0];
          await db.country.findOrCreate({
            where: {
              shortcut: countryShortcut,
            },
            transaction: t,
          });

          const [destination] = await db.destination.findOrCreate({
            where: {
              destination: tour.trip[0].destination[0],
              countryShortcut: countryShortcut,
            },
            transaction: t,
          });

          const currencyCode = tour.insurance[0].currency[0];
          await db.currency.findOrCreate({
            where: {
              code: currencyCode,
            },
            transaction: t,
          });

          const insurance = await db.insurance.create(
            {
              currencyCode: currencyCode,
            },
            { transaction: t }
          );

          await db.tour.upsert(
            {
              voucher: tour.trip[0].voucher[0],
              issueDate: tour.trip[0].issueDate[0],
              departureDate: tour.trip[0].departureDate[0],
              returnDate: tour.trip[0].returnDate[0],
              destinationId: destination.id,
              insuranceId: insurance.id,
            },
            { transaction: t }
          );

          for (const person of tour.persons) {
            const birthDate = person.birthDate[0];
            const gender = person.gender[0];
            const idNum = person.idnum[0];

            if (!idNum && (!gender || !birthDate)) {
              res.status(400).json({
                error:
                  'Each person must have either an ID number or date of birth and gender.',
              });
              return;
            }

            if (idNum && (gender || birthDate)) {
              if (!personCheck(birthDate, gender, idNum)) {
                res.status(400).json({
                  error: "ID number doesn't match birth date and/or gender",
                });
                return;
              }
            }

            const tariffs = [];
            for (const tariff of person.tariffs) {
              const [dbTariff] = await db.tariff.findOrCreate({
                where: {
                  code: tariff.tariffCode[0],
                },
                transaction: t,
              });
              tariffs.push(dbTariff);
            }

            const [dbPerson] = await db.person.findOrCreate({
              where: {
                personID: person.personID[0],
                lastName: person.lastName[0],
                firstName: person.firstName[0],
                idnum: idNum,
                birthDate: birthDate,
                gender: gender,
                email: person.email[0],
                phone: person.phone[0],
                address: person.address[0],
                riskFactor: person.riskFactor[0],
                remark: person.remark[0],
              },
              transaction: t,
            });

            await dbPerson.setTariffs(tariffs, { transaction: t });
          }
        }
        res.json({ message: 'File was imported successfully' });
      });
    } catch (error) {
      console.log(error);
      res.json;
    }
  });
});

export default router;
