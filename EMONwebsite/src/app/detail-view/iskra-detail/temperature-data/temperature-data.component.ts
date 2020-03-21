import { Component, OnInit, Input } from '@angular/core';
import { IskraTemp } from 'src/app/shared/models/iskraTemp';

@Component({
  selector: 'app-temperature-data',
  templateUrl: './temperature-data.component.html',
  styleUrls: ['./temperature-data.component.css']
})
export class TemperatureDataComponent implements OnInit {
  @Input() idata: IskraTemp;

  ngOnInit() {
  }

}
