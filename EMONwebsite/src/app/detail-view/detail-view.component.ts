import { Component, OnInit, Input } from '@angular/core';
import { FullMessage } from '../shared/models/fullMessage.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  @Input() sensorName: string = "notLoaded"; 
  @Input() fullMessage: FullMessage = new FullMessage();
  @Input() position: number = 0;
  constructor(public client: HttpClient,) { }

  ngOnInit() {
  }
}
