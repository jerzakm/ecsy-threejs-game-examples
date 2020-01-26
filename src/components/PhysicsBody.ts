import { Body, Bodies, World } from "matter-js";
import { Vector2 } from "three";
import { engine } from "../ecsy";

export class PhysicsBody {
  value: Body
  position: { x: number, y: number }
  size: number
  constructor() {
    this.size = 32
    this.position = { x: 0, y: 0 }
    this.value = Bodies.rectangle(this.position.x, this.position.y, this.size, this.size)
    World.add(engine.world, this.value)
  }
}