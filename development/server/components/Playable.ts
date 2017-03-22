import astd from "../framework/utility/astd";
import { BaseComponent, IBaseComponent } from "./BaseComponent";


export interface IPlayable extends IBaseComponent {
	getInputs():astd.ESMap<number, boolean>;
	setInputs(inputs:astd.ESMap<number, boolean>):void;
}

export class Playable extends BaseComponent implements IPlayable {
	
	private _inputs:astd.ESMap<number, boolean>;
	
	public constructor(id:string) {
		super(id);
		
		this._inputs = new astd.ESMap<number, boolean>();
	}
	
	public getInputs():astd.ESMap<number, boolean> {
		return this._inputs;
	}
	
	public setInputs(inputs:astd.ESMap<number, boolean>) {
		this._inputs = inputs;
	}
	
}
