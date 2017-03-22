import { Map } from "../components/Map";
import { ComponentHandler } from "../systems/ComponentHandler";
import { BaseEntity } from "./BaseEntity";


export class DynamicMap extends BaseEntity {
	
	public constructor() {
		super(DynamicMap.name);
		
		let id = this.getId();
		ComponentHandler.getInstance().registerComponent("Map", new Map(id));
	}
	
}
