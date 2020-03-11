import {Deserializable} from "./deserializable.model";

export class SensorData {
    id: number;
    watt: number;
    totalEnergyUse: number;
    returnedEnergy: number;
    time: string;
    temperature: number;
    humidity: number;

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }
  }