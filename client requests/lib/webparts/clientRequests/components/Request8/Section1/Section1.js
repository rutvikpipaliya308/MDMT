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
import DataTable from 'react-data-table-component';
import { Icon, Label } from 'office-ui-fabric-react';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import DataTableExtensions from 'react-data-table-component-extensions';
import CardFooter from '../../common/CardFooter/CardFooter';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
var columns = [
    {
        name: strings.Req8_GridHeader[0],
        selector: 'Action',
        maxWidth: '80px',
        width: '80px'
    },
    {
        name: strings.Req8_GridHeader[1],
        selector: 'ClientCompanyNo',
        sortable: true,
        minWidth: '180px',
    },
    {
        name: strings.Req8_GridHeader[2],
        selector: 'SocialName',
        sortable: true,
        wrap: true,
        minWidth: '200px',
    },
    {
        name: strings.Req8_GridHeader[3],
        selector: 'Country',
        sortable: true,
        wrap: true,
        minWidth: '200px',
    },
    {
        name: strings.Req8_GridHeader[4],
        selector: 'ClientContact',
        sortable: true,
        minWidth: '200px',
        wrap: true,
    },
    {
        name: strings.Req8_GridHeader[5],
        selector: 'Phone',
        sortable: true,
        wrap: true,
        minWidth: '150px',
    },
    {
        name: strings.Req8_GridHeader[6],
        selector: 'Email',
        sortable: true,
        wrap: true,
        minWidth: '200px',
    },
    {
        name: strings.Req8_GridHeader[7],
        selector: 'ClientRelationMgr',
        sortable: true,
        minWidth: '220px',
        wrap: true,
    },
    {
        name: strings.Req8_GridHeader[8],
        selector: 'Sector',
        sortable: true,
        wrap: true,
        minWidth: '200px',
    },
    //rutvik 20-7 25
    // {
    //     name: strings.Req8_GridHeader[9],
    //     selector: 'ClientStatus',
    //     sortable: true,
    //     wrap: true,
    //     minWidth: '120px',
    // },
    //endr
    {
        name: strings.Req8_GridHeader[10],
        selector: 'ClientType',
        sortable: true,
        wrap: true,
        minWidth: '120px',
    }
];
var Section1 = /** @class */ (function (_super) {
    __extends(Section1, _super);
    function Section1(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.state = {
            requestsArray: [],
            selectCompanyContactNo: '',
            dpCompany: '',
            loading: true,
            rbtnWorkflowType: 'Standard',
            requestor: 0,
            itemID: 0,
            office: '',
            folderPath: '',
            currentUserid: '',
            requestorid: '',
            countryOfCompany: '',
            errors: {
                selectCompanyContact: '',
                requestExists: '',
                noMaconomyData: ''
            },
        };
        _this.companySectionRef = React.createRef();
        return _this;
    }
    Section1.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, currentUSerID, currentUserID, requestoridd;
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
                        if (this.props.companyNo !== null || this.props.companyNo !== undefined) {
                            this.setState({
                                selectCompanyContactNo: this.props.companyNo
                            });
                        }
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
                        if (this.props.listData !== null) {
                            this.setState({
                                dpCompany: this.props.listData["Company"],
                                countryOfCompany: this.props.listData["CountryOfCompany"],
                                rbtnWorkflowType: this.props.listData["WorkflowType"],
                                folderPath: this.props.listData["FolderPath"],
                                selectCompanyContactNo: this.props.listData["ContactCompanyNo"],
                            });
                        }
                        if (this.props.data !== null) {
                            this.setState(__assign({}, this.props.data));
                        }
                        return [4 /*yield*/, this.LoadData()];
                    case 6:
                        _c.sent();
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 7:
                        currentUserID = _c.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "card-primary", style: { position: "relative" } },
                React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                React.createElement("div", { className: "card-header text-center" },
                    React.createElement("h3", { className: "border-0 pl-0" }, strings.Sec1Question)),
                React.createElement("div", { className: "card-body" },
                    React.createElement(CompanySection, __assign({ isDisable: this.checkIfFieldDisabled("dpCompany"), ref: this.companySectionRef }, this.props, { dpCompany: this.state.dpCompany, isWorkflowTypeNeeded: true, rbtnWorkflowType: this.state.rbtnWorkflowType, setLoader: this.SetLoader.bind(this), requestType: strings.RequestType[1], accessLevel: this.props.accessLevel, countryOfCompany: this.state.countryOfCompany })),
                    this.props.companyNo ? null : React.createElement("div", { className: "card-header text-center" },
                        React.createElement("h3", { className: "border-0 pl-0" }, strings.Lbl_SelectCompanyContact)),
                    this.props.companyNo ? null : React.createElement("div", { className: "grid-table", style: { position: "relative", } },
                        React.createElement(DataTableExtensions, { data: this.state.requestsArray, columns: columns, print: false, export: false, filterHidden: false },
                            React.createElement(DataTable, { className: "table", data: this.state.requestsArray, columns: columns, responsive: true, pagination: true, paginationComponentOptions: { noRowsPerPage: true }, paginationPerPage: 10, noHeader: true, persistTableHead: true, noDataComponent: React.createElement("div", { className: "nodatadiv" },
                                    React.createElement("label", { className: "nodata" }, strings.NoRecordMSG)), sortIcon: React.createElement(Icon, { iconName: "SortDown" }), onChangePage: this.selectRadio.bind(this), onSort: this.selectRadio.bind(this), noContextMenu: true }))),
                    this.state.errors.selectCompanyContact.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage text-left" },
                            this.state.errors.selectCompanyContact,
                            " ")) : null,
                    this.state.selectCompanyContactNo !== '' && this.state.selectCompanyContactNo !== null ?
                        React.createElement("div", { className: "alert alert-warning mt-3", role: "alert" },
                            "  ",
                            React.createElement(Label, { className: "text-left" },
                                strings.YouHaveSelectedText,
                                " ",
                                React.createElement("strong", null, this.state.selectCompanyContactNo),
                                " - ",
                                this.state.requestsArray.filter(function (e) { return e.ClientCompanyNo === _this.state.selectCompanyContactNo; })[0] !== undefined ? this.state.requestsArray.filter(function (e) { return e.ClientCompanyNo === _this.state.selectCompanyContactNo; })[0].SocialName : '',
                                " ")) : "",
                    Utils.CheckRequiredField(this.state.errors.requestExists) === true ? React.createElement("div", { className: "alert alert-danger mt-3", role: "alert" },
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.requestExists,
                            " ")) : null,
                    this.state.errors.noMaconomyData !== '' && this.state.selectCompanyContactNo === '' ? React.createElement("div", { className: "alert alert-danger mt-3", role: "alert" },
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.noMaconomyData,
                            " ")) : null),
                React.createElement(CardFooter, __assign({}, this.props, { nextBtnMethod: this._NextClick.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this) })))));
    };
    Section1.prototype.checkIfFieldDisabled = function (tagID) {
        var listOfEditableFieldsSection1 = this.props.listOfEditableFields;
        //Shraddha 08-08-22 item 4
        var currentuser = this.state.currentUserid;
        var requestorid = this.state.requestorid;
        if (this.props.itemSubmitted) { //R fhd change 20-9
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
    Section1.prototype.SetLoader = function (status) {
        //<summary>set loader value from parameter</summary>
        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ loading: status });
        }
    };
    Section1.prototype.LoadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempData, tempArray, data, tempValueArray_1, upateRequestData, error, error;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Fetch data for datatable.</summary>
                        this.setState({ loading: true });
                        viewXML = "<View>\n                        <ViewFields>\n                        <FieldRef Name=\"ID\"></FieldRef>\n                        <FieldRef Name=\"Title\"></FieldRef>\n                        <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                        <FieldRef Name=\"Country\"></FieldRef>\n                        <FieldRef Name=\"ClientAttentionName\"></FieldRef>\n                        <FieldRef Name=\"PhoneNo\"></FieldRef>\n                        <FieldRef Name=\"Email\"></FieldRef>\n                        <FieldRef Name=\"ClientRelationshipMgr\"></FieldRef>\n                        <FieldRef Name=\"Sector\"></FieldRef>                        \n                        <FieldRef Name=\"ClientType\"></FieldRef>\n                        <FieldRef Name=\"ClientCompanyNo\"></FieldRef>\n                        </ViewFields>\n                        <RowLimit>5000</RowLimit><Query><Where>\n                        <And>\n                            <IsNull><FieldRef Name=\"MaconomyAccountID\"></FieldRef></IsNull>\n                            <IsNotNull><FieldRef Name=\"ClientCompanyNo\"></FieldRef></IsNotNull>\n                        </And>    \n                        </Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query></View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CONTACTCOMPANY_INTERNALANAME).items.select().getAll()];
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
                            if (item.MaconomyAccountID == null && item.ClientCompanyNo != null && isAccessLevelPresent) {
                                tempArray.push(item);
                            }
                        });
                        tempArray.sort(function (a, b) { return (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0); });
                        data = tempArray;
                        if (!(data !== null)) return [3 /*break*/, 3];
                        tempValueArray_1 = [];
                        return [4 /*yield*/, data.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var canEditGrid;
                                return __generator(this, function (_a) {
                                    canEditGrid = false;
                                    if (this.props.listData) {
                                        if (this.props.listData.Submitted) {
                                            canEditGrid = true;
                                        }
                                    }
                                    tempValueArray_1.push({
                                        Action: React.createElement("input", { type: "radio", disabled: canEditGrid, className: "companyClient", checked: this.state.selectCompanyContactNo === element['ClientCompanyNo'], name: "companyClient", value: element['ClientCompanyNo'], onClick: this.SelectCompanyContact.bind(this, element['ClientCompanyNo']) }),
                                        MaconomyAccountID: element["MaconomyAccountID"],
                                        SocialName: element["Title"],
                                        Country: element["Country"],
                                        ClientContact: element["ClientAttentionName"],
                                        Phone: element["PhoneNo"],
                                        Email: element["Email"],
                                        ClientRelationMgr: element["ClientRelationshipMgr"],
                                        Sector: element["Sector"],
                                        //rutvik 20-7 25
                                        //ClientStatus: element["ClientStatus"],
                                        //endr
                                        ClientType: element["ClientType"],
                                        MacID: element['MaconomyAccountID'],
                                        ClientCompanyNo: element["ClientCompanyNo"]
                                    });
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        this.setState(__assign({}, this.state, { requestsArray: tempValueArray_1 }));
                        if (this.props.listData !== null && this.props.data === null) {
                            upateRequestData = this.state.requestsArray.filter(function (client) { return client.ClientCompanyNo === _this.props.listData["ContactCompanyNo"]; })[0];
                            if (upateRequestData === undefined || upateRequestData === null) {
                                error = this.state.errors;
                                error.noMaconomyData = strings.NoMaconomyContactCompanyClient_Msg[0] + this.props.listData["ContactCompanyNo"] + strings.NoMaconomyContactCompanyClient_Msg[1];
                                this.setState({ errors: error, selectCompanyContactNo: '' });
                            }
                            else {
                                error = this.state.errors;
                                error.noMaconomyData = '';
                                this.setState({ errors: error });
                            }
                        }
                        _a.label = 3;
                    case 3:
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.SelectCompanyContact = function (companyContactNo) {
        var _this = this;
        // <summary>Event called on select SelectCompanyContact.</summary>
        var errors = this.state.errors;
        errors.noMaconomyData = '';
        this.setState(__assign({}, this.state, { selectCompanyContactNo: companyContactNo, errors: errors }), function () {
            _this.selectRadio();
        });
        //rutvik validate change        
        errors.selectCompanyContact = '';
        this.setState({ errors: errors });
        //end
    };
    Section1.prototype.selectRadio = function () {
        // <summary>Event called on page change.</summary>
        var tempCompanyArray = this.state.requestsArray;
        for (var company = 0; company < tempCompanyArray.length; company++) {
            if (tempCompanyArray[company].ClientCompanyNo === this.state.selectCompanyContactNo) {
                tempCompanyArray[company].Action = React.createElement("input", { type: "radio", className: "companyClient", checked: true, name: "companyClient", value: tempCompanyArray[company].ClientCompanyNo, onClick: this.SelectCompanyContact.bind(this, tempCompanyArray[company].ClientCompanyNo) });
            }
            else {
                tempCompanyArray[company].Action = React.createElement("input", { type: "radio", className: "companyClient", checked: false, name: "companyClient", value: tempCompanyArray[company].ClientCompanyNo, onClick: this.SelectCompanyContact.bind(this, tempCompanyArray[company].ClientCompanyNo) });
            }
        }
        this.setState({
            requestsArray: cloneDeep(tempCompanyArray),
        });
    };
    Section1.prototype.SaveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var accessLevel, companyNumber, tempData, queryParameters, id, currentUSerID, recordSaved, folderPath, body, tempBody, error_1, errordata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 15]);
                        //change start - 25-1-22
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
                            CountryOfCompany: data.countryOfCompany,
                            RequestType: Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.key === _this.props.requestType; })[0].text,
                            RequestorId: this.props.listData != null || this.props.listData != undefined ? this.props.listData.RequestorId : this.state.requestor,
                            Office: this.state.office,
                            WorkflowType: data.rbtnWorkflowType,
                            RequestID: Utils.GenerateRequestID(this.state.itemID),
                            Status: strings.Status[0],
                            ContactCompanyNo: this.state.selectCompanyContactNo,
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
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update(tempData).then(function (res) {
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.add(tempData).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.setState({
                                    itemID: res.data.Id,
                                });
                                return [2 /*return*/];
                            });
                        }); })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, Utils.CreateAttachmentFolder(this.objWeb, this.serverRelativeURL, this.state.itemID)];
                    case 9:
                        folderPath = _a.sent();
                        this.setState({ folderPath: folderPath });
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update({ RequestID: Utils.GenerateRequestID(this.state.itemID), FolderPath: folderPath, }).then(function (res) {
                            })];
                    case 10:
                        _a.sent();
                        body = JSON.stringify({
                            'RequestID': this.state.itemID.toString(),
                            'Folder': folderPath,
                            'FolderRead': '',
                            'FolderContribute': this.state.requestor.toString(),
                            'ReqRead': '',
                            'ReqContribute': this.state.requestor.toString()
                        });
                        tempBody = {
                            Title: this.state.itemID.toString(),
                            FolderPath: folderPath,
                            FolderRead: "",
                            FolderContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID),
                            ReqRead: "",
                            ReqContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID) //R FHD change 19-9-2023
                        };
                        // Utils.CallMSFlow(this.props.context, body, Constants.PERMISSION_MSFLOW_URL);
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody)];
                    case 11:
                        // Utils.CallMSFlow(this.props.context, body, Constants.PERMISSION_MSFLOW_URL);
                        _a.sent();
                        _a.label = 12;
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        error_1 = _a.sent();
                        console.log("section 1 save data", error_1);
                        errordata = {
                            Title: new Date(),
                            Errors: error_1,
                            RequestID: this.props.itemID
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata)];
                    case 14:
                        _a.sent();
                        //error log change end
                        this.setState({ loading: false });
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
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
                                                    "contactCompanyNo": this.state.selectCompanyContactNo
                                                })];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.dataChange("countryOfCompany", this.state.countryOfCompany)];
                                        case 4:
                                            _a.sent(); //rutvik 13-3-2024
                                            this.props.nextStep();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        else {
                            this.setState({ loading: false }); //9-2-23
                        }
                        return [2 /*return*/];
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
    Section1.prototype.SaveDataOperations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.companySectionRef.current.ValidateCompanySection();
                        errors = this.state.errors;
                        Utils.CheckRequiredField(this.state.selectCompanyContactNo) === false ? errors.selectCompanyContact = strings.Valid_Req8GridMsg : errors.selectCompanyContact = '';
                        this.setState({ errors: errors });
                        if (data === null || Utils.CheckRequiredField(this.state.selectCompanyContactNo) === false) {
                            return [2 /*return*/, false];
                        }
                        if (Utils.CheckRequiredField(this.state.errors.noMaconomyData) === true) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.CheckIsRequestExists()];
                    case 1:
                        if ((_a.sent()) === true) {
                            return [2 /*return*/, false];
                        }
                        this.setState({
                            dpCompany: data.dpCompany,
                            countryOfCompany: data.countryOfCompany,
                            rbtnWorkflowType: data.rbtnWorkflowType,
                        });
                        return [4 /*yield*/, this.SaveData(data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Section1.prototype.CheckIsRequestExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req8XML, tempData, tempArray, item, errors;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req8XML = "<View>\n        <ViewFields>\n            <FieldRef Name=\"ID\"></FieldRef>\n            <FieldRef Name=\"Title\"></FieldRef>\n            <FieldRef Name=\"ContactCompanyNo\"></FieldRef>\n            <FieldRef Name=\"RequestID\"></FieldRef>\n            <FieldRef Name=\"RequestType\"></FieldRef>\n            <FieldRef Name=\"Status\"></FieldRef>\n        </ViewFields>\n        <RowLimit>1</RowLimit>\n        <Query>\n            <Where>\n                <And>\n                    <And>\n                        <Eq><FieldRef Name=\"Status\"/><Value Type=\"Text\">Open</Value></Eq>\n                        <Eq><FieldRef Name=\"Submitted\"/><Value Type=\"Boolean\">1</Value></Eq>\n                    </And>\n                    <And>\n                        <Eq><FieldRef Name=\"ContactCompanyNo\"/><Value Type=\"Text\">" + this.state.selectCompanyContactNo + "</Value></Eq>\n                        <Eq><FieldRef Name=\"RequestType\"/><Value Type=\"Text\">" + Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.key === _this.props.requestType; })[0].text + "</Value></Eq>\n                    </And>\n                </And>\n            </Where>\n        </Query>\n        </View>";
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
                            if (tempItem.Status == "Open" && tempItem.Submitted == true && tempItem.ContactCompanyNo == _this.state.selectCompanyContactNo && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.key === _this.props.requestType; })[0].text && isAccessLevelPresent) {
                                tempArray.push(tempItem);
                            }
                        });
                        item = tempArray[0];
                        errors = this.state.errors;
                        // if (item !== null && item !== undefined) {
                        if (item !== null && item !== undefined && (this.props.listData === null || (this.props.listData != null && this.props.listData.Submitted === false))) {
                            errors.requestExists = strings.ClientRequest_RunningMode[0] + item.RequestID + strings.ClientRequest_RunningMode[1];
                            this.setState({ errors: errors, loading: false });
                            return [2 /*return*/, true];
                        }
                        else {
                            errors.requestExists = '';
                            this.setState({ errors: errors });
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