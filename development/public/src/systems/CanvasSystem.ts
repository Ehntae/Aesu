import * as exception from "../framework/utility/exceptions";


export class CanvasSystem {

	private static _instantiated = false;
	private static _instance:CanvasSystem;

	private canvas:HTMLCanvasElement;
	private context:CanvasRenderingContext2D;


	private constructor() {
		if (CanvasSystem._instantiated)
			throw exception.exclusiveInstance;

		// Singleton initialisation

	}


	public static getInstance():CanvasSystem {
		if (CanvasSystem._instantiated) {
			return CanvasSystem._instance;
	
		} else {
			CanvasSystem._instance		= new CanvasSystem();
			CanvasSystem._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return CanvasSystem._instance;
		}
	}

	// Singleton methods below
	
	public setCanvas(canvas:HTMLCanvasElement) {
		this.canvas = canvas;
	}
	
	public loadContext() {
		this.context = <CanvasRenderingContext2D> this.canvas.getContext("2d");
	}
	
	/**
	 * 
	 * @returns {CanvasRenderingContext2D}
	 * 
	 * @memberOf CanvasSystem
	 */
	public getContext():CanvasRenderingContext2D {
		return this.context;
	}
	
	public getCanvas():HTMLCanvasElement {
		return this.canvas;
	}
	
}
