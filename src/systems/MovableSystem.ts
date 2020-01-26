import { System } from "ecsy";
import { Velocity } from "../components/Velocity";
import { Position } from "../components/Position";
import { RendererSystemOptions } from "./RendererSystem";
import { options } from "../ecsy";
import { Box } from "../components/Box";

export class MovableSystem extends System {

  execute(delta: number, time: number) {
    const { canvasWidth, canvasHeight, SHAPE_HALF_SIZE } = options

    this.queries.moving.results.forEach(entity => {
      var velocity = entity.getComponent(Velocity);
      var position = entity.getMutableComponent(Position);
      var box = entity.getMutableComponent(Box);
      position.x += velocity.x * delta;
      position.y += velocity.y * delta;
      if (position.x > canvasWidth + SHAPE_HALF_SIZE) position.x = - SHAPE_HALF_SIZE;
      if (position.x < - SHAPE_HALF_SIZE) position.x = canvasWidth + SHAPE_HALF_SIZE;
      if (position.y > canvasHeight + SHAPE_HALF_SIZE) position.y = - SHAPE_HALF_SIZE;
      if (position.y < - SHAPE_HALF_SIZE) position.y = canvasHeight + SHAPE_HALF_SIZE;

      box.box.position.set(position.x, -position.y, 0)
    })
  }
}

MovableSystem.queries = {
  moving: {
    components: [Velocity, Position, Box]
  }
}