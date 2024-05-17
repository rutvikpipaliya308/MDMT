import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDueDiligenceProps {
    context: WebPartContext;
    nextStep: any;
    backStep: any
    dataChange: any;
    data: any;
    itemID: number;
    requestType: string;
    listOfEditableFields: any;
    itemSubmitted: boolean;
    listData: any; //shraddha
    isFHDUser: boolean; //r fhd change
}

export interface IDueDiligenceState {
    dpDDOptions: [{
        questionKey: string;
        key: string;
    }];
    loading: boolean;
    rbtnWorkflowType: string;
    errors: any;
    folderPath: string;
    itemID: number;
    questions: any;
    requestType: string;
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
}