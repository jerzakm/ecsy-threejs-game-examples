import { Body } from "matter-js";

export class PhysicsBody {
  value: Body
  constructor() {
    this.value = new Body()
  }
}