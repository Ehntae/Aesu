import { UUID } from "angular2-uuid";
import { IBaseComponent } from "../components/BaseComponent";
import { IBaseEntity } from "../entities/BaseEntity";
import astd from "../framework/utility/astd";
import * as exceptions from "../framework/utility/exceptions";


// Locally typedef long hashmap templatic type
type EntityUUID 	= string;
type EntityClass	= string;

type EntityList 	= astd.IHMap<EntityUUID, IBaseComponent>;
type EntityListsMap = astd.IHMap<EntityClass, EntityList>;


export class EntityHandler {

	private static _instantiated = false;
	private static _instance:EntityHandler;

	private _entityListsMap:EntityListsMap;


	public constructor() {
		if (EntityHandler._instantiated)
			throw exceptions.exclusiveInstance;
			
		this._entityListsMap = new astd.HMap<EntityClass, astd.IHMap<EntityUUID, IBaseComponent>>();
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

	private _getEntityList(entityClass:EntityClass):EntityList {
		return this._entityListsMap.get(entityClass);
	}


	private _setEntity(entityClass:EntityClass, entityUUID:EntityUUID, entity:IBaseEntity):void {
		this._getEntityList(entityClass).set(entityUUID, entity);
	}
	
	private _createEntityList(entityClass:EntityClass):void {
		this._entityListsMap.set(entityClass, new astd.HMap<EntityUUID, IBaseEntity>());
	}

	public registerEntity(entityClass:EntityClass, entity:IBaseEntity):string {
		let id;
		
		if (!this._entityClassExists(entityClass))
			this._createEntityList(entityClass);
		
		do id = UUID.UUID();
		// If UUID collision: Regenerate & check until unique
		while (this._getEntityList(entityClass).containsKey(id));
			
		
		this._setEntity(entityClass, id, entity);

		console.log(`Entity self-registered: $${entityClass} - #${id}`);
		
		return id;
	}
	
	
	private _getEntityListsMap():EntityListsMap {
		return this._entityListsMap;
	}
	
	
	private _entityClassExists(entityClass:EntityClass):boolean {
		return this._getEntityListsMap().containsKey(entityClass);
	}


	public getEntity(entityClass:EntityClass, entityUUID:EntityUUID):IBaseEntity {
		if (this._entityClassExists(entityClass))
			if (this._getEntityList(entityClass).containsKey(entityUUID))
				return this._getEntityList(entityClass).get(entityUUID);
				
		throw new Error(exceptions.undefinedEntity);
	}
	
	
	public getEntitiesOfClass(entityClass:EntityClass):IBaseEntity[] {
		
		let entities:IBaseEntity[] = new Array<IBaseEntity>();
		
		if (this._entityClassExists(entityClass))
			for (let entityUUID of this._getEntityList(entityClass).getKeys())
				entities.push(this.getEntity(entityClass, entityUUID));
		
		return entities;
	}
}

