import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from "../../IApprovalData";
export interface IDuplicationcheckProps {
    nextStep: any;
    backStep: any;
    data: any;
    dataChange: any;
    itemID: number;
    itemSubmitted: boolean;
    listData: any;
    context: WebPartContext;
    approvalData: IApprovalData;
    listOfEditableFields: any;
    accessLevel?: string;
    isFHDUser: boolean;
}
export interface IDuplicationCheckState {
    requestsArray: Array<any>;
    loading: boolean;
    mainLoading: boolean;
    tbxlegalName: string;
    tbxLine1: string;
    tbxSocialName: any;
    tbxTaxRegNo: string;
    errors: any;
    chkTestDuplicate: string;
    itemID: number;
    currentUserid: any;
    requestorid: any;
}
//# sourceMappingURL=IDuplicationCheckProps.d.ts.map