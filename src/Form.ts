import { ILTIPayload } from "./interfaces/ILTIPayload";
import * as DocumentTree from "./DocumentTree";

export interface FormCreationOptions {
    /** `target` attribute value of the form */
    target: string,
    /** The text for the submission button */
    submitButtonValue: string,
}

export function createFormDocumentTree(payload: ILTIPayload, launchUrl: string, options: Partial<FormCreationOptions> = {}) {
    // Create form
    const form = DocumentTree.createElement("form", [
        { key: "action", value: launchUrl },
        { key: "method", value: "POST" },
    ]);

    const additionalFormAttributes: DocumentTree.Attribute[] = [];

    if (options.target !== undefined) {
        additionalFormAttributes.push({ key: "target", value: options.target });
    }

    DocumentTree.addToElementAsAttributes(form, additionalFormAttributes);


    // Add LTI payload KV to form
    const payloadInputElements = Object.keys(payload)
        .map((key) => {
            const value = "" + payload[key];

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

export function createFormHTMLString(payload: ILTIPayload, launchUrl: string, options?: Partial<FormCreationOptions>) {
    return DocumentTree.translateToHTMLString(createFormDocumentTree(payload, launchUrl, options));
}
