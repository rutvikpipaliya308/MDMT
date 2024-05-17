var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import { HttpClient } from '@microsoft/sp-http';
import * as Constants from '../Constants';
import { cloneDeep, uniq } from '@microsoft/sp-lodash-subset';
export var GetMasterListItems = function (objWeb, listURL, property) { return __awaiter(_this, void 0, void 0, function () {
    var viewXML, data, options, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                viewXML = "<View>\n    <ViewFields><FieldRef Name=\"ID\"></FieldRef><FieldRef Name=\"IncludeInList\"></FieldRef><FieldRef Name=\"Title\"></FieldRef><FieldRef Name=\"Property\"></FieldRef><FieldRef Name=\"AccessLevel\"></FieldRef></ViewFields>\n    <RowLimit>1000</RowLimit>\n    <Query><Where><Eq><FieldRef Name=\"Property\"/><Value Type=\"Text\">" + property + "</Value></Eq></Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query>\n    </View>";
                return [4 /*yield*/, objWeb.getList(listURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText')];
            case 1:
                data = _a.sent();
                options = [];
                if (data) {
                    for (i = 0; i < data.length; i++) {
                        options.push({ key: data[i]["Title"], text: data[i]["Title"], IncludeInList: data[i]["IncludeInList"], AccessLevel: data[i]["AccessLevel"] });
                    }
                }
                return [2 /*return*/, options];
        }
    });
}); };
//rutvik 13-3-24
export var GetDropDownValuesForCompany = function (objWeb, listURL, property) { return __awaiter(_this, void 0, void 0, function () {
    var viewXML, data, options, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                viewXML = "<View>\n    <ViewFields><FieldRef Name=\"ID\"></FieldRef><FieldRef Name=\"IncludeInList\"></FieldRef><FieldRef Name=\"Title\"></FieldRef><FieldRef Name=\"Property\"></FieldRef><FieldRef Name=\"AccessLevel\"></FieldRef><FieldRef Name=\"Country\"></FieldRef><FieldRef Name=\"Boolean3\"></FieldRef></ViewFields>\n    <RowLimit>1000</RowLimit>\n    <Query><Where><Eq><FieldRef Name=\"Property\"/><Value Type=\"Text\">" + property + "</Value></Eq></Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query>\n    </View>";
                return [4 /*yield*/, objWeb.getList(listURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText')];
            case 1:
                data = _a.sent();
                options = [];
                if (data) {
                    for (i = 0; i < data.length; i++) {
                        options.push({ key: data[i]["Title"], text: data[i]["Title"], IncludeInList: data[i]["IncludeInList"], AccessLevel: data[i]["AccessLevel"], Country: data[i]["Country"], Boolean3: data[i]["Boolean3"] });
                    }
                }
                return [2 /*return*/, options];
        }
    });
}); };
export var GetDropdownStateValue = function (value, dpProperty) {
    /// <summary>retrun dropdown state object to be set in state object.</summary>
    var tempObj = dpProperty;
    tempObj.value = value;
    return tempObj;
};
//rutvik 10-2-23
export var GetDropdownStateValueDefaultTaxCode = function (itemValue, dpProperty) {
    // <summary>Render selcted value from dropdown options</summary>  
    var tempObj = dpProperty;
    if (itemValue !== null && itemValue !== undefined) {
        var selectOption = dpProperty.options.filter(function (item) { return item.key.trim() === itemValue.trim(); });
        tempObj.value = selectOption.length > 0 ? selectOption[0].key : '';
        return tempObj;
    }
    return tempObj;
};
//Shraddha test 7
export var GetDropdownStateValueClientIDType = function (itemValue, dpProperty) {
    // <summary>Render selcted value from dropdown options</summary>  
    var tempObj = dpProperty;
    if (itemValue !== null && itemValue !== undefined) {
        var selectOption = dpProperty.options.filter(function (item) { return item.key.split('-')[0].trim() === itemValue.trim(); });
        tempObj.value = selectOption[0].key;
        return tempObj;
    }
    return tempObj;
};
//shraddha test 7
export var GetClientIDTypeDescription = function (itemValue, dpProperty) {
    // <summary>Render selcted value from dropdown options</summary>   
    if (itemValue !== null && itemValue !== undefined) {
        var selectOption = dpProperty.options.filter(function (item) { return item.key.split('-')[0].trim() === itemValue.trim(); });
        return selectOption.length > 0 ? selectOption[0].key : itemValue;
    }
    return itemValue;
};
//Shraddha 16-08-22 item 27
export var GetMasterListItemsForDefaultTaxCode = function (objWeb, listURL, property) { return __awaiter(_this, void 0, void 0, function () {
    var viewXML, data, options, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                viewXML = "<View>\n    <ViewFields>\n    <FieldRef Name=\"ID\"></FieldRef>\n    <FieldRef Name=\"IncludeInList\"></FieldRef>\n    <FieldRef Name=\"Title\"></FieldRef>\n    <FieldRef Name=\"Property\"></FieldRef>\n    <FieldRef Name=\"AccessLevel\"></FieldRef>\n    <FieldRef Name=\"DefaultTaxCodeForClient\"></FieldRef>\n    \n    </ViewFields>\n    <RowLimit>1000</RowLimit>\n    <Query>\n    <Where>\n  \n    <And>\n    <Eq><FieldRef Name=\"Property\"/><Value Type=\"Text\">" + property + "</Value></Eq>\n    <Eq><FieldRef Name=\"DefaultTaxCodeForClient\"/><Value Type=\"Boolean\">1</Value></Eq>\n     </And>\n\n    </Where>\n    <OrderBy>\n    <FieldRef Name='Title' Ascending='True'></FieldRef>\n    </OrderBy>\n    \n    </Query>\n    </View>";
                return [4 /*yield*/, objWeb.getList(listURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText')];
            case 1:
                data = _a.sent();
                options = [];
                if (data) {
                    for (i = 0; i < data.length; i++) {
                        options.push({
                            key: data[i]["Title"],
                            text: data[i]["Title"],
                            IncludeInList: data[i]["IncludeInList"],
                            AccessLevel: data[i]["AccessLevel"],
                            DefaultTaxCodeForClient: data[i]["DefaultTaxCodeForClient"]
                        });
                    }
                }
                return [2 /*return*/, options];
        }
    });
}); };
//Shraddha 16-08-22 item 27 end
export var GetSelectedDropdownValue = function (itemValue, dropdown) {
    // <summary>Render selcted value from dropdown options</summary>
    var dropdownArrayValue = [];
    if (itemValue !== null && itemValue !== undefined && itemValue.trim().length > 0) {
        dropdownArrayValue = dropdown.options.filter(function (value) { return value.text === itemValue; });
    }
    return dropdownArrayValue.length > 0 ? dropdownArrayValue[0].text : '';
};
export var GetSingleListData = function (objWeb, listURL, viewXML) { return __awaiter(_this, void 0, void 0, function () {
    var data, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, objWeb.getList(listURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText')];
            case 1:
                data = _a.sent();
                item = null;
                if (data !== null) {
                    item = data[0];
                }
                return [2 /*return*/, item];
        }
    });
}); };
//Shraddha 29-09-22 after test changes 
export var CheckSpecialChar = function (array, value) {
    var temp = false;
    array.forEach(function (item) {
        if (value.indexOf(item.Title) >= 0) {
            temp = true;
        }
    });
    if (temp) {
        return true;
    }
    else {
        return false;
    }
};
export var CheckIsMaconomyIdPresent = function (objWeb, listURL, macID) { return __awaiter(_this, void 0, void 0, function () {
    var updateRequestDataXML, upateRequestData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateRequestDataXML = "<View>\n        <ViewFields>\n            <FieldRef Name=\"ID\"></FieldRef>\n            <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n        </ViewFields>\n        <RowLimit>1</RowLimit>\n        <Query>\n            <Where>\n                <Eq><FieldRef Name=\"MaconomyAccountID\" /><Value Type=\"Text\">" + macID + "</Value></Eq>\n            </Where>\n        </Query>\n    </View>";
                return [4 /*yield*/, GetSingleListData(objWeb, listURL, updateRequestDataXML)];
            case 1:
                upateRequestData = _a.sent();
                if (upateRequestData === undefined) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
        }
    });
}); };
export var CallMSFlow = function (context, body, flowURL) { return __awaiter(_this, void 0, void 0, function () {
    var requestHeaders, httpClientOptions, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestHeaders = new Headers();
                requestHeaders.append('Content-type', 'application/json');
                httpClientOptions = {
                    body: body,
                    headers: requestHeaders
                };
                return [4 /*yield*/, context.httpClient.post(flowURL, HttpClient.configurations.v1, httpClientOptions)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
export var CheckRequiredField = function (value) {
    /// <summary>Validate required field.</summary>
    if (!value || value === undefined || value.trim().length <= 0 || value === null) {
        return false;
    }
    else {
        return true;
    }
};
//rutvik 28-3-24
export var CheckZipCodeValidationForSaudiCompany = function (value) {
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
export var GetCurrentUserId = function (objWeb) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        /// <summary>Get current loggein user id.</summary>
        try {
            return [2 /*return*/, Promise.resolve(objWeb.currentUser.get().then(function (user) {
                    return user.Id;
                }))];
        }
        catch (error) {
            console.log("GetCurrentUserId (Utils.ts)--->", error);
        }
        return [2 /*return*/];
    });
}); };
export var GetUserUPNFromGraphAPI = function (objContext) { return __awaiter(_this, void 0, void 0, function () {
    var client, response, userUPN;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, objContext.msGraphClientFactory
                    .getClient()];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, client.api('/me')
                        .get()];
            case 2:
                response = _a.sent();
                userUPN = response.userPrincipalName;
                return [2 /*return*/, userUPN ? String(userUPN) : ""];
        }
    });
}); };
export var GenerateRequestID = function (value) {
    /// <summary>Generate request ID for request.</summary>
    var str = value.toString();
    var pad = "000000";
    return "MD" + pad.substring(0, pad.length - str.length) + str;
};
export var CreateAttachmentFolder = function (objWeb, serverRelativeURL, itemID) { return __awaiter(_this, void 0, void 0, function () {
    var currentYear, folderRelativeURL, currentyearfolder, currentrequestfolder, folder, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                currentYear = new Date().getFullYear();
                folderRelativeURL = '';
                return [4 /*yield*/, objWeb.getFolderByServerRelativeUrl(serverRelativeURL + "/" + Constants.ATTACHMENTS_INTERNALNAME + "/" + currentYear).listItemAllFields.get()];
            case 1:
                currentyearfolder = _a.sent();
                if (!(currentyearfolder.ID === undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, objWeb.getFolderByServerRelativeUrl(serverRelativeURL + "/" + Constants.ATTACHMENTS_INTERNALNAME).folders.add("" + currentYear)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, objWeb.getFolderByServerRelativeUrl(serverRelativeURL + "/" + Constants.ATTACHMENTS_INTERNALNAME + "/" + currentYear + "/" + itemID).listItemAllFields.get()];
            case 4:
                currentrequestfolder = _a.sent();
                if (!(currentrequestfolder.ID === undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, objWeb.getFolderByServerRelativeUrl(serverRelativeURL + "/" + Constants.ATTACHMENTS_INTERNALNAME + "/" + currentYear).folders.add(String(itemID))];
            case 5:
                folder = _a.sent();
                folderRelativeURL = folder.data.ServerRelativeUrl;
                return [3 /*break*/, 7];
            case 6:
                folderRelativeURL = currentrequestfolder.ServerRelativeUrl;
                _a.label = 7;
            case 7: return [2 /*return*/, folderRelativeURL];
            case 8:
                error_1 = _a.sent();
                console.log("CreateAttachmentFolder(Attachments.tsx)--->", error_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
export var CheckUserAddPermission = function (objWeb, PermissionKind) { return __awaiter(_this, void 0, void 0, function () {
    var hasPermission;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hasPermission = false;
                return [4 /*yield*/, objWeb.select('EffectiveBasePermissions').get()
                        .then(function (_a) {
                        var EffectiveBasePermissions = _a.EffectiveBasePermissions;
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                if (objWeb.hasPermissions(EffectiveBasePermissions, PermissionKind.AddListItems) && objWeb.hasPermissions(EffectiveBasePermissions, PermissionKind.EditListItems)) {
                                    hasPermission = true;
                                }
                                else {
                                    hasPermission = false;
                                }
                                return [2 /*return*/];
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, hasPermission];
        }
    });
}); };
export var CheckUserItemEditPermission = function (serverRelativeURL, objWeb, PermissionKind, itemID) { return __awaiter(_this, void 0, void 0, function () {
    var hasPermission;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hasPermission = false;
                return [4 /*yield*/, objWeb.getList(serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(itemID).select('EffectiveBasePermissions').get().then(function (_a) {
                        var EffectiveBasePermissions = _a.EffectiveBasePermissions;
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                if (objWeb.hasPermissions(EffectiveBasePermissions, PermissionKind.EditListItems)) {
                                    hasPermission = true;
                                }
                                else {
                                    hasPermission = false;
                                }
                                return [2 /*return*/];
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, hasPermission];
        }
    });
}); };
export var TrimData = function (value) {
    // <summary>trim string value</summary>
    // <param name="value">string value</param>
    return value !== null && value !== undefined ? value.trim() : '';
};
export var GetMaconomyDataFromKey = function (objWeb, listURL, key) { return __awaiter(_this, void 0, void 0, function () {
    var item, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                item = '';
                if (!(key !== null && key !== undefined && key.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, objWeb.getList(listURL).items.select('Title', 'Key').filter("Key eq '" + key + "' or Title eq '" + key + "'").get()];
            case 1:
                data = _a.sent();
                if (data !== null && data.length > 0) {
                    item = data[0].Title;
                }
                return [2 /*return*/, item];
            case 2: return [2 /*return*/, ''];
        }
    });
}); };
export var SplitData = function (value) {
    // <summary>trim string value</summary>
    // <param name="value">string value</param>
    return value !== null && value !== undefined ? value.split('-')[0].trim() : '';
};
export var GetCurrentUserOffice = function (objWeb, objContext) { return __awaiter(_this, void 0, void 0, function () {
    var user, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, objWeb.currentUser.get()];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, GetUserDetailsFromGraphAPI(objContext)];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data ? String(data) : ""];
        }
    });
}); };
export var GetUserDetailsFromGraphAPI = function (objContext) { return __awaiter(_this, void 0, void 0, function () {
    var client, response, officeLocation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, objContext.msGraphClientFactory
                    .getClient()];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, client.api('/me')
                        .get()];
            case 2:
                response = _a.sent();
                officeLocation = response.officeLocation;
                return [2 /*return*/, officeLocation];
        }
    });
}); };
export var GetSubmitDetails = function (objsubmitData, strings, approvalData, requestorID, objWeb, serverRelativeURL, requestoridd) { return __awaiter(_this, void 0, void 0, function () {
    var tempSubmitData, viewXML, item, notificationApprovers, approverContribute, SubstituteApprover, approverRead, folderRead, indexid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tempSubmitData = objsubmitData;
                viewXML = "<View><ViewFields>\n\n    <FieldRef Name=\"Title\"></FieldRef>\n    <FieldRef Name=\"RequestType\"></FieldRef>\n    <FieldRef Name=\"WorkflowType\"></FieldRef>\n    <FieldRef Name=\"Stage1_required\"></FieldRef>\n    <FieldRef Name=\"Stage1_approver\"></FieldRef>\n    <FieldRef Name=\"Stage1_sub_approver\"></FieldRef>\n    <FieldRef Name=\"stage2_required\"></FieldRef>\n    <FieldRef Name=\"stage2_approver\"></FieldRef>\n    <FieldRef Name=\"stage2_sub_approver\"></FieldRef>\n    <FieldRef Name=\"stage3_required\"></FieldRef>\n    <FieldRef Name=\"stage3_approver\"></FieldRef>\n    <FieldRef Name=\"stage3_sub_approver\"></FieldRef>\n    </ViewFields>\n    <RowLimit>1</RowLimit>\n    <Query>\n    <Where><And><And>\n            <Eq><FieldRef Name=\"Title\"/><Value Type=\"Text\">" + approvalData.company + "</Value></Eq>\n            <Eq><FieldRef Name=\"RequestType\"/><Value Type=\"Text\">" + approvalData.requestType + "</Value></Eq>\n        </And>\n        <Eq><FieldRef Name=\"WorkflowType\"/><Value Type=\"Text\">" + approvalData.workflowType + "</Value></Eq></And></Where></Query></View>";
                return [4 /*yield*/, GetSingleListData(objWeb, serverRelativeURL + "/Lists/" + Constants.APPROVERMASTER_INTERNALNAME, viewXML)];
            case 1:
                item = _a.sent();
                if (item !== null && item !== undefined) {
                    tempSubmitData.data["Stage1Status"] = strings.ApprovalStatus[0];
                    notificationApprovers = [];
                    approverContribute = [];
                    SubstituteApprover = [];
                    approverRead = [];
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
                    folderRead = cloneDeep(approverContribute);
                    folderRead.push.apply(folderRead, approverRead);
                    folderRead = uniq(folderRead);
                    indexid = folderRead.indexOf(Constants.EVERYONE_ID);
                    if (indexid > -1) {
                        folderRead.splice(indexid, 1);
                    }
                    approverContribute = approverContribute.filter(function (x) { return x != requestorID; });
                    tempSubmitData.body["FolderRead"] = folderRead.join(',');
                    //tempSubmitData.body["FolderContribute"] = approverContribute.join(',');
                    tempSubmitData.body["FolderContribute"] = requestoridd.toString().concat(',', approverContribute.join(','));
                    tempSubmitData.body["ReqRead"] = approverRead.join(',');
                    //Shraddha 10-08-22 item 4
                    tempSubmitData.body["ReqContribute"] = requestoridd.toString().concat(',', approverContribute.join(','));
                    tempSubmitData.notificationBody["NextApprover"] = notificationApprovers.join(',');
                    tempSubmitData.notificationBody["SubstituteApprover"] = SubstituteApprover.join(','); //dec CR
                    return [2 /*return*/, tempSubmitData];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
        }
    });
}); };
export var GetNotificationApprover = function (primaryApprover, subApprover, requestorID) {
    // <summary>return aporover id for notification</summary>
    return primaryApprover != requestorID ? primaryApprover : subApprover;
};
//dec CR
export var GetSubstituteApprover = function (primaryApprover, subApprover, requestorID) {
    // <summary>return aporover id for notification</summary>
    return primaryApprover != requestorID ? subApprover : null;
};
//07-02-23 change
export var AddErrorLogs = function (serverRelativeUrl, objWeb, RequestID, Error) { return __awaiter(_this, void 0, void 0, function () {
    var errordata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errordata = {
                    Title: new Date().toString(),
                    Errors: Error.toString(),
                    RequestID: RequestID
                };
                return [4 /*yield*/, objWeb.lists.getByTitle(Constants.ERRORLIST).items.add(errordata)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//# sourceMappingURL=Utils.js.map