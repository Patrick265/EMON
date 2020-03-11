var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "../database/emonv2.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        /*db.run(`CREATE TABLE IF NOT EXISTS sensordata (
            id integer PRIMARY KEY AUTOINCREMENT,
            uuid text NOT NULL,
            name text NOT NULL,
            watt integer NOT NULL,
            totalEnergyUse integer NOT NULL,
            returnedEnergy integer NOT NULL
        )`,
        (err) => {
            if (err) {
                console.log("Table already created")
            }else{
                console.log("Table just created, creating some rows")
                //var insert = 'INSERT INTO sensordata (uuid, name, watt, totalEnergyUse, returnedEnergy) VALUES (1, "SKRA MT382",20,5000,7878)'
                //db.run(insert)//, ["uuid", "323432423"], ["name","SKRA MT382"], ["watt",20], ["totalEnergyUse",5600], ["returnedEnergy",7878])
            }
        });*/  
    }
});


module.exports = db