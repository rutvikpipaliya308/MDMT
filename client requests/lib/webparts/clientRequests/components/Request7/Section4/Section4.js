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
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon, Label } from 'office-ui-fabric-react';
import { Web } from 'sp-pnp-js';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
var MASTER_DROPDOWNS = [{ key: "dpDefaultTaxCode", name: "Default Tax code", required: true },
    { key: "dpPaymentTerms", name: "Payment Terms", required: true },
    { key: "dpDeliveryMethod", name: "Delivery Method", required: true },
    { key: "dpWithHoldingTax", name: "Withholding Tax Type", required: false },
    { key: "dpEmirate", name: "Emirate", required: false },
    { key: "dpPlaceOfSupply", name: "Place of supply", required: false },
    { key: "dpGSTRegType", name: "GST Registration Type", required: false }];
var Section4 = /** @class */ (function (_super) {
    __extends(Section4, _super);
    function Section4(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.state = {
            loading: true,
            dpDefaultTaxCode: { value: '', options: [] },
            dpPaymentTerms: { value: '', options: [] },
            dpWithHoldingTax: { value: '', options: [] },
            dpEmirate: { value: '', options: [] },
            dpPlaceOfSupply: { value: '', options: [] },
            dpGSTRegType: { value: '', options: [] },
            dpDeliveryMethod: { value: '', options: [] },
            tbxCIN: '',
            tbxInstructions: '',
            tbxCustomerRemark4: '',
            tbxCustomerRemark5: '',
            tbxTDSRate: '',
            country: '',
            tbxCustomerRemark8: '',
            tbxCustomerRemark7: '',
            dpClientIDType: { value: '', options: [] },
            currentUserid: '',
            requestorid: '',
            errors: {
                dpDefaultTaxCode: '',
                dpPaymentTerms: '',
                dpDeliveryMethod: '',
                tbxCustomerRemark4: '',
                tbxCustomerRemark5: '',
                tbxCustomerRemark8: '',
                tbxCustomerRemark7: '',
                dpClientIDType: '',
            },
            itemID: 0
        };
        return _this;
    }
    Section4.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //rutvik 6-7 24        
                    return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select("Country").get().then(function (data) {
                            _this.setState({ country: data.Country });
                            if (data.Country !== "Italy") {
                                _this.setState({ tbxCustomerRemark4: "0000000" });
                            }
                            else {
                                _this.setState({ tbxCustomerRemark4: "" });
                            }
                        })];
                    case 1:
                        //rutvik 6-7 24        
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //rutvik test changes
    // private async BindDefaultTaxCode(value: string) {
    //     // <summary>bind data in form</summary>
    //     for (var i = 0; i < MASTER_DROPDOWNS.length; i++) {
    //         if (MASTER_DROPDOWNS[i].name === "Default Tax code") {
    //             var tempStateObj = {};
    //             let options = await Utils.GetMasterListItemsForDefaultTaxCode(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, MASTER_DROPDOWNS[i].name);
    //             var tempObj = this.state[MASTER_DROPDOWNS[i].key];
    //             tempObj.options = options;
    //             options.length > 0 ? tempStateObj[MASTER_DROPDOWNS[i].key] = tempObj : [];
    //             this.setState({ ...tempStateObj });
    //             break;
    //         }
    //     }
    // }
    Section4.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentUserID, requestoridd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.props.data === null || this.props.data === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.BindData()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: 
                    //shraddha test 7
                    return [4 /*yield*/, this.getClientIDTypeOptions()];
                    case 3:
                        //shraddha test 7
                        _a.sent();
                        if (this.props.listData !== null) {
                            this.setState({
                                tbxCIN: this.props.listData["CIN"],
                                tbxTDSRate: this.props.listData["TDSTaxRate"],
                                tbxInstructions: this.props.listData["Instructions"],
                                dpDefaultTaxCode: Utils.GetDropdownStateValue(this.props.listData["DefaultTaxCode"], this.state.dpDefaultTaxCode),
                                dpPaymentTerms: Utils.GetDropdownStateValue(this.props.listData["PaymentTerms"], this.state.dpPaymentTerms),
                                dpWithHoldingTax: Utils.GetDropdownStateValue(this.props.listData["WithholdingTaxType"], this.state.dpWithHoldingTax),
                                dpEmirate: Utils.GetDropdownStateValue(this.props.listData["Emirate"], this.state.dpEmirate),
                                dpPlaceOfSupply: Utils.GetDropdownStateValue(this.props.listData["PlaceofSupply"], this.state.dpPlaceOfSupply),
                                dpGSTRegType: Utils.GetDropdownStateValue(this.props.listData["GSTRegistrationType"], this.state.dpGSTRegType),
                                dpDeliveryMethod: Utils.GetDropdownStateValue(this.props.listData["DeliveryMethod"], this.state.dpDeliveryMethod),
                                //Shraddha test 7
                                tbxCustomerRemark4: this.props.listData["CustomerRemark4"],
                                tbxCustomerRemark5: this.props.listData["CustomerRemark5"],
                                tbxCustomerRemark8: this.props.listData["CustomerRemark8"],
                                tbxCustomerRemark7: this.props.listData["CustomerRemark7"],
                                dpClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.listData["ClientIDType"], this.state.dpClientIDType),
                            });
                        }
                        if (this.props.data !== null && this.props.data !== undefined) {
                            this.setState(__assign({}, this.props.data));
                        }
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 4:
                        currentUserID = _a.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        return [2 /*return*/];
                }
            });
        });
    };
    //shraddha test 7
    Section4.prototype.getClientIDTypeOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ClientIDTypeOptions, ClientTypeOption_1, IsRequiredOptions, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        ClientIDTypeOptions = this.state.dpClientIDType;
                        ClientTypeOption_1 = [];
                        IsRequiredOptions = [];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CLIENTIDTYPE_INTERNALNAME).items.select("Title", "KSAClientDescription").getAll().then(function (record) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    record.filter(function (tempitem) {
                                        if (tempitem.Title != null) {
                                            var obj1 = { 'key': (tempitem.Title + " - " + tempitem.KSAClientDescription), 'text': (tempitem.Title + " - " + tempitem.KSAClientDescription) };
                                            ClientTypeOption_1.push(obj1);
                                        }
                                    });
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        ClientIDTypeOptions.options = ClientTypeOption_1;
                        return [4 /*yield*/, this.setState({
                                dpClientIDType: ClientIDTypeOptions
                            })];
                    case 2:
                        _a.sent();
                        this.setState({ loading: false });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log("getClientIDTypeOptions(Section4.tsx)--->", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Section4.prototype.render = function () {
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "card-primary", style: { position: "relative" } },
                React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                React.createElement("div", { className: "card-header" },
                    React.createElement("h3", { className: "" }, strings.Section4Title)),
                React.createElement("div", { className: "card-body" },
                    React.createElement("h6", null, strings.Lbl_TaxInformation),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null, strings.Lbl_TaxRegNo),
                            React.createElement("input", { id: "tbxTaxRegNo", className: "form-control", type: "text", value: this.props.section2Data.tbxTaxRegNo, placeholder: "", maxLength: 255, disabled: true })),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_DefaultTaxCode,
                                React.createElement("sub", null, "*")),
                            React.createElement(Dropdown, { id: "dpDefaultTaxCode", disabled: this.checkIfFieldDisabled("dpDefaultTaxCode"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpDefaultTaxCode.value, options: this.state.dpDefaultTaxCode.options, onChange: this._onDpChange.bind(this) }),
                            this.state.errors.dpDefaultTaxCode.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.dpDefaultTaxCode,
                                    " ")) : null)),
                    React.createElement("h6", null, strings.Lbl_PaymentInformation),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_PaymentTerms,
                                React.createElement("sub", null, "*")),
                            React.createElement(Dropdown, { id: "dpPaymentTerms", disabled: this.checkIfFieldDisabled("dpPaymentTerms"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpPaymentTerms.value, options: this.state.dpPaymentTerms.options, onChange: this._onDpChange.bind(this) }),
                            this.state.errors.dpPaymentTerms.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.dpPaymentTerms,
                                    " ")) : null)),
                    React.createElement("h6", null, strings.Lbl_Billing),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null, strings.Lbl_Instructions),
                            React.createElement("input", { id: "tbxInstructions", disabled: this.checkIfFieldDisabled("tbxInstructions"), className: "form-control", type: "text", value: this.state.tbxInstructions, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this) })),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_DeliveryMethod,
                                React.createElement("sub", null, "*")),
                            React.createElement(Dropdown, { id: "dpDeliveryMethod", disabled: this.checkIfFieldDisabled("dpDeliveryMethod"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpDeliveryMethod.value, options: this.state.dpDeliveryMethod.options, onChange: this._onDpChange.bind(this) }),
                            this.state.errors.dpDeliveryMethod.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.dpDeliveryMethod,
                                    " ")) : null)),
                    this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY ?
                        React.createElement(React.Fragment, null,
                            React.createElement("h6", null, strings.Lbl_ItalianInvoiceExtension),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", null,
                                        strings.Lbl_CustomerRemark4,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxCustomerRemark4", className: "form-control", type: "text", disabled: this.checkIfFieldDisabled("tbxCustomerRemark4"), value: this.state.tbxCustomerRemark4, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this) }),
                                    this.state.errors.tbxCustomerRemark4.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxCustomerRemark4,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_CustomerRemark5,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxCustomerRemark5", className: "form-control", disabled: this.checkIfFieldDisabled("tbxCustomerRemark5"), type: "text", value: this.state.tbxCustomerRemark5, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this) }),
                                    this.state.errors.tbxCustomerRemark5.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxCustomerRemark5,
                                            " ")) : null)),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", null,
                                        strings.Lbl_CustomerRemark8,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxCustomerRemark8", className: "form-control", disabled: this.checkIfFieldDisabled("tbxCustomerRemark8"), type: "text", value: this.state.tbxCustomerRemark8, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this) }),
                                    this.state.errors.tbxCustomerRemark8.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxCustomerRemark8,
                                            " ")) : null))) : null,
                    (this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[0] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[1] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[2]) ?
                        React.createElement(React.Fragment, null,
                            React.createElement("h6", null, strings.Lbl_SaudiSpecificData),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", null, strings.Lbl_CustomerRemark7),
                                    React.createElement("input", { id: "tbxCustomerRemark7", className: "form-control", disabled: this.checkIfFieldDisabled("tbxCustomerRemark7"), type: "text", value: this.state.tbxCustomerRemark7, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this) }),
                                    this.state.errors.tbxCustomerRemark7.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxCustomerRemark7,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", { className: 'paymentTermslbl' }, strings.Lbl_ClientIDType),
                                    React.createElement(Dropdown, { id: "dpClientIDType", className: 'paymentTerms', disabled: this.checkIfFieldDisabled("dpClientIDType"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpClientIDType.value, options: this.state.dpClientIDType.options, onChange: this._onDpChange.bind(this) }),
                                    this.state.errors.dpClientIDType.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.dpClientIDType,
                                            " ")) : null))) : null,
                    Constants.GULF_COMPANIES.indexOf(this.props.approvalData.company.split('-')[0].trim()) > -1 ?
                        React.createElement(React.Fragment, null,
                            React.createElement("h6", null, strings.Lbl_GulfSpecInfo),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", null, strings.Lbl_WithHoldingTax),
                                    React.createElement(Dropdown, { id: "dpWithHoldingTax", disabled: this.checkIfFieldDisabled("dpWithHoldingTax"), placeholder: '', selectedKey: this.state.dpWithHoldingTax.value, options: this.state.dpWithHoldingTax.options, onChange: this._onDpChange.bind(this) })),
                                Constants.EMIRATE_COMPANIES.indexOf(this.props.approvalData.company.split('-')[0].trim()) > -1 ?
                                    React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                        React.createElement("label", null, strings.Lbl_Emirate),
                                        React.createElement(Dropdown, { id: "dpEmirate", disabled: this.checkIfFieldDisabled("dpEmirate"), placeholder: '', selectedKey: this.state.dpEmirate.value, options: this.state.dpEmirate.options, onChange: this._onDpChange.bind(this) }))
                                    : null))
                        : null,
                    this.props.approvalData.company.split('-')[0].trim() === Constants.INDIA_COMPANY ?
                        React.createElement(React.Fragment, null,
                            React.createElement("h6", null, strings.Lbl_IndiaSpecInfo),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", null, strings.Lbl_PlaceOfSupply),
                                    React.createElement(Dropdown, { id: "dpPlaceOfSupply", disabled: this.checkIfFieldDisabled("dpPlaceOfSupply"), placeholder: '', selectedKey: this.state.dpPlaceOfSupply.value, options: this.state.dpPlaceOfSupply.options, onChange: this._onDpChange.bind(this) })),
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", null, strings.Lbl_GSTRegType),
                                    React.createElement(Dropdown, { id: "dpGSTRegType", disabled: this.checkIfFieldDisabled("dpGSTRegType"), placeholder: '', selectedKey: this.state.dpGSTRegType.value, options: this.state.dpGSTRegType.options, onChange: this._onDpChange.bind(this) })),
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", null, strings.Lbl_CIN),
                                    React.createElement("input", { id: "tbxCIN", disabled: this.checkIfFieldDisabled("tbxCIN"), className: "form-control", type: "text", value: this.state.tbxCIN, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this) })),
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", null, strings.Lbl_TDSRate),
                                    React.createElement("input", { id: "tbxTDSRate", disabled: this.checkIfFieldDisabled("tbxTDSRate"), className: "form-control", type: "text", value: this.state.tbxTDSRate, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this) }))))
                        : null),
                React.createElement(CardFooter, __assign({}, this.props, { backBtnMethod: this._BackClick.bind(this), nextBtnMethod: this._NextClick.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this) })))));
    };
    Section4.prototype.checkIfFieldDisabled = function (tagID) {
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
    Section4.prototype.BindData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempStateObj, i, options, tempObj, tempoptions, tempoptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempStateObj = {};
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < MASTER_DROPDOWNS.length)) return [3 /*break*/, 7];
                        options = [];
                        if (!MASTER_DROPDOWNS[i].required) {
                            options[0] = { key: '', text: '' };
                        }
                        tempObj = this.state[MASTER_DROPDOWNS[i].key];
                        if (!(MASTER_DROPDOWNS[i].name === "Default Tax code")) return [3 /*break*/, 3];
                        return [4 /*yield*/, Utils.GetMasterListItemsForDefaultTaxCode(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS[i].name)];
                    case 2:
                        tempoptions = _a.sent();
                        options.push.apply(options, tempoptions);
                        tempObj.options = options;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, Utils.GetMasterListItems(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, MASTER_DROPDOWNS[i].name)];
                    case 4:
                        tempoptions = _a.sent();
                        options.push.apply(options, tempoptions);
                        tempObj.options = options;
                        _a.label = 5;
                    case 5:
                        options.length > 0 ? tempStateObj[MASTER_DROPDOWNS[i].key] = tempObj : [];
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7:
                        tempStateObj["loading"] = false;
                        this.setState(__assign({}, tempStateObj));
                        return [2 /*return*/];
                }
            });
        });
    };
    Section4.prototype.ValidateSection4 = function () {
        /// <summary>Validate section 4.</summary>
        var errors = this.state.errors;
        errors.dpDefaultTaxCode = (Utils.CheckRequiredField(this.state.dpDefaultTaxCode.value) === false) ? strings.CantLeaveBlankMsg : "";
        errors.dpPaymentTerms = (Utils.CheckRequiredField(this.state.dpPaymentTerms.value) === false) ? strings.CantLeaveBlankMsg : "";
        errors.dpDeliveryMethod = (Utils.CheckRequiredField(this.state.dpDeliveryMethod.value) === false) ? strings.CantLeaveBlankMsg : "";
        //rutvik 6-7 24
        if (this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY) {
            errors.tbxCustomerRemark4 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark4) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxCustomerRemark5 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark5) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxCustomerRemark8 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark8) === false) ? strings.CantLeaveBlankMsg : "";
        }
        else {
            errors.tbxCustomerRemark4 = '';
            errors.tbxCustomerRemark5 = '';
            errors.tbxCustomerRemark8 = '';
        }
        //endr
        this.setState({ errors: errors });
        var valid = true;
        Object.keys(errors).forEach(function (key) { errors[key].length > 0 ? valid = false : null; });
        return valid;
    };
    Section4.prototype.SaveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempData, error_2, errordata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        this.setState({ loading: true });
                        tempData = {
                            DefaultTaxCode: this.state.dpDefaultTaxCode.value,
                            PaymentTerms: this.state.dpPaymentTerms.value,
                            WithholdingTaxType: this.state.dpWithHoldingTax.value,
                            Emirate: this.state.dpEmirate.value,
                            PlaceofSupply: this.state.dpPlaceOfSupply.value,
                            GSTRegistrationType: this.state.dpGSTRegType.value,
                            TDSTaxRate: Utils.TrimData(this.state.tbxTDSRate),
                            Instructions: Utils.TrimData(this.state.tbxInstructions),
                            CIN: Utils.TrimData(this.state.tbxCIN),
                            DeliveryMethod: this.state.dpDeliveryMethod.value,
                            CustomerRemark4: Utils.TrimData(this.state.tbxCustomerRemark4),
                            CustomerRemark5: Utils.TrimData(this.state.tbxCustomerRemark5),
                            CustomerRemark8: Utils.TrimData(this.state.tbxCustomerRemark8),
                            CustomerRemark7: Utils.TrimData(this.state.tbxCustomerRemark7),
                            ClientIDType: Utils.SplitData(this.state.dpClientIDType.value),
                        };
                        if (!(this.props.itemID > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then(function (res) {
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        error_2 = _a.sent();
                        this.setState({ loading: false });
                        errordata = {
                            Title: new Date(),
                            Errors: error_2,
                            RequestID: this.props.itemID
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata)];
                    case 4:
                        _a.sent();
                        //error log change end
                        console.log("section 4 save data", error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Section4.prototype._onTbxChange = function (event) {
        var _a;
        /// <summary>Textbox change event.</summary>
        event.preventDefault();
        var _b = event.target, id = _b.id, value = _b.value;
        this.setState(__assign({}, this.state, (_a = {}, _a[id] = value, _a)));
        //rutvik validate change
        var errors = this.state.errors;
        if (id === "tbxCustomerRemark4")
            errors.tbxCustomerRemark4 = '';
        if (id === "tbxCustomerRemark5")
            errors.tbxCustomerRemark5 = '';
        if (id === "tbxCustomerRemark8")
            errors.tbxCustomerRemark8 = '';
        this.setState({ errors: errors });
        //end
    };
    Section4.prototype._onDpChange = function (event, item) {
        var _a;
        /// <summary>Event called on dropdown value change.</summary>
        var tempObj = this.state[event.target.id];
        tempObj.value = item.text;
        this.setState(__assign({}, this.state, (_a = {}, _a[event.target.id] = tempObj, _a)));
        //rutvik validate change
        var errors = this.state.errors;
        if (event.target.id === "dpDefaultTaxCode")
            errors.dpDefaultTaxCode = '';
        if (event.target.id === "dpPaymentTerms")
            errors.dpPaymentTerms = '';
        if (event.target.id === "dpDeliveryMethod")
            errors.dpDeliveryMethod = '';
        this.setState({ errors: errors });
        //end
    };
    Section4.prototype._NextClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Next button event.</summary>
                        this.setState({ loading: true }); //9-2-23
                        return [4 /*yield*/, this.SaveDataOperations()];
                    case 1:
                        if (_a.sent()) {
                            this.setState({ loading: false }, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.props.dataChange("section4Data", this.state)];
                                        case 1:
                                            _a.sent();
                                            this.props.nextStep();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Section4.prototype._BackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /// <summary>Back button event.<summary>
                this.props.dataChange("section4Data", this.state);
                this.props.backStep();
                return [2 /*return*/];
            });
        });
    };
    Section4.prototype._SaveForLaterClick = function () {
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
    Section4.prototype.SaveDataOperations = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Validate and save data operations.</summary>
                        if (this.ValidateSection4() === false) {
                            this.setState({ loading: false }); //9-2-23
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
    return Section4;
}(React.Component));
export default Section4;
//# sourceMappingURL=Section4.js.map