import * as SQLite from 'expo-sqlite';
import { Component } from 'react';

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

    db.transaction(tx => {
        tx.executeSql(
            "SELECT * FROM rides",
            [], (_, { rows }) =>
            console.log ( JSON.parse( JSON.stringify(rows["_array"]) ) ),
        );
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