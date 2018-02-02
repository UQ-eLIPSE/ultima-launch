import { ILTIPayload_WithoutSignature } from "./interfaces/ILTIPayload";

export function generateUnsignedMinimalPayload(consumerKey: string, nonce: string, resourceLinkId: string) {
    const payload: ILTIPayload_WithoutSignature = {
        oauth_consumer_key: consumerKey,
        oauth_nonce: nonce,
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: "" + Date.now(),
        oauth_version: "1.0",

        lti_message_type: "basic-lti-launch-request",
        lti_version: "LTI-1p0",
        resource_link_id: resourceLinkId,
    }

    return payload;
}
