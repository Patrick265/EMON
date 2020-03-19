import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SmartSensorComponent } from './smart-sensor-list/smart-sensor/smart-sensor.component';
import { SmartSensorListComponent } from './smart-sensor-list/smart-sensor-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material';
import { MaterialModule } from './material/material.module';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { IskraDetailComponent } from './detail-view/iskra-detail/iskra-detail.component';
import { MatTableModule } from '@angular/material' 


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SmartSensorComponent,
    SmartSensorListComponent,
    DetailViewComponent,
    IskraDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatListModule,
    MaterialModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
