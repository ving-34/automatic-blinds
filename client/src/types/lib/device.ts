import { Entity } from "./entity";

export interface Device extends Entity {
  name?: string;
  type?: string;
}
