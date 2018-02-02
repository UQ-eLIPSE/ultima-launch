"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var oauthSignature = require("oauth-signature");
/**
 * Generates the signature string
 */
function generateSignature(requestUrl, httpMethod, secret, payload) {
    // We only support HMAC-SHA1
    if (payload.oauth_signature_method !== "HMAC-SHA1") {
        throw new Error("Signature method not supported");
    }
    // Extract query parameters from URL as well
    var url = new url_1.URL(requestUrl);
    var requestQueries = {};
    url.searchParams.forEach(function (value, name) {
        requestQueries[name] = value;
    });
    // Query parameters are put into the payload object
    var extendedPayload = __assign({}, requestQueries, payload);
    // Generate the signature
    return oauthSignature.generate(httpMethod, requestUrl, extendedPayload, secret, undefined, { encodeSignature: false });
}
exports.generateSignature = generateSignature;
/**
 * Creates a new payload object with the given signature written into
 * `oauth_signature`
 */
function signPayload(requestUri, httpMethod, secret, payload) {
    var signature = generateSignature(requestUri, httpMethod, secret, payload);
    var newPayload = __assign({}, payload, { oauth_signature: signature });
    return newPayload;
}
exports.signPayload = signPayload;
