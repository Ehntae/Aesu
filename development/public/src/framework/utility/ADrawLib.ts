import * as exceptions from "../utility/exceptions";
import astd from "./astd";


export class ADraw {

	private static _instantiated = false;
	private static _instance:ADraw;

	private _renderTarget:CanvasRenderingContext2D;
	private _color:string;

	private constructor() {
		if (ADraw._instantiated)
			throw exceptions.exclusiveInstance;
	}


	public static getInstance():ADraw {
		if (ADraw._instantiated) {
			return ADraw._instance;
	
		} else {
			ADraw._instance		= new ADraw();
			ADraw._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return ADraw._instance;
		}
	}

	// Performed on the singleton instance
	
	public getRenderTarget():CanvasRenderingContext2D {
		
		return this._renderTarget;
	}
	
	
	public setRenderTarget(target:CanvasRenderingContext2D):void {
		
		this._renderTarget = target;
	}
	
	
	// Drawing
	
	/**
	 * 
	 * @param {number} height 
	 * @param {number} width 
	 * 
	 * @memberOf ADraw
	 */
	public clear(height:number, width:number) {
		let ctx = this._renderTarget;
		
		// Store the current transformation matrix
		ctx.save();

		// Use the identity matrix while clearing the canvas
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, width, height);

		// Restore the transform
		ctx.restore();
	}
	
	
	public setColor(color:astd.IColor):void {
		let c = color;
		this._color = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`; // Make standard types (color)
	}

	
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * 
	 * @memberOf ADraw
	 */
	public pixel(x:number, y:number):void {
		let ctx = this._renderTarget;
		
		ctx.beginPath();
		ctx.rect(x, y, 1, 1);
		
		ctx.fillStyle = this._color;
		ctx.fill();
	}


	// Primitive shapes
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} width 
	 * @param {number} height 
	 * 
	 * @memberOf ADraw
	 */
	public rect(x:number, y:number, width:number, height:number):void {
		let ctx = this._renderTarget;
		
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		
		ctx.fillStyle = this._color;
		ctx.fill();
	}

	/**
	 * 
	 * @param {number} x1 
	 * @param {number} y1 
	 * @param {number} x2 
	 * @param {number} y2 
	 * @param {number} width 
	 * 
	 * @memberOf ADraw
	 */
	public line(x1:number, y1:number, x2:number, y2:number, width:number):void {
		let ctx = this._renderTarget;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineWidth = width;
		ctx.strokeStyle = this._color;
		ctx.stroke();
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} r 
	 * 
	 * @memberOf ADraw
	 */
	public point(x:number, y:number, r:number):void {
		let ctx = this._renderTarget;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		ctx.fillStyle = this._color;
		ctx.fill();
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} radius 
	 * @param {number} thickness 
	 * 
	 * @memberOf ADraw
	 */
	public circle(x:number, y:number, radius:number, thickness:number):void {
		let ctx = this._renderTarget;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		ctx.lineWidth = thickness;
		
		ctx.strokeStyle = this._color;
		ctx.stroke();
	}
	
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} radius 
	 * 
	 * @memberOf ADraw
	 */
	public circleFilled(x:number, y:number, radius:number):void {
		let ctx = this._renderTarget;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		
		ctx.fillStyle = this._color;
		ctx.fill();
	}


	// Text
	/**
	 * 
	 * @param {string} fontName 
	 * @param {number} fontSize 
	 * 
	 * @memberOf ADraw
	 */
	public setFont(fontName:string, fontSize:number):void {
		let ctx = this._renderTarget;
		ctx.font = fontSize + "px " + fontName;
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {string} text 
	 * 
	 * @memberOf ADraw
	 */
	public text(x:number, y:number, text:string):void {
		let ctx = this._renderTarget;
		ctx.fillStyle = this._color;
		ctx.fillText(text, x, y);
	}

	/**
	 * 
	 * @param {HTMLImageElement} texture 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} w 
	 * @param {number} h 
	 * 
	 * @memberOf ADraw
	 */
	public texture(texture:HTMLImageElement, x:number, y:number, w:number, h:number):void {
		let ctx = this._renderTarget;
		ctx.drawImage(texture, x, y, w, h);
	}

	/**
	 * 
	 * @param {HTMLImageElement} texture 
	 * @param {number} sx Start x coordinate
	 * @param {number} sy Start y coordinate
	 * @param {number} sw Start width
	 * @param {number} sh Start height
	 * @param {number} dx Destination x coordinate
	 * @param {number} dy Destination y coordinate
	 * @param {number} dw Destination width
	 * @param {number} dh Destination height
	 * 
	 * @memberOf ADraw
	 */
	public textureSliced(texture:HTMLImageElement, sx:number, sy:number, sw:number, sh:number, dx:number, dy:number, dw:number, dh:number):void {
		let ctx = this._renderTarget;
		ctx.drawImage(texture, sx, sy, sw, sh, dx, dy, dw, dh);
	}
}
