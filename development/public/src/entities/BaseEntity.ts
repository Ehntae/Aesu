import { EntityHandler } from "../systems/EntityHandler";


export interface IBaseEntity {
	setId(id:string):void;
	getId():string;
}


export abstract class BaseEntity implements IBaseEntity {

	private _id:string;

	public constructor() {
		// Register the entity to the EntityHandler for handling!
		let id:string = EntityHandler.getInstance().registerEntity(this);
		this.setId(id);
	}


	public setId(id:string):void {
		this._id = id;
	}


	public getId():string {
		return this._id;
	}

}
