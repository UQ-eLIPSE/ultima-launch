export interface ILTIPayload extends ILTIPayload_WithoutSignature {
    oauth_signature: string;
}
export interface ILTIPayload_WithoutSignature extends ILTILaunchData_Required, Partial<ILTILaunchData_Recommended> {
    oauth_consumer_key: string;
    oauth_signature_method: string;
    oauth_nonce: string;
    oauth_timestamp: string;
    oauth_version: string;
    [key: string]: string | undefined;
}
export interface ILTILaunchData_Required {
    lti_message_type: string;
    lti_version: string;
    resource_link_id: string;
}
export interface ILTILaunchData_Recommended {
    resource_link_title: string;
    user_id: string;
    roles: string;
    lis_person_name_given: string;
    lis_person_name_family: string;
    lis_person_name_full: string;
    lis_person_contact_email_primary: string;
    context_id: string;
    context_title: string;
    launch_presentation_document_target: string;
    launch_presentation_width: string;
    launch_presentation_height: string;
    launch_presentation_return_url: string;
    tool_consumer_instance_guid: string;
    tool_consumer_instance_name: string;
    tool_consumer_instance_contact_email: string;
}
