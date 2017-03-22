
export interface IBaseComponent {
	getId():string;
	setId(id:string):void;
}


export class BaseComponent implements IBaseComponent {
	
	private _id:string;
	
	public constructor(id:string) {
		this.setId(id);
	}
	
	public getId():string {
		return this._id;
	}
	
	public setId(id:string):void {
		this._id = id;
	}
	
}
