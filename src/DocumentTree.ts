// Really basic HTML document generation functions

export interface Attribute {
    key: string,
    value: string,
}

export interface Element {
    tag: string,
    attributes?: Attribute[],
    children?: Node[],
}

export interface TextNode {
    tag: null,
    text: string,
}

export type Node = Element | TextNode;

export function addToElementAsChildren(element: Element, children: Node[]) {
    element.children = [...(element.children || []), ...children];

    // Side effects present, do not return value
}

export function addToElementAsAttributes(element: Element, attributes: Attribute[]) {
    element.attributes = [...(element.attributes || []), ...attributes];

    // Side effects present, do not return value
}

export function createElement(tag: string | null, attributes?: Attribute[]) {
    const element: Node = {
        tag: tag as string,
    };

    if (attributes !== undefined) {
        addToElementAsAttributes(element, attributes);
    }

    return element;
}

export function createText(text: string) {
    const element = createElement(null) as any as TextNode;
    element.text = text;

    return element;
}

export function translateToHTMLString(element: Node) {
    // Text nodes have their text returned
    if (element.tag === null) {
        return (element as TextNode).text;
    }

    // Forcing `Element` type
    element = element as Element;

    // Build HTML string up
    let htmlString = `<${element.tag}`;

    // Add attributes, if present
    if (element.attributes !== undefined) {
        htmlString += " " +
            element.attributes
                .map(attribute => {
                    // Escaping required for & and "
                    const escapedAttributeValue =
                        attribute.value
                            .replace(/&/g, "&amp;")
                            .replace(/"/g, "&#39;");

                    return `${attribute.key}="${escapedAttributeValue}"`
                })
                .join(" ");
    }

    // Close off opening tag
    htmlString += ">";

    // Add children recursively, if present
    if (element.children !== undefined) {
        htmlString += element.children.map(child => translateToHTMLString(child)).join("");
    }

    // Insert closing tag
    htmlString += `</${element.tag}>`;

    return htmlString;
}
