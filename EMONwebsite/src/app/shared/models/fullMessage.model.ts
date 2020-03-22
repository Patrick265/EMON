import {SensorData} from "./sensorData.model";
import {Deserializable} from "./deserializable.model";
import { IskraData } from './iskraData';

export class FullMessage implements Deserializable {
  version: boolean = true;
  message: string;
  count: number;
  data: Array<Array<SensorData>> = [];
  dataIskra: IskraData;
  position: Array<string> = new Array<string>();

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}