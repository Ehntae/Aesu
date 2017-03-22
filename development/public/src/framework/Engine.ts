import * as $ from "jquery";
import { AuthSystem } from "../systems/AuthSystem";
import { CanvasSystem } from "../systems/CanvasSystem";
import { GUISystem } from "../systems/GUISystem";
import { GameSystem } from "../systems/GameSystem";
import { HookHandler } from "../systems/HookHandler";
import { InputHandler } from "../systems/InputHandler";
import { NetworkHandler } from "../systems/NetworkHandler";
import { RenderSystem } from "../systems/RenderSystem";
import { ADraw } from "./utility/ADrawLib";
import * as config from "./utility/config";
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
	private _frameUpdateTimer:number;

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
		this._state = state;

		HookHandler.getInstance().triggerEvent("EngineStateChange", this.getState(), state);
	}


	public getState():ENGINE_STATES {
		return this._state;
	}


	public setAppTitle(title:string) {
		$(document).prop("title", `${config.APP_NAME} | ${title}`);
	}


	public initialise():void {

		console.log("Engine initialising");
		
		let hookHandler = HookHandler.getInstance();
		hookHandler.triggerEvent("EngineInit");


		// Set title to login screen
		this.setAppTitle("Login");
		console.log("Setting title to login mode");



		// , () => {
		// 	// Get app version from server
		// 	client.record.snapshot("meta", () => {
		// 		client.record.snapshot("metadata", (error:string, data:any) => {
		// 			if (error === undefined)
		// 				throw new Error(error);
		// 			this.setAppTitle(data.appVersion);
		// 		});
		// 	});
		// });


		// Initialise canvas and rendering
		let guiSystem		= GUISystem.getInstance();
		let appContainer	= guiSystem.createContainer();
		let appCanvas		= guiSystem.createCanvas();


		// Append canvas to DOM
		appContainer.appendChild(appCanvas);
		let body = document.getElementsByTagName("body")[0];
		(<HTMLElement> body).appendChild(appContainer);


		// Set app canvas to generated one
		let canvasSystem	= CanvasSystem.getInstance();
		canvasSystem.setCanvas(<HTMLCanvasElement> appCanvas);
		canvasSystem.loadContext(); // Load its context


		// Initialise all subsystems
		this.initialiseSubsystems();

	}


	public initialiseSubsystems() {
		let authSystem = AuthSystem.getInstance();
		authSystem.initialise();
		authSystem.login(authSystem.getUId(), "");
		
		let networkHandler = NetworkHandler.getInstance();
		networkHandler.initialise();
		
		let renderSystem = RenderSystem.getInstance();
		renderSystem.initialise();
		
		let inputHandler = InputHandler.getInstance();
		inputHandler.initialise();
		
		let canvasSystem = CanvasSystem.getInstance();		
		let draw = ADraw.getInstance();
		draw.setRenderTarget(canvasSystem.getContext());
		
		let gameSystem = GameSystem.getInstance();
		gameSystem.initialise();

	}


	public run():void {
		console.log("Engine running");

		this.setState(ENGINE_STATES.RUNNING);

		let updateRate = 30;    // Updates per second (Might be useless?)
		// let frameRate   = 60;    // Frames per second


		this._updateTimer = window.setInterval(() => {
			// if (this.getState() !== ENGINE_STATES.STOPPED)
			this.update();
		}, 1000 / updateRate);

		
		let requestFrameLoop = (() => {
			HookHandler.getInstance().triggerEvent("EngineFrameUpdate");
			this._frameUpdateTimer = requestAnimationFrame(requestFrameLoop);
		});
		
		requestAnimationFrame(requestFrameLoop);
	}


	public quit():void {
		console.log("Engine quitting");
		HookHandler.getInstance().triggerEvent("EngineQuitting");
	}


	public update():void {
		this._updates++;

		// Trigger hookable update event
		HookHandler.getInstance().triggerEvent("EngineUpdate");

	}

}
