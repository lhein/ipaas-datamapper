import { Field } from './field.model';

export class DocumentDefinition {
	name: string;
	fields: Field[];
	
	constructor(name: string, fields:Field[]) {
		this.name = name;
		this.fields = fields;
    }

    public getField(name: string): Field {
        for (let f of this.fields) {
    		if (f.name == name) {
    			return f;
    		}
    	}
    	return null;
    }    
}