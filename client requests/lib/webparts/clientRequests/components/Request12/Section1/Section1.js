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
import { Web } from 'sp-pnp-js';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import ClipLoader from "react-spinners/ClipLoader";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { Icon, Label } from 'office-ui-fabric-react';
import CardFooter from '../../common/CardFooter/CardFooter';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
var columns = [
    { name: strings.ActionHeader, selector: 'Action', width: '80px', maxWidth: '80px' },
    { name: strings.Grid_LinkHeader, selector: 'Link', sortable: false, width: '80px', maxWidth: '80px' },
    { name: strings.CompanyFieldLabel, selector: 'Company', sortable: true, wrap: true, width: '100px' },
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
            gridLoading: false,
            rbtnWorkflowType: strings.WorkflowType[0],
            requestor: 0,
            itemID: 0,
            office: '',
            folderPath: '',
            companyClientArray: [],
            selectedCompanyClient: '',
            errors: {
                selectedClient: '',
                requestExists: '',
                companyClientsNotExists: '',
                clientExists: '',
                companyExists: ''
            },
            selectedClientSocialName: '',
            updateRequestDataArray: '',
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
                        if (!(this.props.listData !== null)) return [3 /*break*/, 8];
                        this.setState({
                            dpCompany: this.props.listData["Company"],
                            rbtnWorkflowType: this.props.listData["WorkflowType"],
                            folderPath: this.props.listData["FolderPath"],
                            selectedCompanyClient: this.props.listData["MaconomyAccountID"],
                        });
                        return [4 /*yield*/, this.GetUpdateRequestData(this.props.listData["MaconomyAccountID"])];
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
                        if (!(this.props.itemID === 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.BindGridData()];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
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
                    React.createElement(CompanySection, __assign({ isDisable: this.props.itemID > 0 ? true : false, ref: this.companySectionRef }, this.props, { setLoader: this.SetLoader.bind(this), dpCompany: this.state.dpCompany, rbtnWorkflowType: this.state.rbtnWorkflowType, isWorkflowTypeNeeded: false, setSelectedCompany: this.SetSelectedCompany.bind(this), requestType: strings.RequestType[5], accessLevel: this.props.accessLevel })),
                    this.props.itemID === 0 ?
                        React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "card-header text-center" },
                                React.createElement("h3", { className: "border-0 pl-0" }, strings.Lbl_SelectCompanyClientGrid)),
                            React.createElement("div", { className: "grid-table", style: { position: "relative" } },
                                React.createElement("div", { className: "loading-css", style: { display: this.state.gridLoading ? "block" : "none" } },
                                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.gridLoading })),
                                React.createElement(DataTableExtensions, { data: this.state.companyClientArray, columns: columns, print: false, export: false, filterHidden: false },
                                    React.createElement(DataTable, { className: "table", data: this.state.companyClientArray, columns: columns, responsive: true, pagination: true, paginationComponentOptions: { noRowsPerPage: true }, paginationPerPage: 10, noHeader: true, persistTableHead: true, noDataComponent: React.createElement("div", { className: "nodatadiv" },
                                            React.createElement("label", { className: "nodata" }, strings.NoRecordsAvailable)), sortIcon: React.createElement(Icon, { iconName: "SortDown" }), onChangePage: this.SelectRadio.bind(this), onSort: this.SelectRadio.bind(this), noContextMenu: true })))) : null,
                    this.state.errors.selectedClient.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.selectedClient,
                            " ")) : null,
                    this.state.selectedCompanyClient.length > 0 && this.state.errors.clientExists.length === 0 ?
                        React.createElement("div", { className: "alert alert-warning mt-3", role: "alert" },
                            React.createElement(Label, { className: "text-left" },
                                strings.YouHaveSelectedText,
                                " ",
                                React.createElement("strong", null, this.state.selectedCompanyClient),
                                " - ",
                                this.state.selectedClientSocialName)) : null,
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
                    this.state.errors.companyClientsNotExists.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.companyClientsNotExists,
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
            var error, viewXML, tempItems, tempDataArray_1, data, tempArray_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        error = this.state.errors;
                        this.setState({ gridLoading: true });
                        viewXML = "<View>\n            <ViewFields>\n                <FieldRef Name=\"ID\"></FieldRef>\n                <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                <FieldRef Name=\"Company\"></FieldRef>\n                <FieldRef Name=\"CustomerType\"></FieldRef>\n                <FieldRef Name=\"Title\"></FieldRef>\n                <FieldRef Name=\"LegalName\"></FieldRef>\n                <FieldRef Name=\"Line1\"></FieldRef>\n                <FieldRef Name=\"Line2\"></FieldRef>\n                <FieldRef Name=\"Zipcode\"></FieldRef>\n                <FieldRef Name=\"Postal_District_City\"></FieldRef>\n                <FieldRef Name=\"Country_Area_Region\"></FieldRef>\n                <FieldRef Name=\"Country\"></FieldRef>\n                <FieldRef Name=\"Currency\"></FieldRef>\n                <FieldRef Name=\"TaxRegistrationNo\"></FieldRef>\n                <FieldRef Name=\"ClientAttentionName\"></FieldRef>\n                <FieldRef Name=\"Email\"></FieldRef>\n                <FieldRef Name=\"PhoneNo\"></FieldRef>\n                <FieldRef Name=\"DefaultTaxCode\"></FieldRef>\n                <FieldRef Name=\"PaymentTerms\"></FieldRef>\n                <FieldRef Name=\"WithholdingTaxType\"></FieldRef>\n                <FieldRef Name=\"Emirate\"></FieldRef>\n\t\t\t\t<FieldRef Name=\"PlaceOfSupply\"></FieldRef>\n\t\t\t\t<FieldRef Name=\"GSTRegistrationType\"></FieldRef>\n\t\t\t\t<FieldRef Name=\"CIN\"></FieldRef>\n                <FieldRef Name=\"TDSTaxRate\"></FieldRef>\n                <FieldRef Name='Sector'></FieldRef>\n                <FieldRef Name='ClientStatus'></FieldRef>\n                <FieldRef Name='ClientType'></FieldRef>\n                <FieldRef Name='CompanyRegistrationNo'></FieldRef>\n                <FieldRef Name=\"CustomerRemark4\"></FieldRef>\n                <FieldRef Name=\"CustomerRemark5\"></FieldRef>\n                <FieldRef Name=\"CustomerRemark8\"></FieldRef>\n                <FieldRef Name=\"CustomerRemark7\"></FieldRef>\n                <FieldRef Name=\"ClientIDType\"></FieldRef>\n                <FieldRef Name=\"ClientLead\"></FieldRef>\n                <FieldRef Name=\"CommercialManager\"></FieldRef>\n                <FieldRef Name=\"Biller\"></FieldRef>\n                <FieldRef Name=\"ProjectAnalyst\"></FieldRef>\n                <FieldRef Name=\"ResourceManager\"></FieldRef>\n            </ViewFields>\n                <Query>\n                    <Where>\n                        <Eq><FieldRef Name=\"Company\" /><Value Type=\"Text\">" + this.state.dpCompany.split('-')[0].trim() + "</Value></Eq>\n                    </Where>\n                    <OrderBy><FieldRef Name='ID' Ascending='True'></FieldRef></OrderBy>\n                </Query>\n            </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.COMPANYCUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempItems = _a.sent();
                        tempDataArray_1 = [];
                        tempItems.filter(function (item) {
                            var isAccessLevelPresent = false;
                            if (item.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (item["AccessLevel"] !== null && _this.props.accessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_1 = [];
                                    accessLevelArrayFromItem = item["AccessLevel"].split(',');
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
                            if (item.Company == _this.state.dpCompany.split('-')[0].trim() && isAccessLevelPresent) {
                                tempDataArray_1.push(item);
                            }
                        });
                        data = tempDataArray_1;
                        if (data !== null) {
                            tempArray_1 = [];
                            data.forEach(function (element) {
                                tempArray_1.push({
                                    Action: React.createElement("input", { type: "radio", checked: _this.state.selectedCompanyClient === element['MaconomyAccountID'], name: "client", value: element["MaconomyAccountID"], onClick: _this.SelectCompanyClient.bind(_this, element['MaconomyAccountID'], element['Title']) }),
                                    Link: React.createElement("a", { onClick: function (e) { e.preventDefault(); window.open(_this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + element['ID'] + "&rqType=ccc", '_blank'); }, href: '' }, strings.Grid_LinkHeader),
                                    MaconomyAccountID: element["MaconomyAccountID"],
                                    SocialName: element["Title"],
                                    LegalName: element["LegalName"],
                                    Zipcode: element["Zipcode"],
                                    Line1: element["Line1"],
                                    Line2: element["Line2"],
                                    Postal_District_City: element["Postal_District_City"],
                                    Country: element["Country"],
                                    Currency: element["Currency"],
                                    TaxRegistrationNo: element["TaxRegistrationNo"],
                                    Company: element["Company"],
                                    CustomerType: element["CustomerType"],
                                    Id: element["ID"],
                                    ClientAttentionName: element["ClientAttentionName"],
                                    Email: element["Email"],
                                    PhoneNo: element["PhoneNo"],
                                    DefaultTaxCode: element["DefaultTaxCode"],
                                    PaymentTerms: element["PaymentTerms"],
                                    WithholdingTaxType: element["WithholdingTaxType"],
                                    Emirate: element["Emirate"],
                                    PlaceOfSupply: element["PlaceOfSupply"],
                                    GSTRegistrationType: element["GSTRegistrationType"],
                                    CIN: element["CIN"],
                                    TDSTaxRate: element["TDSTaxRate"],
                                    CompanyRegistrationNo: element["CompanyRegistrationNo"],
                                    ClientStatus: element["ClientStatus"],
                                    ClientType: element["ClientType"],
                                    Sector: element["Sector"],
                                    Country_Area_Region: element["Country_Area_Region"],
                                    //rutvik 12-7 24
                                    CustomerRemark4: element["CustomerRemark4"],
                                    CustomerRemark5: element["CustomerRemark5"],
                                    CustomerRemark8: element["CustomerRemark8"],
                                    CustomerRemark7: element["CustomerRemark7"],
                                    ClientIDType: element["ClientIDType"],
                                    //Rutvik emp dropdown change 3-3-23
                                    ClientLead: element["ClientLead"],
                                    CommercialManager: element["CommercialManager"],
                                    Biller: element["Biller"],
                                    ProjectAnalyst: element["ProjectAnalyst"],
                                    ResourceManager: element["ResourceManager"],
                                    //end
                                    FinanceEmail: element["FinanceEmail"],
                                    ExcludeFromClientInvoiceReminder: element["ExcludeFromClientInvoiceReminder"]
                                });
                            });
                            this.setState({
                                companyClientArray: cloneDeep(tempArray_1)
                            });
                            if (this.state.dpCompany !== "") {
                                if (this.state.companyClientArray.length > 0) {
                                    error.companyClientsNotExists = '';
                                }
                                else {
                                    error.companyClientsNotExists = strings.CompanyClient_NotExists;
                                }
                            }
                        }
                        this.setState({ gridLoading: false, errors: error });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Bind Grid Data ---> ", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.GetUpdateRequestData = function (maconomyNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var company, viewXML, tempItems, tempDataArray, data, _a, errors;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        company = this.state.dpCompany.split('-')[0].trim();
                        viewXML = "<View>\n        <ViewFields>\n            <FieldRef Name=\"ID\"></FieldRef>\n            <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n            <FieldRef Name=\"Company\"></FieldRef>\n            <FieldRef Name=\"Title\"></FieldRef>\n            <FieldRef Name=\"LegalName\"></FieldRef>\n            <FieldRef Name=\"ClientAttentionName\"></FieldRef>\n            <FieldRef Name=\"Email\"></FieldRef>\n            <FieldRef Name=\"PhoneNo\"></FieldRef>\n            <FieldRef Name=\"DefaultTaxCode\"></FieldRef>\n            <FieldRef Name=\"PaymentTerms\"></FieldRef>\n            <FieldRef Name=\"WithholdingTaxType\"></FieldRef>\n            <FieldRef Name=\"Emirate\"></FieldRef>\n\t\t\t<FieldRef Name=\"PlaceOfSupply\"></FieldRef>\n\t\t\t<FieldRef Name=\"GSTRegistrationType\"></FieldRef>\n\t\t\t<FieldRef Name=\"CIN\"></FieldRef>\n            <FieldRef Name=\"TDSTaxRate\"></FieldRef>\n            <FieldRef Name=\"Line1\"></FieldRef>\n            <FieldRef Name=\"Line2\"></FieldRef>\n            <FieldRef Name=\"Zipcode\"></FieldRef>\n            <FieldRef Name=\"Postal_District_City\"></FieldRef>\n            <FieldRef Name=\"Country_Area_Region\"></FieldRef>\n            <FieldRef Name=\"Country\"></FieldRef>\n            <FieldRef Name=\"Currency\"></FieldRef>\n            <FieldRef Name=\"CompanyRegistrationNo\"></FieldRef>\n            <FieldRef Name=\"Sector\"></FieldRef>\n            <FieldRef Name=\"ClientStatus\"></FieldRef>\n            <FieldRef Name=\"ClientType\"></FieldRef>\n            <FieldRef Name=\"TaxRegistrationNo\"></FieldRef>\n            <FieldRef Name=\"CustomerRemark4\"></FieldRef>\n            <FieldRef Name=\"CustomerRemark5\"></FieldRef>\n            <FieldRef Name=\"CustomerRemark8\"></FieldRef>\n            <FieldRef Name=\"CustomerRemark7\"></FieldRef>\n            <FieldRef Name=\"ClientIDType\"></FieldRef>\n            <FieldRef Name=\"ClientLead\"></FieldRef>\n            <FieldRef Name=\"CommercialManager\"></FieldRef>\n            <FieldRef Name=\"Biller\"></FieldRef>\n            <FieldRef Name=\"ProjectAnalyst\"></FieldRef>\n            <FieldRef Name=\"ResourceManager\"></FieldRef>\n\t\t</ViewFields>\n\t\t<RowLimit>1</RowLimit>\n\t\t<Query>\n            <Where>\n                <And>\n                    <Eq><FieldRef Name=\"MaconomyAccountID\"/><Value Type=\"Text\">" + maconomyNumber + "</Value></Eq>\n                    <Eq><FieldRef Name=\"Company\"/><Value Type=\"Text\">" + company + "</Value></Eq>\n                </And>\n\t\t\t</Where>\n        </Query>\n        </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.COMPANYCUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempItems = _b.sent();
                        tempDataArray = [];
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
                            if (item.MaconomyAccountID == maconomyNumber && item.Company == company && isAccessLevelPresent) {
                                tempDataArray.push(item);
                            }
                        });
                        data = tempDataArray[0];
                        if (!(data !== null && data !== undefined)) return [3 /*break*/, 3];
                        _a = data;
                        return [4 /*yield*/, Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.PaymentTerms)];
                    case 2:
                        _a.PaymentTerms = _b.sent();
                        //rutvik test changes
                        //data.DefaultTaxCode = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.DefaultTaxCode);
                        //data.ClientIDType = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.CLIENTIDTYPE_INTERNALNAME, data.ClientIDType);
                        this.setState({
                            selectedCompanyClient: data.MaconomyAccountID,
                            selectedClientSocialName: data.Title,
                            updateRequestDataArray: {
                                MaconomyAccountID: data.MaconomyAccountID,
                                Title: data.Title,
                                Company: this.state.dpCompany,
                                LegalName: data.LegalName,
                                ClientAttentionName: data.ClientAttentionName,
                                Email: data.Email,
                                PhoneNo: data.PhoneNo,
                                DefaultTaxCode: data.DefaultTaxCode,
                                PaymentTerms: data.PaymentTerms,
                                WithholdingTaxType: data.WithholdingTaxType,
                                Emirate: data.Emirate,
                                PlaceofSupply: data.PlaceOfSupply,
                                GSTRegistrationType: data.GSTRegistrationType,
                                CIN: data.CIN,
                                TDSTaxRate: data.TDSTaxRate,
                                RequestID: this.props.itemID.toString(),
                                Line1: data.Line1,
                                Line2: data.Line2,
                                Zipcode: data.Zipcode,
                                Postal_District_City: data.Postal_District_City,
                                Country_Area_Region: data.Country_Area_Region,
                                Country: data.Country,
                                Currency: data.Currency,
                                CompanyRegistrationNo: data.CompanyRegistrationNo,
                                Sector: data.Sector,
                                ClientStatus: data.ClientStatus,
                                ClientType: data.ClientType,
                                TaxRegistrationNo: data.TaxRegistrationNo,
                                AccessLevel: data.AccessLevel,
                                //rutvik 12-7 24
                                CustomerRemark4: data.CustomerRemark4,
                                CustomerRemark5: data.CustomerRemark5,
                                CustomerRemark8: data.CustomerRemark8,
                                CustomerRemark7: data.CustomerRemark7,
                                ClientIDType: data.ClientIDType,
                                //Rutvik emp dropdown change 3-3-23
                                ClientLead: data.ClientLead,
                                CommercialManager: data.CommercialManager,
                                Biller: data.Biller,
                                ProjectAnalyst: data.ProjectAnalyst,
                                ResourceManager: data.ResourceManager,
                                //end
                                FinanceEmail: data.FinanceEmail,
                                ExcludeFromClientInvoiceReminder: data.ExcludeFromClientInvoiceReminder
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        errors = this.state.errors;
                        errors.clientExists = strings.NoMaconomyCompanyClient_Msg[0] + this.state.selectedCompanyClient + strings.NoMaconomyCompanyClient_Msg[1];
                        this.setState({ errors: errors });
                        _b.label = 4;
                    case 4: return [2 /*return*/];
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
                            if (tempItem.RequestID == _this.props.itemID && isAccessLevelPresent) {
                                tempArray.push(tempItem);
                            }
                        });
                        data = tempArray[0];
                        if (data !== null && data !== undefined) {
                            this.setState({
                                updateRequestDataID: data.ID
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.SelectCompanyClient = function (selectedClient, selectedSocialName) {
        /// <summary>Set MaconomyAccountID when select client from list.</summary>
        var _this = this;
        this.setState(__assign({}, this.state, { selectedClientSocialName: selectedSocialName, selectedCompanyClient: selectedClient }), function () {
            _this.SelectRadio();
        });
        //rutvik validate change
        var errors = this.state.errors;
        errors.selectedClient = '';
        this.setState({ errors: errors });
        //end
    };
    Section1.prototype.SelectRadio = function () {
        // <summary>Event called on page change.</summary>
        var tempArray = this.state.companyClientArray;
        for (var client = 0; client < tempArray.length; client++) {
            if (tempArray[client].MaconomyAccountID === this.state.selectedCompanyClient) {
                tempArray[client].Action = React.createElement("input", { type: "radio", checked: true, name: "client", value: tempArray[client].MaconomyAccountID, onClick: this.SelectCompanyClient.bind(this, tempArray[client].MaconomyAccountID, tempArray[client].SocialName) });
            }
            else {
                tempArray[client].Action = React.createElement("input", { type: "radio", checked: false, name: "client", value: tempArray[client].MaconomyAccountID, onClick: this.SelectCompanyClient.bind(this, tempArray[client].MaconomyAccountID, tempArray[client].SocialName) });
            }
        }
        this.setState({
            companyClientArray: cloneDeep(tempArray)
        });
    };
    Section1.prototype.SetSelectedCompany = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // <summary>Set selected company value</summary> 
                    return [4 /*yield*/, this.setState({ dpCompany: value, selectedCompanyClient: '' })];
                    case 1:
                        // <summary>Set selected company value</summary> 
                        _a.sent();
                        return [4 /*yield*/, this.BindGridData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.ValidateSection = function (data) {
        /// <summary>Validate client selected from list or not.</summary>
        var errors = this.state.errors;
        errors.selectedClient = (this.state.selectedCompanyClient == '') ? strings.SelectCompanyClientMsg : "";
        if (this.props.itemID > 0 && Utils.CheckRequiredField(data.dpCompany) === false) {
            errors.companyExists = strings.NoCompany_Msg[0] + this.props.listData["Company"] + strings.NoCompany_Msg[1];
        }
        this.setState({ errors: errors });
        var valid = errors.selectedClient.length > 0 || errors.companyExists.length > 0 ? false : true;
        return valid;
    };
    Section1.prototype.SaveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var accessLevel, companyNumber, tempData, queryParameters, id, currentUSerID, recordSaved, viewXML, newFolderPath, oldFolderPath, tempData2, tempArray_2, requestData, folderPathBody, body, tempBody, error_2, errordata;
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
                            //change end - 25-1-22
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
                            MaconomyAccountID: this.state.selectedCompanyClient.toString(),
                            Title: this.state.selectedClientSocialName,
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
                                    switch (_a.label) {
                                        case 0:
                                            if (!(this.props.data === null || this.props.data === undefined)) return [3 /*break*/, 2];
                                            if (!!queryParameters.getValue("itemID")) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.getById(this.state.updateRequestDataID).update(this.state.updateRequestDataArray).then(function (response) {
                                                })];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
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
                                            itemID: res.data.Id
                                        });
                                        selectedClientData = this.state.companyClientArray.filter(function (client) { return client.MaconomyAccountID === _this.state.selectedCompanyClient; })[0];
                                        _a = {
                                            MaconomyAccountID: this.state.selectedCompanyClient,
                                            Title: selectedClientData.SocialName,
                                            LegalName: selectedClientData.LegalName,
                                            Company: data.dpCompany,
                                            ClientAttentionName: selectedClientData.ClientAttentionName,
                                            Email: selectedClientData.Email,
                                            PhoneNo: selectedClientData.PhoneNo,
                                            //rutvik test change
                                            //DefaultTaxCode: await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, selectedClientData.DefaultTaxCode),
                                            DefaultTaxCode: selectedClientData.DefaultTaxCode
                                        };
                                        return [4 /*yield*/, Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, selectedClientData.PaymentTerms)];
                                    case 1:
                                        tempUpdateRequestData = (_a.PaymentTerms = _b.sent(),
                                            _a.WithholdingTaxType = selectedClientData.WithholdingTaxType,
                                            _a.Emirate = selectedClientData.Emirate,
                                            _a.PlaceofSupply = selectedClientData.PlaceOfSupply,
                                            _a.GSTRegistrationType = selectedClientData.GSTRegistrationType,
                                            _a.CIN = selectedClientData.CIN,
                                            _a.TDSTaxRate = selectedClientData.TDSTaxRate,
                                            _a.RequestID = this.state.itemID.toString(),
                                            _a.Line1 = selectedClientData.Line1,
                                            _a.Line2 = selectedClientData.Line2,
                                            _a.Zipcode = selectedClientData.Zipcode,
                                            _a.Postal_District_City = selectedClientData.Postal_District_City,
                                            _a.Country_Area_Region = selectedClientData.Country_Area_Region,
                                            _a.Country = selectedClientData.Country,
                                            _a.Currency = selectedClientData.Currency,
                                            _a.CompanyRegistrationNo = selectedClientData.CompanyRegistrationNo,
                                            _a.Sector = selectedClientData.Sector,
                                            _a.ClientStatus = selectedClientData.ClientStatus,
                                            _a.ClientType = selectedClientData.ClientType,
                                            _a.TaxRegistrationNo = selectedClientData.TaxRegistrationNo,
                                            _a.AccessLevel = accessLevel,
                                            _a.CustomerRemark4 = selectedClientData.CustomerRemark4,
                                            _a.CustomerRemark5 = selectedClientData.CustomerRemark5,
                                            _a.CustomerRemark8 = selectedClientData.CustomerRemark8,
                                            _a.CustomerRemark7 = selectedClientData.CustomerRemark7,
                                            _a.ClientIDType = selectedClientData.ClientIDType,
                                            //Rutvik emp dropdown change 3-3-23
                                            _a.ClientLead = selectedClientData.ClientLead,
                                            _a.CommercialManager = selectedClientData.CommercialManager,
                                            _a.Biller = selectedClientData.Biller,
                                            _a.ProjectAnalyst = selectedClientData.ProjectAnalyst,
                                            _a.ResourceManager = selectedClientData.ResourceManager,
                                            //end
                                            _a.FinanceEmail = selectedClientData.FinanceEmail,
                                            _a.ExcludeFromClientInvoiceReminder = selectedClientData.ExcludeFromClientInvoiceReminder,
                                            _a);
                                        this.setState({ updateRequestDataArray: tempUpdateRequestData });
                                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.add(tempUpdateRequestData).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    this.setState({ updateRequestDataID: response.data.Id });
                                                    return [2 /*return*/];
                                                });
                                            }); })];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 8:
                        _a.sent();
                        viewXML = "<View>\n                <ViewFields>\n                    <FieldRef Name=\"ID\"></FieldRef>\n                    <FieldRef Name=\"FolderPath\"></FieldRef>\n                </ViewFields>\n                <RowLimit>1</RowLimit>\n                <Query>\n                    <Where>\n                        <And>\n                            <Neq><FieldRef Name=\"ID\"></FieldRef><Value Type=\"Number\">" + this.state.itemID + "</Value></Neq>\n                            <And>\n                                <Eq><FieldRef Name=\"MaconomyAccountID\"></FieldRef><Value Type=\"Text\">" + this.state.selectedCompanyClient + "</Value></Eq>\n                                <And>\n                                    <Eq><FieldRef Name=\"Status\"></FieldRef><Value Type=\"Text\">" + strings.Status[1] + "</Value></Eq>\n                                    <And>\n                                        <Eq><FieldRef Name=\"Company\"></FieldRef><Value Type=\"Text\">" + data.dpCompany + "</Value></Eq>\n                                        <In>\n                                            <FieldRef Name=\"RequestType\" />\n                                            <Values>\n                                                <Value Type='Choice'>" + Constants.REQUESTTYPE_OPTIONS[5].text + "</Value>\n                                            </Values>\n                                        </In>\n                                    </And>\n                                </And>\n                            </And>\n                        </And>\n                    </Where>\n                    <OrderBy>\n                        <FieldRef Name=\"ID\" Ascending=\"False\" />\n                    </OrderBy>\n                </Query>\n                </View>";
                        return [4 /*yield*/, Utils.CreateAttachmentFolder(this.objWeb, this.serverRelativeURL, this.state.itemID)];
                    case 9:
                        newFolderPath = _a.sent();
                        oldFolderPath = void 0;
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 10:
                        tempData2 = _a.sent();
                        tempArray_2 = [];
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
                            if (tempItem.ID != _this.state.itemID && tempItem.MaconomyAccountID == _this.state.selectedCompanyClient && tempItem.Status == strings.Status[1] && tempItem.Company == data.dpCompany && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[5].text && isAccessLevelPresent) {
                                tempArray_2.push(tempItem);
                            }
                        });
                        requestData = tempArray_2[0];
                        if (!(requestData !== null && requestData !== undefined)) return [3 /*break*/, 12];
                        if (!(Utils.CheckRequiredField(requestData["FolderPath"]) === true)) return [3 /*break*/, 12];
                        oldFolderPath = requestData["FolderPath"];
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
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update({ RequestID: Utils.GenerateRequestID(this.state.itemID), FolderPath: newFolderPath }).then(function (res) {
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
                            'UpdateRequestID': this.state.updateRequestDataID.toString(),
                            'UpdateReqContribute': this.state.requestor.toString(),
                        });
                        tempBody = {
                            Title: this.state.itemID.toString(),
                            FolderPath: newFolderPath,
                            FolderRead: "",
                            FolderContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID),
                            ReqRead: "",
                            ReqContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID),
                            UpdateRequestID: this.state.updateRequestDataID.toString(),
                            UpdateReqContribute: this.state.requestor.toString() //R FHD change 19-9-2023,
                        };
                        //Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody)];
                    case 14:
                        //Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);
                        _a.sent();
                        _a.label = 15;
                    case 15: return [3 /*break*/, 18];
                    case 16:
                        error_2 = _a.sent();
                        console.log("SaveData--->", error_2);
                        errordata = {
                            Title: new Date(),
                            Errors: error_2,
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
    Section1.prototype.SaveDataOperations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.companySectionRef.current.ValidateCompanySection();
                        if (this.state.errors.companyClientsNotExists.length > 0) {
                            return [2 /*return*/, false];
                        }
                        if (this.ValidateSection(data) === false || data === null) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.CheckIsRequestExists()];
                    case 1:
                        if ((_a.sent()) === true) {
                            return [2 /*return*/, false];
                        }
                        this.setState({ dpCompany: data.dpCompany });
                        return [4 /*yield*/, this.SaveData(data)];
                    case 2:
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
                                                    "maconomyAccountID": this.state.selectedCompanyClient,
                                                    "updateRequestDataID": this.state.updateRequestDataID.toString()
                                                })];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.dataChange("macAccountId", this.state.selectedCompanyClient)];
                                        case 4:
                                            _a.sent();
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
    Section1.prototype.CheckIsRequestExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempData, tempArray, requestData, errorsObj;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewXML = "<View>\n        <ViewFields>\n            <FieldRef Name=\"ID\"></FieldRef>\n            <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n            <FieldRef Name=\"RequestType\"></FieldRef>\n            <FieldRef Name=\"Status\"></FieldRef>\n            <FieldRef Name=\"RequestID\"></FieldRef>\n        </ViewFields>\n        <RowLimit>1</RowLimit>\n        <Query>\n            <Where>\n                <And>\n                    <And>\n                        <Eq><FieldRef Name=\"Status\"></FieldRef><Value Type=\"Choice\">" + strings.Status[0] + "</Value></Eq>\n                        <Eq><FieldRef Name=\"Submitted\"/><Value Type=\"Boolean\">1</Value></Eq>\n                    </And>\n                    <And>\n                        <Eq><FieldRef Name=\"MaconomyAccountID\"></FieldRef><Value Type=\"Text\">" + this.state.selectedCompanyClient + "</Value></Eq>\n                        <Eq><FieldRef Name=\"RequestType\"></FieldRef><Value Type=\"Choice\">" + Constants.REQUESTTYPE_OPTIONS[5].text + "</Value></Eq>\n                    </And>\n                </And>\n            </Where>\n        </Query>\n        </View>";
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
                            if (tempItem.Status == strings.Status[0] && tempItem.Submitted == true && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[5].text && tempItem.MaconomyAccountID == _this.state.selectedCompanyClient && isAccessLevelPresent) {
                                tempArray.push(tempItem);
                            }
                        });
                        requestData = tempArray[0];
                        errorsObj = this.state.errors;
                        if (requestData !== null && requestData !== undefined && (this.props.listData === null || (this.props.listData != null && this.props.listData.Submitted === false))) {
                            errorsObj.requestExists = strings.ClientRequest_RunningModeReq12[0] + requestData.RequestID + " " + requestData.ID + strings.ClientRequest_RunningModeReq12[1];
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