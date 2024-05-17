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
    isFHDUser: boolean;
}
export interface ISection2State {
    requestor: any;
    clientDetail: any;
    loading: boolean;
    tbxEmail: string;
    tbxFinanceEmail: string;
    tbxPhoneNo: string;
    itemID: number;
    currentUserid: any;
    requestorid: any;
    Boolean3Value: boolean;
    tbxClientAttentionName: string;
    errors?: any;
    dpExcludeFromClientInvoiceReminder: IDropdownProperties;
}
//# sourceMappingURL=ISection2Props.d.ts.map