import { Component, Input, ViewChild } from '@angular/core';

import { Field } from '../models/field.model';

import { MappingFieldDetailComponent} from './mapping.field.detail.component';
import { TransitionListComponent } from './transition.list.component';

@Component({
	selector: 'mapping-field',
	template: `
		<div class="mappingFieldSection">
			<mapping-field-detail #fieldComponent [field]="field" [isInput]="isInput"></mapping-field-detail>
			<transition-list></transition-list>
		</div>
    `
})

export class MappingFieldSectionComponent { 
	@ViewChild('fieldComponent')
  	public fieldComponent: MappingFieldDetailComponent;

	@Input() field: Field;
	@Input() isInput: boolean = false;

}