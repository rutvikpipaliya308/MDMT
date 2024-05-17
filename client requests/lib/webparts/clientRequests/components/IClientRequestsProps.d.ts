import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IClientRequestsProps {
    requestType: string;
    context: WebPartContext;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
    copyFilesFlowUrl: string;
}
export interface IClientRequestsState {
    currentDate: string;
    isInMaintenance: boolean;
    displayMessage: string;
}
//# sourceMappingURL=IClientRequestsProps.d.ts.map