import { Web } from 'sp-pnp-js';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { HttpClient, IHttpClientOptions, HttpClientResponse, MSGraphClient } from '@microsoft/sp-http';
import * as Constants from '../Constants';
import { IDropdownProperties } from './IDropdownProperties';
import { ISubmitData } from './common/Attachments/IAttachmentsProps';
import { cloneDeep, uniq } from '@microsoft/sp-lodash-subset';

export const GetMasterListItems = async (objWeb: Web, listURL: string, property: string) => {
    /// <summary>Get data for dropdowns from master list.</summary>
    let viewXML = `<View>
    <ViewFields><FieldRef Name="ID"></FieldRef><FieldRef Name="IncludeInList"></FieldRef><FieldRef Name="Title"></FieldRef><FieldRef Name="Property"></FieldRef><FieldRef Name="AccessLevel"></FieldRef></ViewFields>
    <RowLimit>1000</RowLimit>
    <Query><Where><Eq><FieldRef Name="Property"/><Value Type="Text">`+ property + `</Value></Eq></Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query>
    </View>`;

    var data = await objWeb.getList(listURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText');
    var options = [];
    if (data) {
        for (var i = 0; i < data.length; i++) {
            options.push({ key: data[i]["Title"], text: data[i]["Title"], IncludeInList: data[i]["IncludeInList"], AccessLevel: data[i]["AccessLevel"] });
        }
    }
    return options;
};

//rutvik 13-3-24
export const GetDropDownValuesForCompany = async (objWeb: Web, listURL: string, property: string) => {
    /// <summary>Get data for dropdowns from master list.</summary>
    let viewXML = `<View>
    <ViewFields><FieldRef Name="ID"></FieldRef><FieldRef Name="IncludeInList"></FieldRef><FieldRef Name="Title"></FieldRef><FieldRef Name="Property"></FieldRef><FieldRef Name="AccessLevel"></FieldRef><FieldRef Name="Country"></FieldRef><FieldRef Name="Boolean3"></FieldRef></ViewFields>
    <RowLimit>1000</RowLimit>
    <Query><Where><Eq><FieldRef Name="Property"/><Value Type="Text">`+ property + `</Value></Eq></Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query>
    </View>`;

    var data = await objWeb.getList(listURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText');
    var options = [];
    if (data) {
        for (var i = 0; i < data.length; i++) {
            options.push({ key: data[i]["Title"], text: data[i]["Title"], IncludeInList: data[i]["IncludeInList"], AccessLevel: data[i]["AccessLevel"], Country: data[i]["Country"], Boolean3: data[i]["Boolean3"] });
        }
    }
    return options;
};



export const GetDropdownStateValue = (value: string, dpProperty: IDropdownProperties) => {
    /// <summary>retrun dropdown state object to be set in state object.</summary>
    let tempObj: IDropdownProperties = dpProperty;
    tempObj.value = value;
    return tempObj;
};

//rutvik 10-2-23
export const GetDropdownStateValueDefaultTaxCode = (itemValue: string, dpProperty: any) => {
    // <summary>Render selcted value from dropdown options</summary>  
    let tempObj: IDropdownProperties = dpProperty;
    if (itemValue !== null && itemValue !== undefined) {
        let selectOption = dpProperty.options.filter((item) => item.key.trim() === itemValue.trim());
        tempObj.value = selectOption.length > 0 ? selectOption[0].key : '';
        return tempObj;
    }
    return tempObj;
}

//Shraddha test 7
export const GetDropdownStateValueClientIDType = (itemValue: string, dpProperty: any) => {
    // <summary>Render selcted value from dropdown options</summary>  
    let tempObj: IDropdownProperties = dpProperty;
    if (itemValue !== null && itemValue !== undefined) {
        let selectOption = dpProperty.options.filter((item) => item.key.split('-')[0].trim() === itemValue.trim());
        tempObj.value = selectOption[0].key;
        return tempObj;
    }
    return tempObj;
}

//shraddha test 7
export const GetClientIDTypeDescription = (itemValue: string, dpProperty: any) => {
    // <summary>Render selcted value from dropdown options</summary>   
    if (itemValue !== null && itemValue !== undefined) {
        let selectOption = dpProperty.options.filter((item) => item.key.split('-')[0].trim() === itemValue.trim());
        return selectOption.length > 0 ? selectOption[0].key : itemValue;
    }
    return itemValue;
}

//Shraddha 16-08-22 item 27
export const GetMasterListItemsForDefaultTaxCode = async (objWeb: Web, listURL: string, property: string) => {
    /// <summary>Get data for dropdowns from master list.</summary>
    let viewXML = `<View>
    <ViewFields>
    <FieldRef Name="ID"></FieldRef>
    <FieldRef Name="IncludeInList"></FieldRef>
    <FieldRef Name="Title"></FieldRef>
    <FieldRef Name="Property"></FieldRef>
    <FieldRef Name="AccessLevel"></FieldRef>
    <FieldRef Name="DefaultTaxCodeForClient"></FieldRef>
    
    </ViewFields>
    <RowLimit>1000</RowLimit>
    <Query>
    <Where>
  
    <And>
    <Eq><FieldRef Name="Property"/><Value Type="Text">`+ property + `</Value></Eq>
    <Eq><FieldRef Name="DefaultTaxCodeForClient"/><Value Type="Boolean">1</Value></Eq>
     </And>

    </Where>
    <OrderBy>
    <FieldRef Name='Title' Ascending='True'></FieldRef>
    </OrderBy>
    
    </Query>
    </View>`;

    var data = await objWeb.getList(listURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText');
    var options = [];
    if (data) {
        for (var i = 0; i < data.length; i++) {
            options.push({
                key: data[i]["Title"],
                text: data[i]["Title"],
                IncludeInList: data[i]["IncludeInList"],
                AccessLevel: data[i]["AccessLevel"],
                DefaultTaxCodeForClient: data[i]["DefaultTaxCodeForClient"]
            });
        }
    }
    return options;
};
//Shraddha 16-08-22 item 27 end

export const GetSelectedDropdownValue = (itemValue: string, dropdown: any) => {
    // <summary>Render selcted value from dropdown options</summary>
    let dropdownArrayValue = [];
    if (itemValue !== null && itemValue !== undefined && itemValue.trim().length > 0) {
        dropdownArrayValue = dropdown.options.filter(value => value.text === itemValue);
    }
    return dropdownArrayValue.length > 0 ? dropdownArrayValue[0].text : '';
}


export const GetSingleListData = async (objWeb: Web, listURL: string, viewXML: string) => {
    /// <summary>Get single value from list.</summary>
    let data = await objWeb.getList(listURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText');
    let item = null;
    if (data !== null) {
        item = data[0];
    }
    return item;
};

//Shraddha 29-09-22 after test changes 
export const CheckSpecialChar = (array: Array<any>, value: string) => {
    var temp = false;
    array.forEach(item => {
        if (value.indexOf(item.Title) >= 0) {
            temp = true;
        }
    })

    if (temp) {
        return true;
    } else {
        return false;
    }
}

export const CheckIsMaconomyIdPresent = async (objWeb: Web, listURL: string, macID: string) => {
    let updateRequestDataXML = `<View>
        <ViewFields>
            <FieldRef Name="ID"></FieldRef>
            <FieldRef Name="MaconomyAccountID"></FieldRef>
        </ViewFields>
        <RowLimit>1</RowLimit>
        <Query>
            <Where>
                <Eq><FieldRef Name="MaconomyAccountID" /><Value Type="Text">`+ macID + `</Value></Eq>
            </Where>
        </Query>
    </View>`;

    let upateRequestData = await GetSingleListData(objWeb, listURL, updateRequestDataXML);

    if (upateRequestData === undefined) {
        return false;
    }
    return true;
}

export const CallMSFlow = async (context: WebPartContext, body: string, flowURL: string): Promise<HttpClientResponse> => {
    /// <summary>Call ms flow to set permissions on request and documents.</summary>
    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-type', 'application/json');

    const httpClientOptions: IHttpClientOptions = {
        body: body,
        headers: requestHeaders
    };

    const response = await context.httpClient.post(
        flowURL,
        HttpClient.configurations.v1,
        httpClientOptions);
    return response;
};


export const CheckRequiredField = (value: string) => {
    /// <summary>Validate required field.</summary>
    if (!value || value === undefined || value.trim().length <= 0 || value === null) {
        return false;
    } else {
        return true;
    }
};

//rutvik 28-3-24
export const CheckZipCodeValidationForSaudiCompany = (value: string) => {
    /// <summary>Lengh should be 5 and only number is allowed</summary>
    if (value.trim().length !== 5 || !containsOnlyNumbers(value)) {
        return false;
    }
    else {
        return true;
    }
};

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

export const GetCurrentUserId = async (objWeb: Web): Promise<Number> => {
    /// <summary>Get current loggein user id.</summary>
    try {
        return Promise.resolve(
            objWeb.currentUser.get().then((user) => {
                return user.Id;
            }));
    }
    catch (error) {
        console.log("GetCurrentUserId (Utils.ts)--->", error);
    }
};

export const GetUserUPNFromGraphAPI = async (objContext: WebPartContext) => {
    let client: MSGraphClient = await objContext.msGraphClientFactory
        .getClient();

    // get information about the current user from the Microsoft Graph
    let response: any = await client.api('/me')
        .get();
    let userUPN = response.userPrincipalName;
    return userUPN ? String(userUPN) : "";
}

export const GenerateRequestID = (value: number): string => {
    /// <summary>Generate request ID for request.</summary>
    let str = value.toString();
    let pad = "000000";
    return "MD" + pad.substring(0, pad.length - str.length) + str;
};

export const CreateAttachmentFolder = async (objWeb: Web, serverRelativeURL: string, itemID: number): Promise<string> => {
    // <summary>Create new attachment folder in document library</summary>
    try {
        let currentYear = new Date().getFullYear();
        let folderRelativeURL: string = '';

        let currentyearfolder = await objWeb.getFolderByServerRelativeUrl(`${serverRelativeURL}/${Constants.ATTACHMENTS_INTERNALNAME}/${currentYear}`).listItemAllFields.get();

        if (currentyearfolder.ID === undefined) {
            await objWeb.getFolderByServerRelativeUrl(`${serverRelativeURL}/${Constants.ATTACHMENTS_INTERNALNAME}`).folders.add(`${currentYear}`);
        }

        let currentrequestfolder = await objWeb.getFolderByServerRelativeUrl(`${serverRelativeURL}/${Constants.ATTACHMENTS_INTERNALNAME}/${currentYear}/${itemID}`).listItemAllFields.get();

        if (currentrequestfolder.ID === undefined) {
            let folder = await objWeb.getFolderByServerRelativeUrl(`${serverRelativeURL}/${Constants.ATTACHMENTS_INTERNALNAME}/${currentYear}`).folders.add(String(itemID));
            folderRelativeURL = folder.data.ServerRelativeUrl;
        }
        else {
            folderRelativeURL = currentrequestfolder.ServerRelativeUrl;
        }
        return folderRelativeURL;
    }
    catch (error) {
        console.log("CreateAttachmentFolder(Attachments.tsx)--->", error);
    }
};

export const CheckUserAddPermission = async (objWeb: Web, PermissionKind: any): Promise<boolean> => {
    // <summary>Check user has add and edit list item pemission in site or not</summary>
    let hasPermission: boolean = false;
    await objWeb.select('EffectiveBasePermissions').get()
        .then(async ({ EffectiveBasePermissions }) => {
            if (objWeb.hasPermissions(EffectiveBasePermissions, PermissionKind.AddListItems) && objWeb.hasPermissions(EffectiveBasePermissions, PermissionKind.EditListItems)) {
                hasPermission = true;
            }
            else { hasPermission = false; }
        });
    return hasPermission;
};

export const CheckUserItemEditPermission = async (serverRelativeURL: string, objWeb: Web, PermissionKind: any, itemID: number): Promise<boolean> => {
    /// <summary>Check user has edit pemission on specified list item id or not.</summary>
    let hasPermission: boolean = false;
    await objWeb.getList(serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(itemID).select('EffectiveBasePermissions').get().then(async ({ EffectiveBasePermissions }) => {
        if (objWeb.hasPermissions(EffectiveBasePermissions, PermissionKind.EditListItems)) {
            hasPermission = true;
        }
        else { hasPermission = false; }
    });

    return hasPermission;
};

export const TrimData = (value: string) => {
    // <summary>trim string value</summary>
    // <param name="value">string value</param>
    return value !== null && value !== undefined ? value.trim() : '';
}

export const GetMaconomyDataFromKey = async (objWeb: Web, listURL: string, key: string) => {
    /// <summary>Get single item from mac_company list based on key.</summary>
    let item: string = '';
    if (key !== null && key !== undefined && key.length > 0) {

        let data = await objWeb.getList(listURL).items.select('Title', 'Key').filter(`Key eq '${key}' or Title eq '${key}'`).get();

        if (data !== null && data.length > 0) {
            item = data[0].Title;
        }
        return item;
    }
    return '';

};

export const SplitData = (value: string) => {
    // <summary>trim string value</summary>
    // <param name="value">string value</param>
    return value !== null && value !== undefined ? value.split('-')[0].trim() : '';
}

export const GetCurrentUserOffice = async (objWeb: Web, objContext: WebPartContext) => {
    //<summary>get login user office from AD</summary>
    var user = await objWeb.currentUser.get();
    let data = await GetUserDetailsFromGraphAPI(objContext);
    return data ? String(data) : "";
}

export const GetUserDetailsFromGraphAPI = async (objContext: WebPartContext) => {
    let client: MSGraphClient = await objContext.msGraphClientFactory
        .getClient();

    // get information about the current user from the Microsoft Graph
    let response: any = await client.api('/me')
        .get();
    let officeLocation = response.officeLocation;
    return officeLocation;
}

export const GetSubmitDetails = async (objsubmitData: ISubmitData, strings: any, approvalData: any, requestorID: any, objWeb: Web, serverRelativeURL: string, requestoridd: string) => {
    let tempSubmitData: ISubmitData = objsubmitData;
    let viewXML = `<View><ViewFields>

    <FieldRef Name="Title"></FieldRef>
    <FieldRef Name="RequestType"></FieldRef>
    <FieldRef Name="WorkflowType"></FieldRef>
    <FieldRef Name="Stage1_required"></FieldRef>
    <FieldRef Name="Stage1_approver"></FieldRef>
    <FieldRef Name="Stage1_sub_approver"></FieldRef>
    <FieldRef Name="stage2_required"></FieldRef>
    <FieldRef Name="stage2_approver"></FieldRef>
    <FieldRef Name="stage2_sub_approver"></FieldRef>
    <FieldRef Name="stage3_required"></FieldRef>
    <FieldRef Name="stage3_approver"></FieldRef>
    <FieldRef Name="stage3_sub_approver"></FieldRef>
    </ViewFields>
    <RowLimit>1</RowLimit>
    <Query>
    <Where><And><And>
            <Eq><FieldRef Name="Title"/><Value Type="Text">`+ approvalData.company + `</Value></Eq>
            <Eq><FieldRef Name="RequestType"/><Value Type="Text">`+ approvalData.requestType + `</Value></Eq>
        </And>
        <Eq><FieldRef Name="WorkflowType"/><Value Type="Text">`+ approvalData.workflowType + `</Value></Eq></And></Where></Query></View>`;
    let item = await GetSingleListData(objWeb, serverRelativeURL + "/Lists/" + Constants.APPROVERMASTER_INTERNALNAME, viewXML);

    if (item !== null && item !== undefined) {
        tempSubmitData.data["Stage1Status"] = strings.ApprovalStatus[0];
        let notificationApprovers: number[] = [];
        let approverContribute: number[] = [];
        let SubstituteApprover: number[] = []; //dec CR
        let approverRead: number[] = [];
        tempSubmitData.data["Stage1Comments"] = "";
        tempSubmitData.data["Stage2Comments"] = "";
        tempSubmitData.data["Stage3Comments"] = "";
        if (item.Stage1_required && item.stage2_required && item.stage3_required) {
            tempSubmitData.data["Stage1ApproverId"] = item.Stage1_approverId;
            tempSubmitData.data["Stage1_sub_approverId"] = item.Stage1_sub_approverId;

            tempSubmitData.data["Stage2ApproverId"] = item.stage2_approverId;
            tempSubmitData.data["Stage2_sub_approverId"] = item.stage2_sub_approverId;
            tempSubmitData.data["Stage2Status"] = strings.ApprovalStatus[1];

            tempSubmitData.data["Stage3ApproverId"] = item.stage3_approverId;
            tempSubmitData.data["Stage3_sub_approverId"] = item.stage3_sub_approverId;
            tempSubmitData.data["Stage3Status"] = strings.ApprovalStatus[1];

            notificationApprovers.push(GetNotificationApprover(item.Stage1_approverId, item.Stage1_sub_approverId, requestorID));
            SubstituteApprover.push(GetSubstituteApprover(item.Stage1_approverId, item.Stage1_sub_approverId, requestorID)); //dec CR

            approverContribute = [item.Stage1_approverId, item.Stage1_sub_approverId];
            approverRead = [item.stage2_approverId, item.stage2_sub_approverId, item.stage3_approverId, item.stage3_sub_approverId];
        }
        else if (item.Stage1_required && !item.stage2_required && !item.stage3_required) {
            tempSubmitData.data["Stage1ApproverId"] = item.Stage1_approverId;
            tempSubmitData.data["Stage1_sub_approverId"] = item.Stage1_sub_approverId;

            notificationApprovers.push(GetNotificationApprover(item.Stage1_approverId, item.Stage1_sub_approverId, requestorID));
            SubstituteApprover.push(GetSubstituteApprover(item.Stage1_approverId, item.Stage1_sub_approverId, requestorID)); //dec CR

            approverContribute = [item.Stage1_approverId, item.Stage1_sub_approverId];
        }
        else if (!item.Stage1_required && item.stage2_required && !item.stage3_required) {
            tempSubmitData.data["Stage1ApproverId"] = item.stage2_approverId;
            tempSubmitData.data["Stage1_sub_approverId"] = item.stage2_sub_approverId;

            notificationApprovers.push(GetNotificationApprover(item.stage2_approverId, item.stage2_sub_approverId, requestorID));
            SubstituteApprover.push(GetSubstituteApprover(item.stage2_approverId, item.stage2_sub_approverId, requestorID)); //dec CR

            approverContribute = [item.stage2_approverId, item.stage2_sub_approverId];
        }
        else if (!item.Stage1_required && !item.stage2_required && item.stage3_required) {
            tempSubmitData.data["Stage1ApproverId"] = item.stage3_approverId;
            tempSubmitData.data["Stage1_sub_approverId"] = item.stage3_sub_approverId;

            notificationApprovers.push(GetNotificationApprover(item.stage3_approverId, item.stage3_sub_approverId, requestorID));
            SubstituteApprover.push(GetSubstituteApprover(item.stage3_approverId, item.stage3_sub_approverId, requestorID)); //dec CR            

            approverContribute = [item.stage3_approverId, item.stage3_sub_approverId];
        }
        else if (item.Stage1_required && item.stage2_required && !item.stage3_required) {
            tempSubmitData.data["Stage1ApproverId"] = item.Stage1_approverId;
            tempSubmitData.data["Stage1_sub_approverId"] = item.Stage1_sub_approverId;

            tempSubmitData.data["Stage2ApproverId"] = item.stage2_approverId;
            tempSubmitData.data["Stage2_sub_approverId"] = item.stage2_sub_approverId;
            tempSubmitData.data["Stage2Status"] = strings.ApprovalStatus[1];

            notificationApprovers.push(GetNotificationApprover(item.Stage1_approverId, item.Stage1_sub_approverId, requestorID));
            SubstituteApprover.push(GetSubstituteApprover(item.Stage1_approverId, item.Stage1_sub_approverId, requestorID)); //dec CR

            approverContribute = [item.Stage1_approverId, item.Stage1_sub_approverId];
            approverRead = [item.stage2_approverId, item.stage2_sub_approverId];
        }
        else if (item.Stage1_required && !item.stage2_required && item.stage3_required) {
            tempSubmitData.data["Stage1ApproverId"] = item.Stage1_approverId;
            tempSubmitData.data["Stage1_sub_approverId"] = item.Stage1_sub_approverId;

            tempSubmitData.data["Stage2ApproverId"] = item.stage3_approverId;
            tempSubmitData.data["Stage2_sub_approverId"] = item.stage3_sub_approverId;
            tempSubmitData.data["Stage2Status"] = strings.ApprovalStatus[1];

            notificationApprovers.push(GetNotificationApprover(item.Stage1_approverId, item.Stage1_sub_approverId, requestorID));
            SubstituteApprover.push(GetSubstituteApprover(item.Stage1_approverId, item.Stage1_sub_approverId, requestorID)); //dec CR

            approverContribute = [item.Stage1_approverId, item.Stage1_sub_approverId];
            approverRead = [item.stage3_approverId, item.stage3_sub_approverId];
        }
        else if (!item.Stage1_required && item.stage2_required && item.stage3_required) {
            tempSubmitData.data["Stage1ApproverId"] = item.stage2_approverId;
            tempSubmitData.data["Stage1_sub_approverId"] = item.stage2_sub_approverId;

            tempSubmitData.data["Stage2ApproverId"] = item.stage3_approverId;
            tempSubmitData.data["Stage2_sub_approverId"] = item.stage3_sub_approverId;
            tempSubmitData.data["Stage2Status"] = strings.ApprovalStatus[1];

            notificationApprovers.push(GetNotificationApprover(item.stage2_approverId, item.stage2_sub_approverId, requestorID));
            SubstituteApprover.push(GetSubstituteApprover(item.stage2_approverId, item.stage2_sub_approverId, requestorID)); //dec CR

            approverContribute = [item.stage2_approverId, item.stage2_sub_approverId];
            approverRead = [item.stage3_approverId, item.stage3_sub_approverId];
        }


        approverRead.push(approvalData.requestorID);
        approverRead.push(Constants.EVERYONE_ID);
        let folderRead: number[] = cloneDeep(approverContribute);
        folderRead.push(...approverRead);
        folderRead = uniq(folderRead);

        //25-10-23 R All user should not read files of requests. Only requestor, admin, approver and FHD user can read/access the file.
        let indexid = folderRead.indexOf(Constants.EVERYONE_ID);
        if (indexid > -1) {
            folderRead.splice(indexid, 1);
        }

        approverContribute = approverContribute.filter(x => x != requestorID);
        tempSubmitData.body["FolderRead"] = folderRead.join(',');
        //tempSubmitData.body["FolderContribute"] = approverContribute.join(',');
        tempSubmitData.body["FolderContribute"] = requestoridd.toString().concat(',', approverContribute.join(','));
        tempSubmitData.body["ReqRead"] = approverRead.join(',');

        //Shraddha 10-08-22 item 4
        tempSubmitData.body["ReqContribute"] = requestoridd.toString().concat(',', approverContribute.join(','));

        tempSubmitData.notificationBody["NextApprover"] = notificationApprovers.join(',');
        tempSubmitData.notificationBody["SubstituteApprover"] = SubstituteApprover.join(','); //dec CR

        return tempSubmitData;
    } else {

        return null;
    }
}

export const GetNotificationApprover = (primaryApprover, subApprover, requestorID) => {
    // <summary>return aporover id for notification</summary>
    return primaryApprover != requestorID ? primaryApprover : subApprover;
}

//dec CR
export const GetSubstituteApprover = (primaryApprover, subApprover, requestorID) => {
    // <summary>return aporover id for notification</summary>
    return primaryApprover != requestorID ? subApprover : null;
}

//07-02-23 change
export const AddErrorLogs = async (serverRelativeUrl: string, objWeb: Web, RequestID, Error) => {
    //error log change
    let errordata = {
        Title: new Date().toString(),
        Errors: Error.toString(),
        RequestID: RequestID
    }
    return await objWeb.lists.getByTitle(Constants.ERRORLIST).items.add(errordata);
}
