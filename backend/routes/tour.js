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
          const countryShortcut = tour.country[0];
          await db.country.findOrCreate({
            where: {
              shortcut: countryShortcut,
            },
            transaction: t,
          });

          const [destination] = await db.destination.findOrCreate({
            where: {
              destination: tour.destination[0],
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
              voucher: tour.voucher[0],
              issueDate: tour.issueDate[0],
              departureDate: tour.departureDate[0],
              returnDate: tour.returnDate[0],
              destinationId: destination.id,
              insuranceId: insurance.id,
            },
            { transaction: t }
          );

          for (const person of tour.persons) {
            let birthDate = person.birthDate ? person.birthDate[0] : null;
            let gender = person.gender ? person.gender[0] : null;
            const idNum = person.idnum ? person.idnum[0] : null;

            if (!idNum && (!gender || !birthDate)) {
              const errMsg =
                'Each person must have either an ID number or date of birth and gender.';
              res.status(400).json({
                error: errMsg,
              });
              throw errMsg;
            }

            if (idNum && (gender || birthDate)) {
              if (!personCheck(birthDate, gender, idNum)) {
                const errMsg =
                  "ID number doesn't match birth date and/or gender";
                res.status(400).json({
                  error: errMsg,
                });
                throw errMsg;
              }
            }

            const idNumYear = idNum.slice(0, 2);
            let idNumMonth = idNum.slice(2, 4);
            const idNumDay = idNum.slice(4, 6);
            if (idNumMonth > 50) {
              idNumMonth -= 50;
              var idNumGender = 'F';
            } else {
              var idNumGender = 'M';
            }
            //  Od roku 2004 (zákonem č. 53/2004 Sb.) je navíc zavedena možnost v případě,
            //  že jsou v některý den již vyčerpána všechna platná čtyřčíslí,
            //  použít alternativní rodné číslo, kde se k číslu měsíce narození přičte
            //  ještě číslo 20 (u žen v tom případě tedy celkem 70).
            if (idNumMonth > 20) {
              idNumMonth -= 20;
            }

            if (!birthDate) {
              birthDate = `${idNumYear}-${idNumMonth}-${idNumDay}`;
            }
            if (!gender) {
              gender = idNumGender;
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
                idnum: idNum ? idNum : null,
                birthDate: birthDate ? birthDate : null,
                gender: gender ? gender : null,
                email: person.email ? person.email[0] : null,
                phone: person.phone ? person.phone[0] : null,
                address: person.address ? person.address[0] : null,
                riskFactor: person.riskFactor ? person.riskFactor[0] : null,
                remark: person.remark ? person.remark[0] : null,
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
