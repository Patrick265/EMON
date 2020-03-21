import {Deserializable} from "./deserializable.model";

export class SensorData {
    id: number;
    watt: number;
    totalEnergyUse: number;
    returnedEnergy: number;
    time: string;
    temperature: number;
    humidity: number;
    wH: number;
    signature: string;

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }
  }