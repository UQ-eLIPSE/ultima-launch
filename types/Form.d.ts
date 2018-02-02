import { ILTIPayload } from "./interfaces/ILTIPayload";
import * as DocumentTree from "./DocumentTree";
export interface FormCreationOptions {
    /** `target` attribute value of the form */
    target: string;
    /** The text for the submission button */
    submitButtonValue: string;
}
export declare function createFormDocumentTree(payload: ILTIPayload, launchUrl: string, options?: Partial<FormCreationOptions>): DocumentTree.Element;
export declare function createFormHTMLString(payload: ILTIPayload, launchUrl: string, options?: Partial<FormCreationOptions>): string;
