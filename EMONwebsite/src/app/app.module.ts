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
import { MatTableModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { EnergyDataComponent } from './detail-view/iskra-detail/energy-data/energy-data.component';
import { TemperatureDataComponent } from './detail-view/iskra-detail/temperature-data/temperature-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NormalDetailComponent } from './detail-view/normal-detail/normal-detail.component';
import { NormalEnergyDataComponent } from './detail-view/normal-detail/normal-energy-data/normal-energy-data.component';
import {OverviewComponent } from './overview/overview.component';
import {ExtraComponent} from './extra/extra.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SmartSensorComponent,
    SmartSensorListComponent,
    DetailViewComponent,
    IskraDetailComponent,
    EnergyDataComponent,
    TemperatureDataComponent,
    NormalDetailComponent,
    NormalEnergyDataComponent,
    OverviewComponent,
    ExtraComponent
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
    MatTableModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
