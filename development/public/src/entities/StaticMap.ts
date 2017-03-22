import * as MapComponent from "../components/Map";
import { ComponentHandler } from "../systems/ComponentHandler";
import { BaseEntity } from "./BaseEntity";


export class StaticMap extends BaseEntity {
	
	public constructor() {
		super();
		
		let id = this.getId();
		ComponentHandler.getInstance().registerComponent("Map", new MapComponent.Map(id));
	}
	
}

