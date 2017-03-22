import * as deepstream from "deepstream.io-client-js";
import * as exception from "../framework/utility/exceptions";


// Setup deepstream client & login
const DS_HOST:string = location.hostname + ":6020";


/**
 * 
 * 
 * @class AuthSystem
 */
export class AuthSystem {

	private static _instantiated = false;
	private static _instance:AuthSystem;
	
	private _deepstreamClient:deepstreamIO.Client;
	private _uniqueId:string;
	
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
		this._deepstreamClient = deepstream(DS_HOST);
		this._uniqueId = this._deepstreamClient.getUid();
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

		// See if this shorthand notation actually works.
		this._deepstreamClient.login({username, password}, (success:boolean, data:any) => {
			if (success) {
				console.log("Authentification sucess:", success, data);
				if (callback !== undefined)
					callback();
			} else {
				console.log("Authentification failed");
				alert(`${success} | ${data}`);
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
		return this._deepstreamClient;
	}
	
	
	public getUId():string {
		return this._uniqueId;
	}
	
}
