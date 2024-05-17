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
import CardFooter from '../../common/CardFooter/CardFooter';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { Icon, Label } from 'office-ui-fabric-react';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
var columns = [
    { name: strings.ActionHeader, selector: 'Action', width: '80px', maxWidth: '80px', },
    { name: strings.Grid_LinkHeader, selector: 'Link', sortable: false, width: '80px', maxWidth: '80px' },
    {
        name: strings.AccessLevelHeader,
        selector: 'AccessLevel',
        sortable: true,
        minWidth: '120px'
    },
    { name: strings.DuplicationcheckHeader[0], selector: 'MaconomyAccountID', sortable: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[8], selector: 'Currency', sortable: true },
    {
        name: strings.DuplicationcheckHeader[1], selector: 'SocialName', sortable: true, wrap: true,
        minWidth: '200px',
    },
    {
        name: strings.DuplicationcheckHeader[2], selector: 'LegalName', sortable: true, wrap: true,
        minWidth: '200px',
    },
    {
        name: strings.DuplicationcheckHeader[3], selector: 'Line1', sortable: true, wrap: true,
        minWidth: '200px',
    },
    {
        name: strings.DuplicationcheckHeader[5], selector: 'Zipcode', sortable: true, wrap: true,
    },
    {
        name: strings.DuplicationcheckHeader[6], selector: 'Postal_District_City', sortable: true, wrap: true,
        minWidth: '150px',
    },
    {
        name: strings.DuplicationcheckHeader[7], selector: 'Country', sortable: true, wrap: true,
        minWidth: '150px',
    },
    {
        name: strings.DuplicationcheckHeader[9], selector: 'TaxRegistrationNo', sortable: true, wrap: true,
        minWidth: '150px',
    },
    {
        name: strings.DuplicationcheckHeader[10], selector: 'Status', wrap: true, sortable: true,
        minWidth: '100px',
    },
];
var Section1 = /** @class */ (function (_super) {
    __extends(Section1, _super);
    function Section1(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        //Rutvik 17-1-24
        _this.setCurrentCompanyAccessLevel = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ currentCompanyAccessLevel: data });
                        this.setState(__assign({}, this.state, { selectedClient: {
                                macAccountId: '',
                                socialName: ''
                            } }));
                        this.setState({ loading: true });
                        return [4 /*yield*/, this.BindGridData()];
                    case 1:
                        _a.sent();
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            dpCompany: '',
            loading: true,
            rbtnWorkflowType: 'Standard',
            requestor: 0,
            itemID: 0,
            office: '',
            folderPath: '',
            clientArray: [],
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
            selectedClient: { macAccountId: '', socialName: '' },
            currentCompanyAccessLevel: '',
            errors: {
                dpCompany: '',
                selectedClient: '',
                requestExists: '',
                clientExists: '',
                companyExists: ''
            },
            filter: '',
            updateRequestDataID: 0,
            updateRequestDataArray: ''
        };
        _this.companySectionRef = React.createRef();
        return _this;
    }
    Section1.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, currentUSerID, currentUserID, requestoridd, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 14, , 15]);
                        if (!(this.props.data === null || this.props.data === undefined)) return [3 /*break*/, 3];
                        _a = this.setState;
                        _b = {};
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 1:
                        _b.requestor = _c.sent();
                        return [4 /*yield*/, Utils.GetCurrentUserOffice(this.objWeb, this.props["context"])];
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
                        if (!(this.props.listData !== null)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.GetSelectedSocialName(this.props.listData["MaconomyAccountID"])];
                    case 6:
                        _c.sent();
                        this.setState({
                            dpCompany: this.props.listData["Company"],
                            rbtnWorkflowType: this.props.listData["WorkflowType"],
                            folderPath: this.props.listData["FolderPath"],
                        });
                        _c.label = 7;
                    case 7:
                        if (!(this.props.data !== null && this.props.data !== undefined)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.setState(__assign({}, this.props.data))];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9: return [4 /*yield*/, this.BindGridData()];
                    case 10:
                        _c.sent(); //rutvik1
                        if (!(this.props.itemID === 0)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.BindGridData()];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12:
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
                        if (this.props.data === null || this.props.data === undefined) {
                            this.setState({ loading: false });
                        }
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 13:
                        currentUserID = _c.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        return [3 /*break*/, 15];
                    case 14:
                        error_1 = _c.sent();
                        console.log("Section 1/Request13 >>", error_1);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
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
                    React.createElement(CompanySection, __assign({ ref: this.companySectionRef, isDisable: this.checkIfFieldDisabled("dpCompany") }, this.props, { dpCompany: this.state.dpCompany, setLoader: this.SetLoader.bind(this), rbtnWorkflowType: this.state.rbtnWorkflowType, isWorkflowTypeNeeded: true, requestType: strings.RequestType[6], accessLevel: this.props.accessLevel, setCurrentCompanyAccessLevel: this.setCurrentCompanyAccessLevel })),
                    React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "card-header text-center" },
                            React.createElement("h3", { className: "border-0 pl-0" }, strings.Lbl_SelectClientGrid)),
                        React.createElement("div", { className: "grid-table", style: { position: "relative", } },
                            React.createElement(DataTableExtensions, { columns: columns, data: this.state.clientArray, print: false, export: false, filterHidden: false },
                                React.createElement(DataTable, { className: "table", data: this.state.clientArray, columns: columns, responsive: true, pagination: true, paginationComponentOptions: { noRowsPerPage: true }, paginationPerPage: 10, noHeader: true, persistTableHead: true, noDataComponent: React.createElement("div", { className: "nodatadiv" },
                                        React.createElement("label", { className: "nodata" }, strings.NoRecordsAvailable)), sortIcon: React.createElement(Icon, { iconName: "SortDown" }), onChangePage: this.selectRadio.bind(this), onSort: this.selectRadio.bind(this), noContextMenu: true })))),
                    this.state.errors.selectedClient.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.selectedClient,
                            " ")) : null,
                    this.state.selectedClient.macAccountId > 0 && this.state.errors.clientExists.length === 0 ? React.createElement("div", { className: "alert alert-warning mt-3", role: "alert" },
                        React.createElement(Label, { className: "text-left" },
                            strings.YouHaveSelectedText,
                            " ",
                            React.createElement("strong", null, this.state.selectedClient.macAccountId),
                            " - ",
                            this.state.selectedClient.socialName,
                            " ")) : null,
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
        // if (this.state.itemID !== Number(ID)) {
        return (React.createElement("a", { className: "errormessage requestExistsErrorCls", style: { textDecoration: "underline" }, target: "_blank", href: redirectionURL + ID.toString() }, requestID));
        // }
        // else {
        //     let errorsObj = this.state.errors;
        //     errorsObj.requestExists = ""
        //     this.setState({ errors: errorsObj });
        // }
    };
    Section1.prototype.SetLoader = function (status) {
        //<summary>set loader value from parameter</summary>
        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ loading: status });
        }
    };
    Section1.prototype.checkIfFieldDisabled = function (tagID) {
        var listOfEditableFieldsSection1 = this.props.listOfEditableFields;
        //Shraddha 08-08-22 item 4
        var currentuser = this.state.currentUserid;
        var requestorid = this.state.requestorid;
        if (this.props.itemSubmitted) { //R fhd change 20-9-2023
            //Shraddha 08-08-22 item 4 end
            var item = listOfEditableFieldsSection1.filter(function (item) { return item.key == tagID; });
            if (item) {
                if (item.length > 0) {
                    return item[0].openable;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
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
    Section1.prototype.BindGridData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempItems, tempArray_1, data, tempArray_2, _loop_1, this_1, item, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        viewXML = "<View>\n            <ViewFields>\n                <FieldRef Name=\"ID\"></FieldRef>\n                <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                <FieldRef Name=\"Title\"></FieldRef>\n                <FieldRef Name=\"LegalName\"></FieldRef>\n                <FieldRef Name=\"Line1\"></FieldRef>\n                <FieldRef Name=\"Line2\"></FieldRef>\n                <FieldRef Name=\"Zipcode\"></FieldRef>\n                <FieldRef Name=\"Postal_District_City\"></FieldRef>\n                <FieldRef Name=\"Country\"></FieldRef>\n                <FieldRef Name=\"Currency\"></FieldRef>\n                <FieldRef Name=\"TaxRegistrationNo\"></FieldRef>\n                <FieldRef Name=\"Country_Area_Region\"></FieldRef>\n                <FieldRef Name=\"CompanyRegistrationNo\"></FieldRef>\n                <FieldRef Name=\"Sector\"></FieldRef>\n                <FieldRef Name=\"ClientStatus\"></FieldRef>\n                <FieldRef Name=\"ClientType\"></FieldRef>\n                <FieldRef Name=\"Status\"></FieldRef>\n                <FieldRef Name=\"CustomerRemark4\"></FieldRef>\n                <FieldRef Name=\"CustomerRemark5\"></FieldRef>\n                <FieldRef Name=\"CustomerRemark8\"></FieldRef>\n                <FieldRef Name=\"CustomerRemark7\"></FieldRef>\n                <FieldRef Name=\"ClinetIDType\"></FieldRef>\n                <FieldRef Name=\"ClientLead\"></FieldRef>\n                <FieldRef Name=\"CommercialManager\"></FieldRef>\n                <FieldRef Name=\"Biller\"></FieldRef>\n                <FieldRef Name=\"ProjectAnalyst\"></FieldRef>\n                <FieldRef Name=\"ResourceManager\"></FieldRef>\n            </ViewFields>\n                <Query>\n                    <Where>\n                        <Eq><FieldRef Name=\"CustomerType\" /><Value Type=\"Text\">legal client</Value></Eq>\n                    </Where>\n                    <OrderBy><FieldRef Name='ID' Ascending='True'></FieldRef></OrderBy>\n                </Query>\n            </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempItems = _a.sent();
                        tempArray_1 = [];
                        tempItems.filter(function (item) {
                            var isAccessLevelPresent = false;
                            if (item.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (item["AccessLevel"] !== null && _this.props.accessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_2 = [];
                                    accessLevelArrayFromItem = item["AccessLevel"].split(',');
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
                            if ((item.CustomerType == "legal client") && isAccessLevelPresent) {
                                //17-1-24 rutvik
                                if (_this.state.currentCompanyAccessLevel !== '' && item["AccessLevel"] !== null) {
                                    if (item["AccessLevel"] === _this.state.currentCompanyAccessLevel) {
                                        tempArray_1.push(item);
                                    }
                                }
                                else {
                                    tempArray_1.push(item);
                                }
                            }
                        });
                        tempArray_1.sort(function (a, b) { return (a.ID > b.ID) ? 1 : ((b.ID > a.ID) ? -1 : 0); });
                        data = tempArray_1;
                        if (data !== null) {
                            tempArray_2 = [];
                            _loop_1 = function (item) {
                                tempArray_2.push({
                                    Action: React.createElement("input", { type: "radio", className: "client", checked: this_1.state.selectedClient.macAccountId === data[item]['MaconomyAccountID'], name: "client", value: data[item]['MaconomyAccountID'], onClick: this_1.SelectClient.bind(this_1, data[item]['MaconomyAccountID'], data[item]['Title']) }),
                                    Link: React.createElement("a", { onClick: function (e) { e.preventDefault(); window.open(_this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + data[item]['ID'] + "&rqType=cl", '_blank'); }, href: '' }, strings.Grid_LinkHeader),
                                    AccessLevel: data[item]["AccessLevel"],
                                    MaconomyAccountID: data[item]["MaconomyAccountID"],
                                    SocialName: data[item]["Title"],
                                    LegalName: data[item]["LegalName"],
                                    Zipcode: data[item]["Zipcode"],
                                    Line1: data[item]["Line1"],
                                    Postal_District_City: data[item]["Postal_District_City"],
                                    Country: data[item]["Country"],
                                    Currency: data[item]["Currency"],
                                    TaxRegistrationNo: data[item]["TaxRegistrationNo"],
                                    Status: data[item]["Status"],
                                    Line2: data[item]["Line2"],
                                    Country_Area_Region: data[item]["Country_Area_Region"],
                                    CompanyRegistrationNo: data[item]["CompanyRegistrationNo"],
                                    Sector: data[item]["Sector"],
                                    ClientStatus: data[item]["ClientStatus"],
                                    ClientType: data[item]["ClientType"],
                                    CustomerRemark4: data[item]["CustomerRemark4"],
                                    CustomerRemark5: data[item]["CustomerRemark5"],
                                    CustomerRemark8: data[item]["CustomerRemark8"],
                                    CustomerRemark7: data[item]["CustomerRemark7"],
                                    ClientIDType: data[item]["ClientIDType"],
                                    //Rutvik emp dropdown change 3-3-23
                                    ClientLead: data[0]["ClientLead"],
                                    CommercialManager: data[0]["CommercialManager"],
                                    Biller: data[0]["Biller"],
                                    ProjectAnalyst: data[0]["ProjectAnalyst"],
                                    ResourceManager: data[0]["ResourceManager"]
                                    //end
                                });
                            };
                            this_1 = this;
                            for (item = 0; item < data.length; item++) {
                                _loop_1(item);
                            }
                            this.setState({
                                clientArray: cloneDeep(tempArray_2)
                            });
                        }
                        this.setState({ loading: false });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log("BindGridData(Section1.tsx)--->", error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.GetSelectedSocialName = function (maconomyNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempItems, tempArray_3, data, _a, _b, errors, error_3;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        viewXML = "<View>\n            <ViewFields>\n                <FieldRef Name=\"ID\"></FieldRef>\n                <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                <FieldRef Name=\"Title\"></FieldRef>\n                <FieldRef Name=\"LegalName\"></FieldRef>\n                <FieldRef Name=\"Line1\"></FieldRef>\n                <FieldRef Name=\"Line2\"></FieldRef>\n                <FieldRef Name=\"Zipcode\"></FieldRef>\n                <FieldRef Name=\"Postal_District_City\"></FieldRef>\n                <FieldRef Name=\"Country\"></FieldRef>\n                <FieldRef Name=\"Currency\"></FieldRef>\n                <FieldRef Name=\"TaxRegistrationNo\"></FieldRef>\n                <FieldRef Name=\"Country_Area_Region\"></FieldRef>\n                <FieldRef Name=\"CompanyRegistrationNo\"></FieldRef>\n                <FieldRef Name=\"Sector\"></FieldRef>\n                <FieldRef Name=\"ClientStatus\"></FieldRef>\n                <FieldRef Name=\"ClientType\"></FieldRef>\n                <FieldRef Name=\"CustomerRemark4\"></FieldRef>\n                <FieldRef Name=\"CustomerRemark5\"></FieldRef>\n                <FieldRef Name=\"ClientLead\"></FieldRef>\n                <FieldRef Name=\"CommercialManager\"></FieldRef>\n                <FieldRef Name=\"Biller\"></FieldRef>\n                <FieldRef Name=\"ProjectAnalyst\"></FieldRef>\n                <FieldRef Name=\"ResourceManager\"></FieldRef>\n             </ViewFields>\n             <Query>\n             <Where>\n             <Eq>\n                <FieldRef Name='MaconomyAccountID' />\n                <Value Type='Text'>" + maconomyNumber + "</Value>\n             </Eq>\n          </Where>\n          </Query>\n            </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempItems = _c.sent();
                        tempArray_3 = [];
                        tempItems.filter(function (item) {
                            var isAccessLevelPresent = false;
                            if (item.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (item["AccessLevel"] !== null && _this.props.accessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_3 = [];
                                    accessLevelArrayFromItem = item["AccessLevel"].split(',');
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
                            if ((item.MaconomyAccountID == maconomyNumber) && isAccessLevelPresent) {
                                tempArray_3.push(item);
                            }
                        });
                        tempArray_3.sort(function (a, b) { return (a.ID > b.ID) ? 1 : ((b.ID > a.ID) ? -1 : 0); });
                        data = tempArray_3;
                        if (!(data !== null && data.length > 0)) return [3 /*break*/, 3];
                        _a = data[0];
                        _b = 'Country';
                        return [4 /*yield*/, Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data[0]['Country'])];
                    case 2:
                        _a[_b] = _c.sent();
                        this.setState({
                            selectedClient: {
                                macAccountId: data[0]["MaconomyAccountID"],
                                socialName: data[0]['Title']
                            },
                            updateRequestDataArray: {
                                MaconomyAccountID: data[0]['MaconomyAccountID'],
                                Title: data[0]['Title'],
                                LegalName: data[0]['LegalName'],
                                Line1: data[0]['Line1'],
                                Line2: data[0]['Line2'],
                                Zipcode: data[0]['Zipcode'],
                                Postal_District_City: data[0]['Postal_District_City'],
                                Country_Area_Region: data[0]['Country_Area_Region'],
                                Country: data[0]['Country'],
                                Currency: data[0]['Currency'],
                                CompanyRegistrationNo: data[0]['CompanyRegistrationNo'],
                                Sector: data[0]['Sector'],
                                ClientStatus: data[0]['ClientStatus'],
                                ClientType: data[0]['ClientType'],
                                TaxRegistrationNo: data[0]['TaxRegistrationNo'],
                                RequestID: this.props.itemID.toString(),
                                AccessLevel: data[0]["AccessLevel"],
                                CustomerRemark4: data[0]["CustomerRemark4"],
                                CustomerRemark5: data[0]["CustomerRemark5"],
                                CustomerRemark8: data[0]["CustomerRemark8"],
                                CustomerRemark7: data[0]["CustomerRemark7"],
                                ClientIDType: data[0]["ClientIDType"],
                                //Rutvik emp dropdown change 3-3-23
                                ClientLead: data[0]["ClientLead"],
                                CommercialManager: data[0]["CommercialManager"],
                                Biller: data[0]["Biller"],
                                ProjectAnalyst: data[0]["ProjectAnalyst"],
                                ResourceManager: data[0]["ResourceManager"]
                                //end
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        errors = this.state.errors;
                        errors.clientExists = strings.NoMaconomyClient_Msg[0] + this.props.listData["MaconomyAccountID"] + strings.NoMaconomyClient_Msg[1];
                        this.setState({ errors: errors });
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _c.sent();
                        console.log("BindGridData(Section1.tsx)--->", error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.SelectClient = function (clientNo, socialName) {
        var _this = this;
        /// <summary>Set MaconomyAccountID and SocialName when select client from list.</summary>            
        //this.selectRadio();
        this.setState(__assign({}, this.state, { selectedClient: {
                macAccountId: clientNo,
                socialName: socialName
            } }), function () {
            _this.selectRadio();
        });
        //rutvik validate change
        var errors = this.state.errors;
        errors.selectedClient = '';
        this.setState({ errors: errors });
        //end
    };
    Section1.prototype.selectRadio = function () {
        // <summary>Event called on page change.</summary>        
        var tempClientArray = this.state.clientArray;
        for (var client = 0; client < tempClientArray.length; client++) {
            if (tempClientArray[client].MaconomyAccountID === this.state.selectedClient.macAccountId) {
                tempClientArray[client].Action = React.createElement("input", { type: "radio", className: "client", checked: true, name: "client", value: tempClientArray[client].MaconomyAccountID, onClick: this.SelectClient.bind(this, tempClientArray[client].MaconomyAccountID, tempClientArray[client].SocialName) });
            }
            else {
                tempClientArray[client].Action = React.createElement("input", { type: "radio", className: "client", checked: false, name: "client", value: tempClientArray[client].MaconomyAccountID, onClick: this.SelectClient.bind(this, tempClientArray[client].MaconomyAccountID, tempClientArray[client].SocialName) });
            }
        }
        this.setState({
            clientArray: cloneDeep(tempClientArray),
        });
    };
    Section1.prototype.SaveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var accessLevel, companyNumber, tempData, queryParameters, id, currentUSerID, recordSaved, viewXML, newFolderPath, oldFolderPath, tempData2, tempArray_4, requeuestData, folderPathBody, body, tempBody, error_4, errordata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 16, , 18]);
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
                            //Rutvik change end - 25-1-22
                        ];
                    case 1:
                        _a.sent();
                        tempData = {
                            Company: data.dpCompany,
                            RequestType: Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.key === _this.props.requestType; })[0].text,
                            RequestorId: this.props.listData != null || this.props.listData != undefined ? this.props.listData.RequestorId : this.state.requestor,
                            Office: this.state.office,
                            WorkflowType: data.rbtnWorkflowType,
                            RequestID: Utils.GenerateRequestID(this.state.itemID),
                            Status: strings.Status[0],
                            //rutvik test change
                            //Title: this.state.selectedClient.socialName.toString(),
                            MaconomyAccountID: this.state.selectedClient.macAccountId.toString(),
                            OldMacId: this.state.selectedClient.macAccountId.toString(),
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
                                return __generator(this, function (_a) {
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 7: return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.add(tempData).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var selectedClientData, tempUpdateRequestData, _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        this.setState({
                                            itemID: res.data.Id,
                                        });
                                        selectedClientData = this.state.clientArray.filter(function (client) { return client.MaconomyAccountID === _this.state.selectedClient.macAccountId; })[0];
                                        _a = {
                                            MaconomyAccountID: this.state.selectedClient.macAccountId.toString(),
                                            Title: selectedClientData.SocialName,
                                            LegalName: selectedClientData.LegalName,
                                            Line1: selectedClientData.Line1,
                                            Line2: selectedClientData.Line2,
                                            Zipcode: selectedClientData.Zipcode,
                                            Postal_District_City: selectedClientData.Postal_District_City,
                                            Country_Area_Region: selectedClientData.Country_Area_Region
                                        };
                                        return [4 /*yield*/, Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, selectedClientData.Country)];
                                    case 1:
                                        _a.Country = _b.sent(),
                                            _a.Currency = selectedClientData.Currency,
                                            _a.CompanyRegistrationNo = selectedClientData.CompanyRegistrationNo,
                                            _a.Sector = selectedClientData.Sector,
                                            _a.ClientStatus = selectedClientData.ClientStatus,
                                            _a.ClientType = selectedClientData.ClientType,
                                            _a.TaxRegistrationNo = selectedClientData.TaxRegistrationNo,
                                            _a.RequestID = this.state.itemID.toString(),
                                            _a.AccessLevel = accessLevel,
                                            _a.CustomerRemark4 = selectedClientData.CustomerRemark4,
                                            _a.CustomerRemark5 = selectedClientData.CustomerRemark5,
                                            _a.CustomerRemark8 = selectedClientData.CustomerRemark8,
                                            _a.CustomerRemark7 = selectedClientData.CustomerRemark7,
                                            //Rutvik emp dropdown change 3-3-23
                                            _a.ClientLead = selectedClientData.ClientLead,
                                            _a.CommercialManager = selectedClientData.CommercialManager,
                                            _a.Biller = selectedClientData.Biller,
                                            _a.ProjectAnalyst = selectedClientData.ProjectAnalyst,
                                            _a.ResourceManager = selectedClientData.ResourceManager;
                                        return [4 /*yield*/, Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.CLIENTIDTYPE_INTERNALNAME, selectedClientData.ClientIDType)];
                                    case 2:
                                        tempUpdateRequestData = (
                                        //end
                                        _a.ClientIDType = _b.sent(),
                                            _a);
                                        this.setState({ updateRequestDataArray: tempUpdateRequestData });
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 8:
                        _a.sent();
                        viewXML = "<View>\n                <ViewFields>\n                    <FieldRef Name=\"ID\"></FieldRef>\n                    <FieldRef Name=\"FolderPath\"></FieldRef>\n                </ViewFields>\n                <RowLimit>1</RowLimit>\n                <Query>\n                    <Where>\n                        <And>\n                            <Neq><FieldRef Name=\"ID\"></FieldRef><Value Type=\"Number\">" + this.state.itemID + "</Value></Neq>\n                            <And>\n                                <Eq><FieldRef Name=\"MaconomyAccountID\"></FieldRef><Value Type=\"Text\">" + this.state.selectedClient.macAccountId + "</Value></Eq>\n                                <And>\n                                    <Eq><FieldRef Name=\"Status\"></FieldRef><Value Type=\"Text\">" + strings.Status[1] + "</Value></Eq>\n                                    <In>\n                                        <FieldRef Name=\"RequestType\" />\n                                        <Values>\n                                            <Value Type='Choice'>" + Constants.REQUESTTYPE_OPTIONS[1].text + "</Value>\n                                            <Value Type='Choice'>" + Constants.REQUESTTYPE_OPTIONS[3].text + "</Value>\n                                        </Values>\n                                    </In>   \n                                </And>\n                            </And>\n                        </And>\n                    </Where>\n                    <OrderBy>\n                        <FieldRef Name=\"ID\" Ascending=\"False\" />\n                    </OrderBy>\n                </Query>\n                </View>";
                        return [4 /*yield*/, Utils.CreateAttachmentFolder(this.objWeb, this.serverRelativeURL, this.state.itemID)];
                    case 9:
                        newFolderPath = _a.sent();
                        oldFolderPath = void 0;
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 10:
                        tempData2 = _a.sent();
                        tempArray_4 = [];
                        tempData2.filter(function (tempItem) {
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
                            if (tempItem.ID != _this.state.itemID && tempItem.MaconomyAccountID == _this.state.selectedClient.macAccountId && tempItem.Status == strings.Status[1] && (tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[1].text || tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[6].text) && isAccessLevelPresent) {
                                tempArray_4.push(tempItem);
                            }
                        });
                        requeuestData = tempArray_4[0];
                        if (!(requeuestData !== null && requeuestData !== undefined)) return [3 /*break*/, 12];
                        if (!(Utils.CheckRequiredField(requeuestData["FolderPath"]) === true)) return [3 /*break*/, 12];
                        oldFolderPath = requeuestData["FolderPath"];
                        folderPathBody = JSON.stringify({
                            'Source': oldFolderPath,
                            'Destination': newFolderPath
                        });
                        return [4 /*yield*/, Utils.CallMSFlow(this.props.context, folderPathBody, this.props.copyFilesFlowUrl)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        this.setState({ folderPath: newFolderPath });
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update({ RequestID: Utils.GenerateRequestID(this.state.itemID), FolderPath: newFolderPath, }).then(function (res) {
                            })];
                    case 13:
                        _a.sent();
                        body = JSON.stringify({
                            'RequestID': this.state.itemID.toString(),
                            'Folder': newFolderPath,
                            'FolderRead': '',
                            'FolderContribute': this.state.requestor.toString(),
                            'ReqRead': '',
                            'ReqContribute': this.state.requestor.toString(),
                            //'UpdateRequestID': this.state.updateRequestDataID.toString(),
                            'UpdateReqContribute': this.state.requestor.toString(),
                        });
                        tempBody = {
                            Title: this.state.itemID.toString(),
                            FolderPath: newFolderPath,
                            FolderRead: "",
                            FolderContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID),
                            ReqRead: "",
                            ReqContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID),
                            //UpdateRequestID: this.state.updateRequestDataID.toString(),
                            UpdateReqContribute: this.state.requestor.toString() //R FHD change 19-9-2023,
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15: return [3 /*break*/, 18];
                    case 16:
                        error_4 = _a.sent();
                        console.log("section 1 save data", error_4);
                        errordata = {
                            Title: new Date(),
                            Errors: error_4,
                            RequestID: this.props.itemID
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata)];
                    case 17:
                        _a.sent();
                        //error log change end
                        this.setState({ loading: false });
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
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
                            this.setState({ loading: false }, function () { return __awaiter(_this, void 0, void 0, function () {
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
                                                    "workflowType": this.state.rbtnWorkflowType,
                                                    "requestType": Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.key === _this.props.requestType; })[0].text,
                                                    "folderPath": this.state.folderPath,
                                                    "requestorID": this.state.requestor,
                                                    "maconomyAccountID": this.state.selectedClient.macAccountId,
                                                })];
                                        case 3:
                                            _a.sent();
                                            this.props.dataChange("updateRequestDataID", this.state.updateRequestDataID);
                                            this.props.nextStep();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        else {
                            this.setState({ loading: false }); //9-2-23
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
    Section1.prototype.SaveDataOperations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.companySectionRef.current.ValidateCompanySection();
                        if (this.ValidationSection(data) === false || data === null) {
                            return [2 /*return*/, false];
                        }
                        // if (await this.CheckIsRequestExists() === true) {
                        //     return false
                        // }
                        this.setState({
                            dpCompany: data.dpCompany,
                            rbtnWorkflowType: data.rbtnWorkflowType,
                        });
                        return [4 /*yield*/, this.SaveData(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Section1.prototype.CheckIsRequestExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempData2, tempArray, requestData, errorsObj;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempData2 = _a.sent();
                        tempArray = [];
                        tempData2.filter(function (tempItem) {
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
                            if (tempItem.Status == strings.Status[0] && tempItem.Submitted == true && tempItem.MaconomyAccountID == _this.state.selectedClient.macAccountId && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[6].text && isAccessLevelPresent) {
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
    Section1.prototype.ValidationSection = function (data) {
        /// <summary>Validate client selected from list or not.</summary>
        var errors = this.state.errors;
        errors.selectedClient = (this.state.selectedClient.macAccountId == '') ? strings.SelectClientMsg : "";
        if (this.props.itemID > 0 && Utils.CheckRequiredField(data.dpCompany) === false) {
            errors.companyExists = strings.NoCompany_Msg[0] + this.props.listData["Company"] + strings.NoCompany_Msg[1];
        }
        this.setState({ errors: errors });
        var valid = errors.selectedClient.length > 0 || errors.companyExists.length > 0 ? false : true;
        return valid;
    };
    return Section1;
}(React.Component));
export default Section1;
//# sourceMappingURL=Section1.js.map