import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SmartSensor } from '../shared/models/smartSensor.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-smart-sensor-list',
  templateUrl: './smart-sensor-list.component.html',
  styleUrls: ['./smart-sensor-list.component.css']
})
export class SmartSensorListComponent implements OnInit {
  smartSensors: Array<SmartSensor> = new Array();
  constructor(public client: HttpClient,) { }
  count = this.smartSensors.length;
  @Output() selectedDetail = new EventEmitter<string>();
  
  ngOnInit() {
    this.getSensors();
  }

  // Gets all the sensornames that are saved in the database and have an own table. Later this list should be clickable by user and then get data
  getSensors(){
    this.client.get("http://localhost:8000/api/sensors").subscribe(val => {
    const json = JSON.parse(JSON.stringify(val));
    for(var i=0; i<json["count"]; i++){
      var smartSensor: SmartSensor = new SmartSensor();
      smartSensor.name = json["data"][i]["name"];
      smartSensor.tableName = json["data"][i]["table_name"];
      if(smartSensor.tableName === "original"){
        smartSensor.version = true;
      }
      else{
        smartSensor.version = false;
      }
      this.getFullSensor(smartSensor);
    }
  });
}

// Gets the last alive value for a specific sensor and pushes the entire sensor to the smartSensor array for later use
getFullSensor(sensor: SmartSensor){
  this.client.get("http://localhost:8000/api/last/?sensor=" + sensor.name + "&tableName=" + sensor.tableName).subscribe(val => {
    const json = JSON.parse(JSON.stringify(val));
    sensor.lastAlive = json["data"][0]["timestamp"];
    sensor.total = json["data"][0]["total"];
    this.smartSensors.push(sensor);
    this.count = this.smartSensors.length;
  });
}

onSelectedDetail(sensor: string) {
  this.selectedDetail.emit(sensor);
}
}
