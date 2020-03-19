import { Component, Input } from '@angular/core';
import {SmartSensor} from './shared/models/smartSensor.model'
import { FullMessage } from './shared/models/fullMessage.model';
import { HttpClient } from '@angular/common/http';
import { SensorData } from './shared/models/sensorData.model';
import { IskraData } from './shared/models/iskraData';
import { IskraEnergy } from './shared/models/iskraEnergy';
import { IskraTemp } from './shared/models/iskraTemp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EMONwebsite';
  detailSensor: string = "";
  fullMessage: FullMessage = new FullMessage();
  constructor(public client: HttpClient,) { }

ngOnInit() {
  }

  itemSelected(sensor: string) {
    this.detailSensor = sensor;
    
    if(this.detailSensor == "ISKRA-MT382"){
      console.log("sensor check reached: " + sensor);
      this.getDataIskra();
      
    }
    else{
      this.getData();
    }

}

toList(){
  this.detailSensor = "";
  console.log("reached");
}

refresh(){
 
}

getDataIskra() {
  this.client.get("http://localhost:8000/api/dataIE").subscribe(val => {
    const json = JSON.parse(JSON.stringify(val));
   
    this.fullMessage = new FullMessage();
    this.fullMessage.version = true;
    this.fullMessage.message = json["message"];
    this.fullMessage.count = json["count"];
    console.log("getting iskra data: " + this.fullMessage.count);
    this.fullMessage.dataIskra = new IskraData;
    this.fullMessage.dataIskra.energyData = new Array<IskraEnergy>();
    for(var i=0; i<json["count"]; i++){
      var sensData: IskraEnergy = new IskraEnergy();
        sensData.messageId = json["data"][i]["message_id"];
        sensData.energyMeter = json["data"][i]["energymeter_name"];
        sensData.watt = json["data"][i]["watt"];
        sensData.wH = json["data"][i]["wH"];
        sensData.total = json["data"][i]["total"];
        sensData.signature = json["data"][i]["signature"];
        sensData.timestamp = json["data"][i]["timestamp"];
        this.fullMessage.dataIskra.energyData.push(sensData);
        
    }
    this.getDataIskraTemp();
});
}

getDataIskraTemp(){
  this.client.get("http://localhost:8000/api/dataIT").subscribe(val => {
    const json = JSON.parse(JSON.stringify(val));
    this.fullMessage.dataIskra.temperatureData = new Array<IskraTemp>();
    for(var i=0; i<json["count"]; i++){
      var sensData: IskraTemp = new IskraTemp();
        sensData.messageId = json["data"][i]["message_id"];
        sensData.outsideTemp = json["data"][i]["outside_temp"];
        sensData.insideTemp = json["data"][i]["inside_temp"];
        sensData.signature = json["data"][i]["signature"];
        sensData.timestamp = json["data"][i]["timestamp"];
        this.fullMessage.dataIskra.temperatureData.push(sensData);
    }
    console.log("version: " + this.fullMessage.version);
});
}

getData() {
  this.client.get("http://localhost:8000/api/data/?sensor=" + this.detailSensor).subscribe(val => {
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
