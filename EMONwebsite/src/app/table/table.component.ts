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
  fullMessage: FullMessage = new FullMessage();
  valid = '{"message":"success","data":[{"id":1,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":2,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":3,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":4,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":5,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":6,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":7,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":8,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":9,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":10,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":11,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878},{"id":12,"uuid":"1","name":"SKRA MT382","watt":20,"totalEnergyUse":5000,"returnedEnergy":7878}]}';

  constructor(public client: HttpClient,) { }

  ngOnInit() {
    this.getData();
  }

  //Gets all the data from the database and puts it in the fullMessage model for later use
  getData() {
    this.value = this.client.get("http://localhost:8000/api/sensordata/").subscribe(val => {
      this.value = JSON.parse(JSON.stringify(val));
      console.log("real data: " + this.value["data"][0]["watt"]);
      console.log("real data: " + this.value["data"][0]["uuid"]);
      console.log("real data: " + this.value["data"][0]["name"]);
      console.log("real data: " + this.value["data"][0]["totalEnergyUse"]);
      this.fullMessage.message = this.value["message"];
      this.fullMessage.count = this.value["count"];
      this.fullMessage.data = new Array<SensorData>();
      for(var i=0; i<this.value["count"]-1; i++){
        var sensData: SensorData = new SensorData();
          sensData.id = this.value["data"][i]["id"];
          sensData.uuid = this.value["data"][i]["uuid"];
          sensData.name = this.value["data"][i]["name"];
          sensData.watt = this.value["data"][i]["watt"];
          sensData.totalEnergyUse = this.value["data"][i]["totalEnergyUse"];
          sensData.returnedEnergy = this.value["data"][i]["returnedEnergy"];
          this.fullMessage.data.push(sensData);
      }
  });
  }

}
