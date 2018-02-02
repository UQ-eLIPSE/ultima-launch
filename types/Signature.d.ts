import { ILTIPayload, ILTIPayload_WithoutSignature } from "./interfaces/ILTIPayload";
/**
 * Generates the signature string
 */
export declare function generateSignature(requestUrl: string, httpMethod: string, secret: string, payload: ILTIPayload_WithoutSignature): string;
/**
 * Creates a new payload object with the given signature written into
 * `oauth_signature`
 */
export declare function signPayload(requestUri: string, httpMethod: string, secret: string, payload: ILTIPayload_WithoutSignature): ILTIPayload;
