import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDropdownProperties } from '../../IDropdownProperties';
import { IApprovalData } from "../../IApprovalData";

export interface ISection4Props {
    nextStep: any;
    backStep: any;
    data: any;
    dataChange: any;
    itemID: number;
    itemSubmitted: boolean;
    section2Data: any;
    approvalData: IApprovalData;
    listData: any;
    context: WebPartContext;
    listOfEditableFields: any
    isFHDUser: boolean; //r fhd change
}

export interface ISection4State {
    loading: boolean;
    errors?: any;
    dpDefaultTaxCode: IDropdownProperties;
    dpPaymentTerms: IDropdownProperties;
    dpWithHoldingTax: IDropdownProperties;
    dpEmirate: IDropdownProperties;
    dpPlaceOfSupply: IDropdownProperties;
    dpGSTRegType: IDropdownProperties;
    dpDeliveryMethod: IDropdownProperties;
    tbxCIN: string;
    tbxInstructions: string;
    //rutvik 4-7 24
    tbxCustomerRemark4: string;
    tbxCustomerRemark5: string;
    //endr
    tbxCustomerRemark8: string; //Shraddha test 8
    tbxCustomerRemark7: string; //Shraddha test 8
    dpClientIDType: IDropdownProperties;//Shraddha test 
    tbxTDSRate: string;
    itemID: number;
    country: string;
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
}