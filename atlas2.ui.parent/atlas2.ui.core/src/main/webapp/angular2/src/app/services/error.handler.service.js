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
var error_model_1 = require('../models/error.model');
var ErrorHandlerService = (function () {
    function ErrorHandlerService() {
        this.errors = [];
        this.errorIdentifierCounter = 1;
    }
    ErrorHandlerService.prototype.debug = function (message, error) { this.addError(message, error_model_1.ErrorLevel.DEBUG, error); };
    ErrorHandlerService.prototype.info = function (message, error) { this.addError(message, error_model_1.ErrorLevel.INFO, error); };
    ErrorHandlerService.prototype.warn = function (message, error) { this.addError(message, error_model_1.ErrorLevel.WARN, error); };
    ErrorHandlerService.prototype.error = function (message, error) { this.addError(message, error_model_1.ErrorLevel.ERROR, error); };
    ErrorHandlerService.prototype.addError = function (message, level, error) {
        console.error(message, error);
        var e = new error_model_1.ErrorInfo();
        e.identifier = this.errorIdentifierCounter.toString();
        this.errorIdentifierCounter++;
        e.message = message;
        e.level = level;
        e.error = error;
        this.errors.push(e);
    };
    ErrorHandlerService.prototype.removeError = function (identifier) {
        for (var i = 0; i < this.errors.length; i++) {
            if (this.errors[i].identifier == identifier) {
                this.errors.splice(i, 1);
                return;
            }
        }
    };
    ErrorHandlerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ErrorHandlerService);
    return ErrorHandlerService;
}());
exports.ErrorHandlerService = ErrorHandlerService;
//# sourceMappingURL=error.handler.service.js.map