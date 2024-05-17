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
    accessLevel?: string;
}

export interface ISection1State {
    dpCompany: string;
    loading: boolean;
    requestor: Number;
    office: string;
    itemID: number;
    selectedParentClient: string;
    selectedSocialName: string;
    parentClientUpdateArray: Array<IParentClientDetails>
    errors: any;
    isCompanyDisable: boolean;
    assignedClientsArray: any;
    assignedClientsString: string;
    updateRequestDataID: number;
}

// <summary>Interface for displying data in grid.</summary>
export interface IParentClientDetails {
    Action: any;
    Link?: any;
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
}