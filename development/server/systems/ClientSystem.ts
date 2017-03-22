import * as exception from "../framework/utility/exceptions";
import { Client } from './../entities/Client';
import { HookHandler } from './HookHandler';


export class ClientSystem {

	private static _instantiated = false;
	private static _initialised  = false;
	private static _instance:ClientSystem;


	private constructor() {
		if (ClientSystem._instantiated)
			throw new Error(exception.exclusiveInstance);

		// Singleton initialisation
	}

	public static getInstance():ClientSystem {
		if (ClientSystem._instantiated) {
			if (!ClientSystem._initialised)
				throw new Error(exception.uninitialisedSystem);
				
			return ClientSystem._instance;
		} else {
			ClientSystem._instance		= new ClientSystem();
			ClientSystem._instantiated	= true;

			console.log("Singleton instance was JIT generated!");
			
			return ClientSystem._instance;
		}
	}

	// Singleton methods below
	createClient(username:string):void {
		let client = new Client();
		client.setClientUsername(username);
		
		HookHandler.getInstance().triggerEvent("ClientEntityCreated", username);
		console.log(`Created Client (${username}) with ComponentUId (${client.getId()})`);
	}	
	
	
	initialise() {
		ClientSystem._initialised = true; // TODO: INITIALISE 
		
		let hookHandler = HookHandler.getInstance();
		
		hookHandler.setHook("ClientLoggedIn", "CreateClientEntity", (username:string) => {
			this.createClient(username);
		});
	}
	
}
