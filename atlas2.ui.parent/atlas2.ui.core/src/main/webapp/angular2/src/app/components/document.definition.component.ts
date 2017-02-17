import { Component, Input, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { Field } from '../models/field.model';
import { DocumentDefinition } from '../models/document.definition.model';

import { DocumentFieldDetailComponent } from './document.field.detail.component';

import { MappingManagementService } from '../services/mapping.management.service';

@Component({
	selector: 'document-definition',
	inputs: ['docDef'],
	template: `
	  	<div class='docDef' *ngIf="docDef">
	  		<div class="card-pf">
	  			<div class="card-pf-heading">
    				<h2 class="card-pf-title">{{docDef.name}}</h2>
    			</div>
    			<div class="card-pf-body">
                    <document-field-detail #fieldDetail *ngFor="let f of docDef.fields" 
                        [field]="f" [fieldClicked]="fieldClicked"></document-field-detail>
			    </div>
		    </div>
	    </div>
    `
})

export class DocumentDefinitionComponent { 
	@Input() parentComponent: Component;
	@Input() docDef: DocumentDefinition;
    @Input() selectionChanged: Function;
    @Input() mapperService: MappingManagementService;
    @Input() isInput:boolean = false;
    
    selectedFields: Field[] = [];

    @ViewChildren('fieldDetail') fieldComponents: QueryList<DocumentFieldDetailComponent>;

    ngAfterViewChecked() {
        var components: DocumentFieldDetailComponent[] = this.fieldComponents.toArray();
        for (let c of components) {
            c.parentComponent = this;
        }
    }

    fieldClicked(c: DocumentFieldDetailComponent) { 
        var self = c.parentComponent as DocumentDefinitionComponent;    
    	var f: Field = c.field;
    	
        /* remove this bit after 1.8.0 demo */
        self.selectedFields = [];
        self.selectedFields.push(f);
        /* end bit to remove */

        /* this is for supporting multiple fields per mapping, will put this back in after 1.8.0 demo
        var wasSelected: boolean = false;
    	for (var i = 0; i < self.selectedFields.length; i++) {
            var selectedField: Field = self.selectedFields[i];
    		if (selectedField.name == f.name) {
    			self.selectedFields.splice(i, 1);
    			wasSelected = true;
    			break;
    		}
    	}
    	if (wasSelected == false) {			
			self.selectedFields.push(f);
    	}
        */
        self.updateFromSelections();
    	self.selectionChanged(self);
   	}   

    public isSelected(fieldName: string): boolean {
        for (let selectedField of this.selectedFields) {
            if (selectedField.name == fieldName) {
                return true;
            }
        }
        return false;
    }

    public updateFromSelections() {
        var components: DocumentFieldDetailComponent[] = this.fieldComponents.toArray();
        var fieldsInMappings: string[] = this.mapperService.getMappedFields(this.isInput);
        for (let c of components) {
            var isSelected: boolean = this.isSelected(c.field.name);
            c.updateSelection(isSelected);
            c.partOfMapping = (fieldsInMappings.indexOf(c.field.name) != -1);
        }
    }	
}