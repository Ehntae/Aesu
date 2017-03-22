import { Playable } from "../components/Playable";
import { Rect } from "../components/RenderableShapes";
import { Transform } from "../components/Transform";
import { Player } from "../entities/Player"; 
import astd from "../framework/utility/astd";
import * as exception from "../framework/utility/exceptions";
import { Renderer } from "./../components/Renderer";
import { ComponentHandler } from "./ComponentHandler";
import { HookHandler } from "./HookHandler";
import { NetworkHandler } from './NetworkHandler';

export class GameSystem {

	private static _instantiated = false;
	private static _instance:GameSystem;

	private _playerId:string;


	private constructor() {
		if (GameSystem._instantiated)
			throw exception.exclusiveInstance;

		// Singleton initialisation

	}


	public static getInstance():GameSystem {
		if (GameSystem._instantiated) {
			return GameSystem._instance;
	
		} else {
			GameSystem._instance		= new GameSystem();
			GameSystem._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return GameSystem._instance;
		}
	}


	// Singleton methods below
	public createPlayer() {
		let hookHandler = HookHandler.getInstance();
		
		// tslint:disable-next-line:no-unused-new
		this._playerId = new Player().getId();
		
		hookHandler.triggerEvent("PlayerCreated", this._playerId);
	}
	
	
	public initialise() {
		let hookHandler      = HookHandler.getInstance();
		// let componentHandler = ComponentHandler.getInstance();
		
		// Set player position
		// hookHandler.setHook("PlayerCreated", "SpawnPlayerPosition", (playerId:string) => {
			
		// 	// Get useful components
		// 	let renderer   	= <Renderer>  componentHandler.getComponent("Renderer", playerId);
		// 	let renderable 	= renderer.getRenderable();
		// 	let transform  	= <Transform> componentHandler.getComponent("Transform", playerId);
 
		// 	// Set player start position
		// 	transform.setScale(new astd.Vector2d(10, 4));
		// 	transform.setPosition(new astd.Vector2d(100, 100));
					

		// 	// Core 
		// 	let core = renderable.getCorePoint();
		// 	core.setColor(new astd.Color(0, 0, 0));
			
		// 	// Player body
		// 	let playerBody = new Rect(-10, -50, 20, 50);
		// 	playerBody.setColor(new astd.Color(255, 150, 225));
			
		// 	renderable.setRect(playerBody);
			
		// });
		

		hookHandler.setHook("EngineUpdate", "GameSystemUpdate", () => this.update());
		
	}
	
	public update() {
		// console.log("Updating game system");
		
		if (this._playerId !== undefined) {
			let playable = <Playable> ComponentHandler.getInstance().getComponent("Playable", this._playerId);
			
			let inputs = playable.getInputs();
			NetworkHandler.getInstance().emitEvent("SyncPlayerInputs", [inputs.getKeys(), inputs.getValues()]);
		}
	}
	
}
