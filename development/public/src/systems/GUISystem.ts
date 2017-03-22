import * as $ from "jquery";
import * as exception from "../framework/utility/exceptions";


export class GUISystem {

	private static _instantiated = false;
	private static _instance:GUISystem;


	private constructor() {
		if (GUISystem._instantiated)
			throw exception.exclusiveInstance;

		// Singleton initialisation

	}


	public static getInstance():GUISystem {
		if (GUISystem._instantiated) {
			return GUISystem._instance;
	
		} else {
			GUISystem._instance		= new GUISystem();
			GUISystem._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return GUISystem._instance;
		}
	}

	// Singleton methods below
	
	public createContainer():HTMLDivElement {
		let element = $("<div />", {id: "container"});
		
		return <HTMLDivElement> element[0];
	}

	public createLoginBox():HTMLDivElement {
		
		let elements = [
			$("<div />", {
				id: "form_auth_login"
			}),
			
			$("<input />", {
				class       : "field_auth",
				id          : "field_auth_username",
				placeholder : "Username",
				type        : "text"
			}),
			
			$("<input />", {
				class       : "field_auth",
				id          : "field_auth_password",
				placeholder : "Password",
				type        : "password"
			}),
			
			$("<br />"),
			
			$("<input />", {
				id      : "btn_auth_submit",
				type    : "button",
				value   : "Login"
			})
		];
		
		// Append all elements [1-4] to div [0]
		for (let i = 1; i < elements.length; elements[0].append(elements[i++]));
		
		// Return container div [0]
		return <HTMLDivElement> elements[0][0];  // Extra [0] is to remove JQuery wrapper from element
	}
	
	
	public createCanvas():HTMLCanvasElement {
		
		let element = $("<canvas></canvas>", {id: "appCanvas"})
			.prop({
				height: 400,
				tabindex: 1,
				width: 400
			});
	
		// Return parent [0]
		return <HTMLCanvasElement> element.get(0);
	}
}
