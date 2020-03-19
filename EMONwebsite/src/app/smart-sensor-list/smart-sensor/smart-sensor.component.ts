import { Component, OnInit, Input, NgModule, Output, EventEmitter } from '@angular/core';
import { SmartSensor } from 'src/app/shared/models/smartSensor.model';
import { HttpClient } from '@angular/common/http';
import { FullMessage } from 'src/app/shared/models/fullMessage.model';
import { SensorData } from 'src/app/shared/models/sensorData.model';
import { MatSliderModule } from '@angular/material/slider';



@Component({
  selector: 'app-smart-sensor',
  templateUrl: './smart-sensor.component.html',
  styleUrls: ['./smart-sensor.component.css']
})
export class SmartSensorComponent implements OnInit {
  @Input() sensor: SmartSensor;
  @Output() detail = new EventEmitter<String>();
  fullMessage: FullMessage = new FullMessage();
  constructor(public client: HttpClient,) { }

  ngOnInit() {
    
  }

  clickedCard() {
    this.detail.emit(this.sensor.name);
    console.log("emit");
  }

}
