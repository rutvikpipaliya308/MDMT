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
    isFHDUser: boolean; //R fhd change
}

export interface IDuplicationCheckState {
    requestsArray: Array<any>;
    loading: boolean;
    mainLoading: boolean;
    tbxlegalName: string;
    tbxLine1: string;
    tbxSocialName
    tbxTaxRegNo: string;
    errors: any;
    chkTestDuplicate: string;
    itemID: number;
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
}