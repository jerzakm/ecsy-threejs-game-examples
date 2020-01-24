import * as Stats from 'stats.js'
import { World, System, TagComponent } from 'ecsy'
import { RendererSystemOptions, RendererSystem } from './systems/RendererSystem';
import { MovableSystem } from './systems/MovableSystem';
import { Velocity } from './components/Velocity';
import { Shape } from './components/Shape';
import { Position } from './components/Position';
import { Renderable } from './components/Renderable';

const stats = new Stats.default()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const NUM_ELEMENTS = 600;
const SPEED_MULTIPLIER = 0.1;
const SHAPE_SIZE = 20;
const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;

let canvas = document.createElement('canvas')
document.body.appendChild(canvas)
let canvasWidth = canvas.width = window.innerWidth;
let canvasHeight = canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

window.addEventListener('resize', () => {
  canvasWidth = canvas.width = window.innerWidth
  canvasHeight = canvas.height = window.innerHeight;
}, false);

export const options = {
  ctx,
  canvasWidth,
  canvasHeight,
  SHAPE_HALF_SIZE,
  SHAPE_SIZE,
}

export const initEcsy = () => {
  if (ctx) {

    var world = new World();
    world
      .registerSystem(MovableSystem)
      .registerSystem(RendererSystem);

    for (let i = 0; i < NUM_ELEMENTS; i++) {
      world
        .createEntity()
        .addComponent(Velocity, getRandomVelocity())
        .addComponent(Shape, getRandomShape())
        .addComponent(Position, getRandomPosition(options))
        .addComponent(Renderable)
    }

    const run = () => {
      stats.begin()
      // Compute delta and elapsed time
      var time = performance.now();
      var delta = time - lastTime;

      // Run all the systems
      world.execute(delta, time);

      lastTime = time;
      stats.end()
      requestAnimationFrame(run);
    }

    var lastTime = performance.now();
    run();
  }


}

function getRandomVelocity() {
  return {
    x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
    y: SPEED_MULTIPLIER * (2 * Math.random() - 1)
  };
}

function getRandomPosition({ canvasWidth, canvasHeight }: RendererSystemOptions) {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight
  };
}

function getRandomShape() {
  return {
    primitive: Math.random() >= 0.5 ? 'circle' : 'box'
  };
}