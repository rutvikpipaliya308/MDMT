import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from "../../IApprovalData";
import { IDropdownProperties } from "../../IDropdownProperties";

export interface ISection2Props {
    nextStep: any;
    backStep: any;
    data: any;
    dataChange: any;
    itemID: number;
    itemSubmitted: boolean;
    listData: any;
    requestType: string;
    context: WebPartContext;
    selectedClient: string;
    approvalData: IApprovalData;
    selectedClientData: any;
    listOfEditableFields: any;
    isFHDUser: boolean; //R fhd change
}

export interface ISection2State {
    requestor: any;
    clientDetail: any;
    loading: boolean;
    tbxEmail: string;
    tbxFinanceEmail: string; //rutvik 29-3-24
    tbxPhoneNo: string;
    itemID: number;
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end

    //rutvik 29-3-24
    Boolean3Value: boolean;
    tbxClientAttentionName: string;
    errors?: any;
    dpExcludeFromClientInvoiceReminder: IDropdownProperties;
}