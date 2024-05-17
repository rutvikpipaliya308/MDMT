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
    isFHDUser: boolean;
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
    tbxCustomerRemark4: string;
    tbxCustomerRemark5: string;
    tbxCustomerRemark8: string;
    tbxCustomerRemark7: string;
    dpClientIDType: IDropdownProperties;
    currentUserid: any;
    requestorid: any;
}
//# sourceMappingURL=ISection3Props.d.ts.map