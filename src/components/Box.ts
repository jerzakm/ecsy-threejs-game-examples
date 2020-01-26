import { Mesh, BoxGeometry, MeshPhongMaterial, Color } from "three";
import { scene } from "../ecsy";

export class Box {
  box: Mesh
  constructor() {
    this.box = new Mesh()
    this.box.geometry = new BoxGeometry(32, 32, 32)
    const color = new Color(`rgb(${(Math.random() * 255).toFixed(0)},${(Math.random() * 255).toFixed(0)},${(Math.random() * 255).toFixed(0)})`)
    this.box.material = new MeshPhongMaterial({ color });
    scene.add(this.box)
  }
}