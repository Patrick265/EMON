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
  sendMessage: FullMessage = new FullMessage();;
  constructor(public client: HttpClient,) { }

ngOnInit() {

  }

  itemSelected(sensor: string) {
    this.detailSensor = sensor;
    this.fullMessage = new FullMessage();
    this.fullMessage.dataIskra = new IskraData;
    this.fullMessage.dataIskra.energyData = new Array<IskraEnergy>();
    if(this.detailSensor == "ISKRA-MT382"){
      console.log("sensor check reached: " + sensor);
      this.fullMessage.version = true;
      this.getDataIskra();
    }
    else{
      this.fullMessage.version = false;
      this.getData();
    }

}

toList(){
  this.detailSensor = "";
}

refresh(){
 
}

getDataIskra() {
  this.client.get("http://localhost:8000/api/dataIE").subscribe(val => {
    const json = JSON.parse(JSON.stringify(val));
   
    
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
        sensData.outsideTemp = json["data"][i]["temperature"];
        sensData.signature = json["data"][i]["signature"];
        sensData.timestamp = json["data"][i]["timestamp"];
        this.fullMessage.dataIskra.temperatureData.push(sensData);
    }
    console.log("amount entries: " + this.fullMessage.dataIskra.temperatureData.length);
    this.sendMessage = this.fullMessage;
});
}

getData() {
  this.client.get("http://localhost:8000/api/data/?sensor=" + this.detailSensor).subscribe(val => {
    const json = JSON.parse(JSON.stringify(val));
    this.fullMessage.message = json["message"];
    this.fullMessage.count = json["count"];
    this.fullMessage.data = new Array<SensorData>();
    for(var i=0; i<json["count"]; i++){
      var sensData: SensorData = new SensorData();
        sensData.id = json["data"][i]["id"];
        sensData.time = json["data"][i]["timestamp"];
        sensData.watt = json["data"][i]["watt"];
        sensData.totalEnergyUse = json["data"][i]["total"];
        sensData.wH = json["data"][i]["wH"];
        sensData.signature = json["data"][i]["signature"];
        this.fullMessage.data.push(sensData);
    }
    this.sendMessage = this.fullMessage;
});
}
}
