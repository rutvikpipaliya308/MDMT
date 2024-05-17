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
import { Web } from 'sp-pnp-js';
import * as Constants from '../../../Constants';
import * as Utils from '../../Utils';
import { Dropdown, Icon, Label } from 'office-ui-fabric-react';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
var Section2 = /** @class */ (function (_super) {
    __extends(Section2, _super);
    //private requestJson: any = null;
    //private clientJson: any = null;
    function Section2(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.state = {
            loading: true,
            clientDetail: '',
            lblSocialName: '',
            lblLegalName: '',
            lblLine1: '',
            lblLine2: '',
            lblZipCode: '',
            lblPostal: '',
            lblCountyArea: '',
            lblCompanyRegNo: '',
            lblCountry: '',
            lblCurrency: '',
            lblTaxRegistrationNo: '',
            lblDefaultTaxCode: '',
            lblCompany: '',
            lblEmail: '',
            lblPhoneNo: '',
            lblCIN: '',
            lblPaymentTerms: '',
            lblWithHoldingTax: '',
            lblEmirate: '',
            lblPlaceOfSupply: '',
            lblGSTRegType: '',
            lblAccessLevel: '',
            lblClientAttentionName: '',
            lblInstruction: '',
            lblDeliverymethod: '',
            lblSector: '',
            lblClientStatus: '',
            lblClientType: '',
            lblParentClient: '',
            lblCustomerRemark4: '',
            lblCustomerRemark5: '',
            lblCustomerRemark7: '',
            lblCustomerRemark8: '',
            lblClientIDType: '',
            //rutvik employee dp change 3-3-23
            lblClientLead: '',
            lblCommercialManager: '',
            lblBiller: '',
            lblProjectAnalyst: '',
            lblResourceManager: '',
            dpClientIDType: { value: '', options: [] },
            dpCurrency: { value: '', options: [] },
            tbxCompanyRegistrationNumber: '',
            dpSector: { value: '', options: [] },
            dpClientType: { value: '', options: [] },
            requestor: '',
            currentUserid: '',
            requestorid: '',
            errors: {
                dpCurrency: '',
                selectedClient: '',
                tbxCompanyRegistrationNumber: '',
                clientRecordInProgress: ''
            },
            itemID: 0
        };
        return _this;
    }
    Section2.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /// <summary>Bind data for read only and edit mode.</summary>		
                    return [4 /*yield*/, this.BindData()];
                    case 1:
                        /// <summary>Bind data for read only and edit mode.</summary>		
                        _a.sent(); //rutvik change
                        return [4 /*yield*/, this.GetClient()];
                    case 2:
                        _a.sent();
                        //shraddha test 7
                        return [4 /*yield*/, this.getClientIDTypeOptions()];
                    case 3:
                        //shraddha test 7
                        _a.sent();
                        if (!(this.props.data === null || this.props.data === undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.BindData()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(this.props.listData !== null)) return [3 /*break*/, 9];
                        if (!(this.props.listData.Title !== null)) return [3 /*break*/, 6];
                        if (this.state.lblSocialName !== this.props.data["Title"]) {
                        }
                        else {
                            this.setState({
                                dpCurrency: Utils.GetDropdownStateValue(this.props.listData.Currency === null ? this.props.listData.Currency : this.props.listData.Currency.toUpperCase(), this.state.dpCurrency),
                                tbxCompanyRegistrationNumber: this.props.listData.CompanyRegistrationNo,
                            });
                        }
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.SetTextboxValue()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.SetTextboxValue()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (this.props.data !== null && this.props.data !== undefined) {
                            if (this.state.lblSocialName !== this.props.data["lblSocialName"]) {
                            }
                            else {
                                if (this.props.data !== null && this.props.data !== undefined) {
                                    this.setState(__assign({}, this.props.data));
                                }
                            }
                        }
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    //shraddha test 7
    Section2.prototype.getClientIDTypeOptions = function () {
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
    Section2.prototype.render = function () {
        //document.querySelector('#dpCountry') !== null ? ((document.querySelector('#dpCountry') as HTMLElement).querySelector(`#dpCountry > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpCountry.value) !== '' && Utils.TrimData(this.state.dpCountry.value) !== this.state.clientDetail.lblCountry ? "yellow" : "white" : null;
        document.querySelector('#dpCurrency') !== null ? document.querySelector('#dpCurrency').querySelector("#dpCurrency > span").style.backgroundColor = Utils.TrimData(this.state.dpCurrency.value) !== '' && Utils.TrimData(this.state.dpCurrency.value) !== this.state.lblCurrency ? "yellow" : "white" : null;
        //document.querySelector('#dpClientIDType') !== null ? ((document.querySelector('#dpClientIDType') as HTMLElement).querySelector(`#dpClientIDType > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientIDType.value) !== '' && Utils.TrimData(this.state.dpClientIDType.value) !== Utils.TrimData(this.state.clientDetail.lblClientIDType) ? Constants.YELLOW : Constants.WHITE : null;//Shraddha test 7
        //document.querySelector('#dpCountry') !== null ? ((document.querySelector('#dpCountry') as HTMLElement).querySelector(`#dpCountry > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpCountry.value) !== '' && Utils.TrimData(this.state.dpCountry.value) !== this.state.clientDetail.lblCountry ? "yellow" : "white" : null;
        //document.querySelector('#dpSector') !== null ? ((document.querySelector('#dpSector') as HTMLElement).querySelector(`#dpSector > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpSector.value) !== '' && Utils.TrimData(this.state.dpSector.value) !== this.state.clientDetail.lblSector ? "yellow" : "white" : null;
        //document.querySelector('#dpClientStatus') !== null ? ((document.querySelector('#dpClientStatus') as HTMLElement).querySelector(`#dpClientStatus > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientStatus.value) !== '' && Utils.TrimData(this.state.dpClientStatus.value) !== this.state.clientDetail.lblClientStatus ? "yellow" : "white" : null;
        //document.querySelector('#dpClientType') !== null ? ((document.querySelector('#dpClientType') as HTMLElement).querySelector(`#dpClientType > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientType.value) !== '' && Utils.TrimData(this.state.dpClientType.value) !== this.state.clientDetail.lblClientType ? "yellow" : "white" : null;
        return (React.createElement("div", { className: "container-xl", style: { position: "relative" } },
            React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
            React.createElement("div", { className: "card-primary" },
                React.createElement("div", { className: "card-header" },
                    React.createElement("h3", { className: "" }, strings.UpdateFields_Title)),
                React.createElement("div", { className: "card-body" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("h6", null, strings.Lbl_Name),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_SocialName),
                                    React.createElement("p", null, this.state.lblSocialName !== null ? this.state.lblSocialName : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_LegalName),
                                    React.createElement("p", null, this.state.lblLegalName !== null ? this.state.lblLegalName : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" })),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("h6", null, strings.Lbl_Address),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Line1),
                                    React.createElement("p", null, this.state.lblLine1 !== null ? this.state.lblLine1 : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Line2),
                                    React.createElement("p", null, this.state.lblLine2 !== null ? this.state.lblLine2 : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" })),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_ZipCode),
                                    React.createElement("p", null, this.state.lblZipCode !== null ? this.state.lblZipCode : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Postal),
                                    React.createElement("p", null, this.state.lblPostal !== null ? this.state.lblPostal : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" })),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_CountryArea),
                                    React.createElement("p", null, this.state.lblCountyArea !== null ? this.state.lblCountyArea : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Country),
                                    React.createElement("p", null, this.state.lblCountry !== null ? this.state.lblCountry : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" })),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("h6", null, strings.Lbl_GeneralInfo),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Currency),
                                    React.createElement("p", null, this.state.lblCurrency !== null ? this.state.lblCurrency : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_CompanyRegNo),
                                    React.createElement("p", null, this.state.lblCompanyRegNo !== null ? this.state.lblCompanyRegNo : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Sector),
                                    React.createElement("p", null, this.state.lblSector !== null ? this.state.lblSector : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_ClientType),
                                    React.createElement("p", null, this.state.lblClientType !== null ? this.state.lblClientType : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" },
                            React.createElement("h6", null, strings.Lbl_GeneralInfo),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_Currency,
                                        React.createElement("sub", null, "*")),
                                    React.createElement(Dropdown, { id: "dpCurrency", disabled: this.checkIfFieldDisabled("dpCurrency"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpCurrency.value, options: this.state.dpCurrency.options, onChange: this._onDropDownChange.bind(this) }),
                                    this.state.errors.dpCurrency.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.dpCurrency,
                                            " ")) : null),
                                this.state.lblCompanyRegNo == "" ?
                                    React.createElement("div", { className: "form-group col-sm-6" },
                                        React.createElement("label", null,
                                            strings.Lbl_CompanyRegNo,
                                            React.createElement("sub", null, "*")),
                                        React.createElement("input", { id: "tbxCompanyRegistrationNumber", disabled: this.checkIfFieldDisabled("tbxCompanyRegistrationNumber"), maxLength: 255, className: "form-control", type: "email", style: { backgroundColor: (Utils.TrimData(this.state.tbxCompanyRegistrationNumber) !== Utils.TrimData(this.state.lblCompanyRegNo)) ? Constants.YELLOW : Constants.WHITE }, value: this.state.tbxCompanyRegistrationNumber, onChange: this._onTbxChange.bind(this), placeholder: "" }),
                                        this.state.errors.tbxCompanyRegistrationNumber.length > 0 ? React.createElement("span", null,
                                            " ",
                                            React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                            React.createElement(Label, { className: "errormessage" },
                                                this.state.errors.tbxCompanyRegistrationNumber,
                                                " ")) : null) : ""))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("h6", null, strings.Lbl_TaxInformation),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_TaxRegNo),
                                    React.createElement("p", null, this.state.lblTaxRegistrationNo !== null ? this.state.lblTaxRegistrationNo : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" })),
                    parseInt(this.props.approvalData.company.split('-')[0].trim()) === parseInt(Constants.ITALIAN_COMPANY) ?
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                                React.createElement("h6", null, strings.Lbl_ItalianInvoiceExtension),
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_CustomerRemark4),
                                        React.createElement("p", null, this.state.lblCustomerRemark4 !== null ? this.state.lblCustomerRemark4 : strings.EmptyData)),
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_CustomerRemark5),
                                        React.createElement("p", null, this.state.lblCustomerRemark5 !== null ? this.state.lblCustomerRemark5 : strings.EmptyData))),
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_CustomerRemark8),
                                        React.createElement("p", null, this.state.lblCustomerRemark8 !== null ? this.state.lblCustomerRemark8 : strings.EmptyData)))),
                            React.createElement("div", { className: "col-md-7 col-lg-6" })) : null,
                    (parseInt(this.props.approvalData.company.split('-')[0].trim()) === parseInt(Constants.SAUDI_COMPANY[0]) || parseInt(this.props.approvalData.company.split('-')[0].trim()) === parseInt(Constants.SAUDI_COMPANY[1]) || parseInt(this.props.approvalData.company.split('-')[0].trim()) === parseInt(Constants.SAUDI_COMPANY[2])) ?
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                                React.createElement("h6", null, strings.Lbl_SaudiSpecificData),
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_CustomerRemark7),
                                        React.createElement("p", null, this.state.clientDetail.lblCustomerRemark7 !== null ? this.state.clientDetail.lblCustomerRemark7 : strings.EmptyData)),
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_ClientIDType),
                                        React.createElement("p", null, this.state.clientDetail.ClientIDType !== null ? Utils.GetClientIDTypeDescription(this.state.clientDetail.ClientIDType, this.state.dpClientIDType) : strings.EmptyData)))),
                            React.createElement("div", { className: "col-md-7 col-lg-6" })) : null),
                this.state.errors.clientRecordInProgress.length > 0 ? React.createElement("span", null,
                    " ",
                    React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                    React.createElement(Label, { className: "errormessage text-left" },
                        this.state.errors.clientRecordInProgress,
                        " ")) : null,
                this.state.errors.selectedClient.length > 0 ? React.createElement("span", null,
                    " ",
                    React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                    React.createElement(Label, { className: "errormessage text-left" },
                        this.state.errors.selectedClient,
                        " ")) : null,
                React.createElement(CardFooter, __assign({}, this.props, { backBtnMethod: this._BackClick.bind(this), nextBtnMethod: this._NextClick.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this) })))));
    };
    Section2.prototype.checkIfFieldDisabled = function (tagID) {
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
    Section2.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentUserID, requestoridd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.forceUpdate();
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
    Section2.prototype._onTbxChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, id, value, errors;
            return __generator(this, function (_c) {
                /// <summary>On texbox value change set value into state property.</summary>
                event.preventDefault();
                _b = event.target, id = _b.id, value = _b.value;
                this.setState(__assign({}, this.state, (_a = {}, _a[id] = value, _a)));
                errors = this.state.errors;
                if (id === "tbxCompanyRegistrationNumber")
                    errors.tbxCompanyRegistrationNumber = '';
                this.setState({ errors: errors });
                return [2 /*return*/];
            });
        });
    };
    Section2.prototype.BindData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempStateObj, i, options, tempObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempStateObj = {};
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < Constants.MASTER_DROPDOWNS_REQ13.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Utils.GetMasterListItems(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS_REQ13[i].name)];
                    case 2:
                        options = _a.sent();
                        tempObj = this.state[Constants.MASTER_DROPDOWNS_REQ13[i].key];
                        tempObj.options = options;
                        options.length > 0 ? tempStateObj[Constants.MASTER_DROPDOWNS_REQ13[i].key] = tempObj : [];
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype._onDropDownChange = function (event, item) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tempObj, errors;
            return __generator(this, function (_b) {
                /// <summary>On DropDown change set state property of dropdown.</summary>
                try {
                    tempObj = this.state[event.target.id];
                    tempObj.value = item.text;
                    this.setState(__assign({}, this.state, (_a = {}, _a[event.target.id] = tempObj, _a)));
                    errors = this.state.errors;
                    if (event.target.id === "dpCurrency")
                        errors.dpCurrency = '';
                    this.setState({ errors: errors });
                    //end			
                }
                catch (error) {
                    console.log("OnCompany change", error);
                }
                return [2 /*return*/];
            });
        });
    };
    Section2.prototype.GetClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, tempItems, tempArray_1, item, isListDataExists, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = this.props.selectedClientData;
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
                            if ((item.CustomerType == "legal client") && isAccessLevelPresent && item.MaconomyAccountID === _this.props.approvalData.maconomyAccountID) {
                                tempArray_1.push(item);
                            }
                        });
                        item = tempArray_1[0];
                        if (item !== null && item !== undefined) {
                            isListDataExists = false;
                            if (this.props.listData !== null && this.props.listData !== undefined) {
                                if (this.props.listData["MaconomyAccountID"].toLocaleLowerCase() == this.props.approvalData.maconomyAccountID.toLocaleLowerCase()) {
                                    isListDataExists = true;
                                    //this.state.dpCurrency.value = this.props.listData["Currency"];
                                }
                            }
                            if (isListDataExists) {
                                this.setState({
                                    lblSocialName: Utils.TrimData(item["Title"]),
                                    lblLegalName: Utils.TrimData(item["LegalName"]),
                                    lblLine1: Utils.TrimData(item["Line1"]),
                                    lblLine2: Utils.TrimData(item["Line2"]),
                                    lblZipCode: Utils.TrimData(item["Zipcode"]),
                                    lblPostal: Utils.TrimData(item["Postal_District_City"]),
                                    lblCountyArea: Utils.TrimData(item["Country_Area_Region"]),
                                    lblCountry: Utils.TrimData(item["Country"]),
                                    lblCompanyRegNo: Utils.TrimData(item["CompanyRegistrationNo"]),
                                    lblCurrency: Utils.TrimData(item["Currency"]),
                                    lblTaxRegistrationNo: Utils.TrimData(item["TaxRegistrationNo"]),
                                    lblDefaultTaxCode: Utils.TrimData(item["DefaultTaxCode"]),
                                    lblCompany: this.props.approvalData.company,
                                    lblEmail: Utils.TrimData(item["Email"]),
                                    lblPhoneNo: Utils.TrimData(item["PhoneNo"]),
                                    lblCIN: Utils.TrimData(item["CIN"]),
                                    lblPaymentTerms: Utils.TrimData(item["PaymentTerms"]),
                                    lblWithHoldingTax: Utils.TrimData(item["WithholdingTaxType"]),
                                    lblEmirate: Utils.TrimData(item["Emirate"]),
                                    lblPlaceOfSupply: Utils.TrimData(item["PlaceofSupply"]),
                                    lblGSTRegType: Utils.TrimData(item["GSTRegistrationType"]),
                                    lblAccessLevel: Utils.TrimData(item["AccessLevel"]),
                                    lblClientAttentionName: Utils.TrimData(item["ClientAttentionName"]),
                                    lblInstruction: Utils.TrimData(item["Instructions"]),
                                    lblDeliverymethod: Utils.TrimData(item["DeliveryMethod"]),
                                    lblSector: Utils.TrimData(item["Sector"]),
                                    lblClientStatus: Utils.TrimData(item["ClientStatus"]),
                                    lblClientType: Utils.TrimData(item["ClientType"]),
                                    lblParentClient: Utils.TrimData(item["ParentClient"]),
                                    lblCustomerRemark4: Utils.TrimData(item["CustomerRemark4"]),
                                    lblCustomerRemark5: Utils.TrimData(item["CustomerRemark5"]),
                                    tbxCompanyRegistrationNumber: this.props.listData["CompanyRegistrationNo"],
                                    lblClientIDType: Utils.GetClientIDTypeDescription(item["ClientIDType"], this.state.dpClientIDType),
                                    lblCustomerRemark8: Utils.TrimData(item["CustomerRemark8"]),
                                    lblCustomerRemark7: Utils.TrimData(item["CustomerRemark7"]),
                                    //rutvik employee dp change 3-3-23
                                    lblClientLead: Utils.TrimData(item["ClientLead"]),
                                    lblCommercialManager: Utils.TrimData(item["CommercialManager"]),
                                    lblBiller: Utils.TrimData(item["Biller"]),
                                    lblProjectAnalyst: Utils.TrimData(item["ProjectAnalyst"]),
                                    lblResourceManager: Utils.TrimData(item["ResourceManager"]),
                                });
                                this.state.dpCurrency.value = this.props.listData["Currency"];
                            }
                            else {
                                this.setClientValue(item);
                            }
                            item = null;
                            tempArray_1 = [];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log("ClientData--->", error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype.setClientValue = function (item) {
        this.setState({
            lblSocialName: Utils.TrimData(item["Title"]),
            lblLegalName: Utils.TrimData(item["LegalName"]),
            lblLine1: Utils.TrimData(item["Line1"]),
            lblLine2: Utils.TrimData(item["Line2"]),
            lblZipCode: Utils.TrimData(item["Zipcode"]),
            lblPostal: Utils.TrimData(item["Postal_District_City"]),
            lblCountyArea: Utils.TrimData(item["Country_Area_Region"]),
            lblCountry: Utils.TrimData(item["Country"]),
            lblCompanyRegNo: Utils.TrimData(item["CompanyRegistrationNo"]),
            lblCurrency: Utils.TrimData(item["Currency"]),
            lblTaxRegistrationNo: Utils.TrimData(item["TaxRegistrationNo"]),
            lblDefaultTaxCode: Utils.TrimData(item["DefaultTaxCode"]),
            lblCompany: this.props.approvalData.company,
            lblEmail: Utils.TrimData(item["Email"]),
            lblPhoneNo: Utils.TrimData(item["PhoneNo"]),
            lblCIN: Utils.TrimData(item["CIN"]),
            lblPaymentTerms: Utils.TrimData(item["PaymentTerms"]),
            lblWithHoldingTax: Utils.TrimData(item["WithholdingTaxType"]),
            lblEmirate: Utils.TrimData(item["Emirate"]),
            lblPlaceOfSupply: Utils.TrimData(item["PlaceofSupply"]),
            lblGSTRegType: Utils.TrimData(item["GSTRegistrationType"]),
            lblAccessLevel: Utils.TrimData(item["AccessLevel"]),
            lblClientAttentionName: Utils.TrimData(item["ClientAttentionName"]),
            lblInstruction: Utils.TrimData(item["Instructions"]),
            lblDeliverymethod: Utils.TrimData(item["DeliveryMethod"]),
            lblSector: Utils.TrimData(item["Sector"]),
            lblClientStatus: Utils.TrimData(item["ClientStatus"]),
            lblClientType: Utils.TrimData(item["ClientType"]),
            lblParentClient: Utils.TrimData(item["ParentClient"]),
            lblCustomerRemark4: Utils.TrimData(item["CustomerRemark4"]),
            lblCustomerRemark5: Utils.TrimData(item["CustomerRemark5"]),
            tbxCompanyRegistrationNumber: Utils.TrimData(item["CompanyRegistrationNo"]),
            lblCustomerRemark8: Utils.TrimData(item["CustomerRemark8"]),
            lblCustomerRemark7: Utils.TrimData(item["CustomerRemark7"]),
            lblClientIDType: Utils.GetClientIDTypeDescription(item["ClientIDType"], this.state.dpClientIDType),
            //rutvik employee dp change 3-3-23
            lblClientLead: Utils.TrimData(item["ClientLead"]),
            lblCommercialManager: Utils.TrimData(item["CommercialManager"]),
            lblBiller: Utils.TrimData(item["Biller"]),
            lblProjectAnalyst: Utils.TrimData(item["ProjectAnalyst"]),
            lblResourceManager: Utils.TrimData(item["ResourceManager"]),
            dpCurrency: Utils.GetDropdownStateValue(Utils.GetSelectedDropdownValue(Utils.TrimData(item["Currency"]), this.state.dpCurrency), this.state.dpCurrency),
        });
    };
    Section2.prototype._BackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /// <summary>Back button click event.</summary>
                    return [4 /*yield*/, this.props.dataChange("section2Data", this.state)];
                    case 1:
                        /// <summary>Back button click event.</summary>
                        _a.sent(); //rutvik change
                        this.props.backStep();
                        return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype._NextClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Next button click event.</summary>
                        this.setState({ loading: true }); //9-2-23
                        return [4 /*yield*/, this.saveDataOperation()];
                    case 1:
                        if (_a.sent()) {
                            // this.clientJson = {
                            // 	SocialName: Utils.TrimData(this.state.clientDetail.lblSocialName),
                            // 	LegalName: Utils.TrimData(this.state.clientDetail.lblLegalName),
                            // 	Line1: Utils.TrimData(this.state.clientDetail.lblAddressLine1),
                            // 	Line2: Utils.TrimData(this.state.clientDetail.lblAddressLine2),
                            // 	Zipcode: Utils.TrimData(this.state.clientDetail.lblZipcode),
                            // 	PostalDistrictCity: Utils.TrimData(this.state.clientDetail.lblPostalDistrictCity),
                            // 	Country: Utils.TrimData(this.state.clientDetail.lblCountry),
                            // 	Currency: Utils.TrimData(this.state.clientDetail.lblCurrency),
                            // 	CountryAreaRegion: Utils.TrimData(this.state.clientDetail.lblCountryAreaRegion),
                            // 	CompanyRegistrationNumber: Utils.TrimData(this.state.clientDetail.lblCompanyRegistrationNumber),
                            // 	Sector: Utils.TrimData(this.state.clientDetail.lblSector),
                            // 	//rutvik 20-7 25
                            // 	//ClientStatus: Utils.TrimData(this.state.clientDetail.lblClientStatus),
                            // 	//endr
                            // 	ClientType: Utils.TrimData(this.state.clientDetail.lblClientType),
                            // 	TaxRegistrationNo: Utils.TrimData(this.state.clientDetail.lblTaxRegistrationNo),
                            // 	//rutvik 6-7 24
                            // 	CustomerRemark4: Utils.TrimData(this.state.clientDetail.lblCustomerRemark4),
                            // 	CustomerRemark5: Utils.TrimData(this.state.clientDetail.lblCustomerRemark5),
                            // 	//endr
                            // };
                            // this.requestJson = {
                            // 	SocialName: this.state.tbxSocialName,
                            // 	LegalName: this.state.tbxLegalName,
                            // 	Line1: this.state.tbxLine1,
                            // 	Line2: this.state.tbxLine2 === null ? "" : this.state.tbxLine2,
                            // 	Zipcode: this.state.tbxZipcode === null ? "" : this.state.tbxZipcode,
                            // 	PostalDistrictCity: this.state.tbxPostalDistrictCity,
                            // 	Country: this.state.dpCountry.value,
                            // 	Currency: this.state.dpCurrency.value,
                            // 	CountryAreaRegion: this.state.tbxCountryAreaRegion === null ? "" : this.state.tbxCountryAreaRegion,
                            // 	CompanyRegistrationNumber: this.state.tbxCompanyRegistrationNumber === null ? "" : this.state.tbxCompanyRegistrationNumber,
                            // 	Sector: this.state.dpSector.value,
                            // 	//rutvik 20-7 25
                            // 	//ClientStatus: this.state.dpClientStatus.value,
                            // 	//endr
                            // 	ClientType: this.state.dpClientType.value,
                            // 	TaxRegistrationNo: this.state.tbxTaxRegistrationNumber,
                            // 	//rutvik 6-7 24
                            // 	CustomerRemark4: this.state.tbxCustomerRemark4,
                            // 	CustomerRemark5: this.state.tbxCustomerRemark5
                            // 	//endr
                            // };
                            this.setState({ loading: false }, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.props.dataChange("section2Data", this.state)];
                                        case 1:
                                            _a.sent();
                                            //await this.props.dataChange("requestJson", this.requestJson);
                                            //await this.props.dataChange("clientJson", this.clientJson);
                                            return [4 /*yield*/, this.props.nextStep()];
                                        case 2:
                                            //await this.props.dataChange("requestJson", this.requestJson);
                                            //await this.props.dataChange("clientJson", this.clientJson);
                                            _a.sent();
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
    Section2.prototype._SaveForLaterClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summary>Save for later button click event.</summary>
                        this.setState({ loading: true }); //9-2-23
                        return [4 /*yield*/, this.saveDataOperation()];
                    case 1:
                        if (_a.sent()) {
                            window.location.href = this.props.context.pageContext.web.absoluteUrl;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype.validationSection2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errors, valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = this.state.errors;
                        errors.dpCurrency = (Utils.CheckRequiredField(this.state.dpCurrency.value) === false) ? strings.CantLeaveBlankMsg : "";
                        if (this.state.lblCompanyRegNo == "") {
                            errors.tbxCompanyRegistrationNumber = (Utils.CheckRequiredField(this.state.tbxCompanyRegistrationNumber) === false) ? strings.CantLeaveBlankMsg : "";
                            this.setState({ loading: false }); //9-2-2023
                        }
                        return [4 /*yield*/, this.validateClientCurrency()];
                    case 1:
                        _a.sent();
                        //await this.validateClientCurrencyCompany();
                        return [4 /*yield*/, this.validateRequestInProgress()];
                    case 2:
                        //await this.validateClientCurrencyCompany();
                        _a.sent();
                        this.setState({ errors: errors });
                        valid = true;
                        Object.keys(errors).forEach(function (key) { errors[key].length > 0 ? valid = false : null; });
                        return [2 /*return*/, valid];
                }
            });
        });
    };
    Section2.prototype.validateClientCurrency = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errors, tempData, tempArray_2, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = this.state.errors;
                        if (!(Utils.CheckRequiredField(this.state.dpCurrency.value) !== false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray_2 = [];
                        tempData.filter(function (item) {
                            var isAccessLevelPresent = false;
                            if (item.AccessLevel === _this.state.lblAccessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (item["AccessLevel"] !== null && _this.state.lblAccessLevel !== null) {
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
                            if (item.MaconomyAccountID == _this.props.approvalData.maconomyAccountID && item.Currency == _this.state.dpCurrency.value && isAccessLevelPresent) {
                                tempArray_2.push(item);
                            }
                        });
                        data = void 0;
                        data = tempArray_2[0];
                        if (data != null) {
                            errors.selectedClient = strings.ClientAlreadyExist + data["MaconomyAccountID"] + "  & Currency : " + data["Currency"];
                        }
                        else {
                            errors.selectedClient = '';
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype.validateRequestInProgress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errors, tempData, tempArray, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = this.state.errors;
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray = [];
                        tempData.filter(function (item) {
                            var isAccessLevelPresent = false;
                            if (item.AccessLevel === _this.state.lblAccessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (item["AccessLevel"] !== null && _this.state.lblAccessLevel !== null) {
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
                            if ((item.StatusIndicator == "Submitted" || item.StatusIndicator == "Partially Approved") && item.Title == _this.state.lblSocialName && item.Currency == _this.state.dpCurrency.value && isAccessLevelPresent && item.ID !== _this.props.itemID) {
                                tempArray.push(item);
                            }
                        });
                        data = tempArray[0];
                        if (data != null) {
                            errors.clientRecordInProgress = strings.ClientInProgressString1 + this.state.lblSocialName + " with Currency : " + data["Currency"] + strings.ClientInProgressString1;
                        }
                        else {
                            errors.clientRecordInProgress = '';
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype.saveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_3, errordata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 3]);
                        this.setState({
                            loading: true
                        }, function () { return __awaiter(_this, void 0, void 0, function () {
                            var tempData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        tempData = {
                                            Title: Utils.TrimData(this.state.lblSocialName),
                                            LegalName: Utils.TrimData(this.state.lblLegalName),
                                            Line1: Utils.TrimData(this.state.lblLine1),
                                            Line2: Utils.TrimData(this.state.lblLine2),
                                            Zipcode: Utils.TrimData(this.state.lblZipCode),
                                            Postal_District_City: Utils.TrimData(this.state.lblPostal),
                                            Country_Area_Region: Utils.TrimData(this.state.lblCountyArea),
                                            Country: this.state.lblCountry,
                                            Currency: this.state.dpCurrency.value,
                                            CompanyRegistrationNo: this.state.lblCompanyRegNo == "" ? this.state.tbxCompanyRegistrationNumber : Utils.TrimData(this.state.lblCompanyRegNo),
                                            ClientType: this.state.lblClientType,
                                            TaxRegistrationNo: Utils.TrimData(this.state.lblTaxRegistrationNo),
                                            DefaultTaxCode: Utils.TrimData(this.state.lblDefaultTaxCode),
                                            Email: Utils.TrimData(this.state.lblEmail),
                                            PhoneNo: Utils.TrimData(this.state.lblPhoneNo),
                                            CIN: Utils.TrimData(this.state.lblCIN),
                                            PaymentTerms: Utils.TrimData(this.state.lblPaymentTerms),
                                            WithholdingTaxType: Utils.TrimData(this.state.lblWithHoldingTax),
                                            Emirate: Utils.TrimData(this.state.lblEmirate),
                                            PlaceofSupply: Utils.TrimData(this.state.lblPlaceOfSupply),
                                            GSTRegistrationType: Utils.TrimData(this.state.lblGSTRegType),
                                            AccessLevel: Utils.TrimData(this.state.lblAccessLevel),
                                            ClientAttentionName: Utils.TrimData(this.state.lblClientAttentionName),
                                            Instructions: Utils.TrimData(this.state.lblInstruction),
                                            DeliveryMethod: Utils.TrimData(this.state.lblDeliverymethod),
                                            Sector: Utils.TrimData(this.state.lblSector),
                                            ClientStatus: Utils.TrimData(this.state.lblClientStatus),
                                            // ParentClient: Utils.TrimData(this.state.lblParentClient),
                                            CustomerRemark4: Utils.TrimData(this.state.lblCustomerRemark4),
                                            CustomerRemark5: Utils.TrimData(this.state.lblCustomerRemark5),
                                            CustomerRemark8: Utils.TrimData(this.state.lblCustomerRemark8),
                                            CustomerRemark7: Utils.TrimData(this.state.lblCustomerRemark7),
                                            ClientIDType: Utils.SplitData(this.state.lblClientIDType),
                                            //rutvik employee dp change 3-3-23
                                            ClientLead: this.state.lblClientLead,
                                            CommercialAnalyst: this.state.lblCommercialManager,
                                            Biller: this.state.lblBiller,
                                            ProjectAnalyst: this.state.lblProjectAnalyst,
                                            ResourceManager: this.state.lblResourceManager
                                        };
                                        if (!(this.props.itemID > 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then(function (res) {
                                            })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 3];
                    case 1:
                        error_3 = _a.sent();
                        this.setState({ loading: false });
                        errordata = {
                            Title: new Date(),
                            Errors: error_3,
                            RequestID: this.props.itemID
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata)];
                    case 2:
                        _a.sent();
                        //error log change end
                        console.log("Save Data--->", error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype.saveDataOperation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.validationSection2()];
                    case 1:
                        if ((_a.sent()) === false) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.saveData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        error_4 = _a.sent();
                        console.log("Save Data Operation--->", error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype.SetTextboxValue = function () {
        this.setState({
            // tbxSocialName: this.state.clientDetail.lblSocialName,
            // tbxLegalName: this.state.clientDetail.lblLegalName,
            // tbxLine1: this.state.clientDetail.lblAddressLine1,
            // tbxLine2: this.state.clientDetail.lblAddressLine2,
            // tbxZipcode: this.state.clientDetail.lblZipcode,
            // tbxPostalDistrictCity: this.state.clientDetail.lblPostalDistrictCity,
            // tbxCountryAreaRegion: this.state.clientDetail.lblCountryAreaRegion,
            // tbxCompanyRegistrationNumber: this.state.clientDetail.lblCompanyRegistrationNumber,
            // tbxTaxRegistrationNumber: this.state.clientDetail.lblTaxRegistrationNo,
            // dpCountry: Utils.GetDropdownStateValue(this.state.clientDetail.lblCountry, this.state.dpCountry),
            dpCurrency: Utils.GetDropdownStateValue(this.state.clientDetail.lblCurrency === null ? this.state.lblCurrency : this.state.lblCurrency.toUpperCase(), this.state.dpCurrency),
        });
    };
    return Section2;
}(React.Component));
export default Section2;
//# sourceMappingURL=Section2.js.map