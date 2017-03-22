import { BaseComponent, IBaseComponent } from "./BaseComponent";
import { IRenderable, Renderable } from "./Renderable";

export interface IRenderer extends IBaseComponent {
	getRenderable():IRenderable;
}

export class Renderer extends BaseComponent implements IBaseComponent {
	
	private _renderable:IRenderable;
	
	public constructor(id:string) {
		super(id);
		
		this._renderable = new Renderable();
	}
	
	public getRenderable():IRenderable {
		return this._renderable;
	}
	
}
