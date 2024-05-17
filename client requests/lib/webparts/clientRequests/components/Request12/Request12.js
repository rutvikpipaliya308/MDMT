var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
import * as React from 'react';
import { Web, PermissionKind } from 'sp-pnp-js';
import * as Utils from '../Utils';
import * as Constants from './../../Constants';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import Section1 from './Section1/Section1';
import Section2 from './Section2/Section2';
import Section3 from './Section3/Section3';
import Attachments from '../common/Attachments/Attachments';
export var listOfEditableFields = [
    { key: "dpCompany", value: strings.CompanyFieldLabel, openable: true },
    { key: "txtSocialName", value: strings.Lbl_SocialName, openable: true },
    { key: "tbxlegalName", value: strings.Lbl_LegalName, openable: true },
    { key: "tbxLine1", value: strings.Lbl_Line1, openable: true },
    { key: "tbxTaxRegistrationNumber", value: strings.Lbl_TaxRegNo, openable: true },
    { key: "tbxBankAccountNo", value: strings.Lbl_BankAccNo, openable: true },
    { key: "tbxSwift", value: strings.Lbl_SwiftBIC, openable: true },
    { key: "tbxBeneficiaryAccountName", value: strings.Lbl_BeneficiaryAccName, openable: true },
    { key: "tbxSocialName", value: strings.Lbl_SocialName, openable: true },
    { key: "tbxCompanyRegistrationNumber", value: strings.Lbl_CompanyRegNo, openable: true },
    { key: "tbxLine2", value: strings.Lbl_Line2, openable: true },
    { key: "tbxZipcode", value: strings.Lbl_ZipCode, openable: true },
    { key: "tbxPostalDistrictCity", value: strings.Lbl_Postal, openable: true },
    { key: "tbxCountryAreaRegion", value: strings.Lbl_CountryArea, openable: true },
    { key: "dpCountry", value: strings.Lbl_Country, openable: true },
    { key: "tbxClientAttentionName", value: strings.Lbl_ClientAttentionName, openable: true },
    { key: "tbxEmail", value: strings.Lbl_EmailAddress, openable: true },
    { key: "tbxPhoneNo", value: strings.Lbl_PhoneNo, openable: true },
    { key: "dpCurrency", value: strings.Lbl_Currency, openable: true },
    { key: "dpSector", value: strings.Lbl_Sector, openable: true },
    { key: "dpClientType", value: strings.Lbl_ClientType, openable: true },
    { key: "dpClientStatus", value: strings.Lbl_ClientStatus, openable: true },
    { key: "dpPaymentTerms", value: strings.Lbl_PaymentTerms, openable: true },
    { key: "dpPaymentMode", value: strings.Lbl_PaymentMode, openable: true },
    { key: "tbxInstructions", value: strings.Lbl_Instructions, openable: true },
    { key: "dpDeliveryMethod", value: strings.Lbl_DeliveryMethod, openable: true },
    { key: "tbxTDSTaxRate", value: strings.Lbl_TDSRate, openable: true },
    { key: "dpDefaultTaxCode", value: strings.Lbl_DefaultTaxCode, openable: true },
    { key: "tbxIBAN", value: strings.Lbl_IBAN, openable: true },
    { key: "tbxSwiftBIC", value: strings.Lbl_SwiftBIC, openable: true },
    { key: "tbxSortCode", value: strings.Lbl_SortCode, openable: true },
    { key: "tbxPaymentTransID", value: strings.Lbl_PaymentTransID, openable: true },
    { key: "dpWithholdingTaxType", value: strings.Lbl_WithHoldingTax, openable: true },
    { key: "dpEmirate", value: strings.Lbl_Emirate, openable: true },
    { key: "dpPlaceOfSupply", value: strings.Lbl_PlaceOfSupply, openable: true },
    { key: "dpGSTRegistrationType", value: strings.Lbl_GSTRegType, openable: true },
    { key: "tbxCIN", value: strings.Lbl_CIN, openable: true },
    { key: "tbxCustomerRemark4", value: strings.Lbl_CustomerRemark4, openable: true },
    { key: "tbxCustomerRemark5", value: strings.Lbl_CustomerRemark5, openable: true },
    { key: "tbxCustomerRemark7", value: strings.Lbl_CustomerRemark7, openable: true },
    { key: "tbxCustomerRemark8", value: strings.Lbl_CustomerRemark8, openable: true },
    { key: "dpClientIDType", value: strings.Lbl_ClientIDType, openable: true },
    { key: "tbxFinanceEmail", value: strings.Lbl_FinanceEmailAddress, openable: true },
    { key: "dpExcludedFromClientInvoiceReminder", value: strings.Lbl_ExcludedFromClientInvoiceReminders, openable: true },
];
var Request12 = /** @class */ (function (_super) {
    __extends(Request12, _super);
    function Request12(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.isAccessLevelPresentForUser = true;
        _this.state = {
            currentStep: 0,
            loading: true,
            itemID: 0,
            dataNotFound: false,
            invalidPermission: false,
            companyNo: '',
            approvalData: null,
            listData: null,
            section1Data: null,
            macAccountId: '',
            requestJson: null,
            clientJson: null,
            itemSubmitted: false,
            isFHDUser: false //r fhd change 20-9
        };
        return _this;
    }
    Request12.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hasAddPermission, currentUserId, currentUPN, tempUserAccessLevel, isAccessLevelExists, tempAccessLevel, FHDUser, isCurrentFHDUser, queryParameters, id_1, viewXML, tempData, tempArray_1, item, hasItemEditPermission;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utils.CheckUserAddPermission(this.objWeb, PermissionKind)];
                    case 1:
                        hasAddPermission = _a.sent();
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 2:
                        currentUserId = _a.sent();
                        return [4 /*yield*/, Utils.GetUserUPNFromGraphAPI(this.props.context)];
                    case 3:
                        currentUPN = _a.sent();
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.USERACCESSLEVEL_INTERNALNAME).items
                                .filter("Email eq '" + currentUPN.toLowerCase() + "'")
                                .getAll()];
                    case 4:
                        tempUserAccessLevel = _a.sent();
                        isAccessLevelExists = tempUserAccessLevel.length > 0 ? true : false;
                        tempAccessLevel = "";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.FHDUSERS).items
                                .filter("Email eq '" + currentUPN.toLowerCase() + "'")
                                .getAll()];
                    case 5:
                        FHDUser = _a.sent();
                        isCurrentFHDUser = FHDUser.length > 0 ? true : false;
                        this.setState({ isFHDUser: isCurrentFHDUser });
                        if (!(hasAddPermission && isAccessLevelExists)) return [3 /*break*/, 10];
                        queryParameters = new UrlQueryParameterCollection(window.location.href);
                        // Change start - 28/12/2021
                        tempAccessLevel = tempUserAccessLevel[0].Title;
                        if (!queryParameters.getValue("itemID")) return [3 /*break*/, 9];
                        id_1 = parseInt(queryParameters.getValue("itemID"));
                        if (!!isNaN(id_1)) return [3 /*break*/, 9];
                        viewXML = "<View>\n                    " + Constants.REQUESTVIEWXML + "\n                                <RowLimit>1</RowLimit>\n                                <Query>\n                                <Where><And><Eq><FieldRef Name=\"ID\"/><Value Type=\"Number\">" + id_1.toString() + "</Value></Eq>\n                                <Eq><FieldRef Name=\"RequestType\"/><Value Type=\"Text\">" + Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.key === _this.props.requestType; })[0].text + "</Value></Eq>\n                                </And></Where></Query></View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 6:
                        tempData = _a.sent();
                        tempArray_1 = [];
                        tempData.filter(function (tempItem) {
                            var isAccessLevelPresent = false;
                            if (tempItem.AccessLevel === tempAccessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (tempItem["AccessLevel"] !== null && tempAccessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_1 = [];
                                    accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
                                    accessLevelArrayFromUser_1 = tempAccessLevel.split(',');
                                    accessLevelArrayFromItem.forEach(function (element) {
                                        accessLevelArrayFromUser_1.forEach(function (ele) {
                                            if (ele === element) {
                                                isAccessLevelPresent = true;
                                            }
                                        });
                                    });
                                }
                            }
                            if (tempItem.ID == id_1.toString() && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.key === _this.props.requestType; })[0].text && isAccessLevelPresent) {
                                tempArray_1.push(tempItem);
                            }
                        });
                        item = tempArray_1[0];
                        if (!(item !== null && item !== undefined)) return [3 /*break*/, 8];
                        return [4 /*yield*/, Utils.CheckUserItemEditPermission(this.serverRelativeURL, this.objWeb, PermissionKind, id_1)];
                    case 7:
                        hasItemEditPermission = _a.sent();
                        if (hasItemEditPermission) {
                            this.setState({ itemID: id_1, listData: item });
                            if (item.Submitted) {
                                this.getEditableFields(item);
                                this.setState({ itemSubmitted: item.Submitted });
                            }
                        }
                        else {
                            this.setState({ invalidPermission: true });
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        this.setState({ dataNotFound: true });
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (hasAddPermission === true && isAccessLevelExists === false) {
                            this.isAccessLevelPresentForUser = false;
                        }
                        this.setState({ invalidPermission: true });
                        _a.label = 11;
                    case 11:
                        this.setState({ loading: false, currentStep: 1, accessLevel: tempAccessLevel });
                        return [2 /*return*/];
                }
            });
        });
    };
    Request12.prototype.getEditableFields = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, selectFields, levelOpenQuery, queryString, tempItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewXML = "";
                        selectFields = "<ViewFields>\n            <FieldRef Name=\"ID\"></FieldRef>\n            <FieldRef Name=\"Title\"></FieldRef>\n            <FieldRef Name=\"RequestType\"></FieldRef>\n            <FieldRef Name=\"WorkflowType\"></FieldRef>\n            <FieldRef Name=\"OpenLevel1\"></FieldRef>\n            <FieldRef Name=\"OpenLevel2\"></FieldRef>\n            <FieldRef Name=\"OpenLevel3\"></FieldRef>\n            </ViewFields>";
                        levelOpenQuery = "";
                        if (item.Stage1Status == "Pending") {
                            levelOpenQuery = "<Eq><FieldRef Name=\"OpenLevel1\"/><Value Type=\"Integer\">1</Value></Eq>";
                        }
                        else if (item.Stage2Status == "Pending") {
                            levelOpenQuery = "<Eq><FieldRef Name=\"OpenLevel2\"/><Value Type=\"Integer\">1</Value></Eq>";
                        }
                        else if (item.Stage3Status == "Pending") {
                            levelOpenQuery = "<Eq><FieldRef Name=\"OpenLevel3\"/><Value Type=\"Integer\">1</Value></Eq>";
                        }
                        queryString = "<Query><Where>\n            <And>"
                            + levelOpenQuery +
                            "<And>\n              <Eq><FieldRef Name=\"RequestType\"/><Value Type=\"Text\">" + item.RequestType + "</Value></Eq>\n              <Eq><FieldRef Name=\"WorkflowType\"/><Value Type=\"Text\">" + item.WorkflowType + "</Value></Eq>\n            </And>\n            </And>    \n          </Where></Query>";
                        viewXML = "<View>" + selectFields + "<RowLimit>4999</RowLimit>" + queryString + "</View>";
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.MACONOMYEDITABLEFIELDSINTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText').then(function (items) {
                                tempItems = items;
                            })];
                    case 1:
                        _a.sent();
                        tempItems.map(function (listItem) {
                            var index;
                            listOfEditableFields.some(function (entry, i) {
                                if (entry.value == listItem.Title) {
                                    index = i + 1;
                                    return true;
                                }
                            });
                            if (index) {
                                listOfEditableFields[index - 1].openable = false;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Request12.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "wrapper" },
            React.createElement("main", { className: "main-content", style: { position: "relative" } },
                React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                React.createElement("div", { className: "container-fluid" },
                    React.createElement("h1", { className: "main-title mb-4" },
                        React.createElement("img", { className: "icon", src: require('../../images/request.svg'), alt: "Request Travel" }),
                        strings.RequestType[5])),
                this.state.invalidPermission ? React.createElement("div", { className: "card-primary not-found-block" },
                    React.createElement("img", { className: "not-found", src: require('../../images/warning.png'), alt: "" }),
                    React.createElement("h1", null, this.isAccessLevelPresentForUser === false ? strings.invalidAccessLevel : strings.InvalidPermissionMsg)) :
                    this.state.dataNotFound ?
                        React.createElement("div", { className: "card-primary not-found-block" },
                            React.createElement("img", { className: "not-found", src: require('../../images/not-found.png'), alt: "" }),
                            React.createElement("h1", null, strings.Datanotfound))
                        :
                            React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "container-xl" },
                                    React.createElement("ul", { className: "row no-gutters process-block mb-5" }, Constants.COMPANYCLIENTUPDATE_SECTIONS.map(function (item, i) { return (React.createElement("li", { key: i, className: i === (_this.state.currentStep - 1) ? Constants.CLSCOLACTIVE : _this.state.currentStep > i ? Constants.CLSCOLSAVE : Constants.CLSCOL },
                                        React.createElement("span", null, item.key),
                                        React.createElement("p", null, item.text))); }))),
                                React.createElement("div", { className: "container-xl" },
                                    React.createElement("p", { style: { textAlign: "center", fontSize: 15 } },
                                        strings.MessageText1,
                                        " ",
                                        React.createElement("a", { href: strings.TraningMaterialLink, target: "_blank" }, strings.ClickHere),
                                        " ",
                                        strings.MessageText2)),
                                this.RenderSections(this.state.currentStep)))));
    };
    Request12.prototype.RenderSections = function (step) {
        /// <summary>Render section for request 12.</summary>
        var queryParameters = new UrlQueryParameterCollection(window.location.href);
        if (queryParameters.getValue("itemID")) {
            var id = parseInt(queryParameters.getValue("itemID"));
            if (!isNaN(id)) {
                if (this.state.listData === null) {
                    return '';
                }
            }
        }
        switch (step) {
            case 1:
                return React.createElement(Section1, __assign({}, this.props, { itemID: this.state.itemID, listData: this.state.listData, isFHDUser: this.state.isFHDUser, data: this.state.section1Data, dataChange: this.dataChange.bind(this), nextStep: this.NextStep.bind(this), itemSubmitted: this.state.itemSubmitted, accessLevel: this.state.accessLevel }));
            case 2:
                return React.createElement(Section2, __assign({}, this.props, { approvalData: this.state.approvalData, itemID: this.state.itemID, isFHDUser: this.state.isFHDUser, listData: this.state.listData, data: this.state.section2Data, dataChange: this.dataChange.bind(this), selectedClient: this.state.macAccountId, nextStep: this.NextStep.bind(this), backStep: this.BackStep.bind(this), selectedClientData: this.state.section1Data.updateRequestDataArray, listOfEditableFields: listOfEditableFields, itemSubmitted: this.state.itemSubmitted }));
            case 3:
                return React.createElement(Section3, __assign({}, this.props, { section2Data: this.state.section2Data, approvalData: this.state.approvalData, isFHDUser: this.state.isFHDUser, itemID: this.state.itemID, listData: this.state.listData, data: this.state.section3Data, selectedClient: this.state.macAccountId, dataChange: this.dataChange.bind(this), nextStep: this.NextStep.bind(this), backStep: this.BackStep.bind(this), listOfEditableFields: listOfEditableFields, itemSubmitted: this.state.itemSubmitted }));
            case 4:
                return React.createElement(Attachments, __assign({}, this.props, { requestJson: this.state.requestJson, clientJson: this.state.clientJson, itemID: this.state.itemID, listData: this.state.listData, approvalData: this.state.approvalData, backStep: this.BackStep.bind(this), itemSubmitted: this.state.itemSubmitted, accessLevel: this.state.accessLevel }));
        }
    };
    Request12.prototype.dataChange = function (id, value) {
        var _a;
        /// <summary>Method to be called to set state in request7.</summary>
        this.setState(__assign({}, this.state, (_a = {}, _a[id] = value, _a)));
    };
    Request12.prototype.NextStep = function () {
        /// <summary>Calculate and set next section.</summary>
        var step = this.state.currentStep;
        this.setState({
            currentStep: step + 1,
        });
    };
    Request12.prototype.BackStep = function () {
        /// <summary>Calculate and set back section.</summary>
        var step = this.state.currentStep;
        this.setState({
            currentStep: step - 1,
        });
    };
    return Request12;
}(React.Component));
export default Request12;
//# sourceMappingURL=Request12.js.map