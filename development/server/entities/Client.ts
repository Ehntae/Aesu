import { BaseEntity, IBaseEntity } from './BaseEntity';


export interface IClient extends IBaseEntity {
	getClientUsername():string;
	setClientUsername(username:string):void;
}


export class Client extends BaseEntity implements IClient {
	
	private _clientUsername:string;
	
	public constructor() {
		super(Client.name);
	}
	
	getClientUsername():string {
		return this._clientUsername;
	}
	
	setClientUsername(username:string):void {
		this._clientUsername = username;
	}
	
	
}
