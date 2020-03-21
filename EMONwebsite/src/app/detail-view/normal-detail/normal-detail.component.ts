import { Component, OnInit, Input } from '@angular/core';
import { SensorData } from 'src/app/shared/models/sensorData.model';
import { ChartLabelMaker } from 'src/app/shared/chartLabelMaker';

@Component({
  selector: 'app-normal-detail',
  templateUrl: './normal-detail.component.html',
  styleUrls: ['./normal-detail.component.css']
})
export class NormalDetailComponent implements OnInit {
  @Input()  sensorName: string = "";
  @Input() data: Array<SensorData> = new Array<SensorData>();
  selected: number = 1;
  timestampsE: Array<string> = new Array<string>();
  valuesE: Array<number> = new Array<number>();
  clm: ChartLabelMaker = new ChartLabelMaker();

  constructor() { }

  ngOnInit() {
    this.onScale();
  }

  onScale(){
    this.timestampsE = new Array<string>();
    this.valuesE = new Array<number>();
    for(let i  = 0; i<this.data.length; i++){
      this.timestampsE.push(this.data[i].time);
      this.valuesE.push(this.data[i].watt);
    }
    this.chartLabels = this.clm.getXLabels(this.timestampsE, +this.selected);
    this.chartDatasets = [
      {data: this.clm.getYLabels(this.chartLabels, this.timestampsE, this.valuesE, +this.selected), label: 'Smartsensor kwH'}
    ];
  }

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

}
