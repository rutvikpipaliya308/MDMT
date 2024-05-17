import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISection1Props {
    nextStep: any;
    data: any;
    dataChange: any;
    itemID: number;
    itemSubmitted: boolean;
    listData: any;
    requestType: string;
    context: WebPartContext;
    permissionMSFlowUrl: string;
    copyFilesFlowUrl: string;
    accessLevel?: string;
    isFHDUser: boolean; //R fhd change
}

export interface ISection1State {
    dpCompany: string;
    loading: boolean;
    gridLoading: boolean;
    rbtnWorkflowType: string;
    requestor: Number;
    office: string;
    itemID: number;
    folderPath: string;
    errors: any;
    companyClientArray: Array<any>;
    selectedCompanyClient: string;
    selectedClientSocialName: string;
    updateRequestDataArray: any;
    updateRequestDataID: number;
}

// <summary>Interface for displying data in grid.</summary>
export interface ICompanyClientDetails {
    Action: any;
    Company: string;
    CustomerType: string;
    MaconomyAccountID: string;
    SocialName: string;
    LegalName: string;
    Line1: string;
    Zipcode: string;
    Postal_District_City: string;
    Country: string;
    Currency: string;
    TaxRegistrationNo: string;
    Id: string;
    ClientAttentionName: string;
    Email: string;
    PhoneNo: string;
    DefaultTaxCode: string;
    PaymentTerms: string;
    WithholdingTaxType: string;
    Emirate: string;
    PlaceOfSupply: string;
    GSTRegistrationType: string;
    CIN: string;
    TDSTaxRate: string;
    //rutvik 12-7 24
    CustomerRemark4: string;
    CustomerRemark5: string;
    //endr
    CustomerRemark8: string; //Shraddha test 8
    CustomerRemark7: string;
    ClientIDType: string;
    //rutvik employee dropdown 3-3-23
    ClientLead: string;
    CommercialManager: string;
    Biller: string;
    ProjectAnalyst: string;
    ResourceManager: string;
}