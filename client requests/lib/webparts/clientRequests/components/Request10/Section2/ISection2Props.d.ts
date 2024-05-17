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
    isFHDUser: boolean;
    CountryOfCompany: string;
}
export interface ISection2State {
    tbxSocialName: string;
    tbxLegalName: string;
    tbxLine1: string;
    tbxLine2: string;
    tbxZipcode: string;
    tbxPostalDistrictCity: string;
    dpCountry: IDropdownProperties;
    tbxCountryAreaRegion: string;
    tbxCompanyRegistrationNumber: string;
    dpSector: IDropdownProperties;
    dpClientType: IDropdownProperties;
    tbxTaxRegistrationNumber: string;
    requestor: any;
    clientDetail: any;
    loading: boolean;
    errors: any;
    itemID: number;
    tbxCustomerRemark4: string;
    tbxCustomerRemark5: string;
    tbxCompany: number;
    tbxCustomerRemark8: string;
    tbxCustomerRemark7: string;
    dpClientIDType: IDropdownProperties;
    currentUserid: any;
    requestorid: any;
    tbxLegalNameInArabic: string;
    tbxArabicLine1: string;
    tbxArabicLine2: string;
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
//# sourceMappingURL=ISection2Props.d.ts.map