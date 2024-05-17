import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDropdownProperties } from "../../IDropdownProperties";

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
    listOfEditableFields: any;
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
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
    currentCompanyAccessLevel: string; //Rutvik 17-1-24
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
    CustomerRemark8: string;//Shraddha test 8
    CustomerRemark7: string;
    ClientIDType: string;
    //rutvik employee dropdown 3-3-23
    ClientLead: string;
    CommercialManager: string;
    Biller: string;
    ProjectAnalyst: string;
    ResourceManager: string;
}