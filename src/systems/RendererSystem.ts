import { System } from "ecsy";
import { Shape } from "../components/Shape";
import { Renderable } from "../components/Renderable";
import { Position } from "../components/Position";
import { options } from "../ecsy";

export interface RendererSystemOptions {
  ctx: CanvasRenderingContext2D
  canvasWidth: number
  canvasHeight: number
  SHAPE_HALF_SIZE: number
  SHAPE_SIZE: number
}

export class RendererSystem extends System {
  // This method will get called on every frame by default

  execute(delta: number, time: number) {

    const { ctx, canvasWidth, canvasHeight, SHAPE_HALF_SIZE, SHAPE_SIZE } = options

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    //ctx.globalAlpha = 0.6;

    for (const entity of this.queries.renderables.results) {
      var shape = entity.getComponent(Shape);
      var position = entity.getComponent(Position);
      if (shape.primitive === 'box') {
        this.drawBox(position, ctx, SHAPE_HALF_SIZE, SHAPE_SIZE);
      } else {
        this.drawCircle(position, ctx, SHAPE_HALF_SIZE);
      }
    }
  }

  drawCircle(position: Position, ctx: CanvasRenderingContext2D, SHAPE_HALF_SIZE: number) {
    ctx.fillStyle = "#888";
    ctx.beginPath();
    ctx.arc(position.x, position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#222";
    ctx.stroke();
  }

  drawBox(position: { x: number; y: number; }, ctx: CanvasRenderingContext2D, SHAPE_HALF_SIZE: number, SHAPE_SIZE: number) {
    ctx.beginPath();
    ctx.rect(position.x - SHAPE_HALF_SIZE, position.y - SHAPE_HALF_SIZE, SHAPE_SIZE, SHAPE_SIZE);
    ctx.fillStyle = "#f28d89";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#800904";
    ctx.stroke();
  }
}

RendererSystem.queries = {
  renderables: { components: [Renderable, Shape] }
}