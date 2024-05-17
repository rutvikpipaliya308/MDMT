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
    currentUserid: any;
    requestorid: any;
    countryOfCompany: string;
}
//# sourceMappingURL=ISection1Props.d.ts.map