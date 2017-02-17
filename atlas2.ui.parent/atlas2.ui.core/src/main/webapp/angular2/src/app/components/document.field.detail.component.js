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
var DocumentFieldDetailComponent = (function () {
    function DocumentFieldDetailComponent() {
        this.partOfMapping = false;
        this.cssClass = "";
    }
    DocumentFieldDetailComponent.prototype.clicked = function (event) {
        this.fieldClicked(this);
    };
    DocumentFieldDetailComponent.prototype.updateSelection = function (selected) {
        this.cssClass = selected ? "selectedField" : "";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.Component)
    ], DocumentFieldDetailComponent.prototype, "parentComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DocumentFieldDetailComponent.prototype, "fieldClicked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', field_model_1.Field)
    ], DocumentFieldDetailComponent.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DocumentFieldDetailComponent.prototype, "partOfMapping", void 0);
    DocumentFieldDetailComponent = __decorate([
        core_1.Component({
            selector: 'document-field-detail',
            template: "\n\t  \t<div class='fieldDetail {{cssClass}}' (click)=\"clicked($event)\">\n\t  \t\t<label>{{field.name}}</label>\n\t  \t\t<i class=\"fa fa-exchange\" *ngIf=\"partOfMapping\"></i>\n\t  \t</div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DocumentFieldDetailComponent);
    return DocumentFieldDetailComponent;
}());
exports.DocumentFieldDetailComponent = DocumentFieldDetailComponent;
//# sourceMappingURL=document.field.detail.component.js.map