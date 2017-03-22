import astd from "../framework/utility/astd";
import { InputMap } from "../systems/InputHandler";
import { BaseComponent, IBaseComponent } from "./BaseComponent";


export interface IPlayable extends IBaseComponent {
	getInputs():InputMap;
	setInputs(inputs:InputMap):void;
}

export class Playable extends BaseComponent implements IPlayable {
	
	private _inputs:InputMap;
	
	public constructor(id:string) {
		super(id);
		
		this._inputs = new astd.ESMap<number, boolean>();
	}
	
	public getInputs():InputMap {
		return this._inputs;
	}
	
	public setInputs(inputs:InputMap) {
		this._inputs = inputs;
	}
	
}
