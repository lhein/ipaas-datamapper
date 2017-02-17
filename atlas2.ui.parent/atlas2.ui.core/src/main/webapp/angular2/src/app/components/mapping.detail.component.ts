import { Component, Input, ViewChildren, Injectable, QueryList } from '@angular/core';

import { Field } from '../models/field.model';
import { MappingModel } from '../models/mapping.model';

import { MappingManagementService } from '../services/mapping.management.service';

import { MappingFieldDetailComponent } from './mapping.field.detail.component';
import { MappingFieldSectionComponent } from './mapping.field.section.component';

@Component({
	selector: 'mapping-detail',
	inputs: ['mapping'],	
	template: `
	  	<div class='fieldMappingDetail' *ngIf="mapping">
	  		<h2 class="card-pf-title">Data Mapping</h2>
	  		<h4 style="font-size:11px; font-weight:bold;">Edit your mapping here to confirm it's correct.</h4>
	  		<h3 style="font-size:12px; font-weight:bold;">Source</h3>
	  		<mapping-field #mappingField *ngFor="let field of mapping.inputFields" [field]="field" [isInput]="true"></mapping-field>
	  		<!-- <a (click)="addField($event, true)"><i class="fa fa-plus" aria-hidden="true"></i> Add Field</a> -->
	  		<hr/>
	  		<div><label class="sectionHeader">Action: </label><label>&nbsp;[Action Selector Goes Here]</label>
	  		<hr/>
	  		<h3 style="font-size:12px; font-weight:bold;">Target</h3>
	  		<mapping-field #mappingField *ngFor="let field of mapping.outputFields" [field]="field" [isInput]="false"></mapping-field>
	  		<!-- <a (click)="addField($event, false)"><i class="fa fa-plus" aria-hidden="true"></i> Add Field</a> -->
	  		<hr/>	  		
	  		<a class='button' (click)="removeMapping($event)"><i class="fa fa-trash" aria-hidden="true"></i> Remove</a>	  		
	  		<a class='button' (click)="deselectMapping($event)"><i class="fa fa-close" aria-hidden="true"></i> Deselect</a>
	  		<a class='button' (click)="saveMapping($event)"><i class="fa fa-save" aria-hidden="true"></i> Save</a>
	    </div>
    `
})

export class MappingDetailComponent { 
	@Input() mapping: MappingModel;
	@Input() selectionChanged: Function;
	@Input() parentComponent: Component;
	@Input() mapperService: MappingManagementService;

	@ViewChildren('mappingField') mappingFields: QueryList<MappingFieldSectionComponent>;

	ngAfterViewChecked() {
		var mappingFieldsArray: MappingFieldSectionComponent[] = this.mappingFields.toArray();
		for (let mappingField of mappingFieldsArray) {
			mappingField.fieldComponent.parentComponent = this;
			mappingField.fieldComponent.removeFieldCallback = this.removeField;
		}
	}

	deselectMapping(event: MouseEvent) {
		//TODO: prompt for save if not saved.
		this.mapping = null;
		this.selectionChanged(this);
	}

	saveMapping(event: MouseEvent) {
		this.mapperService.saveMapping(this.mapping);
		this.mapping = null;
		this.selectionChanged(this);
	}	

	removeMapping(event: MouseEvent) {
		this.mapperService.removeMapping(this.mapping);
		this.mapping = null;
		this.selectionChanged(this);
	}

	removeField(fdc: MappingFieldDetailComponent) {
		var self: MappingDetailComponent = fdc.parentComponent as MappingDetailComponent;
		var f = fdc.field;
		console.log(fdc);
		self.mapping.removeField(fdc.field.name, fdc.isInput);
		self.selectionChanged(self);
	}

	addField(event: MouseEvent, isInput: boolean) {
		var f: Field = new Field("example add", "type");
		if (isInput) {
			this.mapping.inputFields.push(f);
		} else {
			this.mapping.outputFields.push(f);
		}
	}
}