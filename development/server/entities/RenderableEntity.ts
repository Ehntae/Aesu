import { Renderer } from "../components/Renderer";
import { Transform } from "../components/Transform";
import { ComponentHandler } from "../systems/ComponentHandler";
import { BaseEntity, IBaseEntity } from "./BaseEntity";


export interface IRenderableEntity extends IBaseEntity {}


export abstract class RenderableEntity extends BaseEntity implements IRenderableEntity {
	
	public constructor(entityClass:string) {
		super(entityClass);
		
		let id:string = this.getId();
		ComponentHandler.getInstance().registerComponent("Renderer", new Renderer(id));
		ComponentHandler.getInstance().registerComponent("Transform", new Transform(id));
	}
	
}
