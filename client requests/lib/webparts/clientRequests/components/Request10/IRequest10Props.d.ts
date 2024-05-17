import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from "../IApprovalData";
export interface IRequest10Props {
    requestType: string;
    context: WebPartContext;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
    copyFilesFlowUrl: string;
}
export interface IRequest10State {
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
    clientJson?: any;
    requestJson?: any;
    itemSubmitted: boolean;
    accessLevel?: string;
    isFHDUser: boolean;
    countryOfCompany: string;
}
//# sourceMappingURL=IRequest10Props.d.ts.map