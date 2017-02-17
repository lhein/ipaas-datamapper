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
var MappingFieldDetailComponent = (function () {
    function MappingFieldDetailComponent() {
        this.isInput = false;
    }
    MappingFieldDetailComponent.prototype.remove = function (event) {
        this.removeFieldCallback(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.Component)
    ], MappingFieldDetailComponent.prototype, "parentComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], MappingFieldDetailComponent.prototype, "removeFieldCallback", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', field_model_1.Field)
    ], MappingFieldDetailComponent.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MappingFieldDetailComponent.prototype, "isInput", void 0);
    MappingFieldDetailComponent = __decorate([
        core_1.Component({
            selector: 'mapping-field-detail',
            template: "\n\t  \t<div class='fieldDetail'>\n\t  \t\t<label style=\"width:94%;\">{{field.name}} ({{field.type}})</label>\n\t  \t\t<a style='display:inline;' (click)=\"remove($event)\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></a>\n\t  \t</div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], MappingFieldDetailComponent);
    return MappingFieldDetailComponent;
}());
exports.MappingFieldDetailComponent = MappingFieldDetailComponent;
//# sourceMappingURL=mapping.field.detail.component.js.map