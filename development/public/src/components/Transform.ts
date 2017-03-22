import astd from "../framework/utility/astd";
import { BaseComponent, IBaseComponent } from "./BaseComponent";



// Transform component
/**
 * 
 * @export
 * @interface ITransform
 */
export interface ITransform extends IBaseComponent { 
	getPosition():astd.IVector2d;
	setPosition(position:astd.IVector2d):void;
	
	getScale():astd.IVector2d;
	setScale(scale:astd.IVector2d):void;
	
	getAngle():number;
	setAngle(angle:number):void;
}


/**
 * 
 * @export
 * @class Transform
 * @extends {BaseComponent}
 * @implements {ITransform}
 */
export class Transform extends BaseComponent implements ITransform {
	
	private _position:astd.IVector2d;
	private _scale:astd.IVector2d;
	private _angle:number;
	
	
	public constructor(id:string) {
		super(id);
		this.setPosition(new astd.Vector2d(0, 0));
		this.setScale(new astd.Vector2d(1, 1));
		this.setAngle(0);
	}
	
	
	public getPosition():astd.Vector2d {
		return this._position;
	}
	
	
	public setPosition(position:astd.Vector2d):void {
		this._position = position;
	}
	
	
	public getScale():astd.Vector2d {
		return this._scale;
	}
	
	
	public setScale(scale:astd.IVector2d):void {
		this._scale = scale;
	}
	
	
	public getAngle():number {
		return this._angle;
	}
	
	
	public setAngle(angle:number):void {
		this._angle = angle;
	}
	
}
