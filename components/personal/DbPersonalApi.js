import * as SQLite from 'expo-sqlite';
import UserModel from '../../models/UserModel'

const db = SQLite.openDatabase('CimKmApp.db')

export async function createUserTable(){
    db.transaction(tx => {
        tx.executeSql(
            `create table if not exists user (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                emailAddress TEXT NOT NULL
            `
        )
    });
}

export async function dropUserTable(){
    db.transaction(tx => {
        tx.executeSql(
            'DROP TABLE user'
        )
    });
}

export async function getEmailAddress() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM user', [], function(tx, results) {
                const emailAddress = "Geen"
                if (results.rows.item(0) != null || undefined || ""){
                    emailAddress = results.rows.item(0)
                }
                console.log('----------EMAIL-----------')
                // console.log(results.rowsAffected)
                resolve(emailAddress)
            })
        })
    })
}

export async function getEmailAddress1() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM user', [], function(tx, results) {
                const addresses = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    addresses.push(results.rows.item(i));
                }
                console.log('----------EMAIL-----------')
                console.log(addresses)
                resolve(addresses)
            })
        })
    })
}

export async function insertEmailAddress(emailAddress) {
    db.transaction(tx => {
        tx.executeSql(
            `
            INSERT INTO user (emailAddress)
            VALUES ('${emailAddress}')
            `
        );
        console.log("INSERT SUC6")
    })
}

export async function updateEmailAddress(currentEmail, newEmail) {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql( 
                `UPDATE user 
                 SET emailAddress = ?
                 WHERE emailAddress = ?`, [newEmail, currentEmail], (tx, results) => {
                    resolve(results.rowsAffected)
                }
            )      
        })
    })
}

export async function clearUserTable() {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM user'
        );
    })
}