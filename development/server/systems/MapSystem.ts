import * as exception from "../framework/utility/exceptions";
import { IMap } from './../components/Map';
import { DynamicMap } from './../entities/DynamicMap';
import { StaticMap } from './../entities/StaticMap';
import * as config from "./../framework/utility/config";
import { ComponentHandler } from './ComponentHandler';


export class MapSystem {	

	private static _instantiated = false;
	private static _instance:MapSystem;

	private _dynamicMapId:string;
	private _staticMapId:string;

	private constructor() {
		if (MapSystem._instantiated)
			throw exception.exclusiveInstance;

		// Singleton initialisation

	}


	public static getInstance():MapSystem {
		if (MapSystem._instantiated) {
			return MapSystem._instance;
		} else {
			MapSystem._instance		= new MapSystem();
			MapSystem._instantiated	= true;
			console.log("Singleton instance was JIT generated!");
			
			return MapSystem._instance;
		}
	}
	
	// Singleton methods below
	initialise() {
		console.log("Setting up Dynamic and Static maps");
		
		this._dynamicMapId 	= new DynamicMap().getId();
		this._staticMapId 	= new StaticMap().getId();
		
		
		let componentHandler = ComponentHandler.getInstance();
		let dmap = <IMap> componentHandler.getComponent("Map", this._dynamicMapId);
		let smap = <IMap> componentHandler.getComponent("Map", this._staticMapId);
		
		
		for (let x = 0; x < config.MAP_WIDTH; x++)
			for (let y = 0; y < config.MAP_HEIGHT; y++)
				dmap.setTile(x, y, '_'); // TODO: value should be entity id
		
		
		for (let x = 0; x < config.MAP_HEIGHT; x++)
			for (let y = 0; y < config.MAP_WIDTH; y++)
				smap.setTile(x, y, '_');
	}

	getDynamicMapUUID():string {
		return this._dynamicMapId;
	}
	
	getStaticMapUUID():string {
		return this._staticMapId;
	}

}
