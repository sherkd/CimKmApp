import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('CimKmApp.db')

export async function createCarTable(){
    db.transaction(tx => {
        tx.executeSql(
            `create table if not exists cars (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                lease BOOLEAN NOT NULL,
                kenteken TEXT NOT NULL,
                fuel TEXT NOT NULL,
                kmStart TEXT NOT NULL,
                kmEnd TEXT NOT NULL,
                remarks TEXT NOT NULL
            `
        )
    });
}

export async function dropCarsTable(){
    db.transaction(tx => {
        tx.executeSql(
            'DROP TABLE cars'
        )
    });
}

export async function getCars() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM cars', [], function(tx, results) {
                const cars = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    cars.push(results.rows.item(i));
                }
                console.log('----------CARS-----------')
                console.log(cars)
                resolve(cars)
            })
        })
    })
}

export async function insertCars(car) {
    db.transaction(tx => {
        tx.executeSql(
            `
            INSERT INTO cars (lease, kenteken, fuel, kmStart, kmEnd, remarks)
            VALUES ('${car.lease}', '${car.kenteken}', '${car.fuel}', '${car.kmStart}', '${car.kmEnd}', '${car.remarks}')
            `
        );
        console.log("INSERT SUC6")
    })
}

export async function updateCars(car, lease) {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql( 
                `UPDATE cars 
                 SET kenteken = ?, fuel = ?, kmStart = ?, kmEnd = ?, remarks = ?
                 WHERE lease = ?`, [car.kenteken, car.fuel, car.kmStart, car.kmEnd, car.remarks, car.lease], (tx, results) => {
                    resolve(results.rowsAffected)
                }
            )      
        })
    })
}

export async function clearUserTable() {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM cars'
        );
    })
}