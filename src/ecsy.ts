import * as Stats from 'stats.js'
import { World, System, TagComponent, enableRemoteDevtools } from 'ecsy'
import { RendererSystemOptions, RendererSystem } from './systems/RendererSystem';
import { MovableSystem } from './systems/MovableSystem';
import { Velocity } from './components/Velocity';
import { Shape } from './components/Shape';
import { Position } from './components/Position';
import { Renderable } from './components/Renderable';
import { Scene, Color, PerspectiveCamera, Points, PointsMaterial, SphereBufferGeometry, AmbientLight } from 'three';
import { Box } from './components/Box';

const stats = new Stats.default()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const NUM_ELEMENTS = 1000;
const SPEED_MULTIPLIER = 0.1;
const SHAPE_SIZE = 20;
const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;

export const scene = new Scene()
scene.background = new Color('rgb(240,240,240)')
export const camera = new PerspectiveCamera(30, innerWidth / innerHeight, 0.1, 10000);
const ambientLight = new AmbientLight()
ambientLight.intensity = 0.7
scene.add(ambientLight)

camera.position.set(0, 0, 1000);

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

window.addEventListener('resize', () => {
  canvasWidth = window.innerWidth
  canvasHeight = window.innerHeight;
}, false);

export const options = {
  canvasWidth,
  canvasHeight,
  SHAPE_HALF_SIZE,
  SHAPE_SIZE,
}

export const initEcsy = () => {
  enableRemoteDevtools()
  var world = new World();
  world
    .registerSystem(MovableSystem)
    .registerSystem(RendererSystem);

  for (let i = 0; i < NUM_ELEMENTS; i++) {
    world
      .createEntity()
      .addComponent(Velocity, getRandomVelocity())
      .addComponent(Box)
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