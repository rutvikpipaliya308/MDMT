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
    listOfEditableFields: any;
    accessLevel?: string;
    isFHDUser: boolean; //r fhd change
}

export interface ISection1State {
    dpCompany: string;
    loading: boolean;
    requestor: Number;
    office: string;
    itemID: number;
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
}