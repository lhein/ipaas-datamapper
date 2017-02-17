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
var field_model_1 = require('../models/field.model');
var mapping_model_1 = require('../models/mapping.model');
var mapping_management_service_1 = require('../services/mapping.management.service');
var MappingDetailComponent = (function () {
    function MappingDetailComponent() {
    }
    MappingDetailComponent.prototype.ngAfterViewChecked = function () {
        var mappingFieldsArray = this.mappingFields.toArray();
        for (var _i = 0, mappingFieldsArray_1 = mappingFieldsArray; _i < mappingFieldsArray_1.length; _i++) {
            var mappingField = mappingFieldsArray_1[_i];
            mappingField.fieldComponent.parentComponent = this;
            mappingField.fieldComponent.removeFieldCallback = this.removeField;
        }
    };
    MappingDetailComponent.prototype.deselectMapping = function (event) {
        //TODO: prompt for save if not saved.
        this.mapping = null;
        this.selectionChanged(this);
    };
    MappingDetailComponent.prototype.saveMapping = function (event) {
        this.mapperService.saveMapping(this.mapping);
        this.mapping = null;
        this.selectionChanged(this);
    };
    MappingDetailComponent.prototype.removeMapping = function (event) {
        this.mapperService.removeMapping(this.mapping);
        this.mapping = null;
        this.selectionChanged(this);
    };
    MappingDetailComponent.prototype.removeField = function (fdc) {
        var self = fdc.parentComponent;
        var f = fdc.field;
        console.log(fdc);
        self.mapping.removeField(fdc.field.name, fdc.isInput);
        self.selectionChanged(self);
    };
    MappingDetailComponent.prototype.addField = function (event, isInput) {
        var f = new field_model_1.Field("example add", "type");
        if (isInput) {
            this.mapping.inputFields.push(f);
        }
        else {
            this.mapping.outputFields.push(f);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', mapping_model_1.MappingModel)
    ], MappingDetailComponent.prototype, "mapping", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], MappingDetailComponent.prototype, "selectionChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.Component)
    ], MappingDetailComponent.prototype, "parentComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', mapping_management_service_1.MappingManagementService)
    ], MappingDetailComponent.prototype, "mapperService", void 0);
    __decorate([
        core_1.ViewChildren('mappingField'), 
        __metadata('design:type', core_1.QueryList)
    ], MappingDetailComponent.prototype, "mappingFields", void 0);
    MappingDetailComponent = __decorate([
        core_1.Component({
            selector: 'mapping-detail',
            inputs: ['mapping'],
            template: "\n\t  \t<div class='fieldMappingDetail' *ngIf=\"mapping\">\n\t  \t\t<h2 class=\"card-pf-title\">Data Mapping</h2>\n\t  \t\t<h4 style=\"font-size:11px; font-weight:bold;\">Edit your mapping here to confirm it's correct.</h4>\n\t  \t\t<h3 style=\"font-size:12px; font-weight:bold;\">Source</h3>\n\t  \t\t<mapping-field #mappingField *ngFor=\"let field of mapping.inputFields\" [field]=\"field\" [isInput]=\"true\"></mapping-field>\n\t  \t\t<!-- <a (click)=\"addField($event, true)\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Add Field</a> -->\n\t  \t\t<hr/>\n\t  \t\t<div><label class=\"sectionHeader\">Action: </label><label>&nbsp;[Action Selector Goes Here]</label>\n\t  \t\t<hr/>\n\t  \t\t<h3 style=\"font-size:12px; font-weight:bold;\">Target</h3>\n\t  \t\t<mapping-field #mappingField *ngFor=\"let field of mapping.outputFields\" [field]=\"field\" [isInput]=\"false\"></mapping-field>\n\t  \t\t<!-- <a (click)=\"addField($event, false)\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Add Field</a> -->\n\t  \t\t<hr/>\t  \t\t\n\t  \t\t<a class='button' (click)=\"removeMapping($event)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i> Remove</a>\t  \t\t\n\t  \t\t<a class='button' (click)=\"deselectMapping($event)\"><i class=\"fa fa-close\" aria-hidden=\"true\"></i> Deselect</a>\n\t  \t\t<a class='button' (click)=\"saveMapping($event)\"><i class=\"fa fa-save\" aria-hidden=\"true\"></i> Save</a>\n\t    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], MappingDetailComponent);
    return MappingDetailComponent;
}());
exports.MappingDetailComponent = MappingDetailComponent;
//# sourceMappingURL=mapping.detail.component.js.map