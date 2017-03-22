import { ADraw } from "../framework/utility/ADrawLib";
import astd from "../framework/utility/astd";
import * as exceptions from "../framework/utility/exceptions";
import { Renderer } from "../components/Renderer";
import { Transform } from "../components/Transform";
import { CanvasSystem } from "./CanvasSystem";
import { ComponentHandler } from "./ComponentHandler";
import { HookHandler } from "./HookHandler";



export class RenderSystem {

	private static _instantiated = false;
	private static _instance:RenderSystem;

	private _canvas:HTMLCanvasElement;
	private _canvasContext:CanvasRenderingContext2D;

	/**
	 * Creates an instance of RenderSystem.
	 * 
	 * @memberOf RenderSystem
	 */
	public constructor() {
		if (RenderSystem._instantiated)
			throw exceptions.exclusiveInstance;
	}

	/**
	 * 
	 * @static
	 * @returns {RenderSystem}
	 * 
	 * @memberOf RenderSystem
	 */

	public static getInstance():RenderSystem {
		if (RenderSystem._instantiated) {
			return RenderSystem._instance;

		} else {
			RenderSystem._instance		= new RenderSystem();
			RenderSystem._instantiated	= true;

			console.log("Singleton instance was JIT generated!");

			return RenderSystem._instance;
		}
	}

	// Performed on the singleton instance

	/**
	 * @memberOf RenderSystem
	 */
	public initialise() {
		let hookHandler = HookHandler.getInstance();

		hookHandler.setHook("EngineFrameUpdate", "RenderFrameUpdate", this.renderFrame);
	}


	/**
	 *
	 * @returns {HTMLCanvasElement}
	 *
	 * @memberOf RenderSystem
	 */
	public getCanvas():HTMLCanvasElement {
		return this._canvas;
	}

	/**
	 *
	 * @param {HTMLCanvasElement} canvas
	 *
	 * @memberOf RenderSystem
	 */
	public setcanvas(canvas:HTMLCanvasElement):void {
		this._canvas = canvas;
	}


	// Load stored canvas" context
	/**
	 *
	 * @param {CanvasRenderingContext2D} context
	 * 
	 * @memberOf RenderSystem
	 */
	public loadCanvasContext(context:CanvasRenderingContext2D):void {
		this._canvasContext = context;
	}
	
	/**
	 * 
	 * @returns {CanvasRenderingContext2D}
	 * 
	 * @memberOf RenderSystem
	 */
	public getCanvasContext():CanvasRenderingContext2D {
		return this._canvasContext;
	}
	
	/**
	 * 
	 * @private
	 * 
	 * @memberOf RenderSystem
	 */
	// private _renderWorld():void {};
	
	
	//  TODO:   Give systems an init method and hook system-update into engine-update
	
	/**
	 * @memberOf RenderSystem
	 */
	public renderFrame():void {
		
		// Create FPS counter here to time this function
		
		
		
		// Get references to dependant systems
		let componentHandler = ComponentHandler.getInstance();
		let canvasSystem     = CanvasSystem.getInstance();
		let draw             = ADraw.getInstance();
		
		
		let canvas  = canvasSystem.getCanvas();   
		let context = canvasSystem.getContext();
		
		draw.setRenderTarget(context);
		
		// Attempt to disable all anti-aliasing (pixel smoothing)
		context.imageSmoothingEnabled 		= false;
		context.mozImageSmoothingEnabled 	= false;
		context.oImageSmoothingEnabled 		= false;
		context.webkitImageSmoothingEnabled = false;
		
		
		// Clear render target for draw step
		draw.clear(canvas.width, canvas.height);
		
		draw.setColor(new astd.Color(0, 0, 0));
		draw.rect(0, 0, canvas.width, canvas.height);
		
		
		// Create two arrays for renderer and transform components
		let renderComponents:Renderer[]  	= <Renderer[]>  componentHandler.getComponentsOfClass("Renderer");
		let transformComponents:Transform[] = <Transform[]> componentHandler.getComponentsOfClass("Transform");
		
		
		for (let id = 0; id < Math.max(renderComponents.length, transformComponents.length); id++) {
			let renderer  = renderComponents[id];
			let transform = transformComponents[id];
			
			if (renderer !== undefined && transform !== undefined) {
				let renderable  = renderer.getRenderable();
				let entityPos   = transform.getPosition();
				let scale       = transform.getScale();
				
				// Perform render related things
				let corePoint = renderable.getCorePoint();
				let corePos   = corePoint.getPosition();
				
				// Offset position
				let offsetPos = new astd.Vector2d(
					entityPos.x + corePos.x,
					entityPos.y + corePos.y
				);
				
				// // Draw location of entity center
				// draw.circle(
				//     entityPos.x,
				//     entityPos.y, 
				//     scale.x, 1
				// );                
				
				// Draw entity"s segments
				for (let line of renderable.getSegments()) {
					let lineAPos = line.getPosition();
					let lineBPos = line.getPosition2();
					
					draw.setColor(line.getColor());
					draw.line(
						offsetPos.x + lineAPos.x, offsetPos.y + lineAPos.y,
						offsetPos.x + lineBPos.x, offsetPos.y + lineBPos.y,
						4
					);
				}
				
				// Draw entity"s points
				for (let point of renderable.getPoints()) {
					let pointPos = point.getPosition();
					
					draw.setColor(point.getColor());
					draw.circleFilled(
						offsetPos.x + pointPos.x, 
						offsetPos.y + pointPos.y,
						scale.x * 0.25
					);
				}
				
				
				// Draw entity"s rects
				for (let rect of renderable.getRects()) {
					let rectPos = rect.getPosition();
					
					draw.setColor(rect.getColor());
					draw.rect(
						offsetPos.x + rectPos.x, 
						offsetPos.y + rectPos.y,
						rect.getScale().x, rect.getScale().y
					);
				}
				
				
				// Draw entity"s core point in relation to entity position (For offset animation)
				draw.setColor(corePoint.getColor());
				draw.circleFilled(
					offsetPos.x, 
					offsetPos.y, 
					scale.x * .5
				);
				
			}
			
		}
		
	}



}

