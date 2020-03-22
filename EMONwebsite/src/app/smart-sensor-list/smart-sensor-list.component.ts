import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SmartSensor } from '../shared/models/smartSensor.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-smart-sensor-list',
  templateUrl: './smart-sensor-list.component.html',
  styleUrls: ['./smart-sensor-list.component.css']
})
export class SmartSensorListComponent implements OnInit {
  @Input() smartSensors: Array<SmartSensor> = new Array();
  constructor(public client: HttpClient,) { }
  count = this.smartSensors.length;
  @Output() selectedDetail = new EventEmitter<string>();
  
  ngOnInit() {
  }

 

onSelectedDetail(sensor: string) {
  this.selectedDetail.emit(sensor);
}
}
