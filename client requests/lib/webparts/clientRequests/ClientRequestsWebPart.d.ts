import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IClientRequestsWebPartProps {
    requestType: string;
    sendNotificationMSFlowUrl: string;
    permissionMSFlowUrl: string;
    copyFilesFlowUrl: string;
}
export default class ClientRequestsWebPart extends BaseClientSideWebPart<IClientRequestsWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: string, newValue: string): Promise<void>;
}
//# sourceMappingURL=ClientRequestsWebPart.d.ts.map