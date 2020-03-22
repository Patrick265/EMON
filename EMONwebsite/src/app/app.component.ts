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
  smartSensors: Array<SmartSensor> = new Array<SmartSensor>();
  fullMessage: FullMessage = new FullMessage();
  sendMessage: FullMessage = new FullMessage();
  position: number;
  choice: number = 1;
  constructor(public client: HttpClient,) { }

ngOnInit() {
  this.fullMessage = new FullMessage();
    this.fullMessage.dataIskra = new IskraData;
    this.fullMessage.dataIskra.energyData = new Array<IskraEnergy>();
  this.fullMessage.position.push("ISKRA_MT382");
this.getSensors();
  }

  itemSelected(sensor: string) {
    this.detailSensor = sensor;
    
    if(this.detailSensor == "ISKRA_MT382"){
      console.log("sensor check reached: " + sensor);
      
      this.fullMessage.version = true;
      
    }
    else{
      this.fullMessage.version = false;
      this.position = this.fullMessage.position.indexOf(sensor)-1;
      console.log("posittion: " + this.position);
    }

}

toList(){
  this.detailSensor = "";
  this.choice = 1;
}

toOverview(){
  this.detailSensor = "";
  this.choice = 2;
}

toExtra(){
  this.detailSensor = "";
  this.choice = 3;
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

getData(nam: string) {
  this.client.get("http://localhost:8000/api/data/?sensor=" + nam).subscribe(val => {
    const json = JSON.parse(JSON.stringify(val));
    this.fullMessage.message = json["message"];
    this.fullMessage.count = json["count"];
    var dat: Array<SensorData> =  new Array<SensorData>();
    for(var i=0; i<json["count"]; i++){
      var sensData: SensorData = new SensorData();
        sensData.id = json["data"][i]["id"];
        sensData.time = json["data"][i]["timestamp"];
        sensData.watt = json["data"][i]["watt"];
        sensData.totalEnergyUse = json["data"][i]["total"];
        sensData.wH = json["data"][i]["wH"];
        sensData.signature = json["data"][i]["signature"];
        dat.push(sensData);
    }
    this.fullMessage.data.push(dat);
    this.fullMessage.position.push(nam);
    this.sendMessage = this.fullMessage;
});
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
      this.getDataIskra();
    }
    else{
      this.getData(smartSensor.tableName);

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
  console.log("sens added");
});
}
}
