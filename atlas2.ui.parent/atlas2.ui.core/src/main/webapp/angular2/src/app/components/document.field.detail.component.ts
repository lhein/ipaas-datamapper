import { Component, Input } from '@angular/core';

import { Field } from '../models/field.model';

@Component({
	selector: 'document-field-detail',
	template: `
	  	<div class='fieldDetail {{cssClass}}' (click)="clicked($event)">
	  		<label>{{field.name}}</label>
	  		<i class="fa fa-exchange" *ngIf="partOfMapping"></i>
	  	</div>
    `
})

export class DocumentFieldDetailComponent { 
	@Input() parentComponent: Component;
    @Input() fieldClicked: Function;	
	@Input() field: Field;
	@Input() partOfMapping: boolean = false;

	cssClass: string = "";

	clicked(event: MouseEvent) {
		this.fieldClicked(this);
	}

	updateSelection(selected: boolean) {
		this.cssClass = selected ? "selectedField" : "";
	}
}