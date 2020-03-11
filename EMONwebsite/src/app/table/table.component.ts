import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from "rxjs/Rx";

// client
//import { HttpClient } from "../http/client";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  message: string = this.getAnnounce().subscribe().toString();
  value;
  test = "testing";

  constructor(public client: HttpClient,) { }

  ngOnInit() {
    console.log("test");
    this.value = this.client.get("http://localhost:8000/api/sensordata/").subscribe(val => this.value = JSON.stringify(val));
    console.log(this.message);

    console.log("received");
    //this.client.fetchUsers().subscribe((message: string) => {
    //  this.message = message;
    //})
  }

  getAnnounce() {
    return this.client.get('http://localhost:8000/api/sensordata');
    
  }

}
