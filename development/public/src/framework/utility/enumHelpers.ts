
const getObjValues = (enumObject:any):(number | string)[] => {
	return Object.keys(enumObject).map(k => enumObject[k]);
};


export const enumKeysToArray = (enumObject:any):string[] => {
	return <string[]> getObjValues(enumObject).filter(v => typeof(v) === "string");
};


// export const enumValuesToArray = (enumObject:any):(number | string)[] => {
// 	return Object.keys(enumObject).map(k => enumObject[k]);
// };


export const enumValuesToArray = <T extends number>(enumObject:any):T[] => {
	return getObjValues(enumObject).filter(v => typeof v === "number") as T[];
};


// export const enumValuesToArray = (enumObject:any):void => {
// 	let values = new Array<any>();
	
// 	for (let value enumObject.)
// }

// export namespace EnumHelpers {
// 	export function getNamesAndValues<T extends number>(e:any) {
// 		return EnumHelpers.getNames(e).map(n => ({ name: n, value: e[n] as T }));
// 	};

	// export function getNames(e:any) {
	// 	return EnumHelpers.getObjValues(e).filter(v => typeof v === "string") as string[];
	// };

// 	export function getValues<T extends number>(e:any) {
// 		return EnumHelpers.getObjValues(e).filter(v => typeof v === "number") as T[];
// 	};


// }

