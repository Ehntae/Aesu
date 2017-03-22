import * as std from "tstl";
import * as exceptions from "./exceptions";

// tslint:disable-next-line:variable-name


namespace astd {
	
	// Vector2d
	/**
	 * 
	 * @export
	 * @interface IVector2d
	 */
	export interface IVector2d {
		x:number;
		y:number;
	}


	/**
	 * 
	 * @export
	 * @class astd.Vector2d
	 * @implements {IVector2d}
	 */
	export class Vector2d implements IVector2d {
		
		public x:number;
		public y:number;
		
		public constructor(x:number, y:number) {
			this.x = x;
			this.y = y;
		}
		
	}




	// Color
	export interface IColor {
		r:number;
		g:number;
		b:number;
		a?:number;
	}


	export class Color {
		
		public r:number;
		public g:number;
		public b:number;
		public a?:number;
		
		/**
		 * Creates an instance of astd.Color.
		 * 
		 * @param {number} r
		 * @param {number} g
		 * @param {number} b
		 * @param {number} [a]
		 * 
		 * @memberOf astd.Color
		 */
		constructor(r:number, g:number, b:number, a?:number) {
			this.r = r;
			this.g = g;
			this.b = b;
			this.a = ((a !== undefined) ? a : 255);
		}
		
	}
	
	
	

	/**
	 * 
	 * @export
	 * @interface IHMap
	 * @template K 
	 * @template V 
	 */
	export interface IHMap<K, V> {	
		getHashMap():std.HashMap<K, V>;
		
		getKeys():K[];
		getValues():V[];
		
		get(key:K):V;
		set(key:K, value:V):void;
		setValuesTo(value:V):void;
		remove(key:K):void;
		containsKey(key:K):boolean;
	}


	export class HMap<K, V> implements IHMap<K, V> {
		
		private _hashmap:std.HashMap<K, V>;
		
		/**
		 * Creates an instance of Map.
		 * 
		 * @memberOf Map
		 */
		public constructor() {
			this._hashmap = new std.HashMap<K, V>();
		}    


		/**
		 * 
		 * @returns {std.HashMap<K, V>} 
		 * 
		 * @memberOf Map
		 */
		public getHashMap():std.HashMap<K, V> {
			return this._hashmap;
		}


		/**
		 * 
		 * @returns {K[]} 
		 * 
		 * @memberOf Map
		 */
		public getKeys():K[] {
			let keys:K[] = new Array<K>();

			for (let iter = this._hashmap.begin(); !iter.equals(this._hashmap.end()); iter = iter.next())
				keys.push(iter.first);
			
			return keys;
		}


		/**
		 * 
		 * @returns {V[]} 
		 * 
		 * @memberOf Map
		 */
		public getValues():V[] {
			let values:V[] = new Array<V>();

			for (let iter = this._hashmap.begin(); !iter.equals(this._hashmap.end()); iter = iter.next())
				values.push(iter.second);
			
			return values;
		}

		
		/**
		 * 
		 * @param {K} key 
		 * @returns {V} 
		 * 
		 * @memberOf Map
		 */
		public get(key:K):V {
			if (!this._hashmap.has(key))
				throw new Error(exceptions.undefinedKey);
				
			return this._hashmap.get(key);
		}
		
		
		/**
		 * 
		 * @param {K} key 
		 * @param {V} value 
		 * 
		 * @memberOf Map
		 */
		public set(key:K, value:V):void {
			this._hashmap.set(key, value);
		}
		
		
		public setValuesTo(value:V):void {
			let keys = this.getKeys();
			
			for (let key of keys) {
				this.set(key, value);
			}
		}
		
		
		/**
		 * 
		 * @param {K} key 
		 * 
		 * @memberOf Map
		 */
		public remove(key:K):void {
			this._hashmap.erase(key);
		}
		
		
		/**
		 * 
		 * @param {K} key 
		 * @returns {boolean} 
		 * 
		 * @memberof Map
		 */
		public containsKey(key:K):boolean {
			return this._hashmap.has(key);
		}
		
	}


	// ES6 Map
	export interface IESMap<K, V> {
		getMap():Map<K, V>;
		
		getKeys():K[];
		getValues():V[];
		
		get(key:K):V | undefined;
		set(key:K, value:V);
		containsKey(key:K):boolean;

	}
	
	export class ESMap<K, V> implements IESMap<K, V> {
		
		private _map:Map<K, V>;
		
		
		constructor() {
			this._map = new Map<K, V>();
		}
		
		
		getMap():Map<K, V> {
			return this._map;
		}
		
		
		public getKeys():K[] {
			let keys = new Array<K>();
			
			for (let key of this._map.keys())
				keys.push(key);
			
			return keys;
		}
		
		public getValues():V[] {
			let values = new Array<V>();
			
			for (let value of this._map.values())
				values.push(value);
			
			return values;
		}
		
		
		get(key:K):V | undefined {
			return <V> this._map.get(key);
		}
		
		
		set(key:K, value:V):void {
			this._map.set(key, value);
		}
		
		
		containsKey(key:K):boolean {
			return this._map.has(key);
		}
	}
	
}

// tslint:disable-next-line:no-default-export
export default astd;
