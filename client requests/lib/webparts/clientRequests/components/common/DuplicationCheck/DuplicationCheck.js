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
import { Icon, Label } from 'office-ui-fabric-react';
import { Web } from 'sp-pnp-js';
import DataTable from 'react-data-table-component';
import CardFooter from '../CardFooter/CardFooter';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import DataTableExtensions from 'react-data-table-component-extensions';
require('../../../js/bootstrap.bundle.min.js');
require('../../../css/bootstrap.min.css');
var Columns = [
    {
        name: strings.Grid_LinkHeader,
        selector: 'Link',
        sortable: false,
        width: '80px'
    },
    {
        name: strings.DuplicationcheckHeader[0],
        selector: 'MaconomyAccountID',
        sortable: true,
        minWidth: '120px'
    },
    {
        name: strings.DuplicationcheckHeader[8],
        selector: 'Currency',
        sortable: true,
    },
    {
        name: strings.DuplicationcheckHeader[1],
        selector: 'SocialName',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[2],
        selector: 'LegalName',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[3],
        selector: 'Line1',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[4],
        selector: 'Line2',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[5],
        selector: 'Zipcode',
        sortable: true,
        wrap: true,
    },
    {
        name: strings.DuplicationcheckHeader[6],
        selector: 'Postal_District_City',
        sortable: true,
        wrap: true,
        minWidth: '150px'
    },
    {
        name: strings.DuplicationcheckHeader[7],
        selector: 'Country',
        sortable: true,
        wrap: true,
    },
    {
        name: strings.DuplicationcheckHeader[9],
        selector: 'TaxRegistrationNo',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[10],
        selector: 'Status',
        sortable: true,
    }
];
var Request9_columns = [
    {
        name: strings.Grid_LinkHeader,
        selector: 'Link',
        sortable: false,
        width: '80px'
    },
    {
        name: strings.DuplicationcheckHeader[0],
        selector: 'MaconomyAccountID',
        sortable: true,
        minWidth: '120px',
        maxWidth: '150px'
    },
    {
        name: strings.DuplicationcheckHeader[1],
        selector: 'SocialName',
        sortable: true,
        wrap: true,
    }
];
var DuplicationCheck = /** @class */ (function (_super) {
    __extends(DuplicationCheck, _super);
    function DuplicationCheck(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.isRequest9 = _this.props.approvalData.requestType === strings.RequestType[2];
        _this.state = {
            mainLoading: false,
            requestsArray: [],
            loading: false,
            tbxlegalName: '',
            tbxLine1: '',
            tbxSocialName: '',
            tbxTaxRegNo: '',
            chkTestDuplicate: '',
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
            errors: {
                tbxlegalName: '',
                tbxLine1: '',
                tbxTaxRegNo: '',
                tbxSocialName: '',
            },
            itemID: 0
        };
        return _this;
    }
    DuplicationCheck.prototype.componentWillMount = function () {
        /// <summary>Bind data.</summary>
        if (this.props.listData !== null) {
            this.setState({
                tbxLine1: this.props.listData["Line1"],
                tbxTaxRegNo: this.props.listData["TaxRegistrationNo"],
                tbxlegalName: this.props.listData["LegalName"] === "-" ? '' : this.props.listData["LegalName"],
                tbxSocialName: this.props.listData["Title"]
            });
        }
        if (this.props.data !== null) {
            this.setState(__assign({}, this.props.data));
        }
        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
    };
    DuplicationCheck.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentUserID, requestoridd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Bind datatable.</summary>
                        if (this.isRequest9) {
                            this.LoadData();
                        }
                        else {
                            if (Utils.CheckRequiredField(this.state.tbxLine1) && Utils.CheckRequiredField(this.state.tbxTaxRegNo) && Utils.CheckRequiredField(this.state.tbxlegalName)) {
                                this.LoadData();
                            }
                        }
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 1:
                        currentUserID = _a.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        return [2 /*return*/];
                }
            });
        });
    };
    DuplicationCheck.prototype.render = function () {
        return (React.createElement("div", { className: "container-fluid", style: { position: "relative" } },
            React.createElement("div", { className: "loading-css", style: { display: this.state.mainLoading ? "block" : "none" } },
                React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.mainLoading })),
            React.createElement("div", { className: "card-primary" },
                React.createElement("div", { className: "card-header" },
                    React.createElement("h3", { className: "" }, strings.Section2Title)),
                React.createElement("div", { className: "card-body" },
                    this.isRequest9 ?
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                React.createElement("label", null,
                                    strings.Lbl_SocialName,
                                    React.createElement("sub", null, "*")),
                                React.createElement("input", { id: "tbxSocialName", disabled: this.checkIfFieldDisabled("tbxSocialName"), className: "form-control", type: "text", value: this.state.tbxSocialName, onChange: this._onTbxChange.bind(this), onKeyUp: this.LoadData.bind(this) }),
                                this.state.errors.tbxSocialName.length > 0 ? React.createElement("span", null,
                                    " ",
                                    React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                    React.createElement(Label, { className: "errormessage" },
                                        this.state.errors.tbxSocialName,
                                        " ")) : null))
                        :
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("h6", null, strings.Lbl_Name),
                                    React.createElement("label", null,
                                        strings.Lbl_LegalName,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxlegalName", disabled: this.checkIfFieldDisabled("tbxlegalName"), className: "form-control", type: "text", value: this.state.tbxlegalName, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this), onKeyUp: this.LoadData.bind(this) }),
                                    this.state.errors.tbxlegalName.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxlegalName,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("h6", null, strings.Lbl_Address),
                                    React.createElement("label", null,
                                        strings.Lbl_Line1,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxLine1", disabled: this.checkIfFieldDisabled("tbxLine1"), className: "form-control", type: "text", value: this.state.tbxLine1, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this), onKeyUp: this.LoadData.bind(this) }),
                                    this.state.errors.tbxLine1.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxLine1,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("h6", null, strings.Lbl_TaxInformation),
                                    React.createElement("label", null,
                                        strings.Lbl_TaxRegNo,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxTaxRegNo", disabled: this.checkIfFieldDisabled("tbxTaxRegNo"), className: "form-control", type: "text", value: this.state.tbxTaxRegNo, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this), onKeyUp: this.LoadData.bind(this) }),
                                    this.state.errors.tbxTaxRegNo.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxTaxRegNo,
                                            " ")) : null)),
                    React.createElement("div", { className: "grid-table", style: { position: "relative" } },
                        React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                            React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                        React.createElement(DataTableExtensions, { data: this.state.requestsArray, columns: this.isRequest9 ? Request9_columns : Columns, print: false, export: false, filterHidden: false },
                            React.createElement(DataTable, { className: "table", data: this.state.requestsArray, columns: this.isRequest9 ? Request9_columns : Columns, responsive: true, pagination: true, paginationComponentOptions: { noRowsPerPage: true }, paginationPerPage: 10, noHeader: true, persistTableHead: true, noDataComponent: React.createElement("div", { className: "nodatadiv" },
                                    React.createElement("label", { className: "nodata" }, strings.NoRecordMSG)), sortIcon: React.createElement(Icon, { iconName: "SortDown" }), noContextMenu: true })))),
                React.createElement(CardFooter, __assign({}, this.props, { backBtnMethod: this._BackClick.bind(this), nextBtnMethod: this._NextClick.bind(this), cancelReqMethod: this._DeleteRequest.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this) })))));
    };
    DuplicationCheck.prototype.LoadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempData, tempArray, data, tempValueArray_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Fetch data for datatable.</summary>
                        this.setState({ loading: true });
                        viewXML = "<View>\n                        <ViewFields>\n                        <FieldRef Name=\"ID\"></FieldRef>\n                        <FieldRef Name=\"Title\"></FieldRef>\n                        <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                        <FieldRef Name=\"LegalName\"></FieldRef>\n                        <FieldRef Name=\"Line1\"></FieldRef>\n                        <FieldRef Name=\"Line2\"></FieldRef>\n                        <FieldRef Name=\"Zipcode\"></FieldRef>\n                        <FieldRef Name=\"Postal_District_City\"></FieldRef>\n                        <FieldRef Name=\"Country\"></FieldRef>\n                        <FieldRef Name=\"Currency\"></FieldRef>\n                        <FieldRef Name=\"TaxRegistrationNo\"></FieldRef>\n                        <FieldRef Name=\"Status\"></FieldRef>\n                        </ViewFields>\n                        <RowLimit>5000</RowLimit><Query><Where>";
                        viewXML += this.props.approvalData.requestType === strings.RequestType[2] ?
                            "<And>\n                <Eq><FieldRef Name=\"CustomerType\"/><Value Type=\"Text\">parent client</Value></Eq>\n                <Contains><FieldRef Name=\"Title\"/><Value Type=\"Text\">" + this.state.tbxSocialName + "</Value></Contains>\n            </And>"
                            :
                                "<And>\n                <Or>\n\t\t\t\t\t<And>\n\t\t\t\t\t\t<Neq><FieldRef Name=\"TaxRegistrationNo\" /><Value Type=\"Text\">Not Applicable</Value></Neq>\t\n\t\t\t\t\t\t<IsNotNull><FieldRef Name='TaxRegistrationNo' /></IsNotNull> \n\t\t\t\t\t</And>\n\t\t\t\t\t<Or>\n\t\t\t\t\t\t<And>\n\t\t\t\t\t\t\t<Neq><FieldRef Name=\"LegalName\" /><Value Type=\"Text\">Not Applicable</Value></Neq>\t\n\t\t\t\t\t\t\t<IsNotNull><FieldRef Name='LegalName' /></IsNotNull> \n\t\t\t\t\t\t</And>\n\t\t\t\t\t\t<And>\n\t\t\t\t\t\t\t<Neq><FieldRef Name=\"Line1\" /><Value Type=\"Text\">Not Applicable</Value></Neq>\t\n\t\t\t\t\t\t\t<IsNotNull><FieldRef Name='Line1' /></IsNotNull> \n\t\t\t\t\t\t</And>\n\t\t\t\t\t</Or>\t\n\t\t\t\t</Or>\n            <And> \n                <Eq><FieldRef Name=\"CustomerType\"/><Value Type=\"Text\">legal client</Value></Eq>\n                <Or>\n                    <Or>\n                        <Contains><FieldRef Name=\"LegalName\"/><Value Type=\"Text\">" + this.state.tbxlegalName + "</Value></Contains>\n                        <Contains><FieldRef Name=\"Line1\"/><Value Type=\"Text\">" + this.state.tbxLine1 + "</Value></Contains>\n                    </Or>\n                   <Contains><FieldRef Name=\"TaxRegistrationNo\"/><Value Type=\"Text\">" + this.state.tbxTaxRegNo + "</Value></Contains>\n                </Or>\n            </And>\n            </And>";
                        viewXML += "</Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query></View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray = [];
                        tempData.filter(function (item) {
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
                            if (_this.props.approvalData.requestType === strings.RequestType[2]) {
                                if (item.CustomerType == "parent client" && isAccessLevelPresent) {
                                    if (item.Title != null && item.Title != undefined && item.Title.trim() != "") {
                                        if ((_this.state.tbxSocialName.trim() != "") && (item.Title.toString().toLowerCase().indexOf(_this.state.tbxSocialName.toLowerCase()) > -1)) {
                                            tempArray.push(item);
                                        }
                                    }
                                }
                            }
                            else {
                                if ((item.CustomerType == "legal client") && isAccessLevelPresent) {
                                    if (((item.TaxRegistrationNo != null) && (item.TaxRegistrationNo != 'Not Applicable')) || ((item.LegalName != null) && (item.LegalName != 'Not Applicable')) || ((item.Line1 != null) && (item.Line1 != 'Not Applicable'))) {
                                        var regNo = item.TaxRegistrationNo ? item.TaxRegistrationNo.toLowerCase() : "";
                                        var line1 = item.Line1 ? item.Line1.toLowerCase() : "";
                                        var legalName = item.LegalName ? item.LegalName.toLowerCase() : "";
                                        if ((_this.state.tbxTaxRegNo.trim() != "" && regNo.toString().indexOf(_this.state.tbxTaxRegNo.toLowerCase().trim()) > -1) || ((_this.state.tbxlegalName.trim() != "" && legalName.toString().indexOf(_this.state.tbxlegalName.toLowerCase().trim()) > -1) || (_this.state.tbxLine1.trim() != "" && line1.toString().indexOf(_this.state.tbxLine1.toLowerCase().trim()) > -1))) {
                                            tempArray.push(item);
                                        }
                                    }
                                }
                            }
                        });
                        tempArray.sort(function (a, b) { return (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0); });
                        data = tempArray;
                        if (data !== null) {
                            tempValueArray_1 = [];
                            data.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var reqType;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    if (this.isRequest9) {
                                        reqType = 'pcl';
                                    }
                                    else {
                                        reqType = 'cl';
                                    }
                                    tempValueArray_1.push({
                                        Link: React.createElement("a", { onClick: function (e) { e.preventDefault(); window.open(_this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + element['ID'] + "&rqType=" + reqType, '_blank'); }, href: '' }, strings.Grid_LinkHeader),
                                        MaconomyAccountID: element["MaconomyAccountID"],
                                        SocialName: element["Title"], LegalName: element["LegalName"], Line1: element["Line1"], Line2: element["Line2"], Zipcode: element["Zipcode"], Postal_District_City: element["Postal_District_City"], Country: element["Country"], Currency: element["Currency"], TaxRegistrationNo: element["TaxRegistrationNo"], Status: element["Status"]
                                    });
                                    return [2 /*return*/];
                                });
                            }); });
                            this.setState({ requestsArray: tempValueArray_1 });
                        }
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    DuplicationCheck.prototype.checkIfFieldDisabled = function (tagID) {
        var listOfEditableFieldsSection1 = this.props.listOfEditableFields;
        //Shraddha 08-08-22 item 4
        var currentuser = this.state.currentUserid;
        var requestorid = this.state.requestorid;
        if (this.props.itemSubmitted && currentuser !== requestorid && !this.props.isFHDUser) { //R fhd change 20-9
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
    DuplicationCheck.prototype.ValidateDuplicationSection = function () {
        /// <summary>Validate section 2.</summary>
        var errors = this.state.errors;
        if (this.isRequest9) {
            errors.tbxSocialName = (Utils.CheckRequiredField(this.state.tbxSocialName) === false) ? strings.CantLeaveBlankMsg : "";
        }
        else {
            errors.tbxLine1 = (Utils.CheckRequiredField(this.state.tbxLine1) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxTaxRegNo = (Utils.CheckRequiredField(this.state.tbxTaxRegNo) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxlegalName = (Utils.CheckRequiredField(this.state.tbxlegalName) === false) ? strings.CantLeaveBlankMsg : "";
        }
        this.setState({ errors: errors });
        var valid = true;
        Object.keys(errors).forEach(function (key) { errors[key].length > 0 ? valid = false : null; });
        return valid;
    };
    DuplicationCheck.prototype.SaveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempData, error_1, errordata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        this.setState({ mainLoading: true });
                        tempData = null;
                        if (this.isRequest9) {
                            tempData = {
                                Title: Utils.TrimData(this.state.tbxSocialName),
                            };
                        }
                        else {
                            tempData = {
                                Line1: Utils.TrimData(this.state.tbxLine1),
                                LegalName: Utils.TrimData(this.state.tbxlegalName),
                                TaxRegistrationNo: Utils.TrimData(this.state.tbxTaxRegNo),
                                RequestID: Utils.GenerateRequestID(this.props.itemID)
                            };
                        }
                        if (!(this.props.itemID > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then(function (res) {
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.log("duplication save data", error_1);
                        errordata = {
                            Title: new Date(),
                            Errors: error_1,
                            RequestID: this.props.itemID
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata)];
                    case 4:
                        _a.sent();
                        //error log change end
                        this.setState({ mainLoading: false });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DuplicationCheck.prototype._onTbxChange = function (event) {
        /// <summary>Textbox change event.</summary>
        var _a;
        var _b = event.target, id = _b.id, value = _b.value;
        this.setState(__assign({}, this.state, (_a = {}, _a[id] = value, _a)));
        //rutvik validate change
        var errors = this.state.errors;
        if (id === "tbxlegalName")
            errors.tbxlegalName = '';
        if (id === "tbxLine1")
            errors.tbxLine1 = '';
        if (id === "tbxTaxRegNo")
            errors.tbxTaxRegNo = '';
        if (id === "tbxSocialName")
            errors.tbxSocialName = '';
        this.setState({ errors: errors });
        //end
    };
    DuplicationCheck.prototype._NextClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Next button click event.</summary>
                        this.setState({ mainLoading: true }); //9-2-23
                        return [4 /*yield*/, this.SaveDataOperations()];
                    case 1:
                        if (_a.sent()) {
                            this.setState({ mainLoading: false }, function () {
                                _this.props.dataChange("DuplicationSectionData", _this.state);
                                _this.props.nextStep();
                            });
                        }
                        else {
                            this.setState({ mainLoading: false }); //9-2-23
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DuplicationCheck.prototype._BackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /// <summary>Back button click event.</summary>       
                this.props.dataChange("DuplicationSectionData", this.state);
                this.props.backStep();
                return [2 /*return*/];
            });
        });
    };
    DuplicationCheck.prototype._DeleteRequest = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!window.confirm(strings.DeleteConfirmationRequest)) return [3 /*break*/, 4];
                        this.setState({ mainLoading: true });
                        // Delete request.
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).recycle()];
                    case 1:
                        // Delete request.
                        _a.sent();
                        if (!!this.isRequest9) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.objWeb.getFolderByServerRelativeUrl(this.props.approvalData.folderPath).recycle()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        window.location.href = this.props.context.pageContext.web.absoluteUrl;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        this.setState({ mainLoading: false });
                        console.log("_DeleteRequest(DuplocationCheck.tsx)-->", error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DuplicationCheck.prototype._SaveForLaterClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Save for later button event.</summary>
                        this.setState({ loading: true }); //9-2-23
                        return [4 /*yield*/, this.SaveDataOperations()];
                    case 1:
                        if (_a.sent()) {
                            window.location.href = this.props.context.pageContext.web.absoluteUrl;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DuplicationCheck.prototype.SaveDataOperations = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Validate and save data operations.</summary>
                        if (this.ValidateDuplicationSection() === false) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.SaveData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return DuplicationCheck;
}(React.Component));
export default DuplicationCheck;
//# sourceMappingURL=DuplicationCheck.js.map