import { System } from "ecsy";
import { Body, Engine, World, Pairs, } from "matter-js";
import { engine } from "../ecsy";

export class PhysicsSystem extends System {
  engine?: Engine
  world?: World
  init() {
    this.engine = engine
    this.world = this.engine.world
  }

  execute(delta: number, time: number) {
    if (this.engine) {
      Engine.update(this.engine, delta)
    }
  }
}
