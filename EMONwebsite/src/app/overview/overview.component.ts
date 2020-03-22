import { Component, OnInit, Input } from '@angular/core';
import { SensorData } from '../shared/models/sensorData.model';
import { FullMessage } from '../shared/models/fullMessage.model';
import { ChartLabelMaker } from '../shared/chartLabelMaker';
import { ChartsModule } from 'ng2-charts';
import { ChartData } from '../shared/models/chartData';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
//data: Array<Array<SensorData>> = new Array<Array<SensorData>>();
@Input() data: FullMessage = new FullMessage();
clm: ChartLabelMaker = new ChartLabelMaker();
timestampsE: Array<string> = new Array<string>();
chartData: Array<Array<number>> = new Array<Array<number>>();

public chartType:string = 'line';
public chartDatasets:Array<ChartData> = new Array<ChartData>();
chartDatasetsTotal: Array<ChartData> = new Array<ChartData>();
chartDatasetswH: Array<ChartData> = new Array<ChartData>();
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
  }
  constructor() { }

  ngOnInit() {
    for(let i  = 0; i<this.data.dataIskra.energyData.length; i++){
      this.timestampsE.push(this.data.dataIskra.energyData[i].timestamp);
    }
    this.chartLabels = this.clm.getXLabelsOverview(this.timestampsE);
    console.log("amount of labels: " + this.chartLabels.length);
    this.chartData = this.clm.getYLabelsOverview(this.chartLabels, this.data);
    
    for(let i = 0; i<this.chartData.length; i++){
      var set: ChartData = new ChartData();
      set.data = this.chartData[i];
      set.label = this.data.position[i];
      this.chartDatasets.push(set);
    }

    this.chartData = this.clm.getYLabelsOverviewwH(this.chartLabels, this.data);
    for(let i = 0; i<this.chartData.length; i++){
      var set: ChartData = new ChartData();
      set.data = this.chartData[i];
      set.label = this.data.position[i];
      this.chartDatasetswH.push(set);
    }

    this.chartData = this.clm.getYLabelsOverviewTotal(this.chartLabels, this.data);
    for(let i = 0; i<this.chartData.length; i++){
      var set: ChartData = new ChartData();
      set.data = this.chartData[i];
      set.label = this.data.position[i];
      this.chartDatasetsTotal.push(set);
    }
  }

  public onChartClick(e: any): void { 
         
  } 
  
  public chartHovered(e: any): void { 
       
  }
  
  

}
