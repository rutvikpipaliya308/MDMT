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
    requestor: Number;
    office: string;
    itemID: number;
    currentUserid: any;
    requestorid: any;
}
//# sourceMappingURL=ISection1Props.d.ts.map