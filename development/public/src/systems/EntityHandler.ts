import { UUID } from "angular2-uuid";
import { HashMap } from "tstl";
import { IBaseComponent } from "../components/BaseComponent";
import { IBaseEntity } from "../entities/BaseEntity";
import astd from "../framework/utility/astd";
import * as exceptions from "../framework/utility/exceptions";


// Locally typedef long hashmap templatic type
type EntityId 	= string;
type EntityMap 	= astd.IHMap<EntityId, IBaseEntity>;


export class EntityHandler {

	private static _instantiated = false;
	private static _instance:EntityHandler;

	private _entityMap:EntityMap;


	public constructor() {
		if (EntityHandler._instantiated)
			throw exceptions.exclusiveInstance;
			
		this._entityMap = new astd.HMap<EntityId, IBaseComponent>();
	}


	public static getInstance():EntityHandler {
		if (EntityHandler._instantiated) {
			return EntityHandler._instance;
	
		} else {
			EntityHandler._instance		= new EntityHandler();
			EntityHandler._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return EntityHandler._instance;
		}
	}


	// Performed upon the single instance:

	private _getEntityMap():HashMap<EntityId, IBaseEntity> {
		return this._entityMap.getHashMap();
	}


	private _setEntity(id:EntityId, entity:IBaseEntity):void {
		this._getEntityMap().set(id, entity);
	}


	// private _getEntity(id:number):BaseEntity {
	//     return this._getEntityMap().get(id);
	// }


	public registerEntity(entity:IBaseEntity):string {
		let id;
		
		do
			id = UUID.UUID();
		while 
			(this._getEntityMap().has(id)); 	// If UUID collision: Regenerate & check until unique
			
		
		this._setEntity(id, entity);

		console.log(`Entity self-registered: #${id}`);
		
		return id;
	}

}

