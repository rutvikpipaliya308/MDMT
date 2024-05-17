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
    function Section2(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.requestJson = null;
        _this.clientJson = null;
        _this.state = {
            loading: true,
            clientDetail: '',
            tbxSocialName: '',
            tbxLegalName: '',
            tbxLine1: '',
            tbxLine2: '',
            tbxZipcode: '',
            tbxTaxRegistrationNumber: '',
            tbxCustomerRemark4: '',
            tbxCustomerRemark5: '',
            tbxCompany: null,
            tbxCustomerRemark8: '',
            tbxCustomerRemark7: '',
            dpClientIDType: { value: '', options: [] },
            tbxPostalDistrictCity: '',
            dpCountry: { value: '', options: [] },
            tbxCountryAreaRegion: '',
            tbxCompanyRegistrationNumber: '',
            dpSector: { value: '', options: [] },
            dpClientType: { value: '', options: [] },
            requestor: '',
            currentUserid: '',
            requestorid: '',
            //rutvik 13-3-24
            tbxLegalNameInArabic: '',
            tbxArabicLine1: '',
            tbxArabicLine2: '',
            // tbxArabicZipCode: '',
            tbxArabicPostalDistrict: '',
            tbxArabicCountryAreaRegion: '',
            errors: {
                tbxSocialName: '',
                tbxLegalName: '',
                tbxLine1: '',
                tbxPostalDistrictCity: '',
                tbxTaxRegistrationNumber: '',
                tbxCustomerRemark4: '',
                tbxCustomerRemark5: '',
                tbxCustomerRemark8: '',
                tbxCustomerRemark7: '',
                dpClientIDType: '',
                dpCountry: '',
                dpSector: '',
                dpClientType: '',
                //rutvik 13-3-24
                tbxLegalNameInArabic: '',
                tbxArabicLine1: '',
                tbxArabicLine2: '',
                // tbxArabicZipCode: '',
                tbxArabicPostalDistrict: '',
                tbxArabicCountryAreaRegion: '',
                tbxZipcode: ''
            },
            itemID: 0
        };
        return _this;
    }
    Section2.prototype.componentWillMount = function () {
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
                        return [4 /*yield*/, this.GetClient()];
                    case 4:
                        _a.sent();
                        if (!(this.props.listData !== null)) return [3 /*break*/, 8];
                        if (!(this.props.listData.Title !== null)) return [3 /*break*/, 5];
                        this.setState({
                            tbxSocialName: this.props.listData.Title,
                            tbxLegalName: this.props.listData.LegalName,
                            tbxLine1: this.props.listData.Line1,
                            tbxLine2: this.props.listData.Line2,
                            tbxZipcode: this.props.listData.Zipcode,
                            tbxPostalDistrictCity: this.props.listData.Postal_District_City,
                            tbxCountryAreaRegion: this.props.listData.Country_Area_Region,
                            tbxCompanyRegistrationNumber: this.props.listData.CompanyRegistrationNo,
                            tbxTaxRegistrationNumber: this.props.listData.TaxRegistrationNo,
                            dpCountry: Utils.GetDropdownStateValue(this.props.listData.Country, this.state.dpCountry),
                            //dpCurrency: Utils.GetDropdownStateValue(this.props.listData.Currency === null ? this.props.listData.Currency : this.props.listData.Currency.toUpperCase(), this.state.dpCurrency),
                            dpSector: Utils.GetDropdownStateValue(this.props.listData.Sector, this.state.dpSector),
                            //rutvik 20-7 25
                            //dpClientStatus: Utils.GetDropdownStateValue(this.props.listData.ClientStatus, this.state.dpClientStatus),
                            //endr
                            dpClientType: Utils.GetDropdownStateValue(this.props.listData.ClientType, this.state.dpClientType),
                            tbxCustomerRemark4: this.props.listData.CustomerRemark4,
                            tbxCustomerRemark5: this.props.listData.CustomerRemark5,
                            tbxCustomerRemark8: this.props.listData.CustomerRemark8,
                            tbxCustomerRemark7: this.props.listData.CustomerRemark7,
                            //rutvik 13-3-24
                            tbxLegalNameInArabic: this.props.listData.LegalNameInArabic,
                            tbxArabicLine1: this.props.listData.ArabicLine1,
                            tbxArabicLine2: this.props.listData.ArabicLine2,
                            // tbxArabicZipCode: this.props.listData.ArabicZipCode,
                            tbxArabicPostalDistrict: this.props.listData.ArabicPostalDistrict,
                            tbxArabicCountryAreaRegion: this.props.listData.ArabicCountryAreaRegion,
                            //end
                            dpClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.listData["ClientIDType"], this.state.dpClientIDType),
                        });
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.SetTextboxValue()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.SetTextboxValue()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (this.props.data !== null && this.props.data !== undefined) {
                            this.setState(__assign({}, this.props.data));
                        }
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
                        this.setState({ loading: false });
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 11:
                        currentUserID = _a.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        return [2 /*return*/];
                }
            });
        });
    };
    Section2.prototype.render = function () {
        document.querySelector('#dpCountry') !== null ? document.querySelector('#dpCountry').querySelector("#dpCountry > span").style.backgroundColor = Utils.TrimData(this.state.dpCountry.value) !== '' && Utils.TrimData(this.state.dpCountry.value) !== this.state.clientDetail.lblCountry ? "yellow" : "white" : null;
        //document.querySelector('#dpCurrency') !== null ? ((document.querySelector('#dpCurrency') as HTMLElement).querySelector(`#dpCurrency > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpCurrency.value) !== '' && Utils.TrimData(this.state.dpCurrency.value) !== this.state.clientDetail.lblCurrency ? "yellow" : "white" : null;
        document.querySelector('#dpCountry') !== null ? document.querySelector('#dpCountry').querySelector("#dpCountry > span").style.backgroundColor = Utils.TrimData(this.state.dpCountry.value) !== '' && Utils.TrimData(this.state.dpCountry.value) !== this.state.clientDetail.lblCountry ? "yellow" : "white" : null;
        document.querySelector('#dpSector') !== null ? document.querySelector('#dpSector').querySelector("#dpSector > span").style.backgroundColor = Utils.TrimData(this.state.dpSector.value) !== '' && Utils.TrimData(this.state.dpSector.value) !== this.state.clientDetail.lblSector ? "yellow" : "white" : null;
        //document.querySelector('#dpClientStatus') !== null ? ((document.querySelector('#dpClientStatus') as HTMLElement).querySelector(`#dpClientStatus > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientStatus.value) !== '' && Utils.TrimData(this.state.dpClientStatus.value) !== this.state.clientDetail.lblClientStatus ? "yellow" : "white" : null;
        document.querySelector('#dpClientType') !== null ? document.querySelector('#dpClientType').querySelector("#dpClientType > span").style.backgroundColor = Utils.TrimData(this.state.dpClientType.value) !== '' && Utils.TrimData(this.state.dpClientType.value) !== this.state.clientDetail.lblClientType ? "yellow" : "white" : null;
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
                                    React.createElement("p", null, this.state.clientDetail.lblSocialName !== null ? this.state.clientDetail.lblSocialName : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_LegalName),
                                    React.createElement("p", null, this.state.clientDetail.lblLegalName !== null ? this.state.clientDetail.lblLegalName : strings.EmptyData))),
                            this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_LegalNameInArabic),
                                        React.createElement("p", null, this.state.clientDetail.lblLegalNameInArabic !== null ? this.state.clientDetail.lblLegalNameInArabic : strings.EmptyData))) : null),
                        React.createElement("div", { className: "col-md-7 col-lg-6" },
                            React.createElement("h6", null, strings.Lbl_Name),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_SocialName,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxSocialName", disabled: this.checkIfFieldDisabled("tbxSocialName"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxSocialName, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxSocialName) !== '' && Utils.TrimData(this.state.tbxSocialName) !== this.state.clientDetail.lblSocialName ? "yellow" : "white" } }),
                                    this.state.errors.tbxSocialName.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxSocialName,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_LegalName,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxLegalName", disabled: this.checkIfFieldDisabled("tbxLegalName"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxLegalName, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxLegalName) !== '' && Utils.TrimData(this.state.tbxLegalName) !== this.state.clientDetail.lblLegalName ? "yellow" : "white" } }),
                                    this.state.errors.tbxLegalName.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxLegalName,
                                            " ")) : null)),
                            this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-sm-6" },
                                        React.createElement("label", { className: 'arabic-right-text' },
                                            strings.Lbl_LegalNameInArabic,
                                            React.createElement("sub", null, "*")),
                                        React.createElement("input", { id: "tbxLegalNameInArabic", disabled: this.checkIfFieldDisabled("tbxLegalNameInArabic"), maxLength: 255, dir: "rtl", className: "form-control", type: "text", value: this.state.tbxLegalNameInArabic, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxLegalNameInArabic) !== '' && Utils.TrimData(this.state.tbxLegalNameInArabic) !== this.state.clientDetail.lblLegalNameInArabic ? "yellow" : "white" } }),
                                        this.state.errors.tbxLegalNameInArabic.length > 0 ? React.createElement("span", null,
                                            " ",
                                            React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                            React.createElement(Label, { className: "errormessage" },
                                                this.state.errors.tbxLegalNameInArabic,
                                                " ")) : null)) : null)),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("h6", null, strings.Lbl_Address),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Line1),
                                    React.createElement("p", null, this.state.clientDetail.lblAddressLine1 !== null ? this.state.clientDetail.lblAddressLine1 : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Line2),
                                    React.createElement("p", null, this.state.clientDetail.lblAddressLine2 !== null ? this.state.clientDetail.lblAddressLine2 : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" },
                            React.createElement("h6", null, strings.Lbl_Address),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_Line1,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxLine1", disabled: this.checkIfFieldDisabled("tbxLine1"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxLine1, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxLine1) !== '' && Utils.TrimData(this.state.tbxLine1) !== this.state.clientDetail.lblAddressLine1 ? "yellow" : "white" } }),
                                    this.state.errors.tbxLine1.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxLine1,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null, strings.Lbl_Line2),
                                    React.createElement("input", { id: "tbxLine2", disabled: this.checkIfFieldDisabled("tbxLine2"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxLine2, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxLine2) !== Utils.TrimData(this.state.clientDetail.lblAddressLine2) ? "yellow" : "white" } }))))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_ZipCode),
                                    React.createElement("p", null, this.state.clientDetail.lblZipcode !== null ? this.state.clientDetail.lblZipcode : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Postal),
                                    React.createElement("p", null, this.state.clientDetail.lblPostalDistrictCity !== null ? this.state.clientDetail.lblPostalDistrictCity : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_ZipCode,
                                        this.state.dpCountry.value === Constants.SAUDI_ARABIA_COUNTRY && this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ? React.createElement("sub", null, "*") : null),
                                    React.createElement("input", { id: "tbxZipcode", disabled: this.checkIfFieldDisabled("tbxZipcode"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxZipcode, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxZipcode) !== Utils.TrimData(this.state.clientDetail.lblZipcode) ? "yellow" : "white" } }),
                                    this.state.errors.tbxZipcode.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxZipcode,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_Postal,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxPostalDistrictCity", disabled: this.checkIfFieldDisabled("tbxPostalDistrictCity"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxPostalDistrictCity, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxPostalDistrictCity) !== '' && Utils.TrimData(this.state.tbxPostalDistrictCity) !== this.state.clientDetail.lblPostalDistrictCity ? "yellow" : "white" } }),
                                    this.state.errors.tbxPostalDistrictCity.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxPostalDistrictCity,
                                            " ")) : null)))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_CountryArea),
                                    React.createElement("p", null, this.state.clientDetail.lblCountryAreaRegion !== null ? this.state.clientDetail.lblCountryAreaRegion : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Country),
                                    React.createElement("p", null, this.state.clientDetail.lblCountry !== null ? this.state.clientDetail.lblCountry : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null, strings.Lbl_CountryArea),
                                    React.createElement("input", { id: "tbxCountryAreaRegion", disabled: this.checkIfFieldDisabled("tbxCountryAreaRegion"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxCountryAreaRegion, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxCountryAreaRegion) !== Utils.TrimData(this.state.clientDetail.lblCountryAreaRegion) ? "yellow" : "white" } })),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_Country,
                                        React.createElement("sub", null, "*")),
                                    React.createElement(Dropdown, { id: "dpCountry", disabled: this.checkIfFieldDisabled("dpCountry"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpCountry.value, options: this.state.dpCountry.options, onChange: this._onDropDownChange.bind(this) }),
                                    this.state.errors.dpCountry.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.dpCountry,
                                            " ")) : null)))),
                    this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
                        React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                                    React.createElement("h6", null, strings.Lbl_ArabicAddress),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-6" },
                                            React.createElement("label", null, strings.Lbl_ArabicLine1),
                                            React.createElement("p", null, this.state.clientDetail.lblArabicLine1 !== null ? this.state.clientDetail.lblArabicLine1 : strings.EmptyData)),
                                        React.createElement("div", { className: "form-group col-6" },
                                            React.createElement("label", null, strings.Lbl_ArabicLine2),
                                            React.createElement("p", null, this.state.clientDetail.lblArabicLine2 !== null ? this.state.clientDetail.lblArabicLine2 : strings.EmptyData)))),
                                React.createElement("div", { className: "col-md-7 col-lg-6" },
                                    React.createElement("h6", null, strings.Lbl_ArabicAddress),
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", { className: 'arabic-right-text' },
                                                strings.Lbl_ArabicLine1,
                                                React.createElement("sub", null, "*")),
                                            React.createElement("input", { id: "tbxArabicLine1", disabled: this.checkIfFieldDisabled("tbxArabicLine1"), maxLength: 255, dir: "rtl", className: "form-control", type: "text", value: this.state.tbxArabicLine1, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxArabicLine1) !== '' && Utils.TrimData(this.state.tbxArabicLine1) !== this.state.clientDetail.lblArabicLine1 ? "yellow" : "white" } }),
                                            this.state.errors.tbxArabicLine1.length > 0 ? React.createElement("span", null,
                                                " ",
                                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                                React.createElement(Label, { className: "errormessage" },
                                                    this.state.errors.tbxArabicLine1,
                                                    " ")) : null),
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", { className: 'arabic-right-text' },
                                                strings.Lbl_ArabicLine2,
                                                React.createElement("sub", null, "*")),
                                            React.createElement("input", { id: "tbxArabicLine2", disabled: this.checkIfFieldDisabled("tbxArabicLine2"), maxLength: 255, dir: "rtl", className: "form-control", type: "text", value: this.state.tbxArabicLine2, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxArabicLine2) !== Utils.TrimData(this.state.clientDetail.lblArabicLine2) ? "yellow" : "white" } }),
                                            this.state.errors.tbxArabicLine2.length > 0 ? React.createElement("span", null,
                                                " ",
                                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                                React.createElement(Label, { className: "errormessage" },
                                                    this.state.errors.tbxArabicLine2,
                                                    " ")) : null)))),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-6" },
                                            React.createElement("label", null, strings.Lbl_ArabicPostal),
                                            React.createElement("p", null, this.state.clientDetail.lblArabicPostalDistrict !== null ? this.state.clientDetail.lblArabicPostalDistrict : strings.EmptyData)))),
                                React.createElement("div", { className: "col-md-7 col-lg-6" },
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", { className: 'arabic-right-text' },
                                                strings.Lbl_ArabicPostal,
                                                React.createElement("sub", null, "*")),
                                            React.createElement("input", { id: "tbxArabicPostalDistrict", disabled: this.checkIfFieldDisabled("tbxArabicPostalDistrict"), maxLength: 255, dir: "rtl", className: "form-control", type: "text", value: this.state.tbxArabicPostalDistrict, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxArabicPostalDistrict) !== '' && Utils.TrimData(this.state.tbxArabicPostalDistrict) !== this.state.clientDetail.lblArabicPostalDistrict ? "yellow" : "white" } }),
                                            this.state.errors.tbxArabicPostalDistrict.length > 0 ? React.createElement("span", null,
                                                " ",
                                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                                React.createElement(Label, { className: "errormessage" },
                                                    this.state.errors.tbxArabicPostalDistrict,
                                                    " ")) : null)))),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-6" },
                                            React.createElement("label", null, strings.Lbl_ArabicCountryArea),
                                            React.createElement("p", null, this.state.clientDetail.lblArabicCountryAreaRegion !== null ? this.state.clientDetail.lblArabicCountryAreaRegion : strings.EmptyData)))),
                                React.createElement("div", { className: "col-md-7 col-lg-6" },
                                    React.createElement("div", { className: "row" },
                                        React.createElement("div", { className: "form-group col-sm-6" },
                                            React.createElement("label", { className: 'arabic-right-text' }, strings.Lbl_ArabicCountryArea),
                                            React.createElement("input", { id: "tbxArabicCountryAreaRegion", disabled: this.checkIfFieldDisabled("tbxArabicCountryAreaRegion"), maxLength: 255, dir: "rtl", className: "form-control", type: "text", value: this.state.tbxArabicCountryAreaRegion, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxArabicCountryAreaRegion) !== Utils.TrimData(this.state.clientDetail.lblArabicCountryAreaRegion) ? "yellow" : "white" } })))))) : null,
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("h6", null, strings.Lbl_GeneralInfo),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Currency),
                                    React.createElement("p", null, this.state.clientDetail.lblCurrency !== null ? this.state.clientDetail.lblCurrency : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_CompanyRegNo),
                                    React.createElement("p", null, this.state.clientDetail.lblCompanyRegistrationNumber !== null ? this.state.clientDetail.lblCompanyRegistrationNumber : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_Sector),
                                    React.createElement("p", null, this.state.clientDetail.lblSector !== null ? this.state.clientDetail.lblSector : strings.EmptyData)),
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_ClientType),
                                    React.createElement("p", null, this.state.clientDetail.lblClientType !== null ? this.state.clientDetail.lblClientType : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" },
                            React.createElement("h6", null, strings.Lbl_GeneralInfo),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null, strings.Lbl_CompanyRegNo),
                                    React.createElement("input", { id: "tbxCompanyRegistrationNumber", disabled: this.checkIfFieldDisabled("tbxCompanyRegistrationNumber"), maxLength: 255, className: "form-control", type: "email", value: this.state.tbxCompanyRegistrationNumber, onChange: this._onTbxChange.bind(this), placeholder: "", style: { backgroundColor: Utils.TrimData(this.state.tbxCompanyRegistrationNumber) !== Utils.TrimData(this.state.clientDetail.lblCompanyRegistrationNumber) ? "yellow" : "white" } })),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_Sector,
                                        React.createElement("sub", null, "*")),
                                    React.createElement(Dropdown, { id: "dpSector", disabled: this.checkIfFieldDisabled("dpSector"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpSector.value, options: this.state.dpSector.options, onChange: this._onDropDownChange.bind(this) }),
                                    this.state.errors.dpSector.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.dpSector,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_ClientType,
                                        React.createElement("sub", null, "*")),
                                    React.createElement(Dropdown, { id: "dpClientType", disabled: this.checkIfFieldDisabled("dpClientType"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpClientType.value, options: this.state.dpClientType.options, onChange: this._onDropDownChange.bind(this) }),
                                    this.state.errors.dpClientType.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.dpClientType,
                                            " ")) : null)))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                            React.createElement("h6", null, strings.Lbl_TaxInformation),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-6" },
                                    React.createElement("label", null, strings.Lbl_TaxRegNo),
                                    React.createElement("p", null, this.state.clientDetail.lblTaxRegistrationNo !== null ? this.state.clientDetail.lblTaxRegistrationNo : strings.EmptyData)))),
                        React.createElement("div", { className: "col-md-7 col-lg-6" },
                            React.createElement("h6", null, strings.Lbl_TaxInformation),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6" },
                                    React.createElement("label", null,
                                        strings.Lbl_TaxRegNo,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxTaxRegistrationNumber", disabled: this.checkIfFieldDisabled("tbxTaxRegistrationNumber"), maxLength: 255, className: "form-control", type: "text", value: this.state.tbxTaxRegistrationNumber, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxTaxRegistrationNumber) !== '' && Utils.TrimData(this.state.tbxTaxRegistrationNumber) !== this.state.clientDetail.lblTaxRegistrationNo ? "yellow" : "white" } }),
                                    this.state.errors.tbxTaxRegistrationNumber.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxTaxRegistrationNumber,
                                            " ")) : null)))),
                    this.state.tbxCompany === parseInt(Constants.ITALIAN_COMPANY) ?
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-5 col-lg-6 form-info" },
                                React.createElement("h6", null, strings.Lbl_ItalianInvoiceExtension),
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_CustomerRemark4),
                                        React.createElement("p", null, this.state.clientDetail.lblCustomerRemark4 !== null ? this.state.clientDetail.lblCustomerRemark4 : strings.EmptyData)),
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_CustomerRemark5),
                                        React.createElement("p", null, this.state.clientDetail.lblCustomerRemark5 !== null ? this.state.clientDetail.lblCustomerRemark5 : strings.EmptyData))),
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-6" },
                                        React.createElement("label", null, strings.Lbl_CustomerRemark8),
                                        React.createElement("p", null, this.state.clientDetail.lblCustomerRemark8 !== null ? this.state.clientDetail.lblCustomerRemark8 : strings.EmptyData)))),
                            React.createElement("div", { className: "col-md-7 col-lg-6" },
                                React.createElement("h6", null, strings.Lbl_ItalianInvoiceExtension),
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "form-group col-sm-6" },
                                        React.createElement("label", null,
                                            strings.Lbl_CustomerRemark4,
                                            React.createElement("sub", null, "*")),
                                        React.createElement("input", { id: "tbxCustomerRemark4", maxLength: 255, disabled: this.checkIfFieldDisabled("tbxCustomerRemark4"), className: "form-control", type: "text", value: this.state.tbxCustomerRemark4, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark4) !== '' && Utils.TrimData(this.state.tbxCustomerRemark4) !== this.state.clientDetail.lblCustomerRemark4 ? "yellow" : "white" } }),
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
                                        React.createElement("input", { id: "tbxCustomerRemark5", maxLength: 255, disabled: this.checkIfFieldDisabled("tbxCustomerRemark5"), className: "form-control", type: "text", value: this.state.tbxCustomerRemark5, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark5) !== '' && Utils.TrimData(this.state.tbxCustomerRemark5) !== this.state.clientDetail.lblCustomerRemark5 ? "yellow" : "white" } }),
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
                                        React.createElement("input", { id: "tbxCustomerRemark8", maxLength: 255, disabled: this.checkIfFieldDisabled("tbxCustomerRemark8"), className: "form-control", type: "text", value: this.state.tbxCustomerRemark8, placeholder: "", onChange: this._onTbxChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark8) !== '' && Utils.TrimData(this.state.tbxCustomerRemark8) !== this.state.clientDetail.lblCustomerRemark8 ? "yellow" : "white" } }),
                                        this.state.errors.tbxCustomerRemark8.length > 0 ? React.createElement("span", null,
                                            " ",
                                            React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                            React.createElement(Label, { className: "errormessage" },
                                                this.state.errors.tbxCustomerRemark8,
                                                " ")) : null)))) : null,
                    (this.state.tbxCompany === parseInt(Constants.SAUDI_COMPANY[0]) || this.state.tbxCompany === parseInt(Constants.SAUDI_COMPANY[1]) || this.state.tbxCompany === parseInt(Constants.SAUDI_COMPANY[2])) ?
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
                                        React.createElement("label", null, strings.Lbl_ClientIDType),
                                        React.createElement(Dropdown, { id: "dpClientIDType", disabled: this.checkIfFieldDisabled("dpClientIDType"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpClientIDType.value, options: this.state.dpClientIDType.options, onChange: this._onDropDownChange.bind(this), style: { backgroundColor: Utils.TrimData(this.state.dpClientIDType.value) !== '' && Utils.TrimData(this.state.dpClientIDType.value) !== this.state.clientDetail.lblClientIDType ? "yellow" : "white" } }),
                                        this.state.errors.dpClientIDType.length > 0 ? React.createElement("span", null,
                                            " ",
                                            React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                            React.createElement(Label, { className: "errormessage" },
                                                this.state.errors.dpClientIDType,
                                                " ")) : null)))) : null),
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
            var companyNumber;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.forceUpdate();
                        companyNumber = [];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select("Company").get().then(function (data) {
                                companyNumber = data.Company.split('-');
                                var number = parseInt(companyNumber[0].trim());
                                _this.setState({ tbxCompany: number });
                            })];
                    case 1:
                        _a.sent();
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
    Section2.prototype._onTbxChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, id, value, errors;
            return __generator(this, function (_c) {
                /// <summary>On texbox value change set value into state property.</summary>
                event.preventDefault();
                _b = event.target, id = _b.id, value = _b.value;
                this.setState(__assign({}, this.state, (_a = {}, _a[id] = value, _a)));
                errors = this.state.errors;
                if (id === "tbxSocialName")
                    errors.tbxSocialName = '';
                if (id === "tbxLegalName")
                    errors.tbxLegalName = '';
                if (id === "tbxLine1")
                    errors.tbxLine1 = '';
                if (id === "tbxPostalDistrictCity")
                    errors.tbxPostalDistrictCity = '';
                if (id === "tbxTaxRegistrationNumber")
                    errors.tbxTaxRegistrationNumber = '';
                if (id === "tbxCustomerRemark4")
                    errors.tbxCustomerRemark4 = '';
                if (id === "tbxCustomerRemark5")
                    errors.tbxCustomerRemark5 = '';
                if (id === "tbxCustomerRemark8")
                    errors.tbxCustomerRemark8 = '';
                //rutvik 13-3-24
                if (id === "tbxZipcode")
                    errors.tbxZipcode = "";
                if (id === "tbxLegalNameInArabic")
                    errors.tbxLegalNameInArabic = "";
                if (id === "tbxArabicLine1")
                    errors.tbxArabicLine1 = "";
                if (id === "tbxArabicLine2")
                    errors.tbxArabicLine2 = "";
                if (id === "tbxArabicPostalDistrict")
                    errors.tbxArabicPostalDistrict = "";
                // if (id === "tbxArabicZipCode") errors.tbxArabicZipCode = "";
                //end
                this.setState({ errors: errors });
                return [2 /*return*/];
            });
        });
    };
    Section2.prototype.BindData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempStateObj, cur, i, options, tempObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempStateObj = {};
                        cur = "Currency";
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < Constants.MASTER_DROPDOWNS_7_8.length)) return [3 /*break*/, 4];
                        if (!(Constants.MASTER_DROPDOWNS_7_8[i].name !== cur)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Utils.GetMasterListItems(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS_7_8[i].name)];
                    case 2:
                        options = _a.sent();
                        tempObj = this.state[Constants.MASTER_DROPDOWNS_7_8[i].key];
                        tempObj.options = options;
                        options.length > 0 ? tempStateObj[Constants.MASTER_DROPDOWNS_7_8[i].key] = tempObj : [];
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
                    if (event.target.id === "dpCountry")
                        errors.dpCountry = '';
                    if (event.target.id === "dpSector")
                        errors.dpSector = '';
                    if (event.target.id === "dpClientType")
                        errors.dpClientType = '';
                    //rutvik 13-3-324
                    if (event.target.id === "dpCountry" && this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
                        if (item.text !== Constants.SAUDI_ARABIA_COUNTRY) {
                            // errors.tbxArabicZipCode = "";
                            errors.tbxZipcode = "";
                        }
                    }
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
            var data, _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        data = this.props.selectedClientData;
                        if (!(data !== null)) return [3 /*break*/, 2];
                        _a = data;
                        return [4 /*yield*/, Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.Country)];
                    case 1:
                        _a.Country = _b.sent();
                        this.setState({
                            clientDetail: {
                                lblSocialName: data.Title,
                                lblLegalName: data.LegalName,
                                lblAddressLine1: data.Line1,
                                lblAddressLine2: data.Line2,
                                lblZipcode: data.Zipcode,
                                lblPostalDistrictCity: data.Postal_District_City,
                                lblCountry: data.Country,
                                lblCurrency: data.Currency,
                                lblCountryAreaRegion: data.Country_Area_Region,
                                lblCompanyRegistrationNumber: data.CompanyRegistrationNo,
                                lblSector: data.Sector,
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
                                lblResourceManager: data.ResourceManager,
                                //rutvik 13-3-24
                                lblLegalNameInArabic: data.LegalNameInArabic,
                                lblArabicLine1: data.ArabicLine1,
                                lblArabicLine2: data.ArabicLine2,
                                // lblArabicZipCode: data.ArabicZipCode,
                                lblArabicPostalDistrict: data.ArabicPostalDistrict,
                                lblArabicCountryAreaRegion: data.ArabicCountryAreaRegion
                                //end
                            }
                        });
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.log("ClientData--->", error_2);
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
                        return [4 /*yield*/, this.saveDataOperation()];
                    case 1:
                        if (_a.sent()) {
                            this.clientJson = {
                                SocialName: Utils.TrimData(this.state.clientDetail.lblSocialName),
                                LegalName: Utils.TrimData(this.state.clientDetail.lblLegalName),
                                Line1: Utils.TrimData(this.state.clientDetail.lblAddressLine1),
                                Line2: Utils.TrimData(this.state.clientDetail.lblAddressLine2),
                                Zipcode: Utils.TrimData(this.state.clientDetail.lblZipcode),
                                PostalDistrictCity: Utils.TrimData(this.state.clientDetail.lblPostalDistrictCity),
                                Country: Utils.TrimData(this.state.clientDetail.lblCountry),
                                Currency: Utils.TrimData(this.state.clientDetail.lblCurrency),
                                CountryAreaRegion: Utils.TrimData(this.state.clientDetail.lblCountryAreaRegion),
                                CompanyRegistrationNumber: Utils.TrimData(this.state.clientDetail.lblCompanyRegistrationNumber),
                                Sector: Utils.TrimData(this.state.clientDetail.lblSector),
                                ClientType: Utils.TrimData(this.state.clientDetail.lblClientType),
                                TaxRegistrationNo: Utils.TrimData(this.state.clientDetail.lblTaxRegistrationNo),
                                CustomerRemark4: Utils.TrimData(this.state.clientDetail.lblCustomerRemark4),
                                CustomerRemark5: Utils.TrimData(this.state.clientDetail.lblCustomerRemark5),
                                CustomerRemark8: Utils.TrimData(this.state.clientDetail.lblCustomerRemark8),
                                CustomerRemark7: Utils.TrimData(this.state.clientDetail.lblCustomerRemark7),
                                ClientIDType: Utils.SplitData(this.state.dpClientIDType.value),
                                //rutvik 13-3-24
                                LegalNameInArabic: Utils.TrimData(this.state.clientDetail.lblLegalNameInArabic),
                                ArabicLine1: Utils.TrimData(this.state.clientDetail.lblArabicLine1),
                                ArabicLine2: Utils.TrimData(this.state.clientDetail.lblArabicLine2),
                                // ArabicZipCode: Utils.TrimData(this.state.clientDetail.lblArabicZipCode),
                                ArabicPostalDistrict: Utils.TrimData(this.state.clientDetail.lblArabicPostalDistrict),
                                ArabicCountryAreaRegion: Utils.TrimData(this.state.clientDetail.lblArabicCountryAreaRegion)
                                //end
                            };
                            this.requestJson = {
                                SocialName: this.state.tbxSocialName,
                                LegalName: this.state.tbxLegalName,
                                Line1: this.state.tbxLine1,
                                Line2: this.state.tbxLine2 === null ? "" : this.state.tbxLine2,
                                Zipcode: this.state.tbxZipcode === null ? "" : this.state.tbxZipcode,
                                PostalDistrictCity: this.state.tbxPostalDistrictCity,
                                Country: this.state.dpCountry.value,
                                CountryAreaRegion: this.state.tbxCountryAreaRegion === null ? "" : this.state.tbxCountryAreaRegion,
                                CompanyRegistrationNumber: this.state.tbxCompanyRegistrationNumber === null ? "" : this.state.tbxCompanyRegistrationNumber,
                                Sector: this.state.dpSector.value,
                                ClientType: this.state.dpClientType.value,
                                TaxRegistrationNo: this.state.tbxTaxRegistrationNumber,
                                CustomerRemark4: this.state.tbxCustomerRemark4,
                                CustomerRemark5: this.state.tbxCustomerRemark5,
                                CustomerRemark8: this.state.tbxCustomerRemark8,
                                CustomerRemark7: this.state.tbxCustomerRemark7,
                                ClientIDType: this.state.dpClientIDType.value,
                                //rutvik 13-3-24
                                LegalNameInArabic: this.state.tbxLegalNameInArabic === null ? "" : this.state.tbxLegalNameInArabic,
                                ArabicLine1: this.state.tbxArabicLine1 === null ? "" : this.state.tbxArabicLine1,
                                ArabicLine2: this.state.tbxArabicLine2 === null ? "" : this.state.tbxArabicLine2,
                                // ArabicZipCode: this.state.tbxArabicZipCode === null ? "" : this.state.tbxArabicZipCode,
                                ArabicPostalDistrict: this.state.tbxArabicPostalDistrict === null ? "" : this.state.tbxArabicPostalDistrict,
                                ArabicCountryAreaRegion: this.state.tbxArabicCountryAreaRegion === null ? "" : this.state.tbxArabicCountryAreaRegion,
                            };
                            this.setState({ loading: false }, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.props.dataChange("section2Data", this.state)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.dataChange("requestJson", this.requestJson)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.dataChange("clientJson", this.clientJson)];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.nextStep()];
                                        case 4:
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
            var errors, requestData, clientDataDropDown, i_1, cur, i, valid;
            return __generator(this, function (_a) {
                errors = this.state.errors;
                requestData = ['tbxSocialName', 'tbxLegalName', 'tbxLine1', 'tbxPostalDistrictCity', 'tbxTaxRegistrationNumber'];
                clientDataDropDown = ['lblCountry', 'lblClientType', 'lblSector'];
                for (i_1 = 0; i_1 < requestData.length; i_1++) {
                    if (Utils.CheckRequiredField(this.state[requestData[i_1]]) === false) {
                        errors[requestData[i_1]] = strings.CantLeaveBlankMsg;
                    }
                    else {
                        errors[requestData[i_1]] = "";
                    }
                }
                this.state.dpCountry.value;
                //rutvik 13-3-24 & 28-3-24 validiation of zipcode
                if (this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
                    if (this.state.dpCountry.value === Constants.SAUDI_ARABIA_COUNTRY) {
                        // errors.tbxArabicZipCode = (Utils.CheckRequiredField(this.state.tbxArabicZipCode) === false) ? strings.CantLeaveBlankMsg : (Utils.CheckZipCodeValidationForSaudiCompany(this.state.tbxArabicZipCode) === false) ? strings.ZipCodeValidationString : "";
                        errors.tbxZipcode = (Utils.CheckRequiredField(this.state.tbxZipcode) === false) ? strings.CantLeaveBlankMsg : (Utils.CheckZipCodeValidationForSaudiCompany(this.state.tbxZipcode) === false) ? strings.ZipCodeValidationString : "";
                    }
                    else {
                        // errors.tbxArabicZipCode = "";
                        errors.tbxZipcode = "";
                    }
                    errors.tbxLegalNameInArabic = (Utils.CheckRequiredField(this.state.tbxLegalNameInArabic) === false) ? strings.CantLeaveBlankMsg : "";
                    errors.tbxArabicLine1 = (Utils.CheckRequiredField(this.state.tbxArabicLine1) === false) ? strings.CantLeaveBlankMsg : "";
                    errors.tbxArabicLine2 = (Utils.CheckRequiredField(this.state.tbxArabicLine2) === false) ? strings.CantLeaveBlankMsg : "";
                    errors.tbxArabicPostalDistrict = (Utils.CheckRequiredField(this.state.tbxArabicPostalDistrict) === false) ? strings.CantLeaveBlankMsg : "";
                }
                else {
                    errors.tbxLegalNameInArabic = "";
                    errors.tbxArabicLine1 = "";
                    errors.tbxArabicLine2 = "";
                    errors.tbxArabicPostalDistrict = "";
                    // errors.tbxArabicZipCode = "";
                }
                //end
                //rutvik 6-7 24
                if (this.state.tbxCompany === parseInt(Constants.ITALIAN_COMPANY)) {
                    errors.tbxCustomerRemark4 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark4) === false) ? strings.CantLeaveBlankMsg : "";
                    errors.tbxCustomerRemark5 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark5) === false) ? strings.CantLeaveBlankMsg : "";
                    errors.tbxCustomerRemark8 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark8) === false) ? strings.CantLeaveBlankMsg : ""; //Shraddha test 8
                }
                else {
                    errors.tbxCustomerRemark4 = "";
                    errors.tbxCustomerRemark5 = "";
                    errors.tbxCustomerRemark8 = "";
                }
                cur = "Currency";
                for (i = 0; i < Constants.MASTER_DROPDOWNS_7_8.length; i++) {
                    // Shraddha 12-08-22 item 28 
                    if (Constants.MASTER_DROPDOWNS_7_8[i].name !== cur) {
                        errors[Constants.MASTER_DROPDOWNS_7_8[i].key] = (Utils.CheckRequiredField(this.state[Constants.MASTER_DROPDOWNS_7_8[i].key].value) === false) ? ((Utils.CheckRequiredField(this.state.clientDetail[clientDataDropDown[i]]) === false) ? strings.CantLeaveBlankMsg : "") : "";
                    }
                }
                this.setState({ errors: errors });
                valid = true;
                Object.keys(errors).forEach(function (key) { errors[key].length > 0 ? valid = false : null; });
                return [2 /*return*/, valid];
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
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        tempData = {
                                            Title: Utils.TrimData(this.state.tbxSocialName),
                                            LegalName: Utils.TrimData(this.state.tbxLegalName),
                                            Line1: Utils.TrimData(this.state.tbxLine1),
                                            Line2: Utils.TrimData(this.state.tbxLine2),
                                            Zipcode: Utils.TrimData(this.state.tbxZipcode),
                                            Postal_District_City: Utils.TrimData(this.state.tbxPostalDistrictCity),
                                            Country_Area_Region: Utils.TrimData(this.state.tbxCountryAreaRegion),
                                            Country: this.state.dpCountry.value,
                                            Currency: this.state.clientDetail.lblCurrency,
                                            CompanyRegistrationNo: Utils.TrimData(this.state.tbxCompanyRegistrationNumber),
                                            Sector: this.state.dpSector.value,
                                            ClientType: this.state.dpClientType.value,
                                            TaxRegistrationNo: Utils.TrimData(this.state.tbxTaxRegistrationNumber),
                                            CustomerRemark4: Utils.TrimData(this.state.tbxCustomerRemark4),
                                            CustomerRemark5: Utils.TrimData(this.state.tbxCustomerRemark5),
                                            CustomerRemark8: Utils.TrimData(this.state.tbxCustomerRemark8),
                                            CustomerRemark7: Utils.TrimData(this.state.tbxCustomerRemark7),
                                            ClientIDType: Utils.SplitData(this.state.dpClientIDType.value),
                                            //rutvik employee dp change 3-3-23
                                            ClientLead: this.state.clientDetail.lblClientLead,
                                            CommercialAnalyst: this.state.clientDetail.lblCommercialManager,
                                            Biller: this.state.clientDetail.lblBiller,
                                            ProjectAnalyst: this.state.clientDetail.lblProjectAnalyst,
                                            ResourceManager: this.state.clientDetail.lblResourceManager,
                                            //rutvik 13-3-24
                                            LegalNameInArabic: Utils.TrimData(this.state.tbxLegalNameInArabic),
                                            ArabicLine1: Utils.TrimData(this.state.tbxArabicLine1),
                                            ArabicLine2: Utils.TrimData(this.state.tbxArabicLine2),
                                            // ArabicZipCode: Utils.TrimData(this.state.tbxArabicZipCode),
                                            ArabicPostalDistrict: Utils.TrimData(this.state.tbxArabicPostalDistrict),
                                            ArabicCountryAreaRegion: Utils.TrimData(this.state.tbxArabicCountryAreaRegion)
                                            //end
                                        };
                                        if (!(this.props.itemID > 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    return [2 /*return*/];
                                                });
                                            }); })];
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
            tbxSocialName: this.state.clientDetail.lblSocialName,
            tbxLegalName: this.state.clientDetail.lblLegalName,
            tbxLine1: this.state.clientDetail.lblAddressLine1,
            tbxLine2: this.state.clientDetail.lblAddressLine2,
            tbxZipcode: this.state.clientDetail.lblZipcode,
            tbxPostalDistrictCity: this.state.clientDetail.lblPostalDistrictCity,
            tbxCountryAreaRegion: this.state.clientDetail.lblCountryAreaRegion,
            tbxCompanyRegistrationNumber: this.state.clientDetail.lblCompanyRegistrationNumber,
            tbxTaxRegistrationNumber: this.state.clientDetail.lblTaxRegistrationNo,
            dpCountry: Utils.GetDropdownStateValue(this.state.clientDetail.lblCountry, this.state.dpCountry),
            //dpCurrency: Utils.GetDropdownStateValue(this.state.clientDetail.lblCurrency === null ? this.state.clientDetail.lblCurrency : this.state.clientDetail.lblCurrency.toUpperCase(), this.state.dpCurrency),
            dpSector: Utils.GetDropdownStateValue(this.state.clientDetail.lblSector, this.state.dpSector),
            //rutvik 20-7 25
            //dpClientStatus: Utils.GetDropdownStateValue(this.state.clientDetail.lblClientStatus, this.state.dpClientStatus),
            //endr
            dpClientType: Utils.GetDropdownStateValue(this.state.clientDetail.lblClientType, this.state.dpClientType),
            tbxCustomerRemark4: this.state.clientDetail.lblCustomerRemark4,
            tbxCustomerRemark5: this.state.clientDetail.lblCustomerRemark5,
            tbxCustomerRemark8: this.state.clientDetail.lblCustomerRemark8,
            tbxCustomerRemark7: this.state.clientDetail.lblCustomerRemark7,
            //rutvik 13-3-24
            tbxLegalNameInArabic: this.state.clientDetail.lblLegalNameInArabic,
            tbxArabicLine1: this.state.clientDetail.lblArabicLine1,
            tbxArabicLine2: this.state.clientDetail.lblArabicLine2,
            // tbxArabicZipCode: this.state.clientDetail.lblArabicZipCode,
            tbxArabicPostalDistrict: this.state.clientDetail.lblArabicPostalDistrict,
            tbxArabicCountryAreaRegion: this.state.clientDetail.lblArabicCountryAreaRegion,
            //end
            dpClientIDType: this.state.clientDetail.lblClientIDType !== '' ? Utils.GetDropdownStateValueClientIDType(this.state.clientDetail.lblClientIDType, this.state.dpClientIDType) : this.state.dpClientIDType,
        });
    };
    return Section2;
}(React.Component));
export default Section2;
//# sourceMappingURL=Section2.js.map