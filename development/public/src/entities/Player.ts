import { Playable } from "../components/Playable";
import { ComponentHandler } from "../systems/ComponentHandler";
import { RenderableEntity } from "./RenderableEntity";



export class Player extends RenderableEntity {
	
	public constructor() {
		super();
		
		let id = this.getId();
		ComponentHandler.getInstance().registerComponent("Playable", new Playable(id));
	}
	
}
