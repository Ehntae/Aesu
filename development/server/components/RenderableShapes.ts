import astd from "../framework/utility/astd";


// Base Shape
interface IBaseShape {
	getPosition():astd.IVector2d;
	setPosition(x:number, y:number):void;
	
	getColor():astd.IColor;
	setColor(color:astd.IColor):void;
	// setColor(r:number, g:number, b:number, a?:number):void;
}


class BaseShape implements IBaseShape {
	
	private _color:astd.IColor;
	private _position:astd.IVector2d;
	
	
	public constructor(x:number, y:number) {
		this._color = new astd.Color(255, 255, 255);
		this._position = new astd.Vector2d(x, y);
	}


	public getPosition():astd.IVector2d {
		return this._position;
	}
	
	public setPosition(x:number, y:number):void {
		this._position.x = x;
		this._position.y = y;
	}
	
	public getColor():astd.IColor {
		return this._color;
	}
	
	public setColor(color:astd.IColor):void {
		this._color = color;
	}
	
	/*setColor(r:number, g:number, b:number, a?:number):void {
		this._color.r = r;
		this._color.g = g;
		this._color.b = b;
		if (a !== undefined)
			this._color.a = a;
	}*/
	
	
}



// Point
export interface IPoint extends IBaseShape {
	getPosition():astd.IVector2d;
	setPosition(x:number, y:number):void;
}


export class Point extends BaseShape implements IPoint {
	
	public constructor(x:number, y:number) {
		super(x, y);
	}
	
}



// Line
export interface ILine extends IBaseShape {
	getPosition2():astd.IVector2d;
	setPosition2(position:astd.IVector2d):void;
	
	// getLength():number;
}


export class Line extends BaseShape implements ILine {
	
	private _position2:astd.IVector2d;
	
	public constructor(startPos:astd.IVector2d, endPos:astd.IVector2d) {
		super(startPos.x, startPos.y);
		this._position2 = new astd.Vector2d(endPos.x, endPos.y);
	}
	
	
	getPosition2():astd.IVector2d {
		return this._position2;
	}
	
	setPosition2(position:astd.IVector2d):void {
		this._position2 = position;
	}
	
	// TODO: Put this in some utility function (call it here)
	// getLength():number {
	//     let p1 = this._point1.getPosition();
	//     let p2 = this._point2.getPosition();
		
	//     let deltaP = new astd.Vector2d(p2.x - p1.x, p2.y - p1.y);
		
	//     let length = Math.sqrt(deltaP.x * deltaP.x + deltaP.y * deltaP.y);
		
	//     return length;
	// }
	
	
}



// Rect
export interface IRect extends IBaseShape {
	getScale():astd.IVector2d;
	setScale(width:number, height:number):void;
}


export class Rect extends BaseShape implements IRect {

	private _scale:astd.IVector2d;
	
	public constructor(x:number, y:number, width:number, height:number) {
		super(x, y);
		this._scale = new astd.Vector2d(width, height);
	}

	
	getScale():astd.IVector2d {
		return this._scale;
	}
	
	setScale(width:number, height:number):void {
		this._scale.x = width;
		this._scale.y = height;
	}
	
}
