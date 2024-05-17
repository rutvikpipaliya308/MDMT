import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISection1Props {
    nextStep: any;
    data: any;
    dataChange: any;
    itemID: number;
    companyNo: string;
    itemSubmitted: boolean;
    listData: any;
    requestType: string;
    context: WebPartContext;
    permissionMSFlowUrl: string;
    listOfEditableFields: any;
    accessLevel?: string;
    isFHDUser: boolean; //r fhd change
}
export interface ISection1State {
    selectCompanyContactNo: string;
    requestsArray: Array<any>;
    dpCompany: string;
    loading: boolean;
    rbtnWorkflowType: string;
    requestor: Number;
    office: string;
    itemID: number;
    folderPath: string;
    errors: any;
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
    countryOfCompany: string; //Rutvik 13-3-24
}