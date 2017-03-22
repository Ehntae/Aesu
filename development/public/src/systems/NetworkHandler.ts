import * as exception from "../framework/utility/exceptions";
import { AuthSystem } from "./AuthSystem";


export class NetworkHandler {

	private static _instantiated = false;
	private static _instance:NetworkHandler;

	private _dsClient:deepstreamIO.Client;

	private constructor() {
		if (NetworkHandler._instantiated)
			throw exception.exclusiveInstance;

		// Singleton initialisation

	}


	public static getInstance():NetworkHandler {
		if (NetworkHandler._instantiated) {
			return NetworkHandler._instance;
		} else {
			NetworkHandler._instance = new NetworkHandler();
			NetworkHandler._instantiated = true;

			console.log("Singleton instance was JIT generated");
		   
			return NetworkHandler._instance;
		}
	}

	// Singleton methods below
	initialise() {
		this._dsClient = AuthSystem.getInstance().getClient();
	}
	
	emitEvent(eventName:string, data?:any) {
		this._dsClient.event.emit(eventName, data);
	}
	
	subscribeToEvent1(eventName:string, callback:Function) {
		this._dsClient.event.subscribe(eventName, callback);
	}
	
	subscribeToEvent2(eventName:string, callback:Function) {
		this._dsClient.record.snapshot(eventName, callback);
	}
	
}
