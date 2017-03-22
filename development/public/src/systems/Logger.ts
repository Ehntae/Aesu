// Utility
import * as exceptions from "../framework/utility/exceptions";
import * as config from "../framework/utility/config";


interface ITermColors {
	title:string;
	text:string;
	indent:string;
	aos:string;
	error:string;
	debug:string;
}


export const TERM_COLORS:ITermColors = {
	aos     : "violet",
	debug   : "rgb(80, 41, 159)",
	error   : "red",
	indent  : "grey",
	text    : "white",
	title   : "magenta"
};


export class Logger {

	private static _instantiated = false;
	private static _instance:Logger;

	public constructor() {
		if (Logger._instantiated)
			throw exceptions.exclusiveInstance;
	}


	public static getInstance():Logger {
		if (Logger._instantiated) {
			return Logger._instance;
	
		} else {
			Logger._instance		= new Logger();
			Logger._instantiated	= true;
	
			console.log("Singleton instance was JIT generated!");
			
			return Logger._instance;
		}
	}

	// Performed on the singleton instance
	
	
	
	public log(...colorTextPairs:any[]):void {
		
		if (colorTextPairs.length % 2 !== 0)
			throw new Error("Called log with non-even number of arguments");
		
		let resultText = "%c ";
		let resultColor = "";

		for (let i = 0; i < colorTextPairs.length; i += 2) {
			const color:string = colorTextPairs[i];
			const text:string  = colorTextPairs[i + 1];
			
			resultText  += text;
			resultColor = "color: " + color;
			
			console.log("%c" + text, "color: " + color);
		}
		
		
	}


	public logDebug(message:string):void {
		if (!config.DEBUG_TO_TERMINAL) return;
		
		let textToLog = "";
		
		textToLog += `${message}\n`;  // Append the debug message
		
		this.log(TERM_COLORS.debug, textToLog);
		
	}

}
