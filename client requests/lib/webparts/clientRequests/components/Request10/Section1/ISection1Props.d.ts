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
    isFHDUser: boolean;
}
export interface ISection1State {
    dpCompany: string;
    loading: boolean;
    rbtnWorkflowType: string;
    requestor: Number;
    office: string;
    itemID: number;
    folderPath: string;
    errors: any;
    clientArray: Array<IClientDetails>;
    selectedClient: any;
    filter: string;
    updateRequestDataID: number;
    updateRequestDataArray: any;
    currentCompanyAccessLevel: string;
    countryOfCompany: string;
}
export interface IClientDetails {
    Action: any;
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
    Company: string;
    Status: string;
    Line2: string;
    Country_Area_Region: string;
    CompanyRegistrationNo: string;
    Sector: string;
    ClientStatus: string;
    ClientType: string;
    CustomerRemark4: string;
    CustomerRemark5: string;
    CustomerRemark8: string;
    CustomerRemark7: string;
    ClientIDType: string;
    ClientLead: string;
    CommercialManager: string;
    Biller: string;
    ProjectAnalyst: string;
    ResourceManager: string;
    LegalNameInArabic: string;
    ArabicLine1: string;
    ArabicLine2: string;
    ArabicPostalDistrict: string;
    ArabicCountryAreaRegion: string;
}
//# sourceMappingURL=ISection1Props.d.ts.map