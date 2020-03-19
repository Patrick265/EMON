// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
    console.log("start page")
});

// Gets all the smart sensors in the database
/*
app.get("/api/sensors", (req, res, next) => {
    var sql = "select * from smart_sensors"
    var params = []
    console.log("[GET] all sensors")
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "count":rows.length,
            "data":rows
        })
    });
});
*/

app.get("/api/sensors", (req, res, next) => {
  /*var sql = "select * from smart_sensors"
  var params = []
  console.log("[GET] all sensors")
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          //"count":rows.length,
          "count":1,
          //"data":rows
          "data":[{"name":"ISKRA-MT382","original":"true"}]
      })
  });*/
  res.json({
    "message":"success",
    //"count":rows.length,
    "count":1,
    //"data":rows
    "data":[{"name":"ISKRA-MT382","original":"true"}]
})
});


// Gets the last record (last alive) from a specefic sensor. Needs parameter: sensor=
app.get("/api/last/?", (req, res, next) => {
    let sensor = req.query.sensor
    // For our own original sensor
    if(sensor === "ISKRA-MT382"){
      var sql = "SELECT * FROM " + "iskra_energie ORDER BY ID DESC LIMIT 1"
      var params = []
    console.log("[GET] last record from sensor: " + sensor)
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
    }
    else{
      // For non original sensors
    /*var sql = "SELECT * FROM " + sensor + " ORDER BY ID DESC LIMIT 1"
    var params = []
    console.log("[GET] last record from sensor: " + sensor)
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });*/
    }
});

// Gets all the records from the energy tabel of iskra
app.get("/api/dataIE", (req, res, next) => {
  console.log("[GET] data from sensor: ")
    let sensor = req.query.sensor
      var sql = "select * from iskra_energie"
      var params = []
      console.log("[GET] data from sensor: " + sensor)
      db.all(sql, params, (err, rows) => {
          if (err) {
            res.status(400).json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "count":rows.length,
              "data":rows
          })
        });
    
    
});

// Gets all the records from the temperature tabel of iskra
app.get("/api/dataIT", (req, res, next) => {
  console.log("[GET] data from sensor: ")
    let sensor = req.query.sensor
      var sql = "select * from iskra_temperature"
      var params = []
      console.log("[GET] data from sensor: " + sensor)
      db.all(sql, params, (err, rows) => {
          if (err) {
            res.status(400).json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "count":rows.length,
              "data":rows
          })
        });
    
    
});

/*
app.get("/api/sensordata", (req, res, next) => {
    console.log('Getting data from database')
    var sql = "select * from sensordata"
    var params = []
    console.log("trying to get data")
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "count":rows.length,
            "data":rows
        })
      });
});
*/

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

