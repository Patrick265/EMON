export class ChartLabelMaker{
    chartLabels:Array<string> = new Array<string>();
    chartData:Array<number> = new Array<number>();
    counter:Array<number> = new Array<number>();
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