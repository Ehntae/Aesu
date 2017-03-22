import { ILine, IPoint, IRect, Line, Point, Rect } from "./RenderableShapes";

/* Renderable (All points are relative to core position)
	corePoint    = astd.Vector2d
	lines        = Line[]
	cirles       = Circle[]
*/

export interface IRenderable {
	getCorePoint():IPoint;
	setCorePoint(point:IPoint):void;
	
	getPoints():IPoint[];
	setPoints(points:IPoint[]):void;
	setPoint(point:IPoint):void;
	
	getSegments():ILine[];
	setSegments(segments:ILine[]):void;
	
	setSegment(segment:ILine):void;
	// setSegment(rPos1:astd.IVector2d, rPos2:astd.IVector2d):void;
	// setSegment(point1:IPoint, point2:IPoint):void;
	
	getRects():IRect[];
	setRects(rects:IRect[]):void;
	setRect(rect:IRect):void;
}


export class Renderable implements IRenderable {

	private _corePoint:IPoint;
	private _points:IPoint[];
	private _segments:ILine[];
	private _rects:IRect[];
	
	
	public constructor() {
		this._corePoint = new Point(0, 0);
		this._points    = new Array<Point>();
		this._segments  = new Array<Line>();
		this._rects     = new Array<Rect>();
	}
	
	
	getCorePoint():IPoint {
		return this._corePoint;
	}
	
	
	setCorePoint(point:IPoint):void {
		this._corePoint = point;
	}
	
	getPoints():IPoint[] {
		return this._points;
	}
	
	
	setPoints(points:IPoint[]) {
		this._points = points;
	}
	
	setPoint(point:IPoint):void {
		this._points.push(point);
	}
	
	// Segments
	getSegments():ILine[] {
		return this._segments;
	}
	
	setSegments(segments:ILine[]) {
		this._segments = segments;
	}
	
	setSegment(segment:ILine):void {
		this._segments.push(segment);
	}
	
	
	
	// Rects
	getRects():IRect[] {
		return this._rects;
	}
	
	setRects(rects:IRect[]):void {
		this._rects = rects;
	}
	
	setRect(rect:IRect):void {
		this._rects.push(rect);
	}
	
}
