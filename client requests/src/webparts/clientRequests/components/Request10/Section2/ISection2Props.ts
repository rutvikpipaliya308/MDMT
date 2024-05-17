import { WebPartContext } from "@microsoft/sp-webpart-base";
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
    selectedClientData: any;
    listOfEditableFields: any;
    isFHDUser: boolean; //R fhd change
    CountryOfCompany: string; //rutvik 13-3-24
}

export interface ISection2State {
    tbxSocialName: string,
    tbxLegalName: string,
    tbxLine1: string,
    tbxLine2: string,
    tbxZipcode: string,
    tbxPostalDistrictCity: string,
    dpCountry: IDropdownProperties,
    tbxCountryAreaRegion: string,
    //dpCurrency: IDropdownProperties,
    tbxCompanyRegistrationNumber: string,
    dpSector: IDropdownProperties,
    //rutvik 21-7 25
    //dpClientStatus: IDropdownProperties,
    //endr
    dpClientType: IDropdownProperties,
    tbxTaxRegistrationNumber: string;
    requestor: any;
    clientDetail: any;
    loading: boolean;
    errors: any;
    itemID: number;
    //rutvik 6-7 24
    tbxCustomerRemark4: string;
    tbxCustomerRemark5: string;
    tbxCompany: number;
    tbxCustomerRemark8: string;//Shraddha test 8
    tbxCustomerRemark7: string;//Shraddha test 8
    dpClientIDType: IDropdownProperties;//Shraddha test 7
    //endr
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
    tbxLegalNameInArabic: string;
    tbxArabicLine1: string;
    tbxArabicLine2: string;
    // tbxArabicZipCode: string;
    tbxArabicPostalDistrict: string;
    tbxArabicCountryAreaRegion: string;
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