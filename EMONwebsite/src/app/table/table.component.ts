import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';
import {FullMessage} from '../shared/models/fullMessage.model'
import {SensorData} from '../shared/models/sensorData.model';

// client
//import { HttpClient } from "../http/client";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  value;
  sensorName;
  fullMessage: FullMessage = new FullMessage();
  constructor(public client: HttpClient,) { }

  ngOnInit() {
    this.getSensors();
    
  }

  //Gets all the sensornames that are saved in the database and have an own table, first entrie is used to get the data. Later this list should be clickable by user and then get data
  getSensors(){
    this.value = this.client.get("http://localhost:8000/api/sensors").subscribe(val => {
      this.sensorName = JSON.parse(JSON.stringify(val));
      this.sensorName = this.sensorName["data"][0]["name"];
      this.getData(this.sensorName);
    });
  }

  //Gets all the data from sensor of the parameter: name. This data is saved in the FullMessage model for later showing
  getData(name: string) {
    console.log("send name: " + name);
    this.value = this.client.get("http://localhost:8000/api/data/?sensor=" + name + "_data").subscribe(val => {
      this.value = JSON.parse(JSON.stringify(val));
      console.log("real data: " + this.value["data"][0]["watt"]);
      console.log("real data: " + this.value["data"][0]["time"]);
      console.log("real data: " + this.value["data"][0]["temperature"]);
      console.log("real data: " + this.value["data"][0]["totalEnergy"]);
      this.fullMessage.message = this.value["message"];
      this.fullMessage.count = this.value["count"];
      this.fullMessage.data = new Array<SensorData>();
      for(var i=0; i<this.value["count"]-1; i++){
        var sensData: SensorData = new SensorData();
          sensData.id = this.value["data"][i]["id"];
          sensData.time = this.value["data"][i]["time"];
          sensData.temperature = this.value["data"][i]["temperature"];
          sensData.humidity = this.value["data"][i]["humidity"];
          sensData.watt = this.value["data"][i]["watt"];
          sensData.totalEnergyUse = this.value["data"][i]["totalEnergy"];
          sensData.returnedEnergy = this.value["data"][i]["returnedEnergy"];
          this.fullMessage.data.push(sensData);
      }
  });
  }

}
