import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from '../../IApprovalData';

export interface IParentClientCommonSectionProps {
    // nextStep: any;
    backStep: any;
    data: any;
    dataChange: any;
    itemID: number;
    listData: any;
    context: WebPartContext;
    approvalData: IApprovalData;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
    section1Data?: any;
    itemSubmitted: boolean;
    accessLevel?: string;
}

export interface IParentClientCommonSectionState {
    loading: boolean;
    assignedClientsArray: Array<ISelectedClients>;
    availableClientsArray: Array<IClientDetails>;
    previousAssignedClients: Array<ISelectedClients>;
    errors: any;
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
}

// <summary>Interface for displying data in parent clients grid.</summary>
export interface IClientDetails {
    Action?: any;
    Link?: any;
    Type: string;
    MaconomyAccountID: string;
    SocialName: string;
    LegalName: string;
    Line1: string;
    Zipcode: string;
    Postal_District_City: string;
    Country: string;
    Currency: string;
    TaxRegistrationNo: string;
}

// <summary>Interface for displying assigned clients.</summary>
export interface ISelectedClients {
    MaconomyAccountID: string;
    SocialName: string;
}