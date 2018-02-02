"use strict";
// Really basic HTML document generation functions
Object.defineProperty(exports, "__esModule", { value: true });
function addToElementAsChildren(element, children) {
    element.children = (element.children || []).concat(children);
    // Side effects present, do not return value
}
exports.addToElementAsChildren = addToElementAsChildren;
function addToElementAsAttributes(element, attributes) {
    element.attributes = (element.attributes || []).concat(attributes);
    // Side effects present, do not return value
}
exports.addToElementAsAttributes = addToElementAsAttributes;
function createElement(tag, attributes) {
    var element = {
        tag: tag,
    };
    if (attributes !== undefined) {
        addToElementAsAttributes(element, attributes);
    }
    return element;
}
exports.createElement = createElement;
function createText(text) {
    var element = createElement(null);
    element.text = text;
    return element;
}
exports.createText = createText;
function translateToHTMLString(element) {
    // Text nodes have their text returned
    if (element.tag === null) {
        return element.text;
    }
    // Forcing `Element` type
    element = element;
    // Build HTML string up
    var htmlString = "<" + element.tag;
    // Add attributes, if present
    if (element.attributes !== undefined) {
        htmlString += " " +
            element.attributes
                .map(function (attribute) {
                // Escaping required for & and "
                var escapedAttributeValue = attribute.value
                    .replace(/&/g, "&amp;")
                    .replace(/"/g, "&#39;");
                return attribute.key + "=\"" + escapedAttributeValue + "\"";
            })
                .join(" ");
    }
    // Close off opening tag
    htmlString += ">";
    // Add children recursively, if present
    if (element.children !== undefined) {
        htmlString += element.children.map(function (child) { return translateToHTMLString(child); }).join("");
    }
    // Insert closing tag
    htmlString += "</" + element.tag + ">";
    return htmlString;
}
exports.translateToHTMLString = translateToHTMLString;
