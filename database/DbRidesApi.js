import * as SQLite from 'expo-sqlite';
import RidesModel from '../models/RidesModel'

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

export async function getRides() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM rides', [], function(tx, results) {
                const rides = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    rides.push(results.rows.item(i));
                }
                console.log(rides)
                resolve(rides)
            })
        })
    })
    // .catch(alert('Ophalen ritten mislukt probeer later opnieuw.'))
}

export async function getRideById(id) {
    return new Promise((resolve) => {
        db.transaction((tx) => {    
            tx.executeSql('SELECT * FROM rides WHERE id = ?', [id], function(tx, results) {
                var item = results.rows.item(0)
                const rideModel = new RidesModel(item.id, item.date, item.distance, item.diversionReason, item.fromAddress, item.fromPostalCode, item.toAddress, 
                    item.toPostalCode, item.purposeReason, item.purposeType)
                
                console.log('----------RIDE BY ID-----------')
                console.log(rideModel)
                resolve(rideModel)
            })
        })
    })
    // .catch(alert('Ophalen ritten mislukt probeer later opnieuw.'))
}

export async function insertRides(date, distance, diversionReason, fromAddress, fromPostalCode, toAddress, toPostalCode, purposeReason, purposeType) {
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

export async function updateRides(item) {
    console.log('---------UPDATE---------')
    console.log(item)
    console.log('--------------------')
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql( `UPDATE rides 
                            SET date = ?, distance = ?, diversionReason = ?, fromAddress = ?, fromPostalCode = ?, toAddress = ?, toPostalCode = ?, purposeReason = ?, purposeType = ?
                            WHERE id = ?`, 
                            [item.date, item.distance, item.diversionReason, item.fromAddress, item.fromPostalCode, item.toAddress, item.toPostalCode, item.purposeReason,
                                item.purposeType, item.id], (tx, results) => {
                console.log('Results', results.rowsAffected)
                if(results.rowsAffected>0){
                    alert('Update Successfull')
                }else{
                    alert('Updation Failed');
                }
            })      
        })
    })
}

export async function deleteRide(id) {
    return new Promise((resolve, reject) => {
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
                // "UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='rides'"
            );
            console.log("Clear Succesfull")
        } catch (error) {
            console.error(error)
        }
        
    })
}