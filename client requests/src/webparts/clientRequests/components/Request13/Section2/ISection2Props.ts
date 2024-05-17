import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDropdownProperties } from "../../IDropdownProperties";
import { IApprovalData } from "../../IApprovalData";

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
    selectedClientData: any;
    listOfEditableFields: any;
    accessLevel: string;
    approvalData: IApprovalData;
    isFHDUser: boolean; //r fhd change 20-9
}

export interface ISection2State {
    // tbxSocialName: string,
    // tbxLegalName: string,
    // tbxLine1: string,
    // tbxLine2: string,
    // tbxZipcode: string,
    // tbxPostalDistrictCity: string,
    // dpCountry: IDropdownProperties,
    // tbxCountryAreaRegion: string,
    dpCurrency: IDropdownProperties,
    tbxCompanyRegistrationNumber: string,
    dpSector: IDropdownProperties,
    //rutvik 21-7 25
    //dpClientStatus: IDropdownProperties,
    //endr
    dpClientType: IDropdownProperties,
    //tbxTaxRegistrationNumber: string;
    requestor: any;
    clientDetail: any;
    loading: boolean;
    errors: any;
    itemID: number;
    //rutvik 6-7 24
    // tbxCustomerRemark4: string;
    // tbxCustomerRemark5: string;
    // tbxCompany: number;
    //endr
    lblSocialName: string;
    lblLegalName: string;
    lblLine1: string;
    lblLine2: string;
    lblZipCode: string;
    lblPostal: string;
    lblCountyArea: string;

    lblCompanyRegNo: string;
    lblCountry: string;
    lblCurrency: string;
    lblTaxRegistrationNo: string;
    lblDefaultTaxCode: string;
    lblCompany: string;
    lblEmail: string;
    lblPhoneNo: string;
    lblCIN: string;
    lblPaymentTerms: string;
    lblWithHoldingTax: string;
    lblEmirate: string;
    lblPlaceOfSupply: string;
    lblGSTRegType: string;
    lblAccessLevel: string;

    lblClientAttentionName: string;
    lblInstruction: string;
    lblDeliverymethod: string;
    lblSector: string;
    lblClientStatus: string;
    lblClientType: string;
    lblParentClient: string;
    lblCustomerRemark4: string;
    lblCustomerRemark5: string;
    lblCustomerRemark8: string; //Shraddha test 8
    lblCustomerRemark7: string;
    lblClientIDType: string;
    dpClientIDType: IDropdownProperties,
    //Shraddha 09-08-22 item 4
    currentUserid: any,
    requestorid: any,
    //Shraddha end
    lblClientLead: string,
    lblCommercialManager: string,
    lblBiller: string,
    lblProjectAnalyst: string,
    lblResourceManager: string,

}

export interface IClientDetail {
    ID: number;
    MaconomyAccountID: string;
    SocialName: string;
    Title: string;
    LegalName: string;
    AddressLine1: string;
    AddressLine2: string;
    Zipcode: string;
    PostalDistrictCity: string;
    Country: string;
    CountryAreaRegion: string;
    Currency: string;
    CompanyRegistrationNumber: string;
    Sector: string;
    ClientStatus: string;
    ClientType: string;
    Company: string;
    FolderPath: string;
    WorkflowType: string;
    TaxRegistrationNo: string;
}