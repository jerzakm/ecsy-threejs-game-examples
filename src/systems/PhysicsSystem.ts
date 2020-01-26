import { System } from "ecsy";
import { Velocity } from "../components/Velocity";
import { Position } from "../components/Position";
import { Body, Engine, World, Pairs, } from "matter-js";

export class PhysicsSystem extends System {
  engine?: Engine
  world?: World
  init() {
    this.engine = Engine.create()
    this.world = this.engine.world
  }

  execute(delta: number, time: number) {
    if (this.engine) {
      Engine.update(this.engine, delta)
    }
  }
}
