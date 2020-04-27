import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('CimKmApp.db')

export async function createRidesTable(){
    db.transaction(tx => {
        try{
            tx.executeSql(
                `create table if not exists rides (
                  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                  date TEXT NOT NULL,
                  distance TEXT NOT NULL,
                  diversionReason TEXT NOT NULL,
                  fromAddress TEXT NOT NULL,
                  fromPostalCode TEXT NOT NULL,
                  toAddress TEXT NOT NULL,
                  toPostalCode TEXT NOT NULL,
                  purposeReason TEXT NOT NULL,
                  purposeType TEXT NOT NULL);`
              );
        }catch (e){
            console.error(e.message);
        }
    });
}

export async function getRides() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM rides', [], function(tx, results) {
                const rides = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    rides.push(results.rows.item(i));
                }
                resolve(rides);
            })
        });  
    })
}

export async function deleteRide(id) {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM rides WHERE id = ?', [id], function(tx, results) {
            })
        });  
    })
}

export async function InsertRides(date, distance, diversionReason, fromAddress, fromPostalCode, toAddress, toPostalCode, purposeReason, purposeType) {
    db.transaction(tx => {
        try {
            tx.executeSql(
                `
                INSERT INTO rides (date, distance, diversionReason, fromAddress, fromPostalCode, toAddress, toPostalCode, purposeReason, purposeType)
                VALUES ('${date}', '${distance}', '${diversionReason}', '${fromAddress}', '${fromPostalCode}', '${toAddress}', '${toPostalCode}', '${purposeReason}', '${purposeType}')
                `
            );
            console.log("Insertion succesfull")
        } catch (error) {
            console.error(error)
        }
    })
}

export async function clearRidesTable() {
    db.transaction(tx => {
        try {
            tx.executeSql(
                'DELETE FROM rides'
            );
            tx.executeSql(
                "DELETE FROM sqlite_sequence WHERE name='rides'"
                // "UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='rides'"
            );
            console.log("Clear Succesfull")
        } catch (error) {
            console.error(error)
        }
        
    })
}