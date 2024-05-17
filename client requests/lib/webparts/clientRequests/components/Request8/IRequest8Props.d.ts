import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from "../IApprovalData";
export interface IRequest8Props {
    requestType: string;
    context: WebPartContext;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
}
export interface IRequest8State {
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
    itemSubmitted: boolean;
    accessLevel?: string;
    isFHDUser: boolean;
    countryOfCompany: string;
}
//# sourceMappingURL=IRequest8Props.d.ts.map