// import * as dsClient from "deepstream.io-client-js";
import * as express from "express";
import * as fileSystem from "fs";
import * as http from "http";
import { Engine } from "./framework/Engine";


/* -----------------------------------------
|	Express server configuration and setup
| ----------------------------------------- */
	
const PORT_NUMBER 		    		= 8080;
// const DEBUG_ENABLED:boolean 	    = true;

const PACKAGE_JSON:any 	 		    = JSON.parse(fileSystem.readFileSync("package.json", "utf8"));
const APP_VERSION:string 		    = PACKAGE_JSON.version;
const APP_BUILD:string	 		    = PACKAGE_JSON.build;

// const DEEPSTREAM_CONFIG             = {};
// const DEEPSTREAM_SERVER_PASSWORD    = new Date().getTime();

let app:express.Application 	    = express();
let server:http.Server 	  	        = http.createServer(app);


/* ---------------------
|	Set up middleware
| --------------------- */

app.use(express.static(__dirname + "/../public"));



/* -----------------------
|	Setup deepstream
| ----------------------- */

// // Deepstream server
// const DS_SERVER = new dsServer(DEEPSTREAM_CONFIG);
// DS_SERVER.start();


// // Deepstream client
// const DS_CLIENT:deepstreamIO.Client = dsClient("localhost:6020");

// DS_CLIENT.login({login: "server", password: DEEPSTREAM_SERVER_PASSWORD}, (success:boolean) => {
// 	console.log("Deepstream server login:", success);
// });


/* -----------------------
|	Bind server to port
| ----------------------- */
	
server.listen(PORT_NUMBER, () => {
	console.log(`Server bound to port: ${PORT_NUMBER}`);
});


/* -----------------------
|	Define entry point
| ----------------------- */

function main():void {
	
	console.log(`Initialising server: v${APP_VERSION}-${APP_BUILD}`);
	
	// Create game version record
	// const APP_METADATA = DS_CLIENT.record.getRecord("metadata");
	// APP_METADATA.whenReady(() => APP_METADATA.set("appVersion", APP_VERSION));
	
	
	// Start engine... 
	
	let engine = Engine.getInstance();
	engine.initialise();
	engine.run();
	
}

main();
