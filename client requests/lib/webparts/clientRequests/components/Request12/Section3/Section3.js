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
import { Web } from 'sp-pnp-js';
import * as Constants from '../../../Constants';
import * as Utils from '../../Utils';
import { Dropdown, Icon, Label } from 'office-ui-fabric-react';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import * as React from 'react';
var Section3 = /** @class */ (function (_super) {
    __extends(Section3, _super);
    function Section3(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.requestJson = null;
        _this.clientJson = null;
        _this.state = {
            requestor: 0,
            loading: true,
            dpDefaultTaxCode: { value: '', options: [] },
            dpPaymentTerms: { value: '', options: [] },
            dpWithholdingTaxType: { value: '', options: [] },
            dpEmirate: { value: '', options: [] },
            dpPlaceofSupply: { value: '', options: [] },
            dpGSTRegistrationType: { value: '', options: [] },
            clientDetail: '',
            tbxCIN: '',
            tbxTDSTaxRate: '',
            dpClientIDType: { value: '', options: [] },
            errors: {
                dpDefaultTaxCode: '',
                dpPaymentTerms: '',
                tbxCustomerRemark4: '',
                tbxCustomerRemark5: '',
                tbxCustomerRemark8: '',
                tbxCustomerRemark7: '',
                dpClientIDType: '',
            },
            section2TbxValues: '',
            itemID: 0,
            tbxCustomerRemark4: '',
            tbxCustomerRemark5: '',
            tbxCustomerRemark7: '',
            tbxCustomerRemark8: '',
            currentUserid: '',
            requestorid: '',
        };
        return _this;
    }
    Section3.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var placeOfSupplyValue, currentUserID, requestoridd;
            var _this = this;
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
                        if (!(this.props.listData !== null)) return [3 /*break*/, 7];
                        if (!(this.props.listData.DefaultTaxCode !== null)) return [3 /*break*/, 4];
                        this.setState({
                            dpDefaultTaxCode: Utils.GetDropdownStateValue(this.props.listData["DefaultTaxCode"], this.state.dpDefaultTaxCode),
                            dpPaymentTerms: Utils.GetDropdownStateValue(this.props.listData["PaymentTerms"], this.state.dpPaymentTerms),
                            dpWithholdingTaxType: Utils.GetDropdownStateValue(this.props.listData["WithholdingTaxType"], this.state.dpWithholdingTaxType),
                            dpEmirate: Utils.GetDropdownStateValue(this.props.listData["Emirate"], this.state.dpEmirate),
                            dpPlaceofSupply: Utils.GetDropdownStateValue(this.props.listData["PlaceofSupply"], this.state.dpPlaceofSupply),
                            dpGSTRegistrationType: Utils.GetDropdownStateValue(this.props.listData["GSTRegistrationType"], this.state.dpGSTRegistrationType),
                            tbxCIN: this.props.listData["CIN"],
                            tbxTDSTaxRate: this.props.listData["TDSTaxRate"],
                            tbxCustomerRemark4: this.props.listData["CustomerRemark4"],
                            tbxCustomerRemark5: this.props.listData["CustomerRemark5"],
                            tbxCustomerRemark8: this.props.listData["CustomerRemark8"],
                            tbxCustomerRemark7: this.props.listData["CustomerRemark7"],
                            dpClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.listData["ClientIDType"], this.state.dpClientIDType),
                        });
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(this.props.data === undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.SetTextBoxValue()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        if (!(this.props.data === undefined)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.SetTextBoxValue()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        if (this.props.data !== null && this.props.data !== undefined) {
                            this.setState(__assign({}, this.props.data));
                            //rutvik test change
                            // if (this.props.data.dpDefaultTaxCode.value !== this.props.section2Data.clientDetail["lblDefaultTaxCode"]) {
                            //     await this.BindDefaultTaxCode(this.props.data.dpDefaultTaxCode.value);
                            // }
                            //end
                        }
                        if (this.props.section2Data.clientDetail !== null && this.props.data === undefined) {
                            placeOfSupplyValue = this.props.section2Data.clientDetail["lblPlaceofSupply"];
                            if (this.props.section2Data.clientDetail["lblPlaceofSupply"] !== null) {
                                placeOfSupplyValue = this.state.dpPlaceofSupply.options.filter(function (e) { return e.text.split('-')[0].trim().toLowerCase() === _this.props.section2Data.clientDetail["lblPlaceofSupply"]; })[0].text;
                            }
                            this.setState({
                                clientDetail: {
                                    lblTaxRegistrationNo: this.props.section2Data.clientDetail["lblTaxRegistrationNo"],
                                    lblDefaultTaxCode: this.props.section2Data.clientDetail["lblDefaultTaxCode"],
                                    lblPaymentTerms: this.props.section2Data.clientDetail["lblPaymentTerms"],
                                    lblWithholdingTaxType: this.props.section2Data.clientDetail["lblWithholdingTaxType"],
                                    lblEmirate: this.props.section2Data.clientDetail["lblEmirate"],
                                    lblPlaceofSupply: placeOfSupplyValue,
                                    lblGSTRegistrationType: this.props.section2Data.clientDetail["lblGSTRegistrationType"],
                                    lblCIN: this.props.section2Data.clientDetail["lblCIN"],
                                    lblTDSTaxRate: this.props.section2Data.clientDetail["lblTDSTaxRate"],
                                    lblCustomerRemark4: this.props.section2Data.clientDetail["lblCustomerRemark4"],
                                    lblCustomerRemark5: this.props.section2Data.clientDetail["lblCustomerRemark5"],
                                    lblCustomerRemark8: this.props.section2Data.clientDetail["lblCustomerRemark8"],
                                    lblCustomerRemark7: this.props.section2Data.clientDetail["lblCustomerRemark7"],
                                    lblClientIDType: this.props.section2Data.clientDetail["lblClientIDType"]
                                }
                            });
                        }
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 10:
                        currentUserID = _a.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        //Shraddha 08-08-22 item 4 end
                        this.setState({
                            loading: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //shraddha test 7
    Section3.prototype.getClientIDTypeOptions = function () {
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
    Section3.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.forceUpdate();
                return [2 /*return*/];
            });
        });
    };
    Section3.prototype.render = function () {
        this.DropDownColorChange();
        return (React.createElement("div", { className: "container-xl" },
            React.createElement("div", { className: "card-primary", style: { position: "relative" } },
                React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                React.createElement("div", { className: "card-header" },
                    React.createElement("h3", { className: "" }, strings.UpdateFields_Title)),
                React.createElement("div", { className: "card-body" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6 col-lg-6 form-info " },
                            React.createElement("h6", null, strings.Lbl_TaxInformation),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_TaxRegNo),
                                    React.createElement("p", null, this.state.clientDetail.lblTaxRegistrationNo !== null ? this.state.clientDetail.lblTaxRegistrationNo : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_DefaultTaxCode),
                                    React.createElement("p", null, this.state.clientDetail.lblDefaultTaxCode !== null && this.state.clientDetail.lblDefaultTaxCode !== '' ? this.state.clientDetail.lblDefaultTaxCode : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-6 col-lg-6" },
                            React.createElement("h6", null, strings.Lbl_TaxInformation),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", { className: 'defaultTaxCodelbl' },
                                        strings.Lbl_DefaultTaxCode,
                                        React.createElement("sub", null, "*")),
                                    React.createElement(Dropdown, { id: "dpDefaultTaxCode", className: "defaultTaxCode", disabled: this.checkIfFieldDisabled("dpDefaultTaxCode"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpDefaultTaxCode.value, options: this.state.dpDefaultTaxCode.options, onChange: this._OnDropDownChange.bind(this) }),
                                    this.state.errors.dpDefaultTaxCode.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.dpDefaultTaxCode,
                                            " ")) : null)))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6 col-lg-6 form-info" },
                            React.createElement("h6", null, strings.Lbl_PaymentInformation),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null, strings.Lbl_PaymentTerms),
                                    React.createElement("p", null, this.state.clientDetail.lblPaymentTerms !== null ? this.state.clientDetail.lblPaymentTerms : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-6 col-lg-6" },
                            React.createElement("h6", null, strings.Lbl_PaymentInformation),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", { className: 'paymentTermslbl' },
                                        strings.Lbl_PaymentTerms,
                                        React.createElement("sub", null, "*")),
                                    React.createElement(Dropdown, { id: "dpPaymentTerms", className: 'paymentTerms', disabled: this.checkIfFieldDisabled("dpPaymentTerms"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpPaymentTerms.value, options: this.state.dpPaymentTerms.options, onChange: this._OnDropDownChange.bind(this) }),
                                    this.state.errors.dpPaymentTerms.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.dpPaymentTerms,
                                            " ")) : null)))),
                    Constants.GULF_COMPANIES.indexOf(this.props.approvalData.company.split('-')[0].trim()) > -1 ?
                        React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-6 col-lg-6 form-info" },
                                    React.createElement("h6", null, strings.Lbl_GulfSpecInfo),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-6" },
                                            React.createElement("label", null, strings.Lbl_WithHoldingTax),
                                            React.createElement("p", null, this.state.clientDetail.lblWithholdingTaxType !== null ? this.state.clientDetail.lblWithholdingTaxType : strings.EmptyData)),
                                        React.createElement("div", { className: "form-group col-6" },
                                            React.createElement("label", null, strings.Lbl_Emirate),
                                            React.createElement("p", null, this.state.clientDetail.lblEmirate !== null ? this.state.clientDetail.lblEmirate : strings.EmptyData)))),
                                React.createElement("div", { className: "col-md-6 col-lg-6" },
                                    React.createElement("h6", null, strings.Lbl_GulfSpecInfo),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", null, strings.Lbl_WithHoldingTax),
                                            React.createElement(Dropdown, { id: "dpWithholdingTaxType", disabled: this.checkIfFieldDisabled("dpWithholdingTaxType"), placeholder: '', selectedKey: this.state.dpWithholdingTaxType.value, options: this.state.dpWithholdingTaxType.options, onChange: this._OnDropDownChange.bind(this) })),
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", null, strings.Lbl_Emirate),
                                            React.createElement(Dropdown, { id: "dpEmirate", disabled: this.checkIfFieldDisabled("dpEmirate"), placeholder: '', selectedKey: this.state.dpEmirate.value, options: this.state.dpEmirate.options, onChange: this._OnDropDownChange.bind(this) }))))))
                        : null,
                    this.props.approvalData.company.split('-')[0].trim() === Constants.INDIA_COMPANY ?
                        React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-6 col-lg-6 form-info" },
                                    React.createElement("h6", null, strings.Lbl_IndiaSpecInfo),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group  col-6" },
                                            React.createElement("label", null, strings.Lbl_PlaceOfSupply),
                                            React.createElement("p", null, this.state.clientDetail.lblPlaceofSupply !== null ? this.state.clientDetail.lblPlaceofSupply : strings.EmptyData)),
                                        React.createElement("div", { className: "form-group  col-6" },
                                            React.createElement("label", null, strings.Lbl_GSTRegType),
                                            React.createElement("p", null, this.state.clientDetail.lblGSTRegistrationType !== null ? this.state.clientDetail.lblGSTRegistrationType : strings.EmptyData)),
                                        React.createElement("div", { className: "form-group  col-6" },
                                            React.createElement("label", null, strings.Lbl_CIN),
                                            React.createElement("p", null, this.state.clientDetail.lblCIN !== null ? this.state.clientDetail.lblCIN : strings.EmptyData)),
                                        React.createElement("div", { className: "form-group  col-6" },
                                            React.createElement("label", null, strings.Lbl_TDSRate),
                                            React.createElement("p", null, this.state.clientDetail.lblTDSTaxRate !== null ? this.state.clientDetail.lblTDSTaxRate : strings.EmptyData)))),
                                React.createElement("div", { className: "col-md-6 col-lg-6" },
                                    React.createElement("h6", null, strings.Lbl_IndiaSpecInfo),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", null, strings.Lbl_PlaceOfSupply),
                                            React.createElement(Dropdown, { id: "dpPlaceofSupply", disabled: this.checkIfFieldDisabled("dpPlaceofSupply"), placeholder: '', selectedKey: this.state.dpPlaceofSupply.value, options: this.state.dpPlaceofSupply.options, onChange: this._OnDropDownChange.bind(this) })),
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", null, strings.Lbl_GSTRegType),
                                            React.createElement(Dropdown, { id: "dpGSTRegistrationType", disabled: this.checkIfFieldDisabled("dpGSTRegistrationType"), placeholder: '', selectedKey: this.state.dpGSTRegistrationType.value, options: this.state.dpGSTRegistrationType.options, onChange: this._OnDropDownChange.bind(this) })),
                                        React.createElement("div", { className: "form-group  col-sm-6" },
                                            React.createElement("label", null, strings.Lbl_CIN),
                                            React.createElement("input", { id: "tbxCIN", disabled: this.checkIfFieldDisabled("tbxCIN"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxCIN, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: (Utils.TrimData(this.state.tbxCIN) !== Utils.TrimData(this.state.clientDetail.lblCIN)) ? Constants.YELLOW : Constants.WHITE } })),
                                        React.createElement("div", { className: "form-group  col-sm-6" },
                                            React.createElement("label", null, strings.Lbl_TDSRate),
                                            React.createElement("input", { id: "tbxTDSTaxRate", disabled: this.checkIfFieldDisabled("tbxTDSTaxRate"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxTDSTaxRate, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: (Utils.TrimData(this.state.tbxTDSTaxRate) !== Utils.TrimData(this.state.clientDetail.lblTDSTaxRate)) ? Constants.YELLOW : Constants.WHITE } }))))))
                        : null,
                    this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY ?
                        React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-6 col-lg-6 form-info" },
                                    React.createElement("h6", null, strings.Lbl_ItalianInvoiceExtension),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group  col-6" },
                                            React.createElement("label", null, strings.Lbl_CustomerRemark4),
                                            React.createElement("p", null, this.state.clientDetail.lblCustomerRemark4 !== null ? this.state.clientDetail.lblCustomerRemark4 : strings.EmptyData)),
                                        React.createElement("div", { className: "form-group  col-6" },
                                            React.createElement("label", null, strings.Lbl_CustomerRemark5),
                                            React.createElement("p", null, this.state.clientDetail.lblCustomerRemark5 !== null ? this.state.clientDetail.lblCustomerRemark5 : strings.EmptyData))),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group  col-6" },
                                            React.createElement("label", null, strings.Lbl_CustomerRemark8),
                                            React.createElement("p", null, this.state.clientDetail.lblCustomerRemark8 !== null ? this.state.clientDetail.lblCustomerRemark8 : strings.EmptyData)))),
                                React.createElement("div", { className: "col-md-6 col-lg-6" },
                                    React.createElement("h6", null, strings.Lbl_ItalianInvoiceExtension),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", null,
                                                strings.Lbl_CustomerRemark4,
                                                React.createElement("sub", null, "*")),
                                            React.createElement("input", { id: "tbxCustomerRemark4", maxLength: 255, className: "form-control", type: "text", value: this.state.tbxCustomerRemark4, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark4) !== '' && Utils.TrimData(this.state.tbxCustomerRemark4) !== this.state.clientDetail.lblCustomerRemark4 ? Constants.YELLOW : Constants.WHITE } }),
                                            this.state.errors.tbxCustomerRemark4.length > 0 ? React.createElement("span", null,
                                                " ",
                                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                                React.createElement(Label, { className: "errormessage" },
                                                    this.state.errors.tbxCustomerRemark4,
                                                    " ")) : null),
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", null,
                                                strings.Lbl_CustomerRemark5,
                                                React.createElement("sub", null, "*")),
                                            React.createElement("input", { id: "tbxCustomerRemark5", maxLength: 255, className: "form-control", type: "text", value: this.state.tbxCustomerRemark5, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark5) !== '' && Utils.TrimData(this.state.tbxCustomerRemark5) !== this.state.clientDetail.lblCustomerRemark5 ? Constants.YELLOW : Constants.WHITE } }),
                                            this.state.errors.tbxCustomerRemark5.length > 0 ? React.createElement("span", null,
                                                " ",
                                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                                React.createElement(Label, { className: "errormessage" },
                                                    this.state.errors.tbxCustomerRemark5,
                                                    " ")) : null)),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", null,
                                                strings.Lbl_CustomerRemark8,
                                                React.createElement("sub", null, "*")),
                                            React.createElement("input", { id: "tbxCustomerRemark8", maxLength: 255, className: "form-control", type: "text", value: this.state.tbxCustomerRemark8, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark8) !== '' && Utils.TrimData(this.state.tbxCustomerRemark8) !== this.state.clientDetail.lblCustomerRemark8 ? Constants.YELLOW : Constants.WHITE } }),
                                            this.state.errors.tbxCustomerRemark8.length > 0 ? React.createElement("span", null,
                                                " ",
                                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                                React.createElement(Label, { className: "errormessage" },
                                                    this.state.errors.tbxCustomerRemark8,
                                                    " ")) : null)))))
                        : null,
                    (this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[0] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[1] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[2]) ?
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                                React.createElement("h6", null, strings.Lbl_SaudiSpecificData),
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_CustomerRemark7),
                                        React.createElement("p", null, this.state.clientDetail.lblCustomerRemark7 !== null ? this.state.clientDetail.lblCustomerRemark7 : strings.EmptyData)),
                                    React.createElement("div", { className: "form-group col-sm-6" },
                                        React.createElement("label", null, strings.Lbl_ClientIDType),
                                        React.createElement("p", null, this.state.clientDetail.ClientIDType !== null ? Utils.GetClientIDTypeDescription(this.state.clientDetail.ClientIDType, this.state.dpClientIDType) : strings.EmptyData)))),
                            React.createElement("div", { className: "col-md-7 col-lg-6" },
                                React.createElement("h6", null, strings.Lbl_SaudiSpecificData),
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-sm-6" },
                                        React.createElement("label", null, strings.Lbl_CustomerRemark7),
                                        React.createElement("input", { id: "tbxCustomerRemark7", maxLength: 255, disabled: this.checkIfFieldDisabled("tbxCustomerRemark7"), className: "form-control", type: "text", value: this.state.tbxCustomerRemark7, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark7) !== '' && Utils.TrimData(this.state.tbxCustomerRemark7) !== this.state.clientDetail.lblCustomerRemark7 ? "yellow" : "white" } }),
                                        this.state.errors.tbxCustomerRemark7.length > 0 ? React.createElement("span", null,
                                            " ",
                                            React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                            React.createElement(Label, { className: "errormessage" },
                                                this.state.errors.tbxCustomerRemark7,
                                                " ")) : null),
                                    React.createElement("div", { className: "form-group col-sm-6" },
                                        React.createElement("label", { className: 'defaultTaxCodelbl' }, strings.Lbl_ClientIDType),
                                        React.createElement(Dropdown, { id: "dpClientIDType", className: "defaultTaxCode", disabled: this.checkIfFieldDisabled("dpClientIDType"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpClientIDType.value, options: this.state.dpClientIDType.options, onChange: this._OnDropDownChange.bind(this) }),
                                        this.state.errors.dpDefaultTaxCode.length > 0 ? React.createElement("span", null,
                                            " ",
                                            React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                            React.createElement(Label, { className: "errormessage" },
                                                this.state.errors.dpClientIDType,
                                                " ")) : null)))) : null),
                React.createElement(CardFooter, __assign({}, this.props, { backBtnMethod: this._BackClick.bind(this), nextBtnMethod: this._NextClick.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this) })))));
    };
    Section3.prototype.checkIfFieldDisabled = function (tagID) {
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
    //rutvik test changes	
    Section3.prototype.BindDefaultTaxCode = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var i, tempStateObj, options, tempObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < Constants.MASTER_DROPDOWNS.length)) return [3 /*break*/, 6];
                        if (!(Constants.MASTER_DROPDOWNS[i].name === "Default Tax code")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.setState({ dpDefaultTaxCode: { value: '', options: [] } })];
                    case 2:
                        _a.sent();
                        tempStateObj = {};
                        return [4 /*yield*/, Utils.GetMasterListItemsForDefaultTaxCode(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS[i].name)];
                    case 3:
                        options = _a.sent();
                        tempObj = this.state[Constants.MASTER_DROPDOWNS[i].key];
                        tempObj.options = options;
                        tempObj.value = value;
                        tempStateObj[Constants.MASTER_DROPDOWNS[i].key] = options.length > 0 ? tempObj : [];
                        return [4 /*yield*/, this.setState({
                                dpDefaultTaxCode: {
                                    options: tempObj["options"],
                                    value: tempObj["value"]
                                }
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //end
    Section3.prototype.DropDownColorChange = function () {
        /// <summary>Set dropdown highlight color by comparing values.</summary>
        document.querySelector('#dpDefaultTaxCode') !== null ? document.querySelector('#dpDefaultTaxCode').querySelector("#dpDefaultTaxCode > span").style.backgroundColor = Utils.TrimData(this.state.dpDefaultTaxCode.value) !== '' && Utils.TrimData(this.state.dpDefaultTaxCode.value) !== Utils.TrimData(this.state.clientDetail.lblDefaultTaxCode) ? Constants.YELLOW : Constants.WHITE : null;
        document.querySelector('#dpPaymentTerms') !== null ? document.querySelector('#dpPaymentTerms').querySelector("#dpPaymentTerms > span").style.backgroundColor = Utils.TrimData(this.state.dpPaymentTerms.value) !== '' && Utils.TrimData(this.state.dpPaymentTerms.value) !== Utils.TrimData(this.state.clientDetail.lblPaymentTerms) ? Constants.YELLOW : Constants.WHITE : null;
        document.querySelector('#dpWithholdingTaxType') !== null ? document.querySelector('#dpWithholdingTaxType').querySelector("#dpWithholdingTaxType > span").style.backgroundColor = Utils.TrimData(this.state.dpWithholdingTaxType.value) !== Utils.TrimData(this.state.clientDetail.lblWithholdingTaxType) ? Constants.YELLOW : Constants.WHITE : null;
        document.querySelector('#dpEmirate') !== null ? document.querySelector('#dpEmirate').querySelector("#dpEmirate > span").style.backgroundColor = Utils.TrimData(this.state.dpEmirate.value) !== Utils.TrimData(this.state.clientDetail.lblEmirate) ? Constants.YELLOW : Constants.WHITE : null;
        document.querySelector('#dpClientIDType') !== null ? document.querySelector('#dpClientIDType').querySelector("#dpClientIDType > span").style.backgroundColor = Utils.TrimData(this.state.dpClientIDType.value) !== '' && Utils.TrimData(this.state.dpClientIDType.value) !== Utils.TrimData(this.state.clientDetail.lblClientIDType) ? Constants.YELLOW : Constants.WHITE : null; //Shraddha test 7
        document.querySelector('#dpGSTRegistrationType') !== null ? document.querySelector('#dpGSTRegistrationType').querySelector("#dpGSTRegistrationType > span").style.backgroundColor = Utils.TrimData(this.state.dpGSTRegistrationType.value) !== Utils.TrimData(this.state.clientDetail.lblGSTRegistrationType) ? Constants.YELLOW : Constants.WHITE : null;
        if (this.state.dpPlaceofSupply.value !== null) {
            document.querySelector('#dpPlaceofSupply') !== null ? document.querySelector('#dpPlaceofSupply').querySelector("#dpPlaceofSupply > span").style.backgroundColor = Utils.TrimData(this.state.dpPlaceofSupply.value) !== Utils.TrimData(this.state.clientDetail.lblPlaceofSupply) ? Constants.YELLOW : Constants.WHITE : null;
        }
    };
    Section3.prototype.BindData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempStateObj, i, options, tempObj, tempoptions, tempoptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempStateObj = {};
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < Constants.MASTER_DROPDOWNS.length)) return [3 /*break*/, 7];
                        options = [];
                        if (!Constants.MASTER_DROPDOWNS[i].required) {
                            options.push({ key: '', text: '' });
                        }
                        tempObj = this.state[Constants.MASTER_DROPDOWNS[i].key];
                        if (!(Constants.MASTER_DROPDOWNS[i].name === "Default Tax code")) return [3 /*break*/, 3];
                        return [4 /*yield*/, Utils.GetMasterListItemsForDefaultTaxCode(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS[i].name)];
                    case 2:
                        tempoptions = _a.sent();
                        options.push.apply(options, tempoptions);
                        tempObj.options = options;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, Utils.GetMasterListItems(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS[i].name)];
                    case 4:
                        tempoptions = _a.sent();
                        options.push.apply(options, tempoptions);
                        tempObj.options = options;
                        _a.label = 5;
                    case 5:
                        options.length > 0 ? tempStateObj[Constants.MASTER_DROPDOWNS[i].key] = tempObj : [];
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
    Section3.prototype._OnDropDownChange = function (event, item) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, countryObj, errors;
            return __generator(this, function (_b) {
                countryObj = this.state[event.target.id];
                countryObj.value = item.text;
                this.setState(__assign({}, this.state, (_a = {}, _a[event.target.id] = countryObj, _a)));
                errors = this.state.errors;
                if (event.target.id === "dpDefaultTaxCode")
                    errors.dpDefaultTaxCode = '';
                if (event.target.id === "dpPaymentTerms")
                    errors.dpPaymentTerms = '';
                this.setState({ errors: errors });
                return [2 /*return*/];
            });
        });
    };
    Section3.prototype._onTbxChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, id, value, errors;
            return __generator(this, function (_c) {
                /// <summary>On texbox value change set value into state property.</summary>
                event.preventDefault();
                _b = event.target, id = _b.id, value = _b.value;
                this.setState(__assign({}, this.state, (_a = {}, _a[id] = value, _a)));
                errors = this.state.errors;
                if (id === "tbxCustomerRemark4")
                    errors.tbxCustomerRemark4 = '';
                if (id === "tbxCustomerRemark5")
                    errors.tbxCustomerRemark5 = '';
                if (id === "tbxCustomerRemark8")
                    errors.tbxCustomerRemark8 = '';
                this.setState({ errors: errors });
                return [2 /*return*/];
            });
        });
    };
    Section3.prototype.ValidateSection3 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errors, i, valid;
            return __generator(this, function (_a) {
                errors = this.state.errors;
                //rutvik 12-7 24
                if (this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY) {
                    errors.tbxCustomerRemark4 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark4) === false) ? strings.CantLeaveBlankMsg : "";
                    errors.tbxCustomerRemark5 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark5) === false) ? strings.CantLeaveBlankMsg : "";
                    errors.tbxCustomerRemark8 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark8) === false) ? strings.CantLeaveBlankMsg : ""; //Shraddha test 8
                }
                else {
                    errors.tbxCustomerRemark4 = "";
                    errors.tbxCustomerRemark5 = "";
                    errors.tbxCustomerRemark8 = "";
                }
                //endr
                for (i = 0; i < 2; i++) {
                    errors[Constants.MASTER_DROPDOWNS[i].key] = (Utils.CheckRequiredField(this.state[Constants.MASTER_DROPDOWNS[i].key].value) === false) ? strings.CantLeaveBlankMsg : "";
                }
                this.setState({ errors: errors });
                valid = true;
                Object.keys(errors).forEach(function (key) { errors[key].length > 0 ? valid = false : null; });
                return [2 /*return*/, valid];
            });
        });
    };
    Section3.prototype._BackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /// <summary>Back button click event.</summary>
                    return [4 /*yield*/, this.props.dataChange("section3Data", this.state)];
                    case 1:
                        /// <summary>Back button click event.</summary>
                        _a.sent();
                        return [4 /*yield*/, this.props.dataChange("macAccountId", this.props.selectedClient)];
                    case 2:
                        _a.sent();
                        this.props.backStep();
                        return [2 /*return*/];
                }
            });
        });
    };
    Section3.prototype._NextClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Next button click event.</summary>
                        this.setState({ loading: true }); //9-2-23
                        return [4 /*yield*/, this.SaveDataOperation()];
                    case 1:
                        if (_a.sent()) {
                            this.requestJson = {
                                ClientAttentionName: Utils.TrimData(this.props.section2Data.tbxClientAttentionName),
                                Email: Utils.TrimData(this.props.section2Data.tbxEmail),
                                PhoneNo: Utils.TrimData(this.props.section2Data.tbxPhoneNo),
                                DefaultTaxCode: this.state.dpDefaultTaxCode.value,
                                PaymentTerms: this.state.dpPaymentTerms.value,
                                WithholdingTaxType: this.state.dpWithholdingTaxType.value,
                                Emirate: this.state.dpEmirate.value,
                                PlaceofSupply: Utils.CheckRequiredField(this.state.dpPlaceofSupply.value) === false ?
                                    this.state.dpPlaceofSupply.value : this.state.dpPlaceofSupply.value.split('-')[0].trim(),
                                GSTRegistrationType: this.state.dpGSTRegistrationType.value,
                                CIN: Utils.TrimData(this.state.tbxCIN),
                                TDSTaxRate: Utils.TrimData(this.state.tbxTDSTaxRate),
                                CustomerRemark4: Utils.TrimData(this.state.tbxCustomerRemark4),
                                CustomerRemark5: Utils.TrimData(this.state.tbxCustomerRemark5),
                                CustomerRemark8: Utils.TrimData(this.state.tbxCustomerRemark8),
                                CustomerRemark7: Utils.TrimData(this.state.tbxCustomerRemark7),
                                ClientIDType: this.state.dpClientIDType.value
                            },
                                this.clientJson = {
                                    ClientAttentionName: Utils.TrimData(this.props.section2Data.clientDetail["lblClientAttentionName"]),
                                    Email: Utils.TrimData(this.props.section2Data.clientDetail["lblEmail"]),
                                    PhoneNo: Utils.TrimData(this.props.section2Data.clientDetail["lblPhoneNo"]),
                                    DefaultTaxCode: Utils.TrimData(this.props.section2Data.clientDetail["lblDefaultTaxCode"]),
                                    PaymentTerms: Utils.TrimData(this.props.section2Data.clientDetail["lblPaymentTerms"]),
                                    WithholdingTaxType: Utils.TrimData(this.props.section2Data.clientDetail["lblWithholdingTaxType"]),
                                    Emirate: Utils.TrimData(this.props.section2Data.clientDetail["lblEmirate"]),
                                    PlaceofSupply: Utils.TrimData(this.props.section2Data.clientDetail["lblPlaceofSupply"]),
                                    GSTRegistrationType: Utils.TrimData(this.props.section2Data.clientDetail["lblGSTRegistrationType"]),
                                    CIN: Utils.TrimData(this.props.section2Data.clientDetail["lblCIN"]),
                                    TDSTaxRate: Utils.TrimData(this.props.section2Data.clientDetail["lblTDSTaxRate"]),
                                    MaconomyAccountID: this.props.section2Data.clientDetail["lblMaconomyAccountID"],
                                    //rutvik 12-7 24
                                    CustomerRemark4: Utils.TrimData(this.props.section2Data.clientDetail["lblCustomerRemark4"]),
                                    CustomerRemark5: Utils.TrimData(this.props.section2Data.clientDetail["lblCustomerRemark5"]),
                                    //endr
                                    CustomerRemark8: Utils.TrimData(this.props.section2Data.clientDetail["lblCustomerRemark8"]),
                                    CustomerRemark7: Utils.TrimData(this.props.section2Data.clientDetail["lblCustomerRemark7"]),
                                    ClientIDType: Utils.GetClientIDTypeDescription(this.props.section2Data.clientDetail["lblClientIDType"], this.state.dpClientIDType),
                                };
                            this.setState({ loading: false }, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.props.dataChange("section3Data", this.state)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.dataChange("requestJson", this.requestJson)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.dataChange("clientJson", this.clientJson)];
                                        case 3:
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
                        return [2 /*return*/];
                }
            });
        });
    };
    Section3.prototype._SaveForLaterClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Save for later button click event.</summary>
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
    Section3.prototype.SaveData = function () {
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
                            WithholdingTaxType: this.state.dpWithholdingTaxType.value,
                            Emirate: this.state.dpEmirate.value,
                            PlaceofSupply: this.state.dpPlaceofSupply.value,
                            GSTRegistrationType: this.state.dpGSTRegistrationType.value,
                            CIN: Utils.TrimData(this.state.tbxCIN),
                            TDSTaxRate: Utils.TrimData(this.state.tbxTDSTaxRate),
                            //rutvik 12-7 24
                            CustomerRemark4: Utils.TrimData(this.state.tbxCustomerRemark4),
                            CustomerRemark5: Utils.TrimData(this.state.tbxCustomerRemark5),
                            //endr
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
                        console.log("Save Data--->", error_2);
                        errordata = {
                            Title: new Date(),
                            Errors: error_2,
                            RequestID: this.props.itemID
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata)];
                    case 4:
                        _a.sent();
                        //error log change end
                        this.setState({ loading: false });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Section3.prototype.SaveDataOperation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ValidateSection3()];
                    case 1:
                        /// <summary>Validate and save data operations.</summary>
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
    Section3.prototype.SetTextBoxValue = function () {
        var _this = this;
        /// <summary>set text box values from maconomy data.</summary>
        var placeOfSupplyValue = this.props.section2Data.clientDetail["lblPlaceofSupply"];
        if (this.props.section2Data.clientDetail["lblPlaceofSupply"] !== null) {
            placeOfSupplyValue = this.state.dpPlaceofSupply.options.filter(function (e) { return e.text.split('-')[0].trim().toLowerCase() === _this.props.section2Data.clientDetail["lblPlaceofSupply"]; })[0].text;
        }
        this.setState({
            dpDefaultTaxCode: Utils.GetDropdownStateValueDefaultTaxCode(this.props.section2Data.clientDetail["lblDefaultTaxCode"], this.state.dpDefaultTaxCode),
            dpPaymentTerms: Utils.GetDropdownStateValue(this.props.section2Data.clientDetail["lblPaymentTerms"], this.state.dpPaymentTerms),
            dpWithholdingTaxType: Utils.GetDropdownStateValue(this.props.section2Data.clientDetail["lblWithholdingTaxType"], this.state.dpWithholdingTaxType),
            dpEmirate: Utils.GetDropdownStateValue(this.props.section2Data.clientDetail["lblEmirate"], this.state.dpEmirate),
            dpPlaceofSupply: Utils.GetDropdownStateValue(placeOfSupplyValue, this.state.dpPlaceofSupply),
            dpGSTRegistrationType: Utils.GetDropdownStateValue(this.props.section2Data.clientDetail["lblGSTRegistrationType"], this.state.dpGSTRegistrationType),
            tbxCIN: this.props.section2Data.clientDetail["lblCIN"],
            tbxTDSTaxRate: this.props.section2Data.clientDetail["lblTDSTaxRate"],
            //rutvik 12-7 24
            tbxCustomerRemark4: this.props.section2Data.clientDetail["lblCustomerRemark4"],
            tbxCustomerRemark5: this.props.section2Data.clientDetail["lblCustomerRemark5"],
            //endr
            tbxCustomerRemark8: this.props.section2Data.clientDetail["lblCustomerRemark8"],
            tbxCustomerRemark7: this.props.section2Data.clientDetail["lblCustomerRemark7"],
            dpClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.section2Data.clientDetail["lblClientIDType"], this.state.dpClientIDType),
        });
    };
    return Section3;
}(React.Component));
export default Section3;
//# sourceMappingURL=Section3.js.map