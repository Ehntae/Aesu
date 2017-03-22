import astd from "../framework/utility/astd";
import * as config from "../framework/utility/config";
import * as exceptions from "../framework/utility/exceptions";


/*
	callbacks = {
		eventName = {
			hookUId = function(){...}
		}
	}

	callbacks = Map<Map<string>>
	eventName = Map<string>

	eventHooks = Map< Map<Function[]> >
	event = Map<Function>
*/


export class HookHandler {

	private static _instantiated = false;
	private static _instance:HookHandler;
	
	// private eventHooks:Map<Map<Function>>;
	private _eventHooks:astd.HMap<string, astd.HMap<string, Function>>;
	
	
	public constructor() {
		if (HookHandler._instantiated) 
			throw exceptions.exclusiveInstance;
		
		this._eventHooks = new astd.HMap<string, astd.HMap<string, Function>>();
	}
	

	public static getInstance():HookHandler {
		if (HookHandler._instantiated) {
			return HookHandler._instance;
	
		} else {
			HookHandler._instance		= new HookHandler();
			HookHandler._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return HookHandler._instance;
		}
	}


	// Performed upon the single instance:


	public setHook(eventName:string, hookUId:string, callback:Function):void {
		console.log(`Setting hook ${hookUId} on ${eventName}`);
		
		//  If the event currently isn"t registered then register it
		if (!this._eventHooks.containsKey(eventName))
			this.createEvent(eventName);
		
		// Event is 100% registered, let"s add a hook under the event
		this._eventHooks.get(eventName).set(hookUId, callback);
	}
	
	
	public removeHook(eventName:string, hookUId:string):void {
		
		console.log(`Attempting to emoving hook ${hookUId} from ${eventName}`);
		
		if (this._eventHooks.containsKey(eventName)) {
			this._eventHooks.get(eventName).remove(hookUId);
			
			console.log(`Hook removed`);
			
		} else {
			console.log(`Hook does not exist`);
			throw new Error("Tried to remove a hook that doesn't exist");
		}
	}
	
	
	public createEvent(eventName:string) {
		this._eventHooks.set(eventName, new astd.HMap<string, Function>());
	}
	
	
	/**
	 * Trigger an engine event (should be used statically)
	 * @eventName The name of the event (document on http://github.com/Aeomi/OpenSeas/wiki/Hooks)
	 */
	public triggerEvent(eventName:string, ...args:any[]):void {
		
		if (config.DEBUG_TO_TERMINAL && !eventName.toLowerCase().includes("update"))   // Do not debug any events ending in "update"
			console.log(`Attempting to trigger all callbacks on ${eventName} event`);
		
		
		// Attempt to gather the hooks under a given event 
		if (this._eventHooks.containsKey(eventName)) {
			
			let callbacks = this._eventHooks.get(eventName);
			
			
			// If there are any hooks then run them with the supplied arguments
			for (let hookUIdIter in callbacks.getKeys()) {
				let hookUId = callbacks.getKeys()[hookUIdIter];
				
				if (config.DEBUG_TO_TERMINAL && !eventName.toLowerCase().includes("update"))
					console.log(`Calling hook callback for ${hookUId}`);
				
				callbacks.get(hookUId)(...args);
			}
			
			
		}
		
	}
	
	
	public getHooks(eventName:string):astd.IHMap<string, Function> {
		return this._eventHooks.get(eventName);
	}

}
