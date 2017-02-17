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
var document_definition_model_1 = require('../models/document.definition.model');
var mapping_management_service_1 = require('../services/mapping.management.service');
var DocumentDefinitionComponent = (function () {
    function DocumentDefinitionComponent() {
        this.isInput = false;
        this.selectedFields = [];
    }
    DocumentDefinitionComponent.prototype.ngAfterViewChecked = function () {
        var components = this.fieldComponents.toArray();
        for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
            var c = components_1[_i];
            c.parentComponent = this;
        }
    };
    DocumentDefinitionComponent.prototype.fieldClicked = function (c) {
        var self = c.parentComponent;
        var f = c.field;
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
    };
    DocumentDefinitionComponent.prototype.isSelected = function (fieldName) {
        for (var _i = 0, _a = this.selectedFields; _i < _a.length; _i++) {
            var selectedField = _a[_i];
            if (selectedField.name == fieldName) {
                return true;
            }
        }
        return false;
    };
    DocumentDefinitionComponent.prototype.updateFromSelections = function () {
        var components = this.fieldComponents.toArray();
        var fieldsInMappings = this.mapperService.getMappedFields(this.isInput);
        for (var _i = 0, components_2 = components; _i < components_2.length; _i++) {
            var c = components_2[_i];
            var isSelected = this.isSelected(c.field.name);
            c.updateSelection(isSelected);
            c.partOfMapping = (fieldsInMappings.indexOf(c.field.name) != -1);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.Component)
    ], DocumentDefinitionComponent.prototype, "parentComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', document_definition_model_1.DocumentDefinition)
    ], DocumentDefinitionComponent.prototype, "docDef", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DocumentDefinitionComponent.prototype, "selectionChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', mapping_management_service_1.MappingManagementService)
    ], DocumentDefinitionComponent.prototype, "mapperService", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DocumentDefinitionComponent.prototype, "isInput", void 0);
    __decorate([
        core_1.ViewChildren('fieldDetail'), 
        __metadata('design:type', core_1.QueryList)
    ], DocumentDefinitionComponent.prototype, "fieldComponents", void 0);
    DocumentDefinitionComponent = __decorate([
        core_1.Component({
            selector: 'document-definition',
            inputs: ['docDef'],
            template: "\n\t  \t<div class='docDef' *ngIf=\"docDef\">\n\t  \t\t<div class=\"card-pf\">\n\t  \t\t\t<div class=\"card-pf-heading\">\n    \t\t\t\t<h2 class=\"card-pf-title\">{{docDef.name}}</h2>\n    \t\t\t</div>\n    \t\t\t<div class=\"card-pf-body\">\n                    <document-field-detail #fieldDetail *ngFor=\"let f of docDef.fields\" \n                        [field]=\"f\" [fieldClicked]=\"fieldClicked\"></document-field-detail>\n\t\t\t    </div>\n\t\t    </div>\n\t    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DocumentDefinitionComponent);
    return DocumentDefinitionComponent;
}());
exports.DocumentDefinitionComponent = DocumentDefinitionComponent;
//# sourceMappingURL=document.definition.component.js.map