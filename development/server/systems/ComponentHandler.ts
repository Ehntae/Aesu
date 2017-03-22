import { IBaseComponent } from "../components/BaseComponent";
import astd from "../framework/utility/astd";
import * as exceptions from "../framework/utility/exceptions";


// Locally typedef long hashmap templatic type
type ComponentList     = astd.IHMap<string, IBaseComponent>;	// UUID, IBaseComponent
type ComponentListsMap = astd.IHMap<string, ComponentList>;		// Class, ComponentMap


export class ComponentHandler {

	private static _instantiated = false;
	private static _instance:ComponentHandler;

	private _componentListsMap:ComponentListsMap;


	/**
	 * Creates an instance of ComponentHandler.
	 * 
	 * @memberOf ComponentHandler
	 */
	public constructor() {
		if (ComponentHandler._instantiated) 
			throw exceptions.exclusiveInstance;
			
		/* 
			ComponentType => [
				id => BaseComponent
				id => BaseComponent
			]
		*/
		this._componentListsMap = new astd.HMap<string, astd.IHMap<string, IBaseComponent>>();
	}


	/**
	 * 
	 * @static
	 * @returns {ComponentHandler} 
	 * 
	 * @memberOf ComponentHandler
	 */
	public static getInstance():ComponentHandler {
		if (ComponentHandler._instantiated) {
			return ComponentHandler._instance;
	
		} else {
			ComponentHandler._instance		= new ComponentHandler();
			ComponentHandler._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return ComponentHandler._instance;
		}
	}


	// Performed on the single instance

	/**
	 * 
	 * @private
	 * @returns {ComponentListsMap}
	 * 
	 * @memberOf ComponentHandler
	 */
	private _getComponentListsMap():ComponentListsMap {
		return this._componentListsMap;
	}


	/**
	 * Does not errorcheck
	 * 
	 * @private
	 * @param {string} componentClass
	 * @returns {ComponentList}
	 * 
	 * @memberOf ComponentHandler
	 */
	private _getComponentList(componentClass:string):ComponentList {
		let componentListsMap:ComponentListsMap = this._getComponentListsMap();
		
		return componentListsMap.get(componentClass);    
	}


	/**
	 * 
	 * @private
	 * @param {string} componentClass
	 * 
	 * @memberOf ComponentHandler
	 */
	private _createComponentList(componentClass:string) {
		let newComponentList = new astd.HMap<string, IBaseComponent>();
		this._getComponentListsMap().set(componentClass, newComponentList);
	}


	/**
	 * 
	 * @private
	 * @param {string} componentClass
	 * @returns {boolean}
	 * 
	 * @memberOf ComponentHandler
	 */
	private _componentClassExists(componentClass:string):boolean {
		return this._getComponentListsMap().containsKey(componentClass);
	}

	
	/**
	 * 
	 * @param {string} componentClass
	 * @returns {number}
	 * 
	 * @memberOf ComponentHandler
	 */
	public getComponentCount(componentClass:string):number {
		if (this._componentClassExists(componentClass))
			return this._getComponentList(componentClass).getHashMap().size();
		
		return 0;
	}


	/**
	 * Get a component based on given component class/type and component id
	 * 
	 * @param {string} componentClass The class/type of component to retrieve
	 * @param {number} id Id used identifiy the component to retrieve
	 * @returns {IBaseComponent} Returns the produced component
	 * 
	 * @memberOf ComponentHandler
	 */
	public getComponent(componentClass:string, id:string):IBaseComponent {
		if (this._componentClassExists(componentClass))
			if (this._getComponentList(componentClass).containsKey(id))
				return this._getComponentList(componentClass).get(id);
				
		throw new Error(exceptions.undefinedComponent);
	}

	
	/**
	 * Produces an array of components under the same id
	 * 
	 * @param {number} id Id of the components to retrieve
	 * @returns {IBaseComponent[]} The produced array of components
	 * 
	 * @memberOf ComponentHandler
	 */
	public getEntityComponents(id:string):IBaseComponent[] {
		
		let components:IBaseComponent[] = new Array<IBaseComponent>();
		let componentLists = this._getComponentListsMap();
		
		// Go through component lists and gather all components that match a specific numerical id
		let componentTypes:string[] = componentLists.getKeys();
		
		for (let type of componentTypes) {
			if (componentLists.containsKey(type))
				componentLists.get(type).containsKey(id);
			components.push(componentLists.get(type).get(id)); // TODO: Check if bug?
		}
		
		return components;
	}

	
	/**
	 * Given a component class: Returns an array of all components of class
	 * 
	 * @param {string} componentClass
	 * @returns {IBaseComponent[]}
	 * 
	 * @memberof ComponentHandler
	 */
	public getComponentsOfClass(componentClass:string):IBaseComponent[] {
		
		let components:IBaseComponent[] = new Array<IBaseComponent>();
		
		if (this._componentClassExists(componentClass))
			for (let componentId of this._getComponentList(componentClass).getKeys())
				components.push(this.getComponent(componentClass, componentId));
		
		// for (let i = 0; i < this.getComponentCount(componentClass); 
		// 	components.push(this.getComponent(componentClass, ++i)));
		
		return components;
	}

	
	/**
	 * Set/store a single component under a given id
	 * 
	 * @access public
	 * @param {string} componentClass The class/type of the component that is being set
	 * @param {number} id Id of the component that is being set
	 * @param {IBaseComponent} component The component instance to set in the componentHandler hashed map
	 * 
	 * @memberOf ComponentHandler
	 */
	public setComponent(componentClass:string, id:string, component:IBaseComponent):void {
		// Ensure the componentList exists
		if (!this._componentClassExists(componentClass))
			this._createComponentList(componentClass);

		this._getComponentList(componentClass).set(id, component);
	}


	/**
	 * For components to request self-registration
	 * 
	 * @param {string} componentClass 
	 * @param {IBaseComponent} component 
	 * 
	 * @memberOf ComponentHandler
	 */
	public registerComponent(componentClass:string, component:IBaseComponent):void {
		let id:string = component.getId();
		this.setComponent(componentClass, id, component);
		
		console.log(`A ${componentClass} component was registered to entity: #${id}`);
	}

}
