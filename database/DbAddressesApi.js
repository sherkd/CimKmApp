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
                const address = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    address.push(results.rows.item(i));
                }
                console.log(address)
                resolve(address)
            })
        })
    })
    // .catch(alert('Ophalen ritten mislukt probeer later opnieuw.'))
}

export async function insertAddresses(nickname, street, city, country, postalCode, region) {
    db.transaction(tx => {
        try {
            tx.executeSql(
                `
                INSERT INTO address (nickname, street, city, country, postalCode, region)
                VALUES ('${nickname}', '${street}', '${city}', '${country}', '${postalCode}', '${region}')
                `
            );
            console.log("Insertion succesfull")
        } catch (error) {
            console.error(error)
        }
    })
}

export async function updateAddresses(id) {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql( 'UPDATE address SET distance = ? WHERE id = ?', ["26", id], (tx, results) => {
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

export async function deleteAddresses(id) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM address WHERE id = ?', [id])
        })
    })
}

export async function clearAddressesTable() {
    db.transaction(tx => {
        try {
            tx.executeSql(
                'DELETE FROM address'
            );
            tx.executeSql(
                "DELETE FROM sqlite_sequence WHERE name='address'"
            );
            console.log("Clear Succesfull")
        } catch (error) {
            console.error(error)
        }
    })
}