import { DynamicMap } from ".././entities/DynamicMap";
import { StaticMap } from "../entities/StaticMap";
import * as exceptions from "../framework/utility/exceptions";


export interface IWorldSystem {
	getDynamicMap():DynamicMap;
	setDynamicMap(map:DynamicMap):void;
	
	getStaticMap():StaticMap;
	setStaticMap(map:StaticMap):void;
}


export class WorldSystem implements IWorldSystem {

	private static _instantiated = false;
	private static _instance:WorldSystem;

	private _dynamicMap:DynamicMap;
	private _staticMap:StaticMap;


	public constructor() {
		if (WorldSystem._instantiated)
			throw exceptions.exclusiveInstance;

		this.setDynamicMap(new DynamicMap());
		this.setStaticMap(new StaticMap());
	}
	
	
	public static getInstance():WorldSystem {
		if (WorldSystem._instantiated) {
			return WorldSystem._instance;
	
		} else {
			WorldSystem._instance		= new WorldSystem();
			WorldSystem._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return WorldSystem._instance;
		}
	}
	

	// Performed on the singleton instance
	
	public getDynamicMap():DynamicMap {
		return this._dynamicMap;
	}
	
	
	public setDynamicMap(map:DynamicMap):void {
		this._dynamicMap = map;
	}
	
	
	public getStaticMap():StaticMap {
		return this._staticMap;
	}
	
	
	public setStaticMap(map:StaticMap):void {
		this._staticMap = map;
	}
	
}
