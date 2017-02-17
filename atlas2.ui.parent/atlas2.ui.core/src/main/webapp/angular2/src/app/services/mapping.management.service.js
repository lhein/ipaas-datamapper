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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/observable/forkJoin');
var field_model_1 = require('../models/field.model');
var document_definition_model_1 = require('../models/document.definition.model');
var mapping_model_1 = require('../models/mapping.model');
var MappingManagementService = (function () {
    function MappingManagementService(http) {
        this.http = http;
        this.mappings = [];
        this.uuidCounter = 0;
        this.mappingUUID = null;
        this.headers = new http_1.Headers();
        this.headers.append("Content-Type", "application/json");
    }
    MappingManagementService.prototype.getDocumentDefinition = function (isInput, initializedCallback) {
        var _this = this;
        var url = "http://localhost:8585/v2/atlas/java/class?className=com.mediadriver.atlas.java.service.v2.TestAddress";
        url = isInput ? url : "http://localhost:8585/v2/atlas/java/class?className=com.mediadriver.atlas.java.service.v2.TestContact";
        this.http.get(url, { headers: this.headers }).toPromise()
            .then(function (res) { _this.extractDocumentDefinitionData(res, initializedCallback); })
            .catch(function (error) { _this.handleError("Error occurred while retrieving document fields.", error); });
    };
    MappingManagementService.prototype.extractDocumentDefinitionData = function (res, initializedCallback) {
        var body = res.json();
        var fields = [];
        for (var _i = 0, _a = body.JavaClass.fields.field; _i < _a.length; _i++) {
            var f = _a[_i];
            fields.push(new field_model_1.Field(f.name, f.type));
        }
        var d = new document_definition_model_1.DocumentDefinition(body.JavaClass.className, fields);
        initializedCallback(d);
    };
    MappingManagementService.prototype.initializeMappings = function (initializedCallback) {
        var _this = this;
        console.log("Initializing mappings.");
        var url = "http://localhost:8585/v2/atlas/mappings?filter=UI";
        this.http.get(url, { headers: this.headers }).toPromise()
            .then(function (res) { return _this.extractMappings(res, initializedCallback); })
            .catch(function (error) { _this.handleError("Error occurred while retrieving mappings.", error); });
    };
    MappingManagementService.prototype.extractMappings = function (res, initializedCallback) {
        var _this = this;
        var body = res.json();
        var entries = body.StringMap.stringMapEntry;
        var mappingNames = [];
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            mappingNames.push(entry.name);
        }
        var baseURL = "http://localhost:8585/v2/atlas/mapping/";
        var operations = [];
        for (var _a = 0, mappingNames_1 = mappingNames; _a < mappingNames_1.length; _a++) {
            var mappingName = mappingNames_1[_a];
            var url = baseURL + mappingName;
            var operation = this.http.get(url).map(function (res) { return res.json(); });
            operations.push(operation);
        }
        Rx_1.Observable.forkJoin(operations).subscribe(function (data) {
            if (!data) {
                console.log("No pre-existing mappings were found.");
                return;
            }
            console.log("Initializing from " + data.length + " fetched mappings.");
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var d = data_1[_i];
                _this.mappingUUID = d.AtlasMapping.name;
                for (var _a = 0, _b = d.AtlasMapping.fieldMappings.fieldMapping; _a < _b.length; _a++) {
                    var fieldMapping = _b[_a];
                    var m = _this.createMapping();
                    m.saved = true;
                    m.inputFields.push(new field_model_1.Field(fieldMapping.inputField.field.name, fieldMapping.inputField.field.type));
                    m.outputFields.push(new field_model_1.Field(fieldMapping.outputField.field.name, fieldMapping.outputField.field.type));
                    _this.mappings.push(m);
                }
            }
            initializedCallback();
        }, function (err) { _this.handleError("Error occurred while retrieving a mapping.", err); });
    };
    MappingManagementService.prototype.printMappings = function (reason) {
        var msg = "Mapping status for '" + reason + "', current mapping count: " + this.mappings.length;
        for (var i = 0; i < this.mappings.length; i++) {
            msg += "\n\tMapping #" + i + ": " + this.printMapping(this.mappings[i]);
        }
        console.log(msg);
    };
    MappingManagementService.prototype.printMapping = function (m) {
        var inputs = "";
        for (var _i = 0, _a = m.inputFields; _i < _a.length; _i++) {
            var f = _a[_i];
            inputs += f.name + ", ";
        }
        var outputs = "";
        for (var _b = 0, _c = m.outputFields; _b < _c.length; _b++) {
            var f = _c[_b];
            outputs += f.name + ", ";
        }
        return "uuid: " + m.uuid + ", inputs: {" + inputs + "}, outputs {" + outputs + "}.";
    };
    MappingManagementService.prototype.saveMapping = function (m) {
        console.log("Saving mapping: " + this.printMapping(m));
        this.removeMappingInternal(m);
        this.mappings.push(m);
        this.printMappings("Saved Mapping.");
        this.saveMappingToService(m);
    };
    MappingManagementService.prototype.saveMappingToService = function (m) {
        var _this = this;
        var payload = this.makeSavePayload();
        var jsonVersion = JSON.stringify(payload);
        //var jsonPretty = JSON.stringify(JSON.parse(jsonVersion),null,2); 
        var url = "http://localhost:8585/v2/atlas/mapping";
        this.http.put(url, jsonVersion, { headers: this.headers }).toPromise()
            .then(function (res) {
            console.log("Got put rest response.");
            console.log(res);
            m.saved = true;
        })
            .catch(function (error) { _this.handleError("Error occurred while saving mapping.", error); });
    };
    MappingManagementService.prototype.makeSavePayload = function () {
        /* //example payload
        {
            "AtlasMapping": {
                "jsonType": "com.mediadriver.atlas.v2.AtlasMapping",
                "fieldMappings": {
                        "fieldMapping": [
                            {
                                "inputField": {
                                    "jsonType": "com.mediadriver.atlas.v2.MappedField",
                                    "field": {
                                        "jsonType": "com.mediadriver.atlas.v2.MockField",
                                        "name": "foo",
                                        "value": "bar"
                                    },
                                    "fieldActions": []
                                },
                                "outputField": { } //same as input field..
                            }
                        ]
                    }
                },
                "name": "junit4"
            }
        }
        */ //end example payload
        var jsonMappings = [];
        for (var _i = 0, _a = this.mappings; _i < _a.length; _i++) {
            var m = _a[_i];
            var mappingFieldActions = [];
            var mappingFieldActions = [];
            var jsonMapping = {
                "inputField": {
                    "jsonType": "com.mediadriver.atlas.v2.MappedField",
                    "field": this.createPayloadForFields(m.inputFields),
                    "fieldActions": mappingFieldActions
                },
                "outputField": {
                    "jsonType": "com.mediadriver.atlas.v2.MappedField",
                    "field": this.createPayloadForFields(m.outputFields),
                    "fieldActions": mappingFieldActions
                }
            };
            jsonMappings.push(jsonMapping);
        }
        if (this.mappingUUID == null) {
            this.mappingUUID = "UI." + Math.floor((Math.random() * 1000000) + 1).toString();
        }
        var payload = {
            "AtlasMapping": {
                "jsonType": "com.mediadriver.atlas.v2.AtlasMapping",
                "name": this.mappingUUID,
                "fieldMappings": {
                    "fieldMapping": jsonMappings
                }
            }
        };
        return payload;
    };
    MappingManagementService.prototype.createPayloadForFields = function (fields) {
        var fieldsJson = [];
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var f = fields_1[_i];
            var flatWrapper = {
                "jsonType": "com.mediadriver.atlas.v2.MockField",
                "name": f.name,
                "type": f.type
            };
            //TODO: for now just return the first field
            return flatWrapper;
        }
        return fieldsJson;
    };
    MappingManagementService.prototype.removeMapping = function (m) {
        console.log("Removing mapping: " + this.printMapping(m));
        this.removeMappingInternal(m);
        if (m.saved) {
            this.saveMappingToService(m);
        }
    };
    MappingManagementService.prototype.removeMappingInternal = function (m) {
        for (var i = 0; i < this.mappings.length; i++) {
            if (this.mappings[i].uuid == m.uuid) {
                console.log("Removing mapping: " + this.printMapping(this.mappings[i]));
                this.mappings.splice(i, 1);
                break;
            }
        }
    };
    MappingManagementService.prototype.findMappingForField = function (fieldName, isInput) {
        console.log("Finding mapping for field: " + fieldName + ", input: " + isInput + ", current mapping count: " + this.mappings.length);
        for (var _i = 0, _a = this.mappings; _i < _a.length; _i++) {
            var m = _a[_i];
            var fields = isInput ? m.inputFields : m.outputFields;
            for (var _b = 0, fields_2 = fields; _b < fields_2.length; _b++) {
                var f = fields_2[_b];
                if (f.name == fieldName) {
                    return m;
                }
            }
        }
        return null;
    };
    MappingManagementService.prototype.createMapping = function () {
        var m = new mapping_model_1.MappingModel();
        m.uuid = "mapping #" + this.uuidCounter;
        this.uuidCounter++;
        return m;
    };
    MappingManagementService.prototype.handleError = function (message, error) {
        if (error instanceof http_1.Response) {
            if (error.status == 230) {
                message += " (Connection refused)";
            }
            else if (error.status == 500) {
                message += " (Internal Server Error)";
            }
            else if (error.status == 404) {
                message += " (Not Found)";
            }
        }
        this.errorService.error(message, error);
    };
    MappingManagementService.prototype.getMappedFields = function (isInput) {
        var result = [];
        for (var _i = 0, _a = this.mappings; _i < _a.length; _i++) {
            var m = _a[_i];
            var fields = isInput ? m.inputFields : m.outputFields;
            for (var _b = 0, fields_3 = fields; _b < fields_3.length; _b++) {
                var f = fields_3[_b];
                result.push(f.name);
            }
        }
        return result;
    };
    MappingManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MappingManagementService);
    return MappingManagementService;
}());
exports.MappingManagementService = MappingManagementService;
//# sourceMappingURL=mapping.management.service.js.map