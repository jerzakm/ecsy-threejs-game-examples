import * as Stats from 'stats.js'
import { World, System, TagComponent, enableRemoteDevtools, Entity } from 'ecsy'
import { RendererSystemOptions, RendererSystem } from './systems/RendererSystem';
import { Renderable } from './components/Renderable';
import { Scene, Color, PerspectiveCamera, Points, PointsMaterial, SphereBufferGeometry, AmbientLight } from 'three';
import { Box } from './components/Box';
import { PhysicsSystem } from './systems/PhysicsSystem';
import { PhysicsBody } from './components/PhysicsBody';
import { Engine } from 'matter-js';
import { RenderSyncSystem } from './systems/RenderSyncSystem';

const stats = new Stats.default()
stats.showPanel(0)
document.body.appendChild(stats.dom)

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
  canvasHeight
}

export const engine = Engine.create()
const engineWorld = engine.world

const createNewBody = (world: World) => {
  world
    .createEntity()
    .addComponent(Box)
    .addComponent(PhysicsBody)
    .addComponent(Renderable)
}

export const initEcsy = () => {
  enableRemoteDevtools()
  const world = new World();

  world
    .registerSystem(RendererSystem)
    .registerSystem(PhysicsSystem)
    .registerSystem(RenderSyncSystem)

  createNewBody(world)

  const run = () => {
    stats.begin()
    var time = performance.now();
    var delta = time - lastTime;

    world.execute(delta, time);

    lastTime = time;
    stats.end()
    requestAnimationFrame(run);
  }

  var lastTime = performance.now();
  run();
}