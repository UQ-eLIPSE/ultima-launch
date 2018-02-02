export interface Attribute {
    key: string;
    value: string;
}
export interface Element {
    tag: string;
    attributes?: Attribute[];
    children?: Node[];
}
export interface TextNode {
    tag: null;
    text: string;
}
export declare type Node = Element | TextNode;
export declare function addToElementAsChildren(element: Element, children: Node[]): void;
export declare function addToElementAsAttributes(element: Element, attributes: Attribute[]): void;
export declare function createElement(tag: string | null, attributes?: Attribute[]): Element;
export declare function createText(text: string): TextNode;
export declare function translateToHTMLString(element: Node): string;
