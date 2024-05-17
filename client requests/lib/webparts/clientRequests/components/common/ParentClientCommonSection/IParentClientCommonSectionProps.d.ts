import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from '../../IApprovalData';
export interface IParentClientCommonSectionProps {
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
    currentUserid: any;
    requestorid: any;
}
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
export interface ISelectedClients {
    MaconomyAccountID: string;
    SocialName: string;
}
//# sourceMappingURL=IParentClientCommonSectionProps.d.ts.map