import {SensorData} from "./sensorData.model";
import {Deserializable} from "./deserializable.model";

export class FullMessage implements Deserializable {
  message: string;
  count: number;
  data: Array<SensorData> = [];

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}