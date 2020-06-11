import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('CimKmApp.db')

export async function createAddressTable(){
    db.transaction(tx => {
        tx.executeSql(
            `create table if not exists address (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                nickname TEXT,
                street TEXT NOT NULL,
                city TEXT NOT NULL,
                country TEXT NOT NULL,
                postalCode TEXT NOT NULL,
                region TEXT NOT NULL);
            `
        )
    });
}

export async function getAddresses() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM address', [], function(tx, results) {
                const addresses = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    addresses.push(results.rows.item(i));
                }
                resolve(addresses)
            })
        })
    })
}

export async function getAddressById(id) {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM address WHERE id = ?', [id], function(tx, results) {
                const item = results.rows.item(0)
                resolve(item)
            })
        })
    })
}

export async function insertAddresses(item) {
    db.transaction(tx => {
        tx.executeSql(
            `
            INSERT INTO address (nickname, street, city, country, postalCode, region)
            VALUES ('${item.nickname}', '${item.street}', '${item.city}', '${item.country}', '${item.postalCode}', '${item.region}')
            `
        );
    })
}

export async function updateAddresses(item) {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql( 
                `UPDATE address 
                 SET nickname = ?, street = ?, city = ?, country = ?, postalCode = ?, region = ? 
                 WHERE id = ?`, [item.nickname, item.street, item.city, item.country, item.postalCode, item.region, item.id], (tx, results) => {
                    if(results.rowsAffected>0){
                        alert('Update Successfull')
                    }else{
                        alert('Updation Failed');
                    }
                }
            )      
        })
    })
}

export async function deleteAddresses(id) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM address WHERE id = ?', [id])
        })
    })
}

export async function clearAddressesTable() {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM address'
        );
        tx.executeSql(
            "DELETE FROM sqlite_sequence WHERE name='address'"
        );
    })
}