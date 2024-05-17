import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDropdownProperties } from "../../IDropdownProperties";
import { IApprovalData } from "../../IApprovalData";

export interface ISection3Props {
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
    section2Data: any;
    listOfEditableFields: any;
    isFHDUser: boolean; //R fhd change
}

export interface ISection3State {
    requestor: any;
    loading: boolean;
    errors: any;
    dpDefaultTaxCode: IDropdownProperties;
    dpPaymentTerms: IDropdownProperties;
    dpWithholdingTaxType: IDropdownProperties;
    dpEmirate: IDropdownProperties;
    dpPlaceofSupply: IDropdownProperties;
    dpGSTRegistrationType: IDropdownProperties;
    clientDetail: any;
    tbxCIN: string;
    tbxTDSTaxRate: string;
    section2TbxValues: any;
    itemID: number;
    //rutvik 12-7 24
    tbxCustomerRemark4: string;
    tbxCustomerRemark5: string;
    //endr
    tbxCustomerRemark8: string;//Shraddha test 8
    tbxCustomerRemark7: string;//Shraddha test 7
    dpClientIDType: IDropdownProperties;//Shraddha test 7
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
}