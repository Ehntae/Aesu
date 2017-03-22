import { IPlayable } from "../components/Playable";
import astd from "../framework/utility/astd";
import * as enumHelpers from "../framework/utility/enumHelpers";
import * as exception from "../framework/utility/exceptions";
import { CanvasSystem } from "./CanvasSystem";
import { ComponentHandler } from "./ComponentHandler";
import { HookHandler } from "./HookHandler";

// Map of key code numbers to booleans

export type InputMap = astd.ESMap<number, boolean>;

export enum KEY_CODES {
	A = 65,
	D = 68,
	S = 83,
	W = 87,
	SHIFT = 16
};


export class InputHandler {

	private static _instantiated = false;
	private static _instance:InputHandler;

	private _mousePos:astd.IVector2d;
	private _inputs:InputMap;
	

	private constructor() {
		if (InputHandler._instantiated)
			throw exception.exclusiveInstance;

		// Singleton initialisation
		this._mousePos 	= new astd.Vector2d(0, 0);
		this._inputs	= new astd.ESMap<number, boolean>();
		
		let keys = enumHelpers.enumValuesToArray(KEY_CODES);
		for (let key of keys)
			this._inputs.set(key, false);
	}

	public static getInstance():InputHandler {
		if (InputHandler._instantiated) {
			return InputHandler._instance;
	
		} else {
			InputHandler._instance		= new InputHandler();
			InputHandler._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return InputHandler._instance;
		}
	}


	// Singleton methods below
	
	public initialise() {
		let canvas = CanvasSystem.getInstance().getCanvas();
		canvas.addEventListener("mousemove", (event:MouseEvent) => {
			this._updateMousePos(event);
		});
		
		// Handle keydown
		canvas.addEventListener("keydown", (event:KeyboardEvent) => {
			let hookHandler = HookHandler.getInstance();
			hookHandler.triggerEvent("InputHandler/Keydown", event.keyCode);
			
			if (this._inputs.containsKey(event.keyCode))
				this._inputs.set(event.keyCode, true);
		});
		
		// Handle keyup
		canvas.addEventListener("keyup", (event:KeyboardEvent) => {
			let hookHandler = HookHandler.getInstance();
			hookHandler.triggerEvent("InputHandler/Keyup", event.keyCode);
			
			if (this._inputs.containsKey(event.keyCode))
				this._inputs.set(event.keyCode, false);
		});
		
		let hookHandler = HookHandler.getInstance();
		hookHandler.setHook("EngineUpdate", "InputHandlerUpdate", () => this.update());
		
	}
	
	
	private _updateMousePos(event:MouseEvent):void {
		let rect = CanvasSystem.getInstance().getCanvas().getBoundingClientRect(); // TODO: Check if slow (test1: not slow)
		
		this._mousePos.x = event.clientX - rect.left;
		this._mousePos.y = event.clientY - rect.top;
	}
	
	
	getMousePos():astd.IVector2d {
		return this._mousePos;
	}
	
	
	getInputs():InputMap {
		return this._inputs;
	}
	
	
	update():void {
		let playables = <IPlayable[]> ComponentHandler.getInstance().getComponentsOfClass("Playable");
		
		for (let playable of playables)
			playable.setInputs(this._inputs);
	}
	
}

// TODO check for these
// "public "
