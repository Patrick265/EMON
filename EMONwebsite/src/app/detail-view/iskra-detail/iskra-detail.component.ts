import { Component, OnInit, Input } from '@angular/core';
import { IskraData } from 'src/app/shared/models/iskraData';
import { ChartsModule} from 'ng2-charts';
import { ChartLabelMaker } from 'src/app/shared/chartLabelMaker';

@Component({
  selector: 'app-iskra-detail',
  templateUrl: './iskra-detail.component.html',
  styleUrls: ['./iskra-detail.component.css']
})
export class IskraDetailComponent implements OnInit {
@Input()  iskraData: IskraData = new IskraData();
@Input()  sensorName: string = "";
data: Array<number>;
counter: Array<number>;
selected: number = 1;

timestampsE: Array<string> = new Array<string>();
valuesE: Array<number> = new Array<number>();
timestampsT: Array<string> = new Array<string>();
valuesTo: Array<number> = new Array<number>();
valuesTi: Array<number> = new Array<number>();
clm: ChartLabelMaker = new ChartLabelMaker();

chartDataTemp: Array<any>;
chartLabelsTemp: Array<any>

public chartType:string = 'line';
public chartDatasets:Array<any>;
public chartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
public chartColors:Array<any> = [
  {
      backgroundColor: 'rgba(220,220,220,0.2)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
  },
  {
      backgroundColor: 'rgba(151,187,205,0.2)',
      borderColor: 'rgba(151,187,205,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(151,187,205,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(151,187,205,1)'
  }
];
public chartOptions:any = { 
  responsive: true,
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }]
}
};
public onChartClick(e: any): void { 
         
} 

public chartHovered(e: any): void { 
     
}
  constructor() { }

  ngOnInit() {
    console.log("onScale: " + this.selected);
    this.onScale();
    //this.calculateDataStrings();
  }

  onScale(){
    console.log("selected: " + this.selected);
    this.timestampsE = new Array<string>();
    this.timestampsT = new Array<string>();
    this.valuesE = new Array<number>();
    this.valuesTi = new Array<number>();
    this.valuesTo = new Array<number>();
    for(let i  = 0; i<this.iskraData.energyData.length; i++){
      this.timestampsE.push(this.iskraData.energyData[i].timestamp);
      this.valuesE.push(this.iskraData.energyData[i].watt);
    }
    this.chartLabels = this.clm.getXLabels(this.timestampsE, +this.selected);
    this.chartDatasets = [
      {data: this.clm.getYLabels(this.chartLabels, this.timestampsE, this.valuesE, +this.selected), label: 'Smartsensor kwH'}
    ];

    for(let i  = 0; i<this.iskraData.temperatureData.length; i++){
      this.timestampsT.push(this.iskraData.temperatureData[i].timestamp);
      this.valuesTo.push(this.iskraData.temperatureData[i].outsideTemp);
      this.valuesTi.push(this.iskraData.temperatureData[i].insideTemp);
    }
    this.chartLabelsTemp = this.clm.getXLabels(this.timestampsT, 2);
    this.chartDataTemp = [
      {data: this.clm.getYLabels(this.chartLabelsTemp, this.timestampsT, this.valuesTo, 2), label: 'Outisde Temperature'},
      {data: this.clm.getYLabels(this.chartLabelsTemp, this.timestampsT, this.valuesTi, 2), label: 'Insde Temperature'}
    ];
  }

  calculateDataStrings(){
    this.chartLabels = new Array<any>();
    if(this.iskraData.energyData.length <=120){
    for(let i = 0; i<this.iskraData.energyData.length; i++){
      var res = this.iskraData.energyData[i].timestamp.split(" ")[1];
      var time = res.split(":")[0] + ":" + res.split(":")[1];
      this.chartLabels.push(time);
    }
    this.chartDatasets = new Array<any>();
    
   this.data = new Array<number>();
    for(let i = 0; i<this.iskraData.energyData.length; i++){
      
      this.data.push(this.iskraData.energyData[i].watt);
    }
    this.chartDatasets = [
      {data: this.data, label: 'Smartsensor kwH'}
    ];
  }
  else if(this.iskraData.energyData.length <=720){
    this.data = new Array<number>();
    this.counter = new Array<number>();
    for(let i = 0; i<this.iskraData.energyData.length; i++){
      var res = this.iskraData.energyData[i].timestamp.split(" ")[1];
      var time = res.split(":")[0];
      if(!(this.chartLabels.indexOf(time) !== -1)){
        this.chartLabels.push(time);
        this.data.push(0);
        this.counter.push(0)
      }
    }

    
    for(let i = 0; i<this.iskraData.energyData.length; i++){
      for(let k = 0; k<this.chartLabels.length; k++){
        if(this.iskraData.energyData[i].timestamp.split(" ")[1].split(":")[0] === this.chartLabels[k]){
          this.data[k] = this.data[k] + this.iskraData.energyData[i].watt
          this.counter[k]++;
        }
      }
    }

    for(let i = 0; i<this.data.length; i++){
      this.data[i] = this.data[i]/this.counter[i];
    }
    this.chartDatasets = [
      {data: this.data, label: 'Smartsensor kwH'}
    ];

  }
  }

}
