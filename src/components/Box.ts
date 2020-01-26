import { Mesh, BoxGeometry, MeshPhongMaterial, Color, Vector2 } from "three";
import { scene } from "../ecsy";

export class Box {
  box: Mesh
  size: number
  position: { x: number, y: number }
  constructor() {
    this.size = 32
    this.position = { x: 0, y: 0 }
    this.box = new Mesh()
    this.box.geometry = new BoxGeometry(this.size, this.size, this.size)
    const color = new Color(`rgb(${(Math.random() * 255).toFixed(0)},${(Math.random() * 255).toFixed(0)},${(Math.random() * 255).toFixed(0)})`)
    this.box.material = new MeshPhongMaterial({ color });
    this.box.position.set(this.position.x, this.position.y, 0)
    scene.add(this.box)
  }
}