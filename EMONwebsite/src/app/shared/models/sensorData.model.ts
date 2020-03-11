import {Deserializable} from "./deserializable.model";

export class SensorData {
    id: number;
    uuid: number;
    name: string;
    watt: number;
    totalEnergyUse: number;
    returnedEnergy: number;

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }
  }