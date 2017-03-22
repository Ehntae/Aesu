import {BaseComponent} from "./BaseComponent";

type MapType = any[][]; // Array<Array<any>>;

export interface IMap {
	getMap():MapType;
	setMap(map:MapType):void;
}


export class Map extends BaseComponent implements IMap {

	private _map:MapType;
	
	public constructor(id:string) {
		super(id);
		
		this.setMap(new Array<any[][]>());
	}
	
	
	public getMap():MapType {
		return this._map;
	}
	
	
	public setMap(map:MapType) {
		this._map = map;
	}
	
}
