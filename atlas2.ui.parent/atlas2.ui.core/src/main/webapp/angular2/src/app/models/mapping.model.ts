import { Field } from './field.model';

export class MappingModel {
	public uuid: string;
	public inputFields: Field[] = [];
	public outputFields: Field[] = [];		
	public saved: boolean = false;

	removeField(name:string, isInput: boolean) {
		var fields: Field[] = (isInput ? this.inputFields : this.outputFields);
    	for (var i = 0; i < fields.length; i++) {
    		if (fields[i].name == name) {
    			fields.splice(i, 1);
    			break;
    		}
    	}
	}
}