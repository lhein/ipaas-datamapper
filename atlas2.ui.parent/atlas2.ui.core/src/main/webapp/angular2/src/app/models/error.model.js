"use strict";
(function (ErrorLevel) {
    ErrorLevel[ErrorLevel["DEBUG"] = 0] = "DEBUG";
    ErrorLevel[ErrorLevel["INFO"] = 1] = "INFO";
    ErrorLevel[ErrorLevel["WARN"] = 2] = "WARN";
    ErrorLevel[ErrorLevel["ERROR"] = 3] = "ERROR";
})(exports.ErrorLevel || (exports.ErrorLevel = {}));
var ErrorLevel = exports.ErrorLevel;
var ErrorInfo = (function () {
    function ErrorInfo() {
    }
    return ErrorInfo;
}());
exports.ErrorInfo = ErrorInfo;
//# sourceMappingURL=error.model.js.map