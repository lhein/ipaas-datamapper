import { Component, OnInit, Input, ViewChild, Injectable } from '@angular/core';

import { Field } from '../models/field.model';
import { DocumentDefinition } from '../models/document.definition.model';
import { MappingModel } from '../models/mapping.model';

import { MappingManagementService } from '../services/mapping.management.service';
import { ErrorHandlerService } from '../services/error.handler.service';

import { DocumentDefinitionComponent } from './document.definition.component';
import { MappingDetailComponent } from './mapping.detail.component';
import { TestModalComponent } from './modal.window.component';
import { DataMapperErrorComponent } from './data.mapper.error.component';

@Component({
  selector: 'my-app',
  template: `
  	<div style='height:100%;'>
  		<div class="row"><data-mapper-error #errorPanel></data-mapper-error></div>
  		<div class="row">
	  		<div class="col-md-12">
	  			<test-modal #modalWindow></test-modal>
	  		</div>
  		</div>
  		<div class="row" style='height:100%;'>
	  		<div class="col-md-1"></div>
	  		<div class="col-md-3">  		
		  		<document-definition #docDefInput [selectionChanged]="documentSelectionChanged"></document-definition>
		  	</div>
		  	<div class="col-md-1"></div>
		  	<div class="col-md-3">
		  		<document-definition #docDefOutput [selectionChanged]="documentSelectionChanged"></document-definition>
		  	</div>
		  	<div class="col-md-1"></div>
		  	<div class="col-md-3" style="padding:0px; height:100%">
		  		<mapping-detail #mappingDetailComponent [selectionChanged]="mappingDetailSelectionChanged"></mapping-detail>
		  	</div>
		 </div>
  	</div>
  `,
  providers: [MappingManagementService, ErrorHandlerService]
})

export class DataMapperAppComponent implements OnInit {
	@ViewChild('errorPanel')
  	private errorPanel: DataMapperErrorComponent;

	@ViewChild('modalWindow')
  	private modalWindow: TestModalComponent;

	@ViewChild('docDefInput')
  	private docDefInput: DocumentDefinitionComponent;

  	@ViewChild('docDefOutput')
  	private docDefOutput: DocumentDefinitionComponent;

  	@ViewChild('mappingDetailComponent')
  	private mappingDetailComponent: MappingDetailComponent;

	constructor(private mapperService: MappingManagementService, private errorService: ErrorHandlerService) { }

	ngOnInit(): void {		
		this.mapperService.errorService = this.errorService;
		this.errorPanel.errorService = this.errorService;
		this.docDefInput.parentComponent = this;
		this.docDefInput.mapperService = this.mapperService;
		this.docDefInput.isInput = true;
		this.docDefOutput.parentComponent = this;
		this.docDefOutput.mapperService = this.mapperService;
		this.mappingDetailComponent.parentComponent = this;
		this.mappingDetailComponent.mapperService = this.mapperService;
		this.mapperService.getDocumentDefinition(true, (d:DocumentDefinition) => {
			this.docDefInput.docDef = d;
		});
		this.mapperService.getDocumentDefinition(false, (d:DocumentDefinition) => {
			this.docDefOutput.docDef = d;
		});
		this.mapperService.initializeMappings(() => {
			this.docDefInput.updateFromSelections();
			this.docDefOutput.updateFromSelections();
		});
	}

	public documentSelectionChanged(component: DocumentDefinitionComponent) {	
		var self = component.parentComponent as DataMapperAppComponent;
		//self.modalWindow.show();
		var isInput: boolean = (component == self.docDefInput);
		console.log(isInput ? "input selection changed" : "output selection changed");

		var fieldToFind: Field = null;		

		var mapping: MappingModel = self.mappingDetailComponent.mapping;

		if (mapping == null) { // no current mapping shown in detail panel, find or create one		
			if ((self.docDefInput.selectedFields.length == 1) && (self.docDefOutput.selectedFields.length == 0)) {		
				fieldToFind = self.docDefInput.selectedFields[0];
			} 

			if ((self.docDefInput.selectedFields.length == 0) && (self.docDefOutput.selectedFields.length == 1)) {		
				fieldToFind = self.docDefOutput.selectedFields[0];
			} 

			mapping = (fieldToFind == null) ? null : self.mapperService.findMappingForField(fieldToFind.name, isInput);
			if (mapping != null) {
				console.log("Found existing mapping");
			}

			if (mapping == null) { //new mapping
				console.log("creating new mapping")
				mapping = self.mapperService.createMapping();
				mapping.inputFields = [].concat(self.docDefInput.selectedFields);
				mapping.outputFields = [].concat(self.docDefOutput.selectedFields);
			}
		} else { //mapping already selected, add/remove from it
			mapping.inputFields = [].concat(self.docDefInput.selectedFields);
			mapping.outputFields = [].concat(self.docDefOutput.selectedFields);			
		}		

		self.mappingDetailComponent.mapping = mapping;
		self.updateDocumentDefinitionComponents([].concat(mapping.inputFields), [].concat(mapping.outputFields), self);
	}

	public mappingDetailSelectionChanged(component: MappingDetailComponent) {
		console.log("Current mapping changed.");
		var self: DataMapperAppComponent = component.parentComponent as DataMapperAppComponent;
		console.log("self now");
		console.log(self);
		var mapping: MappingModel = component.mapping;
		if (mapping == null) {
			self.updateDocumentDefinitionComponents([], [], self);
		} else {
			self.updateDocumentDefinitionComponents([].concat(mapping.inputFields), [].concat(mapping.outputFields), self);
		}
	}

	public updateDocumentDefinitionComponents(inputSelectedFields: Field[], outputSelectedFields: Field[], self: DataMapperAppComponent) {
		console.log("Updating def components selections, input length: " + inputSelectedFields.length + ", output length: " + outputSelectedFields.length);
		self.docDefInput.selectedFields = inputSelectedFields;
		self.docDefInput.updateFromSelections();
		self.docDefOutput.selectedFields = outputSelectedFields;
		self.docDefOutput.updateFromSelections();
	}
}
