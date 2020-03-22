import { FullMessage } from './models/fullMessage.model';

export class ChartLabelMaker{
    chartLabels:Array<string> = new Array<string>();
    chartData:Array<number> = new Array<number>();
    counter:Array<number> = new Array<number>();

    getXLabelsOverview(timestamps: Array<string>): Array<string>{
        this.chartLabels = new Array<string>();
        for(let i = 0; i<timestamps.length; i++){       
            var res = timestamps[i].split(" ")[1];
            var time = timestamps[i].split("-")[0] + "-" + timestamps[i].split("-")[1] + res.split(":")[0] + "h";
            if(!(this.chartLabels.indexOf(time) !== -1)){
              this.chartLabels.push(time);
            }
          }
        return this.chartLabels;
    }

    getYLabelsOverview(labels: Array<string>, data: FullMessage): Array<Array<number>>{
        var reDat: Array<Array<number>> = new Array<Array<number>>();
        this.chartData = new Array<number>();
        this.counter = new Array<number>();
        for(let i = 0; i<labels.length; i++){
            this.chartData.push(0);
            this.counter.push(0);
        }
        for(let i = 0; i<data.dataIskra.energyData.length; i++){
            var res = data.dataIskra.energyData[i].timestamp.split(" ")[1];
            var time = data.dataIskra.energyData[i].timestamp.split("-")[0] + "-" + data.dataIskra.energyData[i].timestamp.split("-")[1] + res.split(":")[0] + "h";
            for(let k = 0; k<labels.length; k++){
                if(labels[k] === time){
                    this.chartData[k] = this.chartData[k] + data.dataIskra.energyData[i].watt;
                    this.counter[k]++;
                }
            }
          }
          for(let i = 0; i<this.chartData.length; i++){
              if(this.counter[i] !== 0){
                  this.chartData[i] = this.chartData[i]/this.counter[i];
                  console.log("data: " + this.chartData[i]);
              }
          }
          reDat.push(this.chartData);

          for(let k =0; k<data.data.length; k++){
            this.chartData = new Array<number>();
            this.counter = new Array<number>();
            for(let g = 0; g<labels.length; g++){
                this.chartData.push(0);
                this.counter.push(0);
            }
            for(let i = 0; i<data.data[k].length; i++){
                var res = data.data[k][i].time.split(" ")[1];
            var time = data.data[k][i].time.split("-")[0] + "-" + data.data[k][i].time.split("-")[1] + res.split(":")[0] + "h";
                for(let y = 0; y<labels.length; y++){
                    if(labels[y] === time){
                        this.chartData[y] = this.chartData[y] + data.data[k][i].watt;
                        this.counter[y]++;
                    }
                }
              }
              for(let i = 0; i<this.chartData.length; i++){
                  if(this.counter[i] !== 0){
                      this.chartData[i] = this.chartData[i]/this.counter[i];
                      console.log("data: " + this.chartData[i]);
                  }
              }
              reDat.push(this.chartData);
          }
        return reDat;
    }

    getYLabelsOverviewwH(labels: Array<string>, data: FullMessage): Array<Array<number>>{
        var reDat: Array<Array<number>> = new Array<Array<number>>();
        this.chartData = new Array<number>();
        this.counter = new Array<number>();
        for(let i = 0; i<labels.length; i++){
            this.chartData.push(0);
            this.counter.push(0);
        }
        for(let i = 0; i<data.dataIskra.energyData.length; i++){
            var res = data.dataIskra.energyData[i].timestamp.split(" ")[1];
            var time = data.dataIskra.energyData[i].timestamp.split("-")[0] + "-" + data.dataIskra.energyData[i].timestamp.split("-")[1] + res.split(":")[0] + "h";
            for(let k = 0; k<labels.length; k++){
                if(labels[k] === time){
                    this.chartData[k] = this.chartData[k] + data.dataIskra.energyData[i].wH;
                    this.counter[k]++;
                }
            }
          }
          for(let i = 0; i<this.chartData.length; i++){
              if(this.counter[i] !== 0){
                  this.chartData[i] = this.chartData[i]/this.counter[i];
                  console.log("data: " + this.chartData[i]);
              }
          }
          reDat.push(this.chartData);

          for(let k =0; k<data.data.length; k++){
            this.chartData = new Array<number>();
            this.counter = new Array<number>();
            for(let g = 0; g<labels.length; g++){
                this.chartData.push(0);
                this.counter.push(0);
            }
            for(let i = 0; i<data.data[k].length; i++){
                var res = data.data[k][i].time.split(" ")[1];
            var time = data.data[k][i].time.split("-")[0] + "-" + data.data[k][i].time.split("-")[1] + res.split(":")[0] + "h";
                for(let y = 0; y<labels.length; y++){
                    if(labels[y] === time){
                        this.chartData[y] = this.chartData[y] + data.data[k][i].wH;
                        this.counter[y]++;
                    }
                }
              }
              for(let i = 0; i<this.chartData.length; i++){
                  if(this.counter[i] !== 0){
                      this.chartData[i] = this.chartData[i]/this.counter[i];
                      console.log("data: " + this.chartData[i]);
                  }
              }
              reDat.push(this.chartData);
          }
        return reDat;
    }

    getYLabelsOverviewTotal(labels: Array<string>, data: FullMessage): Array<Array<number>>{
        var reDat: Array<Array<number>> = new Array<Array<number>>();
        this.chartData = new Array<number>();
        this.counter = new Array<number>();
        for(let i = 0; i<labels.length; i++){
            this.chartData.push(0);
            this.counter.push(0);
        }
        for(let i = 0; i<data.dataIskra.energyData.length; i++){
            var res = data.dataIskra.energyData[i].timestamp.split(" ")[1];
            var time = data.dataIskra.energyData[i].timestamp.split("-")[0] + "-" + data.dataIskra.energyData[i].timestamp.split("-")[1] + res.split(":")[0] + "h";
            for(let k = 0; k<labels.length; k++){
                if(labels[k] === time){
                    this.chartData[k] = this.chartData[k] + data.dataIskra.energyData[i].total;
                    this.counter[k]++;
                }
            }
          }
          for(let i = 0; i<this.chartData.length; i++){
              if(this.counter[i] !== 0){
                  this.chartData[i] = this.chartData[i]/this.counter[i];
                  console.log("data: " + this.chartData[i]);
              }
          }
          reDat.push(this.chartData);

          for(let k =0; k<data.data.length; k++){
            this.chartData = new Array<number>();
            this.counter = new Array<number>();
            for(let g = 0; g<labels.length; g++){
                this.chartData.push(0);
                this.counter.push(0);
            }
            for(let i = 0; i<data.data[k].length; i++){
                var res = data.data[k][i].time.split(" ")[1];
            var time = data.data[k][i].time.split("-")[0] + "-" + data.data[k][i].time.split("-")[1] + res.split(":")[0] + "h";
                for(let y = 0; y<labels.length; y++){
                    if(labels[y] === time){
                        this.chartData[y] = this.chartData[y] + data.data[k][i].totalEnergyUse;
                        this.counter[y]++;
                    }
                }
              }
              for(let i = 0; i<this.chartData.length; i++){
                  if(this.counter[i] !== 0){
                      this.chartData[i] = this.chartData[i]/this.counter[i];
                      console.log("data: " + this.chartData[i]);
                  }
              }
              reDat.push(this.chartData);
          }
        return reDat;

    }


    getXLabels(timestamps: Array<string>, amount: number): Array<string>{
        this.chartLabels = new Array<string>();
        this.chartData = new Array<number>();
        this.counter = new Array<number>();
        switch(amount){
            // Gets the hours and minutes for every entry, used for <30
            case 1: 
            for(let i = 0; i<timestamps.length; i++){
                var res = timestamps[i].split(" ")[1];
                var time = res.split(":")[0] + ":" + res.split(":")[1];
                this.chartLabels.push(time);
              }
                 break;
            // Gets the distinct hours of the day, used for <720
            case 2:
                for(let i = 0; i<timestamps.length; i++){
                    var res = timestamps[i].split(" ")[1];
                    var time = res.split(":")[0];
                    if(!(this.chartLabels.indexOf(time) !== -1)){
                      this.chartLabels.push(time);
                    }
                  }
            break;
            // Gets the distinct days of the timestamp
            case 3:
                for(let i = 0; i<timestamps.length; i++){
                    var res = timestamps[i].split("-")[0];
                    if(!(this.chartLabels.indexOf(res) !== -1)){
                      this.chartLabels.push(res);
                    }
                  }
            break;
        }
        
        return this.chartLabels;
    }

    getYLabels(xLabels: Array<string> ,originalTimestamps: Array<string>, data: Array<number>, amount: number): Array<number>{
        for(let i = 0; i<xLabels.length; i++){
            this.chartData.push(0);
            this.counter.push(0);
        }
        switch(amount){
            case 1:
                for(let i = 0; i<data.length; i++){
                    var res = originalTimestamps[i].split(" ")[1];
                    var time = res.split(":")[0] + ":" + res.split(":")[1];
                    //for(let k = 0; k<xLabels.length; k++){
                    //    if(xLabels[k] === time){
                            this.chartData[i] = this.chartData[i] + data[i];
                            this.counter[i]++;
                    //    }
                   // }
                  }
                  for(let i = 0; i<this.chartData.length; i++){
                      if(this.counter[i] !== 0){
                          this.chartData[i] = this.chartData[i]/this.counter[i];
                      }
                  }
                break;
            case 2:
                for(let i = 0; i<data.length; i++){
                    var res = originalTimestamps[i].split(" ")[1];
                    var time = res.split(":")[0];
                    for(let k = 0; k<xLabels.length; k++){
                        if(xLabels[k] === time){
                            this.chartData[k] = this.chartData[k] + data[i];
                            this.counter[k]++;
                        }
                    }
                  }
                  for(let i = 0; i<this.chartData.length; i++){
                      if(this.counter[i] !== 0){
                          this.chartData[i] = this.chartData[i]/this.counter[i];
                          console.log("data: " + this.chartData[i]);
                      }
                  }
            break;

            case 3:
                for(let i = 0; i<data.length; i++){
                    var res = originalTimestamps[i].split("-")[0];
                    for(let k = 0; k<xLabels.length; k++){
                        if(xLabels[k] === res){
                            this.chartData[k] = this.chartData[k] + data[i];
                            this.counter[k]++;
                        }
                    }
                  }
                  for(let i = 0; i<this.chartData.length; i++){
                      if(this.counter[i] !== 0){
                          this.chartData[i] = this.chartData[i]/this.counter[i];
                      }
                  }
            break;
        }
        
        
        return this.chartData;
    }
}