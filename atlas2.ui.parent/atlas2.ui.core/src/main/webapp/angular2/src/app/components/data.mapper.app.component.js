"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var mapping_management_service_1 = require('../services/mapping.management.service');
var error_handler_service_1 = require('../services/error.handler.service');
var document_definition_component_1 = require('./document.definition.component');
var mapping_detail_component_1 = require('./mapping.detail.component');
var modal_window_component_1 = require('./modal.window.component');
var data_mapper_error_component_1 = require('./data.mapper.error.component');
var DataMapperAppComponent = (function () {
    function DataMapperAppComponent(mapperService, errorService) {
        this.mapperService = mapperService;
        this.errorService = errorService;
    }
    DataMapperAppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mapperService.errorService = this.errorService;
        this.errorPanel.errorService = this.errorService;
        this.docDefInput.parentComponent = this;
        this.docDefInput.mapperService = this.mapperService;
        this.docDefInput.isInput = true;
        this.docDefOutput.parentComponent = this;
        this.docDefOutput.mapperService = this.mapperService;
        this.mappingDetailComponent.parentComponent = this;
        this.mappingDetailComponent.mapperService = this.mapperService;
        this.mapperService.getDocumentDefinition(true, function (d) {
            _this.docDefInput.docDef = d;
        });
        this.mapperService.getDocumentDefinition(false, function (d) {
            _this.docDefOutput.docDef = d;
        });
        this.mapperService.initializeMappings(function () {
            _this.docDefInput.updateFromSelections();
            _this.docDefOutput.updateFromSelections();
        });
    };
    DataMapperAppComponent.prototype.documentSelectionChanged = function (component) {
        var self = component.parentComponent;
        //self.modalWindow.show();
        var isInput = (component == self.docDefInput);
        console.log(isInput ? "input selection changed" : "output selection changed");
        var fieldToFind = null;
        var mapping = self.mappingDetailComponent.mapping;
        if (mapping == null) {
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
            if (mapping == null) {
                console.log("creating new mapping");
                mapping = self.mapperService.createMapping();
                mapping.inputFields = [].concat(self.docDefInput.selectedFields);
                mapping.outputFields = [].concat(self.docDefOutput.selectedFields);
            }
        }
        else {
            mapping.inputFields = [].concat(self.docDefInput.selectedFields);
            mapping.outputFields = [].concat(self.docDefOutput.selectedFields);
        }
        self.mappingDetailComponent.mapping = mapping;
        self.updateDocumentDefinitionComponents([].concat(mapping.inputFields), [].concat(mapping.outputFields), self);
    };
    DataMapperAppComponent.prototype.mappingDetailSelectionChanged = function (component) {
        console.log("Current mapping changed.");
        var self = component.parentComponent;
        console.log("self now");
        console.log(self);
        var mapping = component.mapping;
        if (mapping == null) {
            self.updateDocumentDefinitionComponents([], [], self);
        }
        else {
            self.updateDocumentDefinitionComponents([].concat(mapping.inputFields), [].concat(mapping.outputFields), self);
        }
    };
    DataMapperAppComponent.prototype.updateDocumentDefinitionComponents = function (inputSelectedFields, outputSelectedFields, self) {
        console.log("Updating def components selections, input length: " + inputSelectedFields.length + ", output length: " + outputSelectedFields.length);
        self.docDefInput.selectedFields = inputSelectedFields;
        self.docDefInput.updateFromSelections();
        self.docDefOutput.selectedFields = outputSelectedFields;
        self.docDefOutput.updateFromSelections();
    };
    __decorate([
        core_1.ViewChild('errorPanel'), 
        __metadata('design:type', data_mapper_error_component_1.DataMapperErrorComponent)
    ], DataMapperAppComponent.prototype, "errorPanel", void 0);
    __decorate([
        core_1.ViewChild('modalWindow'), 
        __metadata('design:type', modal_window_component_1.TestModalComponent)
    ], DataMapperAppComponent.prototype, "modalWindow", void 0);
    __decorate([
        core_1.ViewChild('docDefInput'), 
        __metadata('design:type', document_definition_component_1.DocumentDefinitionComponent)
    ], DataMapperAppComponent.prototype, "docDefInput", void 0);
    __decorate([
        core_1.ViewChild('docDefOutput'), 
        __metadata('design:type', document_definition_component_1.DocumentDefinitionComponent)
    ], DataMapperAppComponent.prototype, "docDefOutput", void 0);
    __decorate([
        core_1.ViewChild('mappingDetailComponent'), 
        __metadata('design:type', mapping_detail_component_1.MappingDetailComponent)
    ], DataMapperAppComponent.prototype, "mappingDetailComponent", void 0);
    DataMapperAppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  \t<div style='height:100%;'>\n  \t\t<div class=\"row\"><data-mapper-error #errorPanel></data-mapper-error></div>\n  \t\t<div class=\"row\">\n\t  \t\t<div class=\"col-md-12\">\n\t  \t\t\t<test-modal #modalWindow></test-modal>\n\t  \t\t</div>\n  \t\t</div>\n  \t\t<div class=\"row\" style='height:100%;'>\n\t  \t\t<div class=\"col-md-1\"></div>\n\t  \t\t<div class=\"col-md-3\">  \t\t\n\t\t  \t\t<document-definition #docDefInput [selectionChanged]=\"documentSelectionChanged\"></document-definition>\n\t\t  \t</div>\n\t\t  \t<div class=\"col-md-1\"></div>\n\t\t  \t<div class=\"col-md-3\">\n\t\t  \t\t<document-definition #docDefOutput [selectionChanged]=\"documentSelectionChanged\"></document-definition>\n\t\t  \t</div>\n\t\t  \t<div class=\"col-md-1\"></div>\n\t\t  \t<div class=\"col-md-3\" style=\"padding:0px; height:100%\">\n\t\t  \t\t<mapping-detail #mappingDetailComponent [selectionChanged]=\"mappingDetailSelectionChanged\"></mapping-detail>\n\t\t  \t</div>\n\t\t </div>\n  \t</div>\n  ",
            providers: [mapping_management_service_1.MappingManagementService, error_handler_service_1.ErrorHandlerService]
        }), 
        __metadata('design:paramtypes', [mapping_management_service_1.MappingManagementService, error_handler_service_1.ErrorHandlerService])
    ], DataMapperAppComponent);
    return DataMapperAppComponent;
}());
exports.DataMapperAppComponent = DataMapperAppComponent;
//# sourceMappingURL=data.mapper.app.component.js.map