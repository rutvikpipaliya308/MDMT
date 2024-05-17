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
import CardFooter from '../../common/CardFooter/CardFooter';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import { Dropdown, Icon, Label } from 'office-ui-fabric-react';
var Section2 = /** @class */ (function (_super) {
    __extends(Section2, _super);
    function Section2(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.state = {
            requestor: '',
            clientDetail: '',
            loading: true,
            tbxClientAttentionName: '',
            tbxEmail: '',
            tbxPhoneNo: '',
            itemID: 0,
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
            //rutvik 29-3-24
            tbxFinanceEmail: '',
            dpExcludeFromClientInvoiceReminder: { value: strings.strNo, options: Constants.EXCLUDEFROMCLIENTINVOICEREMINDER },
            Boolean3Value: false,
            errors: {
                tbxFinanceEmail: '',
                dpExcludeFromClientInvoiceReminder: ''
            }
        };
        return _this;
    }
    Section2.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentUserID, requestoridd, Companiesvalues, CurrentRequestData, Boolean3OfSelectedCompany, errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /// <summary>Bind data for read only and edit mode.</summary>
                    return [4 /*yield*/, this.GetCompanyClient()];
                    case 1:
                        /// <summary>Bind data for read only and edit mode.</summary>
                        _a.sent();
                        if (this.props.listData !== null) {
                            if (this.props.listData.LegalName !== null) {
                                this.setState({
                                    tbxClientAttentionName: this.props.listData["ClientAttentionName"],
                                    tbxEmail: this.props.listData["Email"],
                                    tbxPhoneNo: this.props.listData["PhoneNo"],
                                    tbxFinanceEmail: this.props.listData["FinanceEmail"],
                                    dpExcludeFromClientInvoiceReminder: Utils.GetDropdownStateValue(this.props.listData["ExcludeFromClientInvoiceReminder"] === true ? strings.strYes : strings.strNo, this.state.dpExcludeFromClientInvoiceReminder)
                                });
                            }
                            else {
                                this.setState({
                                    tbxClientAttentionName: this.state.clientDetail.lblClientAttentionName,
                                    tbxEmail: this.state.clientDetail.lblEmail,
                                    tbxPhoneNo: this.state.clientDetail.lblPhoneNo,
                                    tbxFinanceEmail: this.state.clientDetail.lblFinanceEmail,
                                    dpExcludeFromClientInvoiceReminder: Utils.GetDropdownStateValue(this.state.clientDetail.lblExcludeFromClientInvoiceReminder, this.state.dpExcludeFromClientInvoiceReminder)
                                });
                            }
                        }
                        else {
                            this.setState({
                                tbxClientAttentionName: this.state.clientDetail.lblClientAttentionName,
                                tbxEmail: this.state.clientDetail.lblEmail,
                                tbxPhoneNo: this.state.clientDetail.lblPhoneNo,
                                tbxFinanceEmail: this.state.clientDetail.lblFinanceEmail,
                                dpExcludeFromClientInvoiceReminder: Utils.GetDropdownStateValue(this.state.clientDetail.lblExcludeFromClientInvoiceReminder, this.state.dpExcludeFromClientInvoiceReminder)
                            });
                        }
                        if (this.props.data !== null && this.props.data !== undefined) {
                            this.setState(__assign({}, this.props.data));
                        }
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
                        this.setState({ loading: false });
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 2:
                        currentUserID = _a.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        return [4 /*yield*/, Utils.GetDropDownValuesForCompany(this.objWeb, this.props.context.pageContext.web.serverRelativeUrl + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, 'Company')];
                    case 3:
                        Companiesvalues = _a.sent();
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select('Company').get()];
                    case 4:
                        CurrentRequestData = _a.sent();
                        Boolean3OfSelectedCompany = Companiesvalues.filter(function (x) { return x.key === CurrentRequestData.Company; });
                        this.setState({ Boolean3Value: Boolean3OfSelectedCompany[0].Boolean3 });
                        if (!this.state.Boolean3Value) {
                            errors = this.state.errors;
                            errors.tbxFinanceEmail = "";
                            errors.dpExcludeFromClientInvoiceReminder = "";
                            this.setState(__assign({}, this.state, { errors: errors }));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype.render = function () {
        return (React.createElement("div", { className: "container-xl" },
            React.createElement("div", { className: "card-primary", style: { position: "relative" } },
                React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                React.createElement("div", { className: "card-header" },
                    React.createElement("h3", { className: "" }, strings.UpdateFields_Title)),
                React.createElement("div", { className: "card-body" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6 col-lg-6 form-info " },
                            React.createElement("h6", null, strings.Lbl_Name),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_MaconomyClientNo),
                                    React.createElement("p", null, this.state.clientDetail.lblMaconomyAccountID !== null ? this.state.clientDetail.lblMaconomyAccountID : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.CompanyFieldLabel),
                                    React.createElement("p", null, this.state.clientDetail.lblCompany !== null ? this.state.clientDetail.lblCompany : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_SocialName),
                                    React.createElement("p", null, this.state.clientDetail.lblSocialName !== null ? this.state.clientDetail.lblSocialName : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_LegalName),
                                    React.createElement("p", null, this.state.clientDetail.lblLegalName !== null ? this.state.clientDetail.lblLegalName : strings.EmptyData))))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6 col-lg-6 form-info " },
                            React.createElement("h6", null, strings.Lbl_Address),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Line1),
                                    React.createElement("p", null, this.state.clientDetail.lblLine1 !== null ? this.state.clientDetail.lblLine1 : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Line2),
                                    React.createElement("p", null, this.state.clientDetail.lblLine2 !== null ? this.state.clientDetail.lblLine2 : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_ZipCode),
                                    React.createElement("p", null, this.state.clientDetail.lblZipcode !== null ? this.state.clientDetail.lblZipcode : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Postal),
                                    React.createElement("p", null, this.state.clientDetail.lblPostalDistrictCity !== null ? this.state.clientDetail.lblPostalDistrictCity : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_CountryArea),
                                    React.createElement("p", null, this.state.clientDetail.lblCountryAreaRegion !== null ? this.state.clientDetail.lblCountryAreaRegion : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Country),
                                    React.createElement("p", null, this.state.clientDetail.lblCountry !== null ? this.state.clientDetail.lblCountry : strings.EmptyData))))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6 col-lg-6 form-info " },
                            React.createElement("h6", null, strings.Lbl_ContactDetails),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_ClientAttentionName),
                                    React.createElement("p", null, this.state.clientDetail.lblClientAttentionName !== null ? this.state.clientDetail.lblClientAttentionName : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_EmailAddress),
                                    React.createElement("p", null, this.state.clientDetail.lblEmail !== null ? this.state.clientDetail.lblEmail : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_PhoneNo),
                                    React.createElement("p", null, this.state.clientDetail.lblPhoneNo !== null ? this.state.clientDetail.lblPhoneNo : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_FinanceEmailAddress),
                                    React.createElement("p", null, this.state.clientDetail.lblFinanceEmail !== null ? this.state.clientDetail.lblFinanceEmail : strings.EmptyData)),
                                this.state.Boolean3Value ?
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_ExcludedFromClientInvoiceReminders),
                                        React.createElement("p", null, this.state.clientDetail.lblExcludeFromClientInvoiceReminder !== null ? this.state.clientDetail.lblExcludeFromClientInvoiceReminder : strings.EmptyData)) : null)),
                        React.createElement("div", { className: "col-md-6 col-lg-6 " },
                            React.createElement("h6", null, strings.Lbl_ContactDetails),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null, strings.Lbl_ClientAttentionName),
                                    React.createElement("input", { id: "tbxClientAttentionName", disabled: this.checkIfFieldDisabled("tbxClientAttentionName"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxClientAttentionName, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: (Utils.TrimData(this.state.tbxClientAttentionName) !== Utils.TrimData(this.state.clientDetail.lblClientAttentionName)) ? Constants.YELLOW : Constants.WHITE } })),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null, strings.Lbl_EmailAddress),
                                    React.createElement("input", { id: "tbxEmail", disabled: this.checkIfFieldDisabled("tbxEmail"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxEmail, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: (Utils.TrimData(this.state.tbxEmail) !== Utils.TrimData(this.state.clientDetail.lblEmail)) ? Constants.YELLOW : Constants.WHITE } })),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null, strings.Lbl_PhoneNo),
                                    React.createElement("input", { id: "tbxPhoneNo", disabled: this.checkIfFieldDisabled("tbxPhoneNo"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxPhoneNo, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: (Utils.TrimData(this.state.tbxPhoneNo) !== Utils.TrimData(this.state.clientDetail.lblPhoneNo)) ? Constants.YELLOW : Constants.WHITE } })),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_FinanceEmailAddress,
                                        this.state.Boolean3Value ? React.createElement("sub", null, "*") : null),
                                    React.createElement("input", { id: "tbxFinanceEmail", disabled: this.checkIfFieldDisabled("tbxFinanceEmail"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxFinanceEmail, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: (Utils.TrimData(this.state.tbxFinanceEmail) !== Utils.TrimData(this.state.clientDetail.lblFinanceEmail)) ? Constants.YELLOW : Constants.WHITE } }),
                                    this.state.errors.tbxFinanceEmail.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxFinanceEmail,
                                            " ")) : null),
                                this.state.Boolean3Value ?
                                    React.createElement("div", { className: "form-group col-sm-6" },
                                        React.createElement("label", null,
                                            strings.Lbl_ExcludedFromClientInvoiceReminders,
                                            this.state.Boolean3Value ? React.createElement("sub", null, "*") : null),
                                        React.createElement(Dropdown, { id: "dpExcludeFromClientInvoiceReminder", disabled: this.checkIfFieldDisabled("dpExcludeFromClientInvoiceReminder"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpExcludeFromClientInvoiceReminder.value, options: this.state.dpExcludeFromClientInvoiceReminder.options, onChange: this._onDpChange.bind(this), style: { backgroundColor: (Utils.TrimData(this.state.dpExcludeFromClientInvoiceReminder.value) !== Utils.TrimData(this.state.clientDetail.lblExcludeFromClientInvoiceReminder)) ? Constants.YELLOW : Constants.WHITE } }),
                                        this.state.errors.dpExcludeFromClientInvoiceReminder.length > 0 ? React.createElement("span", null,
                                            " ",
                                            React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                            React.createElement(Label, { className: "errormessage" },
                                                this.state.errors.dpExcludeFromClientInvoiceReminder,
                                                " ")) : null) : null))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6 col-lg-6 form-info " },
                            React.createElement("h6", null, strings.Lbl_GeneralInfo),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Currency),
                                    React.createElement("p", null, this.state.clientDetail.lblCurrency !== null ? this.state.clientDetail.lblCurrency : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_CompanyRegNo),
                                    React.createElement("p", null, this.state.clientDetail.lblCompanyRegistrationNo !== null ? this.state.clientDetail.lblCompanyRegistrationNo : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Sector),
                                    React.createElement("p", null, this.state.clientDetail.lblSector !== null ? this.state.clientDetail.lblSector : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_ClientType),
                                    React.createElement("p", null, this.state.clientDetail.lblClientType !== null ? this.state.clientDetail.lblClientType : strings.EmptyData)))))),
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
        this.forceUpdate();
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
                if (id === "tbxFinanceEmail")
                    errors.tbxFinanceEmail = "",
                        this.setState({ errors: errors });
                return [2 /*return*/];
            });
        });
    };
    //rutvik 1-4-23
    Section2.prototype._onDpChange = function (event, item) {
        var _a;
        // <summary>Event called on dropdown value change.</summary>
        var tempObj = this.state[event.target.id];
        tempObj.value = item.text;
        this.setState(__assign({}, this.state, (_a = {}, _a[event.target.id] = tempObj, _a)));
        var errors = this.state.errors;
        if (event.target.id == "dpExcludeFromClientInvoiceReminder")
            errors.dpExcludeFromClientInvoiceReminder = '';
        this.setState({ errors: errors });
    };
    Section2.prototype.GetCompanyClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        data = this.props.selectedClientData;
                        if (!(data !== null)) return [3 /*break*/, 2];
                        _a = data;
                        return [4 /*yield*/, Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.PaymentTerms)];
                    case 1:
                        _a.PaymentTerms = _b.sent();
                        //rutvik test change
                        //data.DefaultTaxCode = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.DefaultTaxCode);
                        data.PlaceOfSupply = data.PlaceofSupply;
                        this.setState({
                            clientDetail: {
                                lblMaconomyAccountID: data.MaconomyAccountID,
                                lblCompany: data.Company,
                                lblSocialName: data.Title,
                                lblLegalName: data.LegalName,
                                lblClientAttentionName: data.ClientAttentionName,
                                lblEmail: data.Email,
                                lblFinanceEmail: data.FinanceEmail,
                                lblExcludeFromClientInvoiceReminder: data.ExcludeFromClientInvoiceReminder === true ? strings.strYes : strings.strNo,
                                lblPhoneNo: data.PhoneNo,
                                lblDefaultTaxCode: data.DefaultTaxCode,
                                lblPaymentTerms: data.PaymentTerms,
                                lblWithholdingTaxType: data.WithholdingTaxType,
                                lblEmirate: data.Emirate,
                                lblPlaceofSupply: data.PlaceOfSupply,
                                lblGSTRegistrationType: data.GSTRegistrationType,
                                lblCIN: data.CIN,
                                lblTDSTaxRate: data.TDSTaxRate,
                                lblLine1: data.Line1,
                                lblLine2: data.Line2,
                                lblZipcode: data.Zipcode,
                                lblPostalDistrictCity: data.Postal_District_City,
                                lblCountryAreaRegion: data.Country_Area_Region,
                                lblCountry: data.Country,
                                lblCurrency: data.Currency,
                                lblCompanyRegistrationNo: data.CompanyRegistrationNo,
                                lblSector: data.Sector,
                                //rutvik 20-7 25
                                //lblClientStatus: data.ClientStatus,
                                //endr
                                lblClientType: data.ClientType,
                                lblTaxRegistrationNo: data.TaxRegistrationNo,
                                lblCustomerRemark4: data.CustomerRemark4,
                                lblCustomerRemark5: data.CustomerRemark5,
                                lblCustomerRemark8: data.CustomerRemark8,
                                lblCustomerRemark7: data.CustomerRemark7,
                                lblClientIDType: data.ClientIDType,
                                //rutvik employee dp change 3-3-23
                                lblClientLead: data.ClientLead,
                                lblCommercialManager: data.CommercialManager,
                                lblBiller: data.Biller,
                                lblProjectAnalyst: data.ProjectAnalyst,
                                lblResourceManager: data.ResourceManager
                            }
                        });
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log("Get client data--->", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
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
                        _a.sent();
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
                        return [4 /*yield*/, this.SaveDataOperations()];
                    case 1:
                        if (_a.sent()) {
                            this.setState({ loading: false }, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.props.dataChange("section2Data", this.state)];
                                        case 1:
                                            _a.sent();
                                            this.props.nextStep();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        } //rutvik 29-3-24
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
                        return [4 /*yield*/, this.SaveDataOperations()];
                    case 1:
                        //rutvik 29-3-24
                        if (_a.sent()) {
                            window.location.href = this.props.context.pageContext.web.absoluteUrl;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //rutvik 29-3-24
    Section2.prototype.SaveDataOperations = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /// <summar>Validate and save data operations.</summary>
                        if (this.ValidateSection3() === false) {
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
    //rutvik 29-3-24
    Section2.prototype.ValidateSection3 = function () {
        /// <summary>Validate section 3.</summary>
        var errors = this.state.errors;
        if (this.state.Boolean3Value) {
            errors.tbxFinanceEmail = (Utils.CheckRequiredField(this.state.tbxFinanceEmail) === false) ? strings.CantLeaveBlankMsg : "";
        }
        else {
            errors.tbxFinanceEmail = "";
        }
        this.setState({ errors: errors });
        var valid = true;
        Object.keys(errors).forEach(function (key) { errors[key].length > 0 ? valid = false : null; });
        return valid;
    };
    Section2.prototype.SaveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempData, error_2, errordata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        this.setState({
                            loading: true
                        });
                        tempData = {
                            ClientAttentionName: Utils.TrimData(this.state.tbxClientAttentionName),
                            Email: Utils.TrimData(this.state.tbxEmail),
                            PhoneNo: Utils.TrimData(this.state.tbxPhoneNo),
                            LegalName: Utils.TrimData(this.state.clientDetail.lblLegalName),
                            //rutvik employee dp change 3-3-23
                            ClientLead: this.state.clientDetail.lblClientLead,
                            CommercialAnalyst: this.state.clientDetail.lblCommercialManager,
                            Biller: this.state.clientDetail.lblBiller,
                            ProjectAnalyst: this.state.clientDetail.lblProjectAnalyst,
                            ResourceManager: this.state.clientDetail.lblResourceManager,
                            FinanceEmail: Utils.TrimData(this.state.tbxFinanceEmail),
                            ExcludeFromClientInvoiceReminder: this.state.dpExcludeFromClientInvoiceReminder.value === strings.strYes ? true : false //rutvik 1-4-23
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
    return Section2;
}(React.Component));
export default Section2;
//# sourceMappingURL=Section2.js.map