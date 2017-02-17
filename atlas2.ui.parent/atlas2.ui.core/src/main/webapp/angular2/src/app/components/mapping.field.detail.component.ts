import { Component, Input } from '@angular/core';

import { Field } from '../models/field.model';

@Component({
	selector: 'mapping-field-detail',
	template: `
	  	<div class='fieldDetail'>
	  		<label style="width:94%;">{{field.name}} ({{field.type}})</label>
	  		<a style='display:inline;' (click)="remove($event)"><i class="fa fa-times" aria-hidden="true"></i></a>
	  	</div>
    `
})

export class MappingFieldDetailComponent { 
	@Input() parentComponent: Component;
    @Input() removeFieldCallback: Function;
	
	@Input() field: Field;
	@Input() isInput: boolean = false;

	remove(event: MouseEvent) {
		this.removeFieldCallback(this);
	}
}