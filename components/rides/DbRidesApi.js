import * as SQLite from 'expo-sqlite';
import RidesModel from '../../models/RidesModel'
import * as DateFns from 'date-fns';

const db = SQLite.openDatabase('CimKmApp.db')

export async function createRidesTable(){
    db.transaction(tx => {
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
                purposeType TEXT NOT NULL);
            `
        )
    });
}

export async function dropRidesTable(){
    db.transaction(tx => {
        tx.executeSql(
            'DROP TABLE rides'
        )
    });
    console.log('DROP SUCCESFULL')
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
                resolve(rides)
            })
        })
    })
}

export async function getRideByMonth(month) {
    return new Promise((resolve) => {
        db.transaction((tx) => {    
            tx.executeSql('SELECT date, fromPostalCode, fromAddress, toPostalCode, toAddress, purposeType, purposeReason, diversionReason, distance FROM rides', 
            [], function(tx, results) {
                const rides = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    var date = DateFns.parse(results.rows.item(i).date, 'dd-MM-yyyy', new Date())
                    if (DateFns.getMonth(date) === month) {
                        rides.push(results.rows.item(i));
                    }
                }
                resolve(rides)
            })
        })
    })
}

export async function getRideById(id) {
    return new Promise((resolve) => {
        db.transaction((tx) => {    
            tx.executeSql('SELECT * FROM rides WHERE id = ?', [id], function(tx, results) {
                var item = results.rows.item(0)
                const rideModel = new RidesModel(item.id, item.date, item.distance, item.diversionReason, item.fromAddress, item.fromPostalCode, item.toAddress, 
                    item.toPostalCode, item.purposeReason, item.purposeType)
                
                resolve(rideModel)
            })
        })
    })
}

export async function insertRides(ride) {
    db.transaction(tx => {
        try {
            tx.executeSql(
                `
                INSERT INTO rides (date, distance, diversionReason, fromAddress, fromPostalCode, toAddress, toPostalCode, purposeReason, purposeType)
                VALUES ('${ride.date}', '${ride.distance}', '${ride.diversionReason}', '${ride.fromAddress}', '${ride.fromPostalCode}', '${ride.toAddress}',
                '${ride.toPostalCode}', '${ride.purposeReason}', '${ride.purposeType}')
                `
            );
        } catch (error) {
            console.error(error)
        }
    })
}

export async function updateRides(ride) {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql( 
                `UPDATE rides 
                SET date = ?, distance = ?, diversionReason = ?, fromAddress = ?, fromPostalCode = ?, toAddress = ?, toPostalCode = ?, purposeReason = ?, purposeType = ?
                WHERE id = ?`, 
                [ride.date, ride.distance, ride.diversionReason, ride.fromAddress, ride.fromPostalCode, ride.toAddress, ride.toPostalCode, ride.purposeReason,
                    ride.purposeType, ride.id], (tx, results) => {

                }
            )      
        })
    })
}

export async function deleteRide(id) {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM rides WHERE id = ?', [id])
        })
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
            );
            console.log("Clear Succesfull")
        } catch (error) {
            console.error(error)
        }
    })
}