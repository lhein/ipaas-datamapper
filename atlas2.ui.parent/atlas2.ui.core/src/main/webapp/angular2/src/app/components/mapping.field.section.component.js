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
var mapping_field_detail_component_1 = require('./mapping.field.detail.component');
var MappingFieldSectionComponent = (function () {
    function MappingFieldSectionComponent() {
        this.isInput = false;
    }
    __decorate([
        core_1.ViewChild('fieldComponent'), 
        __metadata('design:type', mapping_field_detail_component_1.MappingFieldDetailComponent)
    ], MappingFieldSectionComponent.prototype, "fieldComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', field_model_1.Field)
    ], MappingFieldSectionComponent.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MappingFieldSectionComponent.prototype, "isInput", void 0);
    MappingFieldSectionComponent = __decorate([
        core_1.Component({
            selector: 'mapping-field',
            template: "\n\t\t<div class=\"mappingFieldSection\">\n\t\t\t<mapping-field-detail #fieldComponent [field]=\"field\" [isInput]=\"isInput\"></mapping-field-detail>\n\t\t\t<transition-list></transition-list>\n\t\t</div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], MappingFieldSectionComponent);
    return MappingFieldSectionComponent;
}());
exports.MappingFieldSectionComponent = MappingFieldSectionComponent;
//# sourceMappingURL=mapping.field.section.component.js.map