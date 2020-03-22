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
    
  }


}
