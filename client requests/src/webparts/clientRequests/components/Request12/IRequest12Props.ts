import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from "../IApprovalData";

export interface IRequest12Props {
    requestType: string;
    context: WebPartContext;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
    copyFilesFlowUrl: string;
}
export interface IRequest12State {
    currentStep: number;
    loading: boolean;
    itemID: number;
    listData: any;
    dataNotFound: boolean;
    invalidPermission: boolean;
    companyNo: string;
    approvalData: IApprovalData;
    section1Data: any;
    section2Data?: any;
    section3Data?: any;
    section4Data?: any;
    macAccountId?: string;
    requestJson: any;
    clientJson: any;
    itemSubmitted: false;
    accessLevel?: string;
    isFHDUser: boolean; //R fhd change
}