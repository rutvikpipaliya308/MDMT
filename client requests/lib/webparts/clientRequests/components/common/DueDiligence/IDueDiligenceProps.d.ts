import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IDueDiligenceProps {
    context: WebPartContext;
    nextStep: any;
    backStep: any;
    dataChange: any;
    data: any;
    itemID: number;
    requestType: string;
    listOfEditableFields: any;
    itemSubmitted: boolean;
    listData: any;
    isFHDUser: boolean;
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
    currentUserid: any;
    requestorid: any;
}
//# sourceMappingURL=IDueDiligenceProps.d.ts.map