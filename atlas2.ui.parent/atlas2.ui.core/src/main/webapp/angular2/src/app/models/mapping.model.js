"use strict";
var MappingModel = (function () {
    function MappingModel() {
        this.inputFields = [];
        this.outputFields = [];
        this.saved = false;
    }
    MappingModel.prototype.removeField = function (name, isInput) {
        var fields = (isInput ? this.inputFields : this.outputFields);
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].name == name) {
                fields.splice(i, 1);
                break;
            }
        }
    };
    return MappingModel;
}());
exports.MappingModel = MappingModel;
//# sourceMappingURL=mapping.model.js.map