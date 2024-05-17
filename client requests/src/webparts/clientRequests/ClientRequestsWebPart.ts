import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneTextField } from '@microsoft/sp-webpart-base';

import * as strings from 'ClientRequestsWebPartStrings';
import ClientRequests from './components/ClientRequests';
import { IClientRequestsProps } from './components/IClientRequestsProps';

import { REQUESTTYPE_OPTIONS } from './Constants';

export interface IClientRequestsWebPartProps {
  requestType: string;
  sendNotificationMSFlowUrl: string;
  permissionMSFlowUrl: string;
  copyFilesFlowUrl: string;
}

export default class ClientRequestsWebPart extends BaseClientSideWebPart<IClientRequestsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IClientRequestsProps> = React.createElement(
      ClientRequests,
      {
        requestType: this.properties.requestType,
        context: this.context,
        sendNotificationMSFlowUrl: this.properties.sendNotificationMSFlowUrl,
        permissionMSFlowUrl: this.properties.permissionMSFlowUrl,
        copyFilesFlowUrl: this.properties.copyFilesFlowUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('requestType', {
                  label: strings.RequestTypeFieldLabel,
                  options: REQUESTTYPE_OPTIONS,
                }),
                PropertyPaneTextField('sendNotificationMSFlowUrl', {
                  label: strings.Lbl_SENDNOTIFICATIONS_MSFLOW_URL
                }),
                PropertyPaneTextField('permissionMSFlowUrl', {
                  label: strings.Lbl_PERMISSION_MSFLOW_URL
                }),
                PropertyPaneTextField('copyFilesFlowUrl', {
                  label: strings.Lbl_COPYFILESFLOW_URL
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: string, newValue: string) {
    if (propertyPath === 'requestType') {
      this.properties.requestType = newValue;
    } else if (propertyPath === 'sendNotificationMSFlowUrl') {
      this.properties.sendNotificationMSFlowUrl = newValue;
    } else if (propertyPath === 'permissionMSFlowUrl') {
      this.properties.permissionMSFlowUrl = newValue;
    } else if (propertyPath === 'copyFilesFlowUrl') {
      this.properties.copyFilesFlowUrl = newValue;
    }
    
    this.context.propertyPane.refresh();
    this.render();
  }
}
