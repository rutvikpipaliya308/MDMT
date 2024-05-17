import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from "../IApprovalData";

export interface IRequest9Props {
    requestType: string;
    context: WebPartContext;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
}
export interface IRequest9State {
    currentStep: number;
    loading: boolean;
    itemID: number;
    listData: any;
    dataNotFound: boolean;
    invalidPermission: boolean;
    companyNo: string;
    approvalData: IApprovalData;
    section1Data: any;
    DuplicationSectionData?: any;
    section3Data?: any;
    commonSectionData?: any;
    itemSubmitted: boolean;
    accessLevel?: string;
    isFHDUser: boolean; //R fhd change
}