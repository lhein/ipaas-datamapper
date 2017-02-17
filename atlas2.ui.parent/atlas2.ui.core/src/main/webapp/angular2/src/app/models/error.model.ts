export enum ErrorLevel { DEBUG, INFO, WARN, ERROR }    

export class ErrorInfo {
	identifier: string;
	message: string;
	level: ErrorLevel;
	error: any;	
}