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
var hello_world_component_1 = require('./hello.world.component');
// source: http://www.w3schools.com/howto/howto_css_modals.asp
var ModalWindowComponent = (function () {
    function ModalWindowComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.visible = false;
        this.componentLoaded = false;
    }
    ModalWindowComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //from: http://stackoverflow.com/questions/40811809/add-component-dynamically-inside-an-ngif
        this.myTarget.changes.subscribe(function (changes) {
            if (!_this.componentLoaded && _this.visible && _this.myTarget && (_this.myTarget.toArray().length)) {
                _this.loadComponent();
            }
        });
    };
    ModalWindowComponent.prototype.loadComponent = function () {
        var viewContainerRef = this.myTarget.toArray()[0];
        viewContainerRef.clear();
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nestedComponentType);
        var componentRef = viewContainerRef.createComponent(componentFactory);
        //(<NestedComponentDirective>componentRef.instance).data = adItem.data;
    };
    ModalWindowComponent.prototype.close = function (event) { this.visible = false; };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.Component)
    ], ModalWindowComponent.prototype, "parentComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.Type)
    ], ModalWindowComponent.prototype, "nestedComponentType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ModalWindowComponent.prototype, "visible", void 0);
    __decorate([
        core_1.ViewChildren('dyn_target', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.QueryList)
    ], ModalWindowComponent.prototype, "myTarget", void 0);
    ModalWindowComponent = __decorate([
        core_1.Component({
            selector: 'modal-window',
            template: "\n\t\t<div id=\"modalWindow\" class=\"modalWindow\" *ngIf=\"visible\">\n\t\t\t<div class=\"modal-content\">\n\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t<a (click)=\"close($event)\"><span class='close'>&times;</span></a>\n\t\t\t\t\t<h2>Modal Header</h2>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t<template #dyn_target></template>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t<h3>Modal Footer</h3>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver])
    ], ModalWindowComponent);
    return ModalWindowComponent;
}());
exports.ModalWindowComponent = ModalWindowComponent;
var TestModalComponent = (function () {
    function TestModalComponent() {
    }
    TestModalComponent.prototype.ngOnInit = function () {
        console.log("test model init");
        this.modalWindow.nestedComponentType = hello_world_component_1.HelloWorldComponent;
    };
    TestModalComponent.prototype.show = function () { this.modalWindow.visible = true; };
    TestModalComponent.prototype.hide = function () { this.modalWindow.visible = false; };
    __decorate([
        core_1.ViewChild('modalWindow'), 
        __metadata('design:type', ModalWindowComponent)
    ], TestModalComponent.prototype, "modalWindow", void 0);
    TestModalComponent = __decorate([
        core_1.Component({
            selector: 'test-modal',
            template: "<modal-window #modalWindow></modal-window>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestModalComponent);
    return TestModalComponent;
}());
exports.TestModalComponent = TestModalComponent;
//# sourceMappingURL=modal.window.component.js.map