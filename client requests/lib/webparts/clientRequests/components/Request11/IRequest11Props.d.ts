import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from "../IApprovalData";
export interface IRequest11Props {
    requestType: string;
    context: WebPartContext;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
}
export interface IRequest11State {
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
    commonSectionData?: any;
    itemSubmitted: boolean;
    accessLevel?: string;
}
//# sourceMappingURL=IRequest11Props.d.ts.map