import LZString from "lz-string";

export function encodeUrlState(value: string): string {
	return LZString.compressToEncodedURIComponent(value);
}

export function decodeUrlState(value: string): string {
	const decodedString = LZString.decompressFromEncodedURIComponent(value);
	console.log(decodedString);
	return decodedString;
}
