import { System } from "ecsy";
import { options, scene, camera } from "../ecsy";
import { Scene, Color, WebGLRenderer, PerspectiveCamera } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface RendererSystemOptions {
  canvasWidth: number
  canvasHeight: number
  SHAPE_HALF_SIZE: number
  SHAPE_SIZE: number
}

export class RendererSystem extends System {
  // This method will get called on every frame by default
  renderer?: WebGLRenderer

  init() {

    const canvas = document.createElement('canvas')
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
    document.body.appendChild(canvas)

    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: canvas as HTMLCanvasElement
    });
    this.renderer.setPixelRatio(window.devicePixelRatio * 1);
    this.renderer.setSize(innerWidth, innerHeight);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();
  }

  execute(delta: number, time: number) {
    this.renderer?.render(scene, camera)

  }
}
