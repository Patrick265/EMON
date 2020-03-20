import { Component, OnInit, Input } from '@angular/core';
import { IskraEnergy } from 'src/app/shared/models/iskraEnergy';

@Component({
  selector: 'app-energy-data',
  templateUrl: './energy-data.component.html',
  styleUrls: ['./energy-data.component.css']
})
export class EnergyDataComponent implements OnInit {
@Input() idata: IskraEnergy;
  constructor() { }

  ngOnInit() {
    this.idata.wH;
  }

}
