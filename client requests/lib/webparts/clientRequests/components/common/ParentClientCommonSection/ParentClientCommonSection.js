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
import DataTableExtensions from 'react-data-table-component-extensions';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { Icon, Label, Checkbox } from 'office-ui-fabric-react';
import * as ReactDOM from 'react-dom';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
var columns = [
    { name: strings.ActionHeader, selector: 'Action', width: "80px" },
    { name: strings.Grid_LinkHeader, selector: 'Link', sortable: false, maxWidth: '80px' },
    { name: strings.Grid_TypeHeader, selector: 'Type', sortable: true, wrap: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[0], selector: 'MaconomyAccountID', sortable: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[8], selector: 'Currency', sortable: true, wrap: true },
    { name: strings.DuplicationcheckHeader[1], selector: 'SocialName', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[2], selector: 'LegalName', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[3], selector: 'Line1', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[5], selector: 'Zipcode', sortable: true, wrap: true, width: '100px' },
    { name: strings.DuplicationcheckHeader[6], selector: 'Postal_District_City', sortable: true, wrap: true, minWidth: '150px' },
    { name: strings.DuplicationcheckHeader[7], selector: 'Country', sortable: true, wrap: true, minWidth: '150px' },
    { name: strings.DuplicationcheckHeader[9], selector: 'TaxRegistrationNo', sortable: true, wrap: true, minWidth: '200px' }
];
var ParentClientCommonSection = /** @class */ (function (_super) {
    __extends(ParentClientCommonSection, _super);
    function ParentClientCommonSection(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.isRequest9 = _this.props.approvalData.requestType.toLocaleLowerCase() === Constants.REQUESTTYPE_OPTIONS[2].text.toLocaleLowerCase();
        _this.submitData = {
            data: '',
            approverContribute: [],
            approverRead: [],
            notificationApprovers: [],
            body: '',
            notificationBody: '',
        };
        _this.state = {
            loading: true,
            availableClientsArray: [],
            assignedClientsArray: [],
            previousAssignedClients: [],
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            errors: {
                approvalData: '',
                selectClient: '',
                noUpdate: ''
            }
        };
        return _this;
    }
    ParentClientCommonSection.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempAssignedClients, tempAssignedClientsMacIds, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Bind data.</summary>
                        if (this.props.listData !== null) {
                            tempAssignedClients = this.state.assignedClientsArray;
                            if (Utils.CheckRequiredField(this.props.listData["Child"]) !== false) {
                                tempAssignedClientsMacIds = this.props.listData["Child"].split(',');
                                for (client = 0; client < tempAssignedClientsMacIds.length; client++) {
                                    tempAssignedClients.push({
                                        MaconomyAccountID: tempAssignedClientsMacIds[client],
                                        SocialName: ''
                                    });
                                }
                            }
                            this.setState({
                                assignedClientsArray: tempAssignedClients
                            });
                        }
                        if (!(this.props.data !== null && this.props.data !== undefined)) return [3 /*break*/, 1];
                        this.setState(__assign({}, this.props.data));
                        return [3 /*break*/, 5];
                    case 1:
                        if (!!this.isRequest9) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.BindAssignedClients()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.BindAvailableClientsGridData()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    //rutvik change
    ParentClientCommonSection.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var itemid, tempRequestorId, currentUserID, requestoridd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemid = this.props.itemID;
                        return [4 /*yield*/, this.objWeb.lists.getByTitle("Requests").items.filter("ID eq " + itemid).select("RequestorId").getAll()];
                    case 1:
                        tempRequestorId = _a.sent();
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 2:
                        currentUserID = _a.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : tempRequestorId[0].RequestorId.toString();
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        return [2 /*return*/];
                }
            });
        });
    };
    ParentClientCommonSection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "card-primary", style: { position: "relative" } },
                React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                React.createElement("div", { className: "card-header", style: { textAlign: "left" } },
                    React.createElement("h3", null, strings.SelectClientsForParentClient)),
                React.createElement("div", { className: "card-body" },
                    React.createElement("div", { className: "row justify-content-between" },
                        React.createElement("div", { className: "col" },
                            React.createElement("h3", { className: "border-0 pl-0 text-left" }, strings.AvailableClients))),
                    React.createElement("div", { className: "grid-table", id: "clientsGrid", style: { position: "relative", } },
                        React.createElement(DataTableExtensions, { data: this.state.availableClientsArray, columns: columns, print: false, export: false, filterHidden: false },
                            React.createElement(DataTable, { className: "table", data: this.state.availableClientsArray, columns: columns, responsive: true, pagination: true, paginationPerPage: 10, persistTableHead: true, noHeader: true, noDataComponent: React.createElement("div", { className: "nodatadiv" },
                                    React.createElement("label", { className: "nodata" }, strings.NoRecordsAvailable)), paginationComponentOptions: { noRowsPerPage: true }, sortIcon: React.createElement(Icon, { iconName: "SortDown" }), noContextMenu: true }))),
                    React.createElement("div", { className: "text-left pt-4" },
                        React.createElement("h3", { className: "border-0 pl-0" }, strings.AssignedClients)),
                    React.createElement("div", { id: "selectedClientsDiv" }, this.isRequest9 ?
                        React.createElement("ul", { className: "list-group text-left" }, this.state.assignedClientsArray.length > 0 ?
                            this.state.assignedClientsArray.map(function (client) {
                                return (React.createElement("li", { className: "list-group-item" },
                                    React.createElement("strong", null,
                                        " ",
                                        client.MaconomyAccountID,
                                        " "),
                                    " - ",
                                    client.SocialName));
                            })
                            : '')
                        :
                            React.createElement("ul", { className: "list-group text-left" },
                                this.state.previousAssignedClients.length > 0 ?
                                    this.state.previousAssignedClients.map(function (client) {
                                        var tempClient = _this.state.assignedClientsArray.filter(function (assignedClient) { return assignedClient.MaconomyAccountID === client.MaconomyAccountID; });
                                        var backgroundColor = tempClient.length > 0 ? "list-group-item" : "list-group-item list-group-item-danger";
                                        return (React.createElement("li", { className: backgroundColor },
                                            React.createElement("strong", null, client.MaconomyAccountID),
                                            " - ",
                                            client.SocialName));
                                    })
                                    : '',
                                this.state.assignedClientsArray.length > 0 ?
                                    this.state.assignedClientsArray.map(function (client) {
                                        var tempClient = _this.state.previousAssignedClients.filter(function (assignedClient) { return assignedClient.MaconomyAccountID === client.MaconomyAccountID; });
                                        return (tempClient.length > 0 ?
                                            null :
                                            React.createElement("li", { className: "list-group-item list-group-item-success" },
                                                React.createElement("strong", null, client.MaconomyAccountID),
                                                " - ",
                                                client.SocialName));
                                    })
                                    : '')),
                    this.state.errors.approvalData !== undefined && this.state.errors.approvalData.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage text-left" },
                            this.state.errors.approvalData,
                            " ")) : null,
                    this.state.errors.selectClient.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage text-left displayBlock" },
                            this.state.errors.selectClient,
                            " ")) : null,
                    !(this.isRequest9) ?
                        this.state.errors.noUpdate.length > 0 ? React.createElement("span", null,
                            " ",
                            React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                            React.createElement(Label, { className: "errormessage text-left" },
                                this.state.errors.noUpdate,
                                " ")) : null
                        : null),
                (this.props.itemSubmitted && this.state.currentUserid !== this.state.requestorid) ?
                    React.createElement(CardFooter, __assign({}, this.props, { backBtnMethod: this._BackClick.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this), saveItemBtnMethod: this._SaveClick.bind(this) }))
                    :
                        React.createElement(CardFooter, __assign({}, this.props, { backBtnMethod: this._BackClick.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this), submitBtnMethod: this._SubmitClick.bind(this) })))));
    };
    ParentClientCommonSection.prototype.GetRequest9AvailableClientsXML = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML;
            return __generator(this, function (_a) {
                viewXML = "<View>\n            <ViewFields>\n                <FieldRef Name=\"ID\"></FieldRef>\n                <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                <FieldRef Name=\"CustomerType\"></FieldRef>\n                <FieldRef Name=\"Title\"></FieldRef>\n                <FieldRef Name=\"LegalName\"></FieldRef>\n                <FieldRef Name=\"Line1\"></FieldRef>\n                <FieldRef Name=\"Zipcode\"></FieldRef>\n                <FieldRef Name=\"Postal_District_City\"></FieldRef>\n                <FieldRef Name=\"Country\"></FieldRef>\n                <FieldRef Name=\"Currency\"></FieldRef>\n                <FieldRef Name=\"TaxRegistrationNo\"></FieldRef>\n            </ViewFields>\n            <RowLimit>5000</RowLimit>\n            <Query>\n                <Where>\n                    <And>\n                        <Or>\n                            <Eq><FieldRef Name=\"CustomerType\" /><Value Type=\"Text\">legal client</Value></Eq>\n                            <Eq><FieldRef Name=\"CustomerType\" /><Value Type=\"Text\">parent client</Value></Eq>\n                        </Or>\n                        <Or>\n                            <IsNull><FieldRef Name='ParentClient' /></IsNull>\n                            <Eq><FieldRef Name=\"ParentClient\" /><Value Type=\"Text\">Template External</Value></Eq>\n                        </Or>\n                    </And>\n                </Where>\n                <OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy>\n            </Query>\n            </View>";
                return [2 /*return*/, viewXML];
            });
        });
    };
    ParentClientCommonSection.prototype.GetRequest11AvailableClientsXML = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML;
            return __generator(this, function (_a) {
                viewXML = "<View>\n            <ViewFields>\n                <FieldRef Name=\"ID\"></FieldRef>\n                <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                <FieldRef Name=\"CustomerType\"></FieldRef>\n                <FieldRef Name=\"Title\"></FieldRef>\n                <FieldRef Name=\"LegalName\"></FieldRef>\n                <FieldRef Name=\"Line1\"></FieldRef>\n                <FieldRef Name=\"Zipcode\"></FieldRef>\n                <FieldRef Name=\"Postal_District_City\"></FieldRef>\n                <FieldRef Name=\"Country\"></FieldRef>\n                <FieldRef Name=\"Currency\"></FieldRef>\n                <FieldRef Name=\"TaxRegistrationNo\"></FieldRef>\n            </ViewFields>\n            <RowLimit>5000</RowLimit>\n            <Query>\n                <Where>\n                <And>\n                    <Neq>\n                        <FieldRef Name='MaconomyAccountID' />\n                        <Value Type='Text'>" + this.props.approvalData["maconomyAccountID"] + "</Value>\n                    </Neq>\n                    <Or>\n                        <IsNull><FieldRef Name='ParentClient' /></IsNull>\n                        <Or>\n                            <Eq><FieldRef Name=\"ParentClient\" /><Value Type=\"Text\">" + this.props.approvalData["maconomyAccountID"] + "</Value></Eq>\n                            <Eq><FieldRef Name=\"ParentClient\" /><Value Type=\"Text\">Template External</Value></Eq>\n                        </Or>\n                    </Or>\n                </And>\n                </Where>\n                <OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy>\n            </Query>\n            </View>";
                return [2 /*return*/, viewXML];
            });
        });
    };
    ParentClientCommonSection.prototype.BindAvailableClientsGridData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, tempItems, tempDataArray_1, data, tempArray_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        viewXML = void 0;
                        if (!this.isRequest9) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.GetRequest9AvailableClientsXML()];
                    case 1:
                        viewXML = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.GetRequest11AvailableClientsXML()];
                    case 3:
                        viewXML = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 5:
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
                            if (_this.isRequest9) {
                                if (((item.CustomerType == "legal client") || (item.CustomerType == "parent client") && (item.ParentClient == null) || (item.ParentClient == "Template External")) && isAccessLevelPresent) {
                                    tempDataArray_1.push(item);
                                }
                            }
                            else {
                                if ((item.MaconomyAccountID != _this.props.approvalData["MaconomyAccountID"]) && ((item.ParentClient == null) || (item.ParentClient == "Template External" || item.ParentClient == _this.props.approvalData["MaconomyAccountID"])) && isAccessLevelPresent) {
                                    tempDataArray_1.push(item);
                                }
                            }
                        });
                        tempDataArray_1.sort(function (a, b) { return (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0); });
                        data = tempDataArray_1;
                        if (data !== null) {
                            tempArray_1 = [];
                            data.forEach(function (element) {
                                var isSelected = false;
                                var reqType;
                                var tempAssignedClient = _this.state.assignedClientsArray.filter(function (assignedClient) { return assignedClient.MaconomyAccountID === element["MaconomyAccountID"]; });
                                if (tempAssignedClient.length > 0) {
                                    isSelected = true;
                                }
                                if (element['CustomerType'] === "parent client") {
                                    reqType = 'pcl';
                                }
                                else {
                                    reqType = 'cl';
                                }
                                tempArray_1.push({
                                    Action: React.createElement(Checkbox, { defaultChecked: isSelected, key: element["MaconomyAccountID"], value: element["MaconomyAccountID"], onChange: _this.SelectClient.bind(_this, element["MaconomyAccountID"], element["Title"]) }),
                                    Link: React.createElement("a", { onClick: function (e) { e.preventDefault(); window.open(_this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + element['ID'] + "&rqType=" + reqType, '_blank'); }, href: '' }, strings.Grid_LinkHeader),
                                    Type: element["CustomerType"],
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
                                availableClientsArray: cloneDeep(tempArray_1)
                            }, function () {
                                var tempAssignedClients = _this.state.assignedClientsArray;
                                var tempAvailableClientsArray = _this.state.availableClientsArray;
                                var tempPreviousClientArray = _this.state.previousAssignedClients;
                                var _loop_1 = function (client) {
                                    var tempSelectedClient = tempAvailableClientsArray.filter(function (availableClients) { return availableClients.MaconomyAccountID === tempAssignedClients[client].MaconomyAccountID; });
                                    if (tempSelectedClient.length > 0) {
                                        tempAssignedClients[client].SocialName = tempSelectedClient[0].SocialName;
                                    }
                                    else {
                                        tempAssignedClients.splice(client, 1);
                                    }
                                };
                                for (var client = 0; client < tempAssignedClients.length; client++) {
                                    _loop_1(client);
                                }
                                if (!_this.isRequest9) {
                                    var _loop_2 = function (client) {
                                        var tempPreviousAssignedClient = tempAvailableClientsArray.filter(function (availableClient) { return availableClient.MaconomyAccountID === tempPreviousClientArray[client].MaconomyAccountID; });
                                        if (tempPreviousAssignedClient.length > 0) {
                                            tempPreviousClientArray[client].SocialName = tempPreviousAssignedClient[0].SocialName;
                                        }
                                    };
                                    for (var client = 0; client < tempPreviousClientArray.length; client++) {
                                        _loop_2(client);
                                    }
                                    _this.setState({
                                        assignedClientsArray: tempAssignedClients,
                                        previousAssignedClients: tempPreviousClientArray
                                    });
                                }
                                else {
                                    _this.setState({
                                        assignedClientsArray: tempAssignedClients
                                    });
                                }
                            });
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.log("Grid Data--->", error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ParentClientCommonSection.prototype.BindAssignedClients = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, tempAssignedClients_1, tempPreviousClients_1;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    data = this.props.section1Data.assignedClientsArray;
                    if (data !== null) {
                        tempAssignedClients_1 = this.state.assignedClientsArray;
                        tempPreviousClients_1 = [];
                        data.forEach(function (element) {
                            var clientPresent = _this.state.assignedClientsArray.filter(function (assignedClient) { return assignedClient.MaconomyAccountID === element["MaconomyAccountID"]; });
                            if (clientPresent.length === 0) {
                                tempAssignedClients_1.push({
                                    MaconomyAccountID: element["MaconomyAccountID"],
                                    SocialName: ''
                                });
                            }
                            tempPreviousClients_1.push({
                                MaconomyAccountID: element["MaconomyAccountID"],
                                SocialName: ''
                            });
                        });
                        this.setState({
                            assignedClientsArray: tempAssignedClients_1,
                            previousAssignedClients: tempPreviousClients_1
                        });
                    }
                }
                catch (error) {
                    console.log("bind assigned clients--->", error);
                }
                return [2 /*return*/];
            });
        });
    };
    ParentClientCommonSection.prototype.SelectClient = function (macId, socialName, event, isChecked) {
        // <summary>Event called on select client.</summary>
        try {
            var tempAssignedClients = this.state.assignedClientsArray;
            var tempAvailableClientsArray = this.state.availableClientsArray;
            var tempAvailableClient = tempAvailableClientsArray.filter(function (availableClient) { return availableClient.MaconomyAccountID === macId; });
            if (isChecked) {
                tempAssignedClients.push({ MaconomyAccountID: macId, SocialName: socialName });
                if (tempAvailableClient.length > 0) {
                    var index = tempAvailableClientsArray.indexOf(tempAvailableClient[0]);
                    tempAvailableClientsArray[index].Action = React.createElement(Checkbox, { key: tempAvailableClient[0].MaconomyAccountID, defaultChecked: true, value: tempAvailableClient[0].MaconomyAccountID, onChange: this.SelectClient.bind(this, tempAvailableClient[0].MaconomyAccountID, tempAvailableClient[0].SocialName) });
                    tempAvailableClientsArray[index] = tempAvailableClient[0];
                }
            }
            else {
                var deSelectClient = tempAssignedClients.filter(function (assignedClient) { return assignedClient.MaconomyAccountID === macId; });
                if (deSelectClient.length > 0) {
                    var selectedIndex = tempAssignedClients.indexOf(deSelectClient[0]);
                    tempAssignedClients.splice(selectedIndex, 1);
                }
                if (tempAvailableClient.length > 0) {
                    var index_1 = tempAvailableClientsArray.indexOf(tempAvailableClient[0]);
                    tempAvailableClientsArray[index_1].Action = React.createElement(Checkbox, { key: tempAvailableClient[0].MaconomyAccountID, defaultChecked: false, value: tempAvailableClient[0].MaconomyAccountID, onChange: this.SelectClient.bind(this, tempAvailableClient[0].MaconomyAccountID, tempAvailableClient[0].SocialName) });
                    tempAvailableClientsArray[index_1] = tempAvailableClient[0];
                }
            }
            if (this.props.data !== null && this.props.data !== undefined) {
                this.RendorSelectedClientsList(tempAssignedClients);
            }
            this.setState({
                availableClientsArray: tempAvailableClientsArray,
                assignedClientsArray: tempAssignedClients
            });
        }
        catch (error) {
            console.log("select client", error);
        }
    };
    ParentClientCommonSection.prototype.RendorSelectedClientsList = function (tempSelectedClients) {
        // <summary>Rendor selected clientslist div.</summary>
        var selectedClientsContainer = document.querySelector('#selectedClientsDiv');
        var selectedClientsDiv;
        if (this.isRequest9) {
            selectedClientsDiv = (React.createElement("ul", { className: "list-group text-left" }, tempSelectedClients.length > 0 ?
                tempSelectedClients.map(function (client) {
                    return (React.createElement("li", { className: "list-group-item" },
                        React.createElement("strong", null,
                            " ",
                            client.MaconomyAccountID,
                            " "),
                        " - ",
                        client.SocialName));
                })
                : ''));
        }
        else {
            var previousAssignedClients_1 = this.state.previousAssignedClients;
            selectedClientsDiv = (React.createElement("ul", { className: "list-group text-left" },
                previousAssignedClients_1.length > 0 ?
                    previousAssignedClients_1.map(function (client) {
                        var tempClient = tempSelectedClients.filter(function (assignedClient) { return assignedClient.MaconomyAccountID === client.MaconomyAccountID; });
                        var backgroundColor = tempClient.length > 0 ? "list-group-item" : "list-group-item list-group-item-danger";
                        return (React.createElement("li", { className: backgroundColor },
                            React.createElement("strong", null, client.MaconomyAccountID),
                            " - ",
                            client.SocialName));
                    })
                    : '',
                tempSelectedClients.length > 0 ?
                    tempSelectedClients.map(function (client) {
                        var tempClient = previousAssignedClients_1.filter(function (assignedClient) { return assignedClient.MaconomyAccountID === client.MaconomyAccountID; });
                        return (tempClient.length > 0 ?
                            null :
                            React.createElement("li", { className: "list-group-item list-group-item-success" },
                                React.createElement("strong", null, client.MaconomyAccountID),
                                " - ",
                                client.SocialName));
                    })
                    : ''));
        }
        ReactDOM.render(selectedClientsDiv, selectedClientsContainer);
    };
    ParentClientCommonSection.prototype._BackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /// <summary>Back button event.</summary>
                    return [4 /*yield*/, this.props.dataChange("commonSectionData", this.state)];
                    case 1:
                        /// <summary>Back button event.</summary>
                        _a.sent();
                        return [4 /*yield*/, this.props.backStep()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ParentClientCommonSection.prototype._SaveForLaterClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Save for later button event.</summary>
                        this.setState({ loading: true }); //9-2-23
                        return [4 /*yield*/, this.SaveDataOperation()];
                    case 1:
                        if (_a.sent()) {
                            window.location.href = this.props.context.pageContext.web.absoluteUrl;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ParentClientCommonSection.prototype.SaveDataOperation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ValidateCommonSection()];
                    case 1:
                        // <summary>validate and save form data</summary>
                        if ((_a.sent()) === false) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.SaveData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ParentClientCommonSection.prototype.ValidateCommonSection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error, valid;
            return __generator(this, function (_a) {
                error = this.state.errors;
                error.selectClient = this.state.assignedClientsArray.length > 0 ? "" : strings.SelectClientMsg;
                this.setState({ errors: error });
                valid = error.selectClient.length > 0 ? false : true;
                return [2 /*return*/, valid];
            });
        });
    };
    ParentClientCommonSection.prototype.GetAssignedClientsMacIds = function () {
        /// <summary>Generate string of assigned clients's MaconomyAccountID</summary>
        var tempAssignedClient = this.state.assignedClientsArray;
        var selectedClientsMacIds = [];
        var selectedClientsMacIdsString = '';
        for (var client = 0; client < tempAssignedClient.length; client++) {
            selectedClientsMacIds.push(tempAssignedClient[client].MaconomyAccountID);
        }
        selectedClientsMacIdsString = selectedClientsMacIds.join(',');
        return selectedClientsMacIdsString;
    };
    ParentClientCommonSection.prototype.SaveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempData, _a, error_2, errordata;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 6]);
                        this.setState({ loading: true });
                        _a = {};
                        return [4 /*yield*/, this.GetAssignedClientsMacIds()];
                    case 1:
                        tempData = (_a.Child = _b.sent(),
                            _a);
                        if (!(this.props.itemID > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then(function (res) {
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        error_2 = _b.sent();
                        console.log("save data", error_2);
                        errordata = {
                            Title: new Date(),
                            Errors: error_2,
                            RequestID: this.props.itemID
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata)];
                    case 5:
                        _b.sent();
                        //error log change end
                        this.setState({ loading: false });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //rutvik change
    ParentClientCommonSection.prototype._SaveClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setTimeout(function () {
                            window.location.href = _this.props.context.pageContext.web.absoluteUrl;
                        }, 1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ParentClientCommonSection.prototype._SubmitClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isAnyUpdate, _loop_3, this_1, client, state_1, errors, updateRequestDataXML, tempItems, tempDataArray_2, upateRequestData, error, error, viewXMLRequestData, tempData, tempArray_2, requestItem, duplicateSelectedClientsMsgArray, requestsArray_1, allSelectedMacIds_1, tempAssignedClient_1, tempMacId_1, tempMacIdString, duplicateSelectedClients_1, _loop_4, client, errors, _loop_5, client, selectedClientsMacIdsString, returnData, errors, errorsObj, queryParameters, id, currentUSerID, recordSaved, tempBody, e_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ValidateCommonSection()];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 19];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 18, , 19]);
                        this.setState({ loading: true });
                        _a = this;
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 3:
                        _a.requestorID = _b.sent();
                        this.submitData.body = {
                            'RequestID': this.props.itemID.toString(),
                            'Folder': this.props.approvalData.folderPath,
                            'FolderContribute': '',
                            'UpdateReqRead': Constants.EVERYONE_ID.toString(),
                            'UpdateRequestID': this.props.approvalData.updateRequestDataID
                        };
                        this.submitData.notificationBody = {
                            'RequestID': Utils.GenerateRequestID(this.props.itemID),
                            'RequestUrl': this.props.context.pageContext.web.absoluteUrl + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + this.props.itemID.toString(),
                            'Approval': '',
                            'Comments': '',
                            'Stage': '',
                            'CurrentApprover': '',
                            'Requestor': this.props.approvalData.requestorID.toString(),
                            'RequestType': Constants.REQUESTTYPE_OPTIONS.filter(function (x) { return x.text === _this.props.approvalData.requestType; })[0].key,
                            'OtherCompanyApprovers': '',
                        };
                        if (!!this.isRequest9) return [3 /*break*/, 5];
                        if (this.state.assignedClientsArray.length === this.state.previousAssignedClients.length) {
                            isAnyUpdate = false;
                            _loop_3 = function (client) {
                                var elementPresent = this_1.state.assignedClientsArray.filter(function (assignedClient) { return assignedClient.MaconomyAccountID === _this.state.previousAssignedClients[client].MaconomyAccountID; });
                                if (elementPresent.length === 0) {
                                    isAnyUpdate = true;
                                    return "break";
                                }
                            };
                            this_1 = this;
                            for (client = 0; client < this.state.previousAssignedClients.length; client++) {
                                state_1 = _loop_3(client);
                                if (state_1 === "break")
                                    break;
                            }
                            if (isAnyUpdate === false) {
                                errors = this.state.errors;
                                errors.noUpdate = strings.NoChildUpdate;
                                this.setState({
                                    errors: errors,
                                    loading: false
                                });
                                return [2 /*return*/];
                            }
                        }
                        updateRequestDataXML = "<View>\n                        <ViewFields>\n                            <FieldRef Name=\"ID\"></FieldRef>\n                            <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                        </ViewFields>\n                        <RowLimit>1</RowLimit>\n                        <Query>\n                            <Where>\n                                <Eq><FieldRef Name=\"MaconomyAccountID\" /><Value Type=\"Text\">" + this.props.approvalData.maconomyAccountID + "</Value></Eq>\n                            </Where>\n                        </Query>\n                        </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 4:
                        tempItems = _b.sent();
                        tempDataArray_2 = [];
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
                            if (item.MaconomyAccountID == _this.props.approvalData.maconomyAccountID && isAccessLevelPresent) {
                                tempDataArray_2.push(item);
                            }
                        });
                        upateRequestData = tempDataArray_2;
                        if (upateRequestData === undefined || upateRequestData === null) {
                            error = this.state.errors;
                            error.approvalData = strings.NoMaconomyData_Msg;
                            this.setState({ errors: error, loading: false });
                            return [2 /*return*/];
                        }
                        else {
                            error = this.state.errors;
                            error.approvalData = '';
                            this.setState({ errors: error });
                        }
                        _b.label = 5;
                    case 5:
                        viewXMLRequestData = "<View>\n                <ViewFields>\n                    <FieldRef Name=\"ID\"></FieldRef>\n                    <FieldRef Name=\"RequestType\"></FieldRef>\n                    <FieldRef Name=\"Status\"></FieldRef>\n                    <FieldRef Name=\"Child\"></FieldRef>\n                    <FieldRef Name=\"Submitted\"></FieldRef>\n                    <FieldRef Name=\"RequestID\"></FieldRef>\n                </ViewFields>\n                <Query>\n                    <Where>\n                        <And>\n                            <And>\n                                <Eq><FieldRef Name=\"Status\"/><Value Type=\"Text\">Open</Value></Eq>\n                                <Eq><FieldRef Name=\"Submitted\" /><Value Type=\"Boolean\">1</Value></Eq>\n                            </And>\n                            <And>\n                                <Or>\n                                    <Eq><FieldRef Name=\"RequestType\" /><Value Type=\"Choice\">" + Constants.REQUESTTYPE_OPTIONS[2].text + "</Value></Eq>\n                                    <Eq><FieldRef Name=\"RequestType\" /><Value Type=\"Choice\">" + Constants.REQUESTTYPE_OPTIONS[4].text + "</Value></Eq>\n                                </Or>\n                                <IsNotNull><FieldRef Name=\"Child\"></FieldRef></IsNotNull>\n                            </And>\n                        </And>\n                    </Where>\n                </Query>\n                </View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 6:
                        tempData = _b.sent();
                        tempArray_2 = [];
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
                            if ((tempItem.Submitted == true && tempItem.Status == "Open") && (tempItem.Child != null && (tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[2].text || tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[4].text)) && isAccessLevelPresent) {
                                tempArray_2.push(tempItem);
                            }
                        });
                        requestItem = tempArray_2;
                        if (requestItem.length > 0) {
                            duplicateSelectedClientsMsgArray = [];
                            requestsArray_1 = [];
                            allSelectedMacIds_1 = [];
                            requestItem.forEach(function (element) {
                                if (Utils.CheckRequiredField(element["Child"]) !== false) {
                                    requestsArray_1.push({
                                        requestID: element["RequestID"],
                                        Child: element["Child"]
                                    });
                                }
                                var tempIds = element["Child"].split(',');
                                for (var count = 0; count < tempIds.length; count++) {
                                    allSelectedMacIds_1.push(tempIds[count]);
                                }
                            });
                            allSelectedMacIds_1 = allSelectedMacIds_1.filter(function (item, index, inputArray) {
                                return inputArray.indexOf(item) == index;
                            });
                            tempAssignedClient_1 = this.state.assignedClientsArray;
                            tempMacId_1 = [];
                            tempMacIdString = '';
                            duplicateSelectedClients_1 = [];
                            _loop_4 = function (client) {
                                tempMacId_1 = allSelectedMacIds_1.filter(function (macId) { return macId === tempAssignedClient_1[client].MaconomyAccountID; });
                                if (tempMacId_1.length > 0) {
                                    tempMacIdString = tempMacId_1[0];
                                    duplicateSelectedClients_1.push(tempMacIdString);
                                }
                            };
                            for (client = 0; client < tempAssignedClient_1.length; client++) {
                                _loop_4(client);
                            }
                            errors = this.state.errors;
                            if (duplicateSelectedClients_1.length > 0 && this.props.itemID === 0) {
                                _loop_5 = function (client) {
                                    var duplicateRequests = requestsArray_1.filter(function (request) {
                                        var tempChildArray = request.Child.split(',');
                                        tempMacId_1 = tempChildArray.filter(function (child) { return child === duplicateSelectedClients_1[client]; });
                                        return tempMacId_1.length > 0;
                                    });
                                    if (duplicateRequests.length > 0) {
                                        var tempReqIds = [];
                                        for (var dupReq = 0; dupReq < duplicateRequests.length; dupReq++) {
                                            tempReqIds.push(duplicateRequests[dupReq].requestID);
                                        }
                                        duplicateSelectedClientsMsgArray.push(duplicateSelectedClients_1[client] + ' - Request ID: ' + tempReqIds.join(','));
                                    }
                                };
                                for (client = 0; client < duplicateSelectedClients_1.length; client++) {
                                    _loop_5(client);
                                }
                                errors.approvalData = strings.Valid_Req_Submit_SelectedClients + duplicateSelectedClientsMsgArray.join(', ');
                                this.setState({
                                    errors: errors,
                                    loading: false
                                });
                                return [2 /*return*/];
                            }
                            else {
                                errors.approvalData = '';
                                this.setState({ errors: errors });
                            }
                        }
                        return [4 /*yield*/, this.GetAssignedClientsMacIds()];
                    case 7:
                        selectedClientsMacIdsString = _b.sent();
                        this.submitData.data = {
                            Submitted: true,
                            SubmittedDate: new Date(Date.now()),
                            Child: selectedClientsMacIdsString,
                            Status: strings.Status[0],
                            //rutvik change
                            //CR change - 25/10/2021 - start
                            StatusIndicator: "Submitted"
                            //CR change - 25/10/2021 - end
                        };
                        return [4 /*yield*/, Utils.GetSubmitDetails(this.submitData, strings, this.props.approvalData, this.requestorID, this.objWeb, this.serverRelativeURL, this.state.requestorid)];
                    case 8:
                        returnData = _b.sent();
                        if (returnData !== null) {
                            this.submitData = returnData;
                            errors = this.state.errors;
                            errors.approvalData = "";
                            this.setState({ errors: errors });
                        }
                        else {
                            errorsObj = this.state.errors;
                            errorsObj.approvalData = strings.ApprovalNotFoundMsg;
                            this.setState({ errors: errorsObj, loading: false });
                            return [2 /*return*/];
                        }
                        queryParameters = new UrlQueryParameterCollection(window.location.href);
                        if (!queryParameters.getValue("itemID")) return [3 /*break*/, 12];
                        id = parseInt(queryParameters.getValue("itemID"));
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 9:
                        currentUSerID = _b.sent();
                        if (!(this.props.listData.RequestorId === currentUSerID)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.filter("ID eq " + this.props.listData.ID).getAll()];
                    case 10:
                        recordSaved = _b.sent();
                        if (!(recordSaved.length !== 0)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.getById(this.props.listData.ID).recycle()];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        if (!(this.props.itemID > 0)) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(this.submitData.data).then(function (res) {
                            })];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14:
                        if (!(!this.props.itemSubmitted || returnData !== null)) return [3 /*break*/, 17];
                        tempBody = {
                            Title: this.props.itemID.toString(),
                            FolderPath: this.props.approvalData.folderPath === undefined ? "" : this.props.approvalData.folderPath.toString(),
                            FolderContribute: this.submitData.body["FolderContribute"].concat(',', Constants.FHDUserGroupID),
                            UpdateReqRead: Constants.EVERYONE_ID.toString(),
                            UpdateRequestID: this.props.approvalData.updateRequestDataID === undefined ? "" : this.props.approvalData.updateRequestDataID.toString(),
                            FolderRead: this.submitData.body["FolderRead"],
                            ReqRead: this.submitData.body["ReqRead"],
                            ReqContribute: this.submitData.body["ReqContribute"].concat(',', Constants.FHDUserGroupID) //R FHD change 19-9-2023
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody)];
                    case 15:
                        _b.sent();
                        return [4 /*yield*/, Utils.CallMSFlow(this.props.context, JSON.stringify(this.submitData.notificationBody), this.props.sendNotificationMSFlowUrl)];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17:
                        setTimeout(function () {
                            window.location.href = _this.props.context.pageContext.web.absoluteUrl;
                        }, 1000);
                        return [3 /*break*/, 19];
                    case 18:
                        e_1 = _b.sent();
                        console.log("submit request:", e_1);
                        this.setState({ loading: false });
                        return [3 /*break*/, 19];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    return ParentClientCommonSection;
}(React.Component));
export default ParentClientCommonSection;
//# sourceMappingURL=ParentClientCommonSection.js.map