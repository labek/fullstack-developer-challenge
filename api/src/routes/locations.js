import express from 'express';
import { parse } from 'json2csv';
import logger from '../lib/logger';
import locations from '../models/locations';
import postalCodes from '../models/postal-codes';

const locationsRouter = express.Router();

const filterLocations = (locationData, postalCodeData) => {
  return locationData.filter(it => postalCodeData.includes(it.postalCode));
};

locationsRouter.get('/', (req, res) => {
  let filteredData = [];
  let postalCodeData = [];

  const { query } = req;
  const locationData = locations.find(query);

  // TODO: to improve performance, we should cache postal codes
  if (!postalCodes.loaded) {
    postalCodes.once('initialized', () => {
      postalCodeData = postalCodes.data.map(it => it.postalCode);
      filteredData = filterLocations(locationData, postalCodeData);

      res.json(filteredData);
    });
  } else {
    postalCodeData = postalCodes.data.map(it => it.postalCode);
    filteredData = filterLocations(locationData, postalCodeData);

    res.json(filteredData);
  }
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

  const formattedData = Object.entries(data).map(([key, value]) => ({
    country: key,
    count: value,
  }));

  const csvData = parse(formattedData);

  res.header('Content-Type', 'text/csv').send(csvData);
});

export default locationsRouter;
