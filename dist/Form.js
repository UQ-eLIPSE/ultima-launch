"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DocumentTree = require("./DocumentTree");
function createFormDocumentTree(payload, launchUrl, options) {
    if (options === void 0) { options = {}; }
    // Create form
    var form = DocumentTree.createElement("form", [
        { key: "action", value: launchUrl },
        { key: "method", value: "POST" },
    ]);
    var additionalFormAttributes = [];
    if (options.target !== undefined) {
        additionalFormAttributes.push({ key: "target", value: options.target });
    }
    DocumentTree.addToElementAsAttributes(form, additionalFormAttributes);
    // Add LTI payload KV to form
    var payloadInputElements = Object.keys(payload)
        .map(function (key) {
        var value = "" + payload[key];
        return DocumentTree.createElement("input", [
            { key: "type", value: "hidden" },
            { key: "name", value: key },
            { key: "value", value: value },
        ]);
    });
    DocumentTree.addToElementAsChildren(form, payloadInputElements);
    // Add a button for when JS fails to launch properly
    DocumentTree.addToElementAsChildren(form, [
        DocumentTree.createElement("input", [
            { key: "type", value: "submit" },
            { key: "value", value: options.submitButtonValue || "Launch" },
        ]),
    ]);
    return form;
}
exports.createFormDocumentTree = createFormDocumentTree;
function createFormHTMLString(payload, launchUrl, options) {
    return DocumentTree.translateToHTMLString(createFormDocumentTree(payload, launchUrl, options));
}
exports.createFormHTMLString = createFormHTMLString;
