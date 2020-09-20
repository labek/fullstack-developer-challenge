/* eslint-disable no-await-in-loop, no-restricted-syntax */

import csvParse from 'csv-parse';
import EventEmitter from 'events';
import fetch from 'node-fetch';
import util from 'util';
import filterByRegExp from '../lib/filter-by-reg-exp';
import logger from '../lib/logger';

// Add Promise support to CSV PArse API — https://csv.js.org/parse/api/
const csvParseAsync = util.promisify(csvParse);

class PostalCodesDataContainer extends EventEmitter {
  constructor() {
    super();

    this.data = null;
    this.loaded = false;
    this.init();
  }

  async init() {
    try {
      logger.info('Postal codes data container: Initializing…');

      const data = [];

      // 🇫🇷️ Load and transform official postal code data as a CSV file from La Poste
      // https://datanova.legroupe.laposte.fr/explore/dataset/laposte_hexasmal/export/

      logger.info('Downloading Postal Codes Data for FR…');
      const laPosteResponse = await fetch(
        'https://datanova.legroupe.laposte.fr/explore/dataset/laposte_hexasmal/download/?format=csv&timezone=Europe/Berlin&use_labels_for_header=true'
      );

      if (!laPosteResponse.ok) {
        throw new Error(laPosteResponse.error);
      }

      const laPosteData = await laPosteResponse.text();

      logger.info('Parsing Postal Codes Data for FR…');
      // Transform CSV entries to an array of objects with column names as keys
      // Header of the CSV file for FR:
      // Code_commune_INSEE;Nom_commune;Code_postal;Libelle_acheminement;Ligne_5;coordonnees_gps
      // Expected output:
      // [{ Code_commune_INSEE: "93048", Nom_commune: "MONTREUIL", Code_postal: "93100", …}, …]
      const laPosteCsvEntries = await csvParseAsync(laPosteData, {
        columns: true,
        delimiter: ';',
      });

      for (const entry of laPosteCsvEntries) {
        data.push({
          postalCode: entry.Code_postal,
          countryCode: 'FR',
        });
      }

      // Hold all parsed data in a single object with properties:
      // - postalCode
      // - countryCode
      this.data = data;

      logger.info('Postal codes data container: Initialized.');
      this.emit('initialized');
      this.loaded = true;
    } catch (initError) {
      logger.error(initError);
      this.emit('error', initError);
    }
  }

  assertInitialized() {
    if (this.data === null) {
      throw new Error('Postal codes data container is not initialized');
    }
  }

  find(query) {
    this.assertInitialized();

    return filterByRegExp(this.data, query);
  }
}

const db = new PostalCodesDataContainer();

export default db;
