import { Component, OnInit, Input } from '@angular/core';
import { IskraData } from 'src/app/shared/models/iskraData';

@Component({
  selector: 'app-iskra-detail',
  templateUrl: './iskra-detail.component.html',
  styleUrls: ['./iskra-detail.component.css']
})
export class IskraDetailComponent implements OnInit {
@Input()  iskraData: IskraData = new IskraData();
@Input()  sensorName: string = "";
  constructor() { }

  ngOnInit() {
  }

}
