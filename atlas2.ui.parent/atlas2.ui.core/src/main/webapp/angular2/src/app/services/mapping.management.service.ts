import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, HttpModule } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';

import { Field } from '../models/field.model';
import { DocumentDefinition } from '../models/document.definition.model';
import { MappingModel } from '../models/mapping.model';

import { ErrorHandlerService } from './error.handler.service';

@Injectable()
export class MappingManagementService {	
	private mappings: MappingModel[] = [];
	private uuidCounter: number = 0;
	private mappingUUID: string = null;
	private headers: Headers = new Headers();

	public errorService: ErrorHandlerService;
	
	constructor(private http: Http) { 
		this.headers.append("Content-Type", "application/json");		
	}

	public getDocumentDefinition(isInput: boolean, initializedCallback: Function) {
		var url: string = "http://localhost:8585/v2/atlas/java/class?className=com.mediadriver.atlas.java.service.v2.TestAddress";
		url = isInput ? url : "http://localhost:8585/v2/atlas/java/class?className=com.mediadriver.atlas.java.service.v2.TestContact";		
		this.http.get(url, {headers: this.headers}).toPromise()
			.then((res: Response) => { this.extractDocumentDefinitionData(res, initializedCallback); })
			.catch((error: any) => { this.handleError("Error occurred while retrieving document fields.", error); } );
	}	

	private extractDocumentDefinitionData(res: Response, initializedCallback: Function) {	  		
  		let body = res.json();
  		var fields: Field[] = [];
  		for (let f of body.JavaClass.fields.field) {
  			fields.push(new Field(f.name, f.type));
  		}
  		var d: DocumentDefinition = new DocumentDefinition(body.JavaClass.className, fields);
  		initializedCallback(d);
	}	

	public initializeMappings(initializedCallback: Function) {
		console.log("Initializing mappings.");
		var url = "http://localhost:8585/v2/atlas/mappings?filter=UI";
		this.http.get(url, {headers: this.headers}).toPromise()
			.then( (res:Response) => this.extractMappings(res, initializedCallback))
			.catch((error: any) => { this.handleError("Error occurred while retrieving mappings.", error); } );             
	}

	private extractMappings(res: Response, initializedCallback: Function) {	
  		let body = res.json();
  		var entries: any[] = body.StringMap.stringMapEntry;
  		var mappingNames: string[] = [];
  		for (let entry of entries) {
  			mappingNames.push(entry.name);
  		}

  		var baseURL: string = "http://localhost:8585/v2/atlas/mapping/";
  		var operations: any[] = [];
  		for (let mappingName of mappingNames) {
	  		var url: string = baseURL + mappingName;
	  		let operation = this.http.get(url).map((res:Response) => res.json());
	  		operations.push(operation);
	  	}       
	  	Observable.forkJoin(operations).subscribe(
	      (data:any) => {
	      	if (!data) {
	      		console.log("No pre-existing mappings were found.");
	      		return;
	      	}
	      	console.log("Initializing from " + data.length + " fetched mappings.");
	      	for (let d of data) {
	      		this.mappingUUID = d.AtlasMapping.name;
	      		for (let fieldMapping of d.AtlasMapping.fieldMappings.fieldMapping) {
	      			var m: MappingModel = this.createMapping();
	      			m.saved = true;
	      			m.inputFields.push(new Field(fieldMapping.inputField.field.name, fieldMapping.inputField.field.type));
	      			m.outputFields.push(new Field(fieldMapping.outputField.field.name, fieldMapping.outputField.field.type));
	      			this.mappings.push(m);
	      		}
	      		//console.log("in", d);
	      		//console.log("out", m);	      		
	      	}
	      	initializedCallback();
	      },
	      (err:any) => { this.handleError("Error occurred while retrieving a mapping.", err); }
	    );
	}		

	public printMappings(reason: string) {
		var msg: string = "Mapping status for '" + reason + "', current mapping count: " + this.mappings.length;
		for (var i = 0; i < this.mappings.length; i++) {
			msg += "\n\tMapping #" + i + ": " + this.printMapping(this.mappings[i]);
		}
		console.log(msg);
	}

	public printMapping(m: MappingModel): string {
		var inputs: string = "";
		for (let f of m.inputFields) {
			inputs += f.name + ", ";
		}
		var outputs: string = "";
		for (let f of m.outputFields) {
			outputs += f.name + ", ";
		}
		return "uuid: " + m.uuid + ", inputs: {" + inputs + "}, outputs {" + outputs + "}.";
	}

	public saveMapping(m: MappingModel) {
		console.log("Saving mapping: " + this.printMapping(m));
		this.removeMappingInternal(m);
		this.mappings.push(m);
		this.printMappings("Saved Mapping.");
		this.saveMappingToService(m);
	}

	private saveMappingToService(m: MappingModel) {
		var payload: any[] = this.makeSavePayload();
		var jsonVersion = JSON.stringify(payload);
		//var jsonPretty = JSON.stringify(JSON.parse(jsonVersion),null,2); 
		var url = "http://localhost:8585/v2/atlas/mapping";
		this.http.put(url, jsonVersion, {headers: this.headers}).toPromise()
			.then((res:Response) => {
				console.log("Got put rest response.");
				console.log(res);
				m.saved = true;
			})
			.catch((error: any) => { this.handleError("Error occurred while saving mapping.", error); } );
	}

	public makeSavePayload() : any {
		/* //example payload
		{
			"AtlasMapping": {
				"jsonType": "com.mediadriver.atlas.v2.AtlasMapping",
				"fieldMappings": {
						"fieldMapping": [
							{
								"inputField": {
									"jsonType": "com.mediadriver.atlas.v2.MappedField",
									"field": {
										"jsonType": "com.mediadriver.atlas.v2.MockField",
										"name": "foo",
										"value": "bar"
									},
									"fieldActions": []
								},
								"outputField": { } //same as input field..
							}
						]
					}
				},
				"name": "junit4"
			}
		}
		*/ //end example payload
				
		var jsonMappings: any[] = [];
		for (let m of this.mappings) {
			var mappingFieldActions: any[] = [];
			var mappingFieldActions: any[] = [];
			let jsonMapping = { 
				"inputField": {
					"jsonType": "com.mediadriver.atlas.v2.MappedField",
					"field": this.createPayloadForFields(m.inputFields),
					"fieldActions": mappingFieldActions
				},
				"outputField": {
					"jsonType": "com.mediadriver.atlas.v2.MappedField",
					"field": this.createPayloadForFields(m.outputFields),
					"fieldActions": mappingFieldActions
				}
			};					
			jsonMappings.push(jsonMapping);
		}
		
		if (this.mappingUUID == null) {
			this.mappingUUID = "UI." + Math.floor((Math.random() * 1000000) + 1).toString();
		}
		let payload = {
			"AtlasMapping": {
				"jsonType": "com.mediadriver.atlas.v2.AtlasMapping",
				"name": this.mappingUUID,
				"fieldMappings": {
					"fieldMapping": jsonMappings 
				}
			}
		};
		return payload;
	}

	public createPayloadForFields(fields: Field[]) : any {
		var fieldsJson: any[] = [];
		for (let f of fields) {
			let flatWrapper = {
				"jsonType": "com.mediadriver.atlas.v2.MockField",
				"name": f.name, 
				"type": f.type
			};
			//TODO: for now just return the first field
			return flatWrapper;
			//fieldsJson.push({ "field" : flatWrapper });
		}
		return fieldsJson;
	}

	public removeMapping(m: MappingModel) {
		console.log("Removing mapping: " + this.printMapping(m));
		this.removeMappingInternal(m);		
		if (m.saved) {
			this.saveMappingToService(m);
		}	
	}

	private removeMappingInternal(m: MappingModel) {
		for (var i = 0; i < this.mappings.length; i++) {
			if (this.mappings[i].uuid == m.uuid) {
				console.log("Removing mapping: " + this.printMapping(this.mappings[i]));
				this.mappings.splice(i, 1);
				break;
			}
		}
	}

	public findMappingForField(fieldName: string, isInput:boolean): MappingModel {		
		console.log("Finding mapping for field: " + fieldName + ", input: " + isInput + ", current mapping count: " + this.mappings.length);
		for (let m of this.mappings) {
			var fields: Field[] = isInput ? m.inputFields : m.outputFields;		
			for (let f of fields) {
				if (f.name == fieldName) {
					return m;
				}
			}
		}
		return null;
	}

	public createMapping() {
		var m: MappingModel = new MappingModel();
		m.uuid = "mapping #" + this.uuidCounter;
		this.uuidCounter++;
		return m;
	}

	private handleError(message:string, error: any) {
		if (error instanceof Response) {
			if (error.status == 230) {
				message += " (Connection refused)";
			} else if (error.status == 500) {
				message += " (Internal Server Error)";
			} else if (error.status == 404) {
				message += " (Not Found)";
			}
		}
		this.errorService.error(message, error);
	}

	public getMappedFields(isInput: boolean) : string[] {
		var result: string[] = [];
		for (let m of this.mappings) {
			var fields: Field[] = isInput ? m.inputFields : m.outputFields;
			for (let f of fields) {
				result.push(f.name);
			}
		}
		return result;		
	}
}