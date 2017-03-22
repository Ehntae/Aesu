import * as gameloop from "node-gameloop";
import { AuthSystem } from "../systems/AuthSystem";
import { GameSystem } from "../systems/GameSystem";
import { HookHandler } from "../systems/HookHandler";
import { NetworkHandler } from "../systems/NetworkHandler";
import { MapSystem } from './../systems/MapSystem';
import * as exceptions from "./utility/exceptions";


enum ENGINE_STATES {
	STOPPED,
	MAIN_MENU,
	RUNNING
}


export class Engine {

	private static _instantiated = false;
	private static _instance:Engine;
	
	public static STATES = ENGINE_STATES;
	

	private _state:ENGINE_STATES;
	private _updates:number;
	private _updateTimer:number;
	
	
	public constructor() {
		if (Engine._instantiated) 
			throw exceptions.exclusiveInstance;
		
		// Set update counter since start
		this._updates = 0;
	}
	
	
	public static getInstance():Engine {
		if (Engine._instantiated) {
			return Engine._instance;
	
		} else {
			Engine._instance		= new Engine();
			Engine._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return Engine._instance;
		}
	}


	// Performed upon the single instance:
	
	public setState(state:ENGINE_STATES):void {
		console.log(`Setting Engine state from ${this._state} to ${state}`);
		
		HookHandler.getInstance().triggerEvent("EngineStateChange", this.getState(), state);
		
		this._state = state;
	}
	
	
	public getState():ENGINE_STATES {
		return this._state;
	}

	
	public initialise():void {
		console.log("Engine initialising");
		
		// let logger    		= Logger.getInstance();
		// let authSystem		= AuthSystem.getInstance();
		let hookHandler = HookHandler.getInstance();
		
		hookHandler.triggerEvent("EngineInit");
		
		
		// Initialise all subsystems
		this.initialiseSubsystems();
		
	}
	
	
	initialiseSubsystems() {
		let authSystem = AuthSystem.getInstance();
		authSystem.initialise();
		
		
		let networkHandler = NetworkHandler.getInstance();
		networkHandler.initialise();

		
		let gameSystem = GameSystem.getInstance();
		gameSystem.initialise();
		
		
		let mapSystem = MapSystem.getInstance();
		mapSystem.initialise();
		
	}


	public run():void {
		console.log("Engine running");
		
		this.setState(ENGINE_STATES.RUNNING);
		
		let updateRate = 30;
		
		this._updateTimer = gameloop.setGameLoop((deltaTime:number) => {
			// if (this.getState() !== ENGINE_STATES.STOPPED)
			this.update(deltaTime);
		}, 1000 / updateRate);

	}
	
	
	public quit():void {
		console.log("Engine quitting");
		HookHandler.getInstance().triggerEvent("EngineQuitting");
	}
	
	
	public update(deltaTime:number):void {
		this._updates++;
		
		// Trigger engine update event
		HookHandler.getInstance().triggerEvent("EngineUpdate", deltaTime);
		
	}

}
