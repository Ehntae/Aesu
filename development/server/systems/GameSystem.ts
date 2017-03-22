import * as exception from "../framework/utility/exceptions";
import { IMap } from './../components/Map';
import { IPlayable } from './../components/Playable';
import { IClient } from './../entities/Client';
import { IPlayer, Player } from './../entities/Player';
import { ComponentHandler } from './ComponentHandler';
import { EntityHandler } from './EntityHandler';
import { HookHandler } from "./HookHandler";
import { MapSystem } from './MapSystem';


enum KEY_CODES {
	A = 65,
	D = 68,
	S = 83,
	W = 87,
	SHIFT = 16
};


export class GameSystem {

	private static _instantiated = false;
	private static _instance:GameSystem;
	
	private constructor() {
		if (GameSystem._instantiated)
			throw new Error(exception.exclusiveInstance);

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
	createPlayer(clientUUID:string):void {
		// need to create a player and store it using clientuid somehow
		// Get username from entity
		
		let playerUUID = new Player().getId();
		
		let dmapUUID = MapSystem.getInstance().getDynamicMapUUID();
		let dmap 	 = <IMap> ComponentHandler.getInstance().getComponent("Map", dmapUUID);
		
		HookHandler.getInstance().triggerEvent("PlayerEntityCreated", playerUUID);
		dmap.setTile(10, 10, playerUUID);
	}
	
	
	public initialise() {
		
		let hookHandler = HookHandler.getInstance();


		// Update me on EngineUpdate
		hookHandler.setHook("EngineUpdate", "GameUpdate", this.update);
		
		hookHandler.setHook("ClientEntityCreated", "CreatePlayer", (clientEntityUUID:string) => {
			
			// spawn points
			// create to dynamic map
			
			
			let client = <IClient> EntityHandler.getInstance().getEntity("Client", clientEntityUUID);
			let username = client.getClientUsername();
			
			if (username !== "SERVER")
				this.createPlayer(clientEntityUUID);
		});
		
		
		/*
		
			Players
				Entity-UUID
				
				Components:
					Playable
					Renderable
					Transform


			Client
				Entity-UUID
				Username
				
				Components:
					
					
		
		*/
		
		/*
			// Get clients' inputs
			let pos = new astd.Vector2d(0, 0);
			NetworkHandler.getInstance().subscribeToEvent("SyncPlayerInputs", (data:any) => {
				
				// let keyCodes:number[] = data[0];
				// let values:boolean[]  = data[1];
				
				let keys:number[] 	 = <number[]>  data[0];
				let values:boolean[] = <boolean[]> data[1];
				
				let pairs = new Array<(number[] | boolean[])>();
				
				// tslint:disable-next-line:prefer-for-of
				for (let i = 0; i < keys.length; i++) {
					let pair = [keys[i], values[i]];
					pairs.push(<any> pair);
				}
				
				let map = new Map<number, boolean>(<any> pairs);
				
				const speed = 1;
				
				if (map.get(KEY_CODES.A))
					pos.x -= speed;
					
				if (map.get(KEY_CODES.D))
					pos.x += speed;
					
				if (map.get(KEY_CODES.W))
					pos.y += speed;
					
				if (map.get(KEY_CODES.S))
					pos.y -= speed;
					
				console.log();
				console.log(pos);
				console.log();
				
				
			});
		*/
	}
	
	public update() {
		// console.log("Updating game system");
		
		let players = <IPlayer[]> EntityHandler.getInstance().getEntitiesOfClass("Player");
		
		for (let player of players) {
			let playerUUID = player.getId();
			
			let playable = ComponentHandler.getInstance().getComponent("Playable", playerUUID) as IPlayable;
			
			if (playable.getInputs().get(KEY_CODES.S))
				console.log(`Player #${playerUUID} pressed S!`);
			
		}
		
	}
	
}



/*

AuthSystem:
	Events:
		[ClientLoggedIn] : Client logged in successfully
		
		
GameSystem:
	Hooks:
		[ClientEntityCreated]: CreatePlayer =>
			- Create player entity


ClientSystem:
	Events:
		[ClientEntityCreated] : Client entity was created
		
	Hooks:
		[ClientLoggedIn]: CreateClient =>
			- Create client entity
			- Trigger Event: [ClientEntityCreated]
		
*/
