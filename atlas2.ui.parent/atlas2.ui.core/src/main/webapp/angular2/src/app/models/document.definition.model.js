"use strict";
var DocumentDefinition = (function () {
    function DocumentDefinition(name, fields) {
        this.name = name;
        this.fields = fields;
    }
    DocumentDefinition.prototype.getField = function (name) {
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f.name == name) {
                return f;
            }
        }
        return null;
    };
    return DocumentDefinition;
}());
exports.DocumentDefinition = DocumentDefinition;
//# sourceMappingURL=document.definition.model.js.map