import {Engine} from "./framework/Engine";

function main() {
	
	console.log("Starting up engine");
	
	let engine:Engine = Engine.getInstance();
	engine.initialise();
	engine.run();
	// engine.quit(); 
	
}

main();
