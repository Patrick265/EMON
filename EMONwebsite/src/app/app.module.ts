import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SmartSensorComponent } from './smart-sensor-list/smart-sensor/smart-sensor.component';
import { SmartSensorListComponent } from './smart-sensor-list/smart-sensor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SmartSensorComponent,
    SmartSensorListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
