import { Renderer } from "../components/Renderer";
import { Transform } from "../components/Transform";
import { ComponentHandler } from "../systems/ComponentHandler";
import { BaseEntity } from "./BaseEntity";


export class RenderableEntity extends BaseEntity {
	
	public constructor() {
		super();
		
		let id:string = this.getId();
		ComponentHandler.getInstance().registerComponent("Renderer", new Renderer(id));
		ComponentHandler.getInstance().registerComponent("Transform", new Transform(id));
	}
	
}
