import astd from "./../framework/utility/astd";
import { BaseComponent, IBaseComponent } from "./BaseComponent";

type MapPosX = number;
type MapPosY = number;

type MapTile = any;
type MapType = astd.IHMap<MapPosX, astd.IHMap<MapPosY, MapTile>>;
// HM<x, HM<y, MapTile>>

export interface IMap extends IBaseComponent {
	getTile(x:MapPosX, y:MapPosY):MapTile;
	setTile(x:MapPosX, y:MapPosY, tile:MapTile):void;
	
	getMap():MapType;
	setMap(map:MapType):void;
}


export class Map extends BaseComponent implements IMap {

	private _map:MapType;
	
	public constructor(id:string) {
		super(id);
		
		this.setMap(new astd.HMap<number, astd.IHMap<number, MapTile>>());
	}
	
	
	public getTile(x:MapPosX, y:MapPosY):MapTile {
		return this._map.get(x).get(y);
	}
	
	
	public setTile(x:MapPosX, y:MapPosY, tile:MapTile):void {
		if (!this._map.containsKey(x))
			this._map.set(x, new astd.HMap<MapPosY, any>());
			
		this._map.get(x).set(y, tile);
	}
	
	
	public getMap():MapType {
		return this._map;
	}
	
	
	public setMap(map:MapType) {
		this._map = map;
	}
	
}
