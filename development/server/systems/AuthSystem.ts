import * as deepstream from "deepstream.io-client-js";
import * as exception from "../framework/utility/exceptions";
import { HookHandler } from "./HookHandler";
// tslint:disable-next-line:no-require-imports
import dsServer = require("deepstream.io");


// Setup deepstream client & login
const DS_HOST = "localhost:6020";


/**
 * 
 * @class AuthSystem
 */
export class AuthSystem {

	private static _instantiated = false;
	private static _instance:AuthSystem;
	
	private deepstreamClient:deepstreamIO.Client;
	
	/**
	 * Creates an instance of AuthSystem.
	 * 
	 * 
	 * @memberOf AuthSystem
	 */
	private constructor() {
		if (AuthSystem._instantiated)
			throw exception.exclusiveInstance;

		// Singleton initialisation
	}

	/**
	 * 
	 * 
	 * @static
	 * @returns {AuthSystem}
	 * 
	 * @memberOf AuthSystem
	 */
	public static getInstance():AuthSystem {
		if (AuthSystem._instantiated) {
			return AuthSystem._instance;

		} else {
			AuthSystem._instance		= new AuthSystem();
			AuthSystem._instantiated	= true;

			console.log("Singleton instance was JIT generated!");
			
			return AuthSystem._instance;
		}
	}


	// Singleton methods below
	
	initialise():void {
		
		// Start up Deepstream server without config
		new dsServer({
			showLogo: false
		}).start(); // TODO: Create DS Server config
		
		// Connect to DS Server
		this.deepstreamClient = deepstream(DS_HOST);
		
		// Login to DS Server
		this.login("SERVER", this.deepstreamClient.getUid());
	}
	
	
	/**
	 * 
	 * @param {string} username
	 * @param {string} password
	 * 
	 * @memberOf AuthSystem
	 */
	public login(username:string, password:string, callback?:Function) {
		console.log(`Attempting to log in using (${username}, ${password})`);
		
		// Trigger login event
		// HookHandler.getInstance().triggerEvent("ClientLoginAttempt", username, password);		

		// See if this shorthand notation actually works.
		this.deepstreamClient.login({username, password}, (success:boolean) => {
			if (success) {
				console.log("Authentification:", success);
				
				HookHandler.getInstance().triggerEvent("ClientLoggedIn", username);		
				
				if (callback !== undefined)
					callback();
			} else {
				console.log("Authentification failed TODO: Handle error");
			}
		});
	}
	
	
	/**
	 * 
	 * 
	 * @returns {deepstreamIO.Client}
	 * 
	 * @memberOf AuthSystem
	 */
	public getClient():deepstreamIO.Client {
		return this.deepstreamClient;
	}
	
}
