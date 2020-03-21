import { Component, OnInit, Input } from '@angular/core';
import { SensorData } from 'src/app/shared/models/sensorData.model';

@Component({
  selector: 'app-normal-energy-data',
  templateUrl: './normal-energy-data.component.html',
  styleUrls: ['./normal-energy-data.component.css']
})
export class NormalEnergyDataComponent implements OnInit {
@Input() data: SensorData;
  constructor() { }

  ngOnInit() {
    
  }

}
