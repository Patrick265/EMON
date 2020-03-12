import { Component, OnInit, Input } from '@angular/core';
import { SmartSensor } from 'src/app/shared/models/smartSensor.model';
import { HttpClient } from '@angular/common/http';
import { FullMessage } from 'src/app/shared/models/fullMessage.model';
import { SensorData } from 'src/app/shared/models/sensorData.model';

@Component({
  selector: 'app-smart-sensor',
  templateUrl: './smart-sensor.component.html',
  styleUrls: ['./smart-sensor.component.css']
})
export class SmartSensorComponent implements OnInit {
  @Input() sensor: SmartSensor;
  fullMessage: FullMessage = new FullMessage();
  constructor(public client: HttpClient,) { }

  ngOnInit() {
    
  }

  //Gets all the data from sensor of the parameter: name. This data is saved in the FullMessage model for later showing
  getData() {
    this.client.get("http://localhost:8000/api/data/?sensor=" + this.sensor.tableName).subscribe(val => {
      const json = JSON.parse(JSON.stringify(val));
      console.log("real data: " + json["data"][0]["watt"]);
      console.log("real data: " + json["data"][0]["time"]);
      console.log("real data: " + json["data"][0]["temperature"]);
      console.log("real data: " + json["data"][0]["totalEnergy"]);
      this.fullMessage.message = json["message"];
      this.fullMessage.count = json["count"];
      this.fullMessage.data = new Array<SensorData>();
      for(var i=0; i<json["count"]; i++){
        var sensData: SensorData = new SensorData();
          sensData.id = json["data"][i]["id"];
          sensData.time = json["data"][i]["time"];
          sensData.temperature = json["data"][i]["temperature"];
          sensData.humidity = json["data"][i]["humidity"];
          sensData.watt = json["data"][i]["watt"];
          sensData.totalEnergyUse = json["data"][i]["totalEnergy"];
          sensData.returnedEnergy = json["data"][i]["returnedEnergy"];
          this.fullMessage.data.push(sensData);
      }
  });
  }

}
