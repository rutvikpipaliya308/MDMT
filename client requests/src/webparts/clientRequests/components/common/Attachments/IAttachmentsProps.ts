import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IApprovalData } from "../../IApprovalData";

export interface IAttachmentProps {
    backStep: any;
    itemID: number;
    listData: any;
    context: WebPartContext;
    approvalData: IApprovalData;

    itemSubmitted: boolean;

    requestJson?: any;
    clientJson?: any;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
    accessLevel?: string;

}
export interface IAttachmentState {
    hiddenDialog: boolean;
    docDescription: string;
    documentsArray: Array<IDocumentDetails>;
    loading: boolean;
    errors?: any;
    toggledClearRows: boolean;
    mainLoading: boolean;
    fileInputLable: string;
    validationmsg: Array<Ivalidationmsg>; //shraddha task 10
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
    //Shraddha 29-09-22 after test
    specialChar: Array<any>;
    charString: string;
    //Shraddha 29-09-22 after test end
    isFHDUser: boolean; //R fhd change 20-9-2023
}

export interface IDocumentDetails {
    Link: any;
    DocName: any;
    FileSize: number;
    Description: string;
    RelativeURL: string;
    Id: string;
    Doctype: any;
    Delete: any;
}

export interface IApprover {
    approvers: number[];
    status: string;
}

export interface ISubmitData {
    data: any;
    body: any;
    notificationBody: any;
    notificationApprovers: number[];
    approverContribute: number[];
    approverRead: number[];
}

//shraddha task 10
export interface Ivalidationmsg {
    valmsg: any[];

}