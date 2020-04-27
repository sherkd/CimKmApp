import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('CimKmApp.db')

const ready = db.tx(function* (tx) {
    yield tx.query(sql`
      CREATE TABLE IF NOT EXISTS schema_version (
        version INT NOT NULL
      );
    `);
    const versionRecord = yield tx.query(sql`
      SELECT version FROM schema_version;
    `);
    const version = (
      versionRecord.length
        ? versionRecord[0].version
        : 0
    );
    if (version < 1) {
      yield tx.query(sql`
        CREATE TABLE rides (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          distance TEXT NOT NULL,
          diversionReason TEXT NOT NULL,
          fromAddress TEXT NOT NULL,
          fromPostalCode TEXT NOT NULL,
          toAddress TEXT NOT NULL,
          toPostalCode TEXT NOT NULL,
          purposeReason TEXT NOT NULL,
          purposeType TEXT NOT NULL
        );
      `);
      yield tx.query(sql`
        CREATE TABLE addresses (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          aliasName TEXT NOT NULL,
          streetName TEXT NOT NULL,
          city TEXT NOT NULL,
          postalCode TEXT NOT NULL
        );
      `);
    }
    // to add other versions in the future,
    // we can just add extra if statements
    // and increase LATEST_VERSION
    const LATEST_VERSION = 1;
    if (version === 0) {
      yield tx.query(sql`
        INSERT INTO schema_version
        VALUES (${LATEST_VERSION});
      `);
    } else {
      yield tx.query(sql`
        UPDATE schema_version
        SET version = ${LATEST_VERSION};
      `);
    }
});