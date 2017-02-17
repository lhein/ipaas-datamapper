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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var hello_world_component_1 = require('./components/hello.world.component');
var modal_window_component_1 = require('./components/modal.window.component');
var data_mapper_error_component_1 = require('./components/data.mapper.error.component');
var document_field_detail_component_1 = require('./components/document.field.detail.component');
var document_definition_component_1 = require('./components/document.definition.component');
var mapping_field_detail_component_1 = require('./components/mapping.field.detail.component');
var mapping_field_section_component_1 = require('./components/mapping.field.section.component');
var transition_list_component_1 = require('./components/transition.list.component');
var mapping_detail_component_1 = require('./components/mapping.detail.component');
var data_mapper_app_component_1 = require('./components/data.mapper.app.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule],
            declarations: [data_mapper_app_component_1.DataMapperAppComponent, document_definition_component_1.DocumentDefinitionComponent, mapping_detail_component_1.MappingDetailComponent,
                transition_list_component_1.TransitionListComponent, mapping_field_section_component_1.MappingFieldSectionComponent, modal_window_component_1.ModalWindowComponent,
                hello_world_component_1.HelloWorldComponent, modal_window_component_1.TestModalComponent, mapping_field_detail_component_1.MappingFieldDetailComponent, document_field_detail_component_1.DocumentFieldDetailComponent,
                data_mapper_error_component_1.DataMapperErrorComponent],
            providers: [],
            entryComponents: [hello_world_component_1.HelloWorldComponent],
            bootstrap: [data_mapper_app_component_1.DataMapperAppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map