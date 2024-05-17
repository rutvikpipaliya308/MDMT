import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from "../IApprovalData";

export interface IRequest7Props {
    requestType: string;
    context: WebPartContext;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
}
export interface IRequest7State {
    currentStep: number;
    loading: boolean;
    itemID: number;
    listData: any;
    dataNotFound: boolean;
    invalidPermission: boolean;
    companyNo: string;
    approvalData: IApprovalData;
    section1Data: any;
    dueDiligenceData: any;
    DuplicationSectionData?: any;
    section3Data?: any;
    section4Data?: any;
    section5Data?: any;
    itemSubmitted: boolean;
    accessLevel?: string;
    isFHDUser: boolean; //r fhd change
    countryOfCompany: string; //rutvik 13-3-2024

}

