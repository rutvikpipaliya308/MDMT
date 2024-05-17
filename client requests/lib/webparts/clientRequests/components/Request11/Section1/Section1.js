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
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import { Web } from 'sp-pnp-js';
import { Icon, Label } from 'office-ui-fabric-react';
import CardFooter from '../../common/CardFooter/CardFooter';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
var columns = [
    { name: strings.ActionHeader, selector: 'Action', width: '80px', maxWidth: '80px' },
    { name: strings.Grid_LinkHeader, selector: 'Link', sortable: false, width: '80px', maxWidth: '80px' },
    { name: strings.Grid_TypeHeader, selector: 'CustomerType', sortable: true, wrap: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[0], selector: 'MaconomyAccountID', sortable: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[8], selector: 'Currency', sortable: true, wrap: true },
    { name: strings.DuplicationcheckHeader[1], selector: 'SocialName', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[2], selector: 'LegalName', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[3], selector: 'Line1', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[5], selector: 'Zipcode', sortable: true, wrap: true, width: '100px' },
    { name: strings.DuplicationcheckHeader[6], selector: 'Postal_District_City', sortable: true, wrap: true, minWidth: '150px' },
    { name: strings.DuplicationcheckHeader[7], selector: 'Country', sortable: true, wrap: true, minWidth: '150px' },
    { name: strings.DuplicationcheckHeader[9], selector: 'TaxRegistrationNo', sortable: true, wrap: true, minWidth: '150px' }
];
var Section1 = /** @class */ (function (_super) {
    __extends(Section1, _super);
    function Section1(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.state = {
            dpCompany: '',
            loading: true,
            requestor: 0,
            office: '',
            itemID: 0,
            selectedParentClient: '',
            selectedSocialName: '',
            parentClientUpdateArray: [],
            isCompanyDisable: false,
            errors: {
                selectParent: '',
                requestExists: '',
                clientExists: '',
                companyExists: ''
            },
            assignedClientsArray: null,
            assignedClientsString: '',
            updateRequestDataID: 0
        };
        _this.companySectionRef = React.createRef();
        return _this;
    }
    Section1.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, currentUSerID;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.props.data === null || this.props.data === undefined)) return [3 /*break*/, 3];
                        _a = this.setState;
                        _b = {};
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 1:
                        _b.requestor = _c.sent();
                        return [4 /*yield*/, Utils.GetCurrentUserOffice(this.objWeb, this.props.context)];
                    case 2:
                        _a.apply(this, [(_b.office = _c.sent(),
                                _b)]);
                        _c.label = 3;
                    case 3:
                        if (!(this.props.listData != null && this.props.listData != undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 4:
                        currentUSerID = _c.sent();
                        if (this.props.listData.Stage1ApproverId == currentUSerID || this.props.listData.Stage1_sub_approverId == currentUSerID || this.props.listData.stage2_approverId == currentUSerID || this.props.listData.stage2_sub_approverId == currentUSerID) {
                            this.setState({
                                requestor: this.props.listData.RequestorId
                            });
                        }
                        _c.label = 5;
                    case 5:
                        if (!(this.props.listData !== null)) return [3 /*break*/, 8];
                        this.setState({
                            dpCompany: this.props.listData["Company"],
                            selectedParentClient: this.props.listData["MaconomyAccountID"],
                            //selectedSocialName: this.props.listData["Title"],
                            isCompanyDisable: true
                        });
                        return [4 /*yield*/, this.GetSelectedParentSocialName()];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, this.GetUpdateRequestDataID()];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        if (this.props.data !== null && this.props.data !== undefined) {
                            this.setState(__assign({}, this.props.data));
                        }
                        if (!(this.props.itemID > 0)) return [3 /*break*/, 9];
                        this.setState({ itemID: this.props.itemID });
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.BindGridData()];
                    case 10:
                        _c.sent();
                        _c.label = 11;
                    case 11:
                        // this.setState({ loading: false });
                        if (this.props.data === null || this.props.data === undefined) {
                            this.setState({ loading: false });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.render = function () {
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "card-primary", style: { position: "relative" } },
                React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                React.createElement("div", { className: "card-header text-center" },
                    React.createElement("h3", { className: "border-0 pl-0" }, strings.Sec1Question)),
                React.createElement("div", { className: "card-body" },
                    React.createElement(CompanySection, __assign({ isDisable: this.state.isCompanyDisable, ref: this.companySectionRef }, this.props, { dpCompany: this.state.dpCompany, isWorkflowTypeNeeded: false, setLoader: this.SetLoader.bind(this), requestType: strings.RequestType[4], accessLevel: this.props.accessLevel })),
                    React.createElement("div", { className: "grid-table", style: { position: "relative" } }, this.state.itemID === 0 ?
                        React.createElement(DataTableExtensions, { data: this.state.parentClientUpdateArray, columns: columns, print: false, export: false, filterHidden: false },
                            React.createElement(DataTable, { className: "table", data: this.state.parentClientUpdateArray, columns: columns, responsive: true, pagination: true, paginationComponentOptions: { noRowsPerPage: true }, paginationPerPage: 10, noHeader: true, persistTableHead: true, noDataComponent: React.createElement("div", { className: "nodatadiv" },
                                    React.createElement("label", { className: "nodata" }, strings.NoRecordsAvailable)), sortIcon: React.createElement(Icon, { iconName: "SortDown" }), onChangePage: this.SelectRadio.bind(this), onSort: this.SelectRadio.bind(this), noContextMenu: true })) : null),
                    this.state.errors.selectParent.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.selectParent,
                            " ")) : null,
                    this.state.selectedParentClient.length > 0 && this.state.errors.clientExists.length === 0 ? React.createElement("div", { className: "alert alert-warning mt-3", role: "alert" },
                        React.createElement(Label, { className: "text-left" },
                            strings.YouHaveSelectedText,
                            " ",
                            React.createElement("strong", null, this.state.selectedParentClient),
                            " - ",
                            this.state.selectedSocialName)) : null,
                    this.state.errors.requestExists.length > 0 ? React.createElement("div", { className: "alert alert-danger mt-3", role: "alert" },
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            React.createElement(Label, { className: "errormessage requestExistsErrorCls" }, strings.ClientRequest_RunningMode[0] + " "),
                            this.generateRequestExistsHTML(this.state.errors.requestExists),
                            React.createElement(Label, { className: "errormessage requestExistsErrorCls" }, " " + strings.ClientRequest_RunningMode[1]))) : null,
                    this.state.errors.companyExists.length > 0 ? React.createElement("div", { className: "alert alert-danger mt-3", role: "alert" },
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.companyExists,
                            " ")) : null,
                    this.state.errors.clientExists.length > 0 ? React.createElement("div", { className: "alert alert-danger mt-3", role: "alert" },
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.clientExists,
                            " ")) : null),
                React.createElement(CardFooter, __assign({}, this.props, { nextBtnMethod: this._NextClick.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this) })))));
    };
    Section1.prototype.generateRequestExistsHTML = function (requestExistsError) {
        var textAfterRequestID = requestExistsError.substr(requestExistsError.indexOf("ID:") + 4);
        var requestID = textAfterRequestID.split(" ")[0];
        var ID = textAfterRequestID.split(" ")[1];
        var redirectionURL = this.props.context.pageContext.web.absoluteUrl + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=";
        return (React.createElement("a", { className: "errormessage requestExistsErrorCls", style: { textDecoration: "underline" }, target: "_blank", href: redirectionURL + ID.toString() }, requestID));
    };
    Section1.prototype.SetLoader = function (status) {
        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ loading: status });
        }
    };
    Section1.prototype.BindGridData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempData, tempArray_1, data, tempArray_2, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        viewXML = "<View>\n            <ViewFields>\n                <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                <FieldRef Name=\"CustomerType\"></FieldRef>\n                <FieldRef Name=\"Title\"></FieldRef>\n                <FieldRef Name=\"LegalName\"></FieldRef>\n                <FieldRef Name=\"Line1\"></FieldRef>\n                <FieldRef Name=\"Zipcode\"></FieldRef>\n                <FieldRef Name=\"Postal_District_City\"></FieldRef>\n                <FieldRef Name=\"Country\"></FieldRef>\n                <FieldRef Name=\"Currency\"></FieldRef>\n                <FieldRef Name=\"TaxRegistrationNo\"></FieldRef>\n            </ViewFields>\n            <Query>\n                <Where>\n                    <Eq><FieldRef Name=\"CustomerType\" /><Value Type=\"Text\">parent client</Value></Eq>\n                </Where>\n                <OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy>\n            </Query>\n            </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray_1 = [];
                        tempData.filter(function (tempItem) {
                            var isAccessLevelPresent = false;
                            if (tempItem.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (tempItem["AccessLevel"] !== null && _this.props.accessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_1 = [];
                                    accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
                                    accessLevelArrayFromUser_1 = _this.props.accessLevel.split(',');
                                    accessLevelArrayFromItem.forEach(function (element) {
                                        accessLevelArrayFromUser_1.forEach(function (ele) {
                                            if (ele === element) {
                                                isAccessLevelPresent = true;
                                            }
                                        });
                                    });
                                }
                            }
                            if (tempItem.CustomerType == "parent client" && isAccessLevelPresent) {
                                tempArray_1.push(tempItem);
                            }
                        });
                        tempArray_1.sort(function (a, b) { return (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0); });
                        data = tempArray_1;
                        if (data !== null) {
                            tempArray_2 = [];
                            data.forEach(function (element) {
                                tempArray_2.push({
                                    Action: React.createElement("input", { type: "radio", checked: _this.state.selectedParentClient === element['MaconomyAccountID'], name: "parent", value: element["MaconomyAccountID"], onClick: _this.SelectParentClient.bind(_this, element['MaconomyAccountID'], element["Title"]) }),
                                    Link: React.createElement("a", { onClick: function (e) { e.preventDefault(); window.open(_this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + element['ID'] + "&rqType=pcl", '_blank'); }, href: '' }, strings.Grid_LinkHeader),
                                    CustomerType: element["CustomerType"],
                                    MaconomyAccountID: element["MaconomyAccountID"],
                                    SocialName: element["Title"],
                                    LegalName: element["LegalName"],
                                    Line1: element["Line1"],
                                    Zipcode: element["Zipcode"],
                                    Postal_District_City: element["Postal_District_City"],
                                    Country: element["Country"],
                                    Currency: element["Currency"],
                                    TaxRegistrationNo: element["TaxRegistrationNo"]
                                });
                            });
                            this.setState({
                                parentClientUpdateArray: cloneDeep(tempArray_2)
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("bindGridData--->", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.GetAssignedClients = function (macId) {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempData, tempArray_3, data, tempArray_4, tempIds_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        viewXML = "<View>\n            <ViewFields>\n                <FieldRef Name=\"ID\"></FieldRef>\n                <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                <FieldRef Name=\"ParentClient\"></FieldRef>\n            </ViewFields>\n            <Query>\n                <Where>\n                    <Eq><FieldRef Name=\"ParentClient\" /><Value Type=\"Text\">" + macId + "</Value></Eq>\n                </Where>\n                <OrderBy><FieldRef Name='MaconomyAccountID' Ascending='True'></FieldRef></OrderBy>\n            </Query>\n            </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray_3 = [];
                        tempData.filter(function (tempItem) {
                            var isAccessLevelPresent = false;
                            if (tempItem.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (tempItem["AccessLevel"] !== null && _this.props.accessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_2 = [];
                                    accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
                                    accessLevelArrayFromUser_2 = _this.props.accessLevel.split(',');
                                    accessLevelArrayFromItem.forEach(function (element) {
                                        accessLevelArrayFromUser_2.forEach(function (ele) {
                                            if (ele === element) {
                                                isAccessLevelPresent = true;
                                            }
                                        });
                                    });
                                }
                            }
                            if (tempItem.ParentClient == macId && isAccessLevelPresent) {
                                tempArray_3.push(tempItem);
                            }
                        });
                        tempArray_3.sort(function (a, b) { return (a.MaconomyAccountID > b.MaconomyAccountID) ? 1 : ((b.MaconomyAccountID > a.MaconomyAccountID) ? -1 : 0); });
                        data = tempArray_3;
                        if (data != null) {
                            tempArray_4 = [];
                            tempIds_1 = [];
                            data.forEach(function (element) {
                                tempArray_4.push({
                                    MaconomyAccountID: element['MaconomyAccountID']
                                });
                                tempIds_1.push(element['MaconomyAccountID']);
                            });
                            this.setState({
                                assignedClientsArray: tempArray_4,
                                assignedClientsString: tempIds_1.join(',')
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log('Assigned clients--->', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.GetSelectedParentSocialName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempData, tempArray_5, data, errors, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        viewXML = "<View>\n            <ViewFields>\n                <FieldRef Name=\"ID\"></FieldRef>\n                <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                <FieldRef Name=\"Title\"></FieldRef>\n            </ViewFields>\n            <Query>\n                <Where>\n                    <Eq> <FieldRef Name='MaconomyAccountID' /><Value Type='Text'>" + this.props.listData["MaconomyAccountID"] + "</Value> </Eq>\n                </Where>\n            </Query>\n            </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray_5 = [];
                        tempData.filter(function (tempItem) {
                            var isAccessLevelPresent = false;
                            if (tempItem.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (tempItem["AccessLevel"] !== null && _this.props.accessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_3 = [];
                                    accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
                                    accessLevelArrayFromUser_3 = _this.props.accessLevel.split(',');
                                    accessLevelArrayFromItem.forEach(function (element) {
                                        accessLevelArrayFromUser_3.forEach(function (ele) {
                                            if (ele === element) {
                                                isAccessLevelPresent = true;
                                            }
                                        });
                                    });
                                }
                            }
                            if (tempItem.MaconomyAccountID == _this.props.listData["MaconomyAccountID"] && isAccessLevelPresent) {
                                tempArray_5.push(tempItem);
                            }
                        });
                        data = tempArray_5;
                        if (data !== null && data !== undefined) {
                            this.setState({ selectedSocialName: data["Title"] });
                        }
                        else {
                            errors = this.state.errors;
                            errors.clientExists = strings.NoMaconomyParentClient_Msg[0] + this.props.listData["MaconomyAccountID"] + strings.NoMaconomyParentClient_Msg[1];
                            this.setState({ errors: errors });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log('Get social Name--->', error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.GetUpdateRequestDataID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempData, tempArray, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewXML = "<View>\n        <ViewFields>\n            <FieldRef Name=\"ID\"></FieldRef>\n            <FieldRef Name=\"RequestID\"></FieldRef>\n        </ViewFields>\n        <RowLimit>1</RowLimit>\n        <Query>\n            <Where>\n                <Eq><FieldRef Name=\"RequestID\"/><Value Type=\"Text\">" + this.props.itemID + "</Value></Eq>\n            </Where>\n        </Query>\n        </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.UPDATEREQUESTDATA_INTERNALANAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray = [];
                        tempData.filter(function (tempItem) {
                            var isAccessLevelPresent = false;
                            if (tempItem.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (tempItem["AccessLevel"] !== null && _this.props.accessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_4 = [];
                                    accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
                                    accessLevelArrayFromUser_4 = _this.props.accessLevel.split(',');
                                    accessLevelArrayFromItem.forEach(function (element) {
                                        accessLevelArrayFromUser_4.forEach(function (ele) {
                                            if (ele === element) {
                                                isAccessLevelPresent = true;
                                            }
                                        });
                                    });
                                }
                            }
                            if (tempItem.RequestID == _this.props.itemID && isAccessLevelPresent) {
                                tempArray.push(tempItem);
                            }
                        });
                        data = tempArray[0];
                        if (data !== null) {
                            this.setState({
                                updateRequestDataID: data.ID
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.SelectParentClient = function (selectedParentClient, selectedSocialName) {
        var _this = this;
        /// <summary>Set MaconomyAccountID & Social Name when select client from list.</summary>
        this.setState(__assign({}, this.state, { selectedParentClient: selectedParentClient, selectedSocialName: selectedSocialName }), function () {
            _this.SelectRadio();
        });
        //rutvik validate change
        var errors = this.state.errors;
        errors.selectParent = '';
        this.setState({ errors: errors });
        //end
    };
    Section1.prototype.SelectRadio = function () {
        // <summary>Event called on page change.</summary>
        var tempArray = this.state.parentClientUpdateArray;
        for (var parent_1 = 0; parent_1 < tempArray.length; parent_1++) {
            if (tempArray[parent_1].MaconomyAccountID === this.state.selectedParentClient) {
                tempArray[parent_1].Action = React.createElement("input", { type: "radio", checked: true, name: "parent", value: tempArray[parent_1].MaconomyAccountID, onClick: this.SelectParentClient.bind(this, tempArray[parent_1].MaconomyAccountID, tempArray[parent_1].SocialName) });
            }
            else {
                tempArray[parent_1].Action = React.createElement("input", { type: "radio", checked: false, name: "parent", value: tempArray[parent_1].MaconomyAccountID, onClick: this.SelectParentClient.bind(this, tempArray[parent_1].MaconomyAccountID, tempArray[parent_1].SocialName) });
            }
        }
        this.setState({
            parentClientUpdateArray: cloneDeep(tempArray)
        });
    };
    Section1.prototype.ValidateSection = function (data) {
        /// <summary>Validate parent selected from list or not.</summary>
        var errors = this.state.errors;
        errors.selectParent = (this.state.selectedParentClient === '') ? strings.SelectClientMsg : "";
        if (this.props.itemID > 0 && Utils.CheckRequiredField(data.dpCompany) === false) {
            errors.companyExists = strings.NoCompany_Msg[0] + this.props.listData["Company"] + strings.NoCompany_Msg[1];
        }
        this.setState({ errors: errors });
        var valid = errors.selectParent.length > 0 || errors.companyExists.length > 0 ? false : true;
        return valid;
    };
    Section1.prototype.SaveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var accessLevel, companyNumber, tempData, queryParameters, id, currentUSerID, recordSaved, body, tempBody, error_4, errordata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 14]);
                        // change start - 25-1-22
                        this.setState({ loading: true });
                        companyNumber = [];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + Constants.ACCESSLEVELRANGE).items.getAll().then(function (record) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (record != null) {
                                        record.filter(function (tempItem) {
                                            if (tempItem.AccessLevel != null && tempItem.LowerRange != null && tempItem.UpperRange != null) {
                                                companyNumber = data.dpCompany.split('-');
                                                var number = parseInt(companyNumber[0].trim());
                                                if (number >= tempItem.LowerRange && number <= tempItem.UpperRange) {
                                                    accessLevel = tempItem.AccessLevel;
                                                }
                                            }
                                        });
                                    }
                                    return [2 /*return*/];
                                });
                            }); })
                            // change end - 25-1-22
                        ];
                    case 1:
                        _a.sent();
                        tempData = {
                            Company: data.dpCompany,
                            RequestType: Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.key === _this.props.requestType; })[0].text,
                            RequestorId: this.props.listData != null || this.props.listData != undefined ? this.props.listData.RequestorId : this.state.requestor,
                            Office: this.state.office,
                            WorkflowType: strings.WorkflowType[0],
                            RequestID: Utils.GenerateRequestID(this.state.itemID),
                            Status: strings.Status[0],
                            MaconomyAccountID: this.state.selectedParentClient.toString(),
                            Title: this.state.selectedSocialName.toString(),
                            AccessLevel: accessLevel,
                        };
                        queryParameters = new UrlQueryParameterCollection(window.location.href);
                        if (!queryParameters.getValue("itemID")) return [3 /*break*/, 5];
                        id = parseInt(queryParameters.getValue("itemID"));
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 2:
                        currentUSerID = _a.sent();
                        if (!((this.props.listData.Stage1ApproverId == currentUSerID || this.props.listData.Stage1_sub_approverId == currentUSerID) && this.props.listData.RequestorId !== currentUSerID)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.filter("ID eq " + this.props.listData.ID).getAll()];
                    case 3:
                        recordSaved = _a.sent();
                        if (!(recordSaved.length === 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.add(this.props.listData)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(this.state.itemID > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update(tempData).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var tempUpdateRequestData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(this.props.data === null || this.props.data === undefined)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.GetAssignedClients(this.state.selectedParentClient)];
                                        case 1:
                                            _a.sent();
                                            tempUpdateRequestData = {
                                                MaconomyAccountID: this.state.selectedParentClient.toString(),
                                                Child: this.state.assignedClientsString,
                                                RequestID: this.state.itemID.toString(),
                                                Title: this.state.selectedSocialName.toString(),
                                                AccessLevel: accessLevel
                                            };
                                            return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.getById(this.state.updateRequestDataID).update(tempUpdateRequestData).then(function (response) {
                                                })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 7: return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.add(tempData).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var tempUpdateRequestData;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.setState({
                                            itemID: res.data.Id
                                        });
                                        return [4 /*yield*/, this.GetAssignedClients(this.state.selectedParentClient)];
                                    case 1:
                                        _a.sent();
                                        tempUpdateRequestData = {
                                            MaconomyAccountID: this.state.selectedParentClient.toString(),
                                            Child: this.state.assignedClientsString,
                                            RequestID: this.state.itemID.toString(),
                                            Title: this.state.selectedSocialName.toString(),
                                            AccessLevel: accessLevel
                                        };
                                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.add(tempUpdateRequestData).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    this.setState({ updateRequestDataID: response.data.Id });
                                                    return [2 /*return*/];
                                                });
                                            }); })];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update({ RequestID: Utils.GenerateRequestID(this.state.itemID) }).then(function (res) {
                            })];
                    case 9:
                        _a.sent();
                        body = JSON.stringify({
                            'RequestID': this.state.itemID.toString(),
                            'Folder': '',
                            'FolderRead': '',
                            'FolderContribute': '',
                            'ReqRead': '',
                            'ReqContribute': this.state.requestor.toString(),
                            'UpdateRequestID': this.state.updateRequestDataID.toString(),
                            'UpdateReqContribute': this.state.requestor.toString(),
                        });
                        tempBody = {
                            Title: this.state.itemID.toString(),
                            FolderPath: "",
                            FolderRead: "",
                            FolderContribute: "",
                            ReqRead: "",
                            ReqContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID),
                            UpdateRequestID: this.state.updateRequestDataID.toString(),
                            UpdateReqContribute: this.state.requestor.toString() //R FHD change 19-9-2023,
                        };
                        //Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody)];
                    case 10:
                        //Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);
                        _a.sent();
                        _a.label = 11;
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        error_4 = _a.sent();
                        console.log("save data --->", error_4);
                        errordata = {
                            Title: new Date(),
                            Errors: error_4,
                            RequestID: this.props.itemID
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata)];
                    case 13:
                        _a.sent();
                        //error log change end
                        this.setState({ loading: false });
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.SaveDataOperations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.companySectionRef.current.ValidateCompanySection();
                        return [4 /*yield*/, this.ValidateSection(data)];
                    case 1:
                        if ((_a.sent()) === false || data === null) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.CheckIsRequestExists()];
                    case 2:
                        if ((_a.sent()) === true) {
                            return [2 /*return*/, false];
                        }
                        this.setState({ dpCompany: data.dpCompany });
                        return [4 /*yield*/, this.SaveData(data)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Section1.prototype._NextClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Next button click event.</summary>
                        this.setState({ loading: true }); //9-2-23
                        if (!(Utils.CheckRequiredField(this.state.errors.clientExists) === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.SaveDataOperations()];
                    case 1:
                        if (_a.sent()) {
                            this.setState({ loading: false, isCompanyDisable: true }, function () { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.props.dataChange("section1Data", this.state)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.dataChange("itemID", this.state.itemID)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.dataChange("approvalData", {
                                                    "company": this.state.dpCompany,
                                                    "workflowType": strings.WorkflowType[0],
                                                    "requestType": Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.key === _this.props.requestType; })[0].text,
                                                    "requestorID": this.state.requestor,
                                                    "maconomyAccountID": this.state.selectedParentClient,
                                                    "updateRequestDataID": this.state.updateRequestDataID.toString()
                                                })];
                                        case 3:
                                            _a.sent();
                                            this.props.nextStep();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        else {
                            this.setState({ loading: false });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.setState({ loading: false }); //9-2-23
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype._SaveForLaterClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Save for later button click event.</summary>
                        this.setState({ loading: true }); //9-2-23
                        if (!(Utils.CheckRequiredField(this.state.errors.clientExists) === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.SaveDataOperations()];
                    case 1:
                        if (_a.sent()) {
                            window.location.href = this.props.context.pageContext.web.absoluteUrl;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.CheckIsRequestExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempData, tempArray, requestData, errorsObj;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewXML = "<View>\n        <ViewFields>\n            <FieldRef Name=\"ID\"></FieldRef>\n            <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n            <FieldRef Name=\"RequestType\"></FieldRef>\n            <FieldRef Name=\"Status\"></FieldRef>\n            <FieldRef Name=\"Child\"></FieldRef>\n            <FieldRef Name=\"Submitted\"></FieldRef>\n            <FieldRef Name=\"RequestID\"></FieldRef>\n        </ViewFields>\n        <RowLimit>1</RowLimit>\n        <Query>\n            <Where>\n                <And>\n                    <And>\n                        <Eq><FieldRef Name=\"RequestType\" /><Value Type=\"Choice\">" + Constants.REQUESTTYPE_OPTIONS[4].text + "</Value></Eq>\n                        <Eq><FieldRef Name=\"MaconomyAccountID\" /><Value Type=\"Text\">" + this.state.selectedParentClient + "</Value></Eq>\n                    </And>\n                    <And>\n                        <Eq><FieldRef Name=\"Status\"/><Value Type=\"Text\">Open</Value></Eq>\n                        <Eq><FieldRef Name=\"Submitted\" /><Value Type=\"Boolean\">1</Value></Eq>\n                    </And>\n                </And>\n            </Where>\n        </Query>\n        </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray = [];
                        tempData.filter(function (tempItem) {
                            var isAccessLevelPresent = false;
                            if (tempItem.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (tempItem["AccessLevel"] !== null && _this.props.accessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_5 = [];
                                    accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
                                    accessLevelArrayFromUser_5 = _this.props.accessLevel.split(',');
                                    accessLevelArrayFromItem.forEach(function (element) {
                                        accessLevelArrayFromUser_5.forEach(function (ele) {
                                            if (ele === element) {
                                                isAccessLevelPresent = true;
                                            }
                                        });
                                    });
                                }
                            }
                            if (tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[4].text && tempItem.MaconomyAccountID == _this.state.selectedParentClient && tempItem.Status == "Open" && tempItem.Submitted == true && isAccessLevelPresent) {
                                tempArray.push(tempItem);
                            }
                        });
                        requestData = tempArray[0];
                        errorsObj = this.state.errors;
                        if (requestData !== null && requestData !== undefined && (this.props.listData === null || (this.props.listData != null && this.props.listData.Submitted === false))) {
                            errorsObj.requestExists = strings.ClientRequest_RunningMode[0] + requestData.RequestID + " " + requestData.ID + strings.ClientRequest_RunningMode[1];
                            this.setState({ errors: errorsObj, loading: false });
                            return [2 /*return*/, true];
                        }
                        else {
                            errorsObj.requestExists = '',
                                this.setState({ errors: errorsObj });
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Section1;
}(React.Component));
export default Section1;
//# sourceMappingURL=Section1.js.map