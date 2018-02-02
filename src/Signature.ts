import { URL } from "url";
import * as oauthSignature from "oauth-signature";

import { ILTIPayload, ILTIPayload_WithoutSignature } from "./interfaces/ILTIPayload";

/**
 * Generates the signature string
 */
export function generateSignature(requestUrl: string, httpMethod: string, secret: string, payload: ILTIPayload_WithoutSignature) {
    // We only support HMAC-SHA1
    if (payload.oauth_signature_method !== "HMAC-SHA1") {
        throw new Error("Signature method not supported");
    }

    // Extract query parameters from URL as well
    const url = new URL(requestUrl);
    const requestQueries: { [key: string]: string } = {};

    url.searchParams.forEach((value, name) => {
        requestQueries[name] = value;
    });

    // Query parameters are put into the payload object
    const extendedPayload = { ...requestQueries, ...payload };

    // Generate the signature
    return oauthSignature.generate(httpMethod, requestUrl, extendedPayload, secret, undefined, { encodeSignature: false });
}

/**
 * Creates a new payload object with the given signature written into
 * `oauth_signature`
 */
export function signPayload(requestUri: string, httpMethod: string, secret: string, payload: ILTIPayload_WithoutSignature) {
    const signature = generateSignature(requestUri, httpMethod, secret, payload);

    const newPayload: ILTIPayload = {
        ...payload,
        oauth_signature: signature,
    };

    return newPayload;
}
