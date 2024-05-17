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
    listOfEditableFields: any;
    isFHDUser: boolean;
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
    tbxCustomerRemark4: string;
    tbxCustomerRemark5: string;
    tbxCustomerRemark8: string;
    tbxCustomerRemark7: string;
    dpClientIDType: IDropdownProperties;
    tbxTDSRate: string;
    itemID: number;
    country: string;
    currentUserid: any;
    requestorid: any;
}
//# sourceMappingURL=ISection4Props.d.ts.map