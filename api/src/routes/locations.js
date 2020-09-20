import express from 'express';
import { parse } from 'json2csv';
import locations from '../models/locations';

const locationsRouter = express.Router();

locationsRouter.get('/', (req, res) => {
  const { query } = req;
  res.json(locations.find(query));
});

locationsRouter.get('/countries', (req, res) => {
  const locationData = locations.find(req.query);
  const data = {};

  for (let index = 0; index < locationData.length; index += 1) {
    const { countryCode } = locationData[index];

    if (data[countryCode]) {
      data[countryCode] += 1;
    } else {
      data[countryCode] = 1;
    }
  }

  const formattedData = Object.entries(data);
  const csvData = parse(formattedData);

  res.header('Content-Type', 'text/csv').send(csvData);
});

export default locationsRouter;
