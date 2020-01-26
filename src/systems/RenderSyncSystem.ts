import { System, Entity } from "ecsy";
import { PhysicsBody } from "../components/PhysicsBody";
import { Box } from "../components/Box";

export class RenderSyncSystem extends System {
  // This method will get called on every frame by default
  init() {


  }

  execute(delta: number, time: number) {
    this.queries.entities.results.forEach((entity: Entity) => {
      const body = entity.getComponent(PhysicsBody)
      const pPos = body.value.position
      const renderBod = entity.getMutableComponent(Box)
      renderBod.box.position.set(pPos.x, -pPos.y, 0)
    })
  }
}

RenderSyncSystem.queries = {
  entities: {
    components: [PhysicsBody, Box]
  }
}