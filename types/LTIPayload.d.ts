import { ILTIPayload_WithoutSignature } from "./interfaces/ILTIPayload";
export declare function generateUnsignedMinimalPayload(consumerKey: string, nonce: string, resourceLinkId: string): ILTIPayload_WithoutSignature;
