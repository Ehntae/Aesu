import { Playable } from "../components/Playable";
import { ComponentHandler } from "../systems/ComponentHandler";
import { RenderableEntity, IRenderableEntity } from "./RenderableEntity";


export interface IPlayer extends IRenderableEntity {}


export class Player extends RenderableEntity implements IPlayer {
	
	public constructor() {
		super(Player.name);
		
		let id = this.getId();
		ComponentHandler.getInstance().registerComponent("Playable", new Playable(id));
	}
	
}
