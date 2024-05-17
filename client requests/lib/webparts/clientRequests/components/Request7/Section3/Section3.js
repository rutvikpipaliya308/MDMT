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
var Section3 = /** @class */ (function (_super) {
    __extends(Section3, _super);
    function Section3(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.isRequest8 = _this.props.requestType === "8";
        _this.state = {
            loading: true,
            tbxContactComNo: '',
            dpCountry: { value: '', options: [] },
            dpSector: { value: '', options: [] },
            dpCurrency: { value: '', options: [] },
            dpExcludedFromClientInvoiceReminder: { value: strings.strNo, options: Constants.EXCLUDEFROMCLIENTINVOICEREMINDER },
            //dpClientStatus: { value: '', options: [] },
            dpClientType: { value: '', options: [] },
            tbxSocialName: '',
            tbxLegalNameInArabic: '',
            tbxLine2: '',
            tbxZipcode: '',
            tbxPostal: '',
            tbxCountryArea: '',
            tbxClientAttenName: '',
            tbxEmail: '',
            tbxFinanceEmail: '',
            tbxPhoneNo: '',
            tbxCompanyRegNo: '',
            currentUserid: '',
            requestorid: '',
            tbxArabicLine1: '',
            tbxArabicLine2: '',
            // tbxArabicZipcode: '',
            tbxArabicPostal: '',
            tbxArabicCountryArea: '',
            Boolean3Value: false,
            errors: {
                tbxSocialName: '',
                tbxLegalNameInArabic: '',
                tbxPostal: '',
                dpCountry: '',
                tbxClientAttenName: '',
                tbxEmail: '',
                tbxFinanceEmail: '',
                tbxPhoneNo: '',
                dpCurrency: '',
                dpSector: '',
                //dpClientStatus: '',
                dpClientType: '',
                dpExcludedFromClientInvoiceReminder: '',
                tbxZipcode: '',
                tbxArabicLine1: '',
                tbxArabicLine2: '',
                // tbxArabicZipcode: '',
                tbxArabicPostal: '',
                tbxArabicCountryArea: '',
            },
            itemID: 0
        };
        return _this;
    }
    Section3.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var item_1, viewXML, tempData, tempArray_1, stateData, currentUserID, requestoridd, Companiesvalues, CurrentRequestData, Boolean3OfSelectedCompany, errors, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        item_1 = null;
                        if (!this.isRequest8) return [3 /*break*/, 2];
                        viewXML = "<View>\n            <ViewFields>\n            <FieldRef Name=\"ID\"></FieldRef>\n            <FieldRef Name=\"Title\"></FieldRef>\n            <FieldRef Name=\"ClientCompanyNo\"></FieldRef>\n            <FieldRef Name=\"Sector\"></FieldRef>            \n            <FieldRef Name=\"ClientType\"></FieldRef>\n            <FieldRef Name=\"Country\"></FieldRef>\n            <FieldRef Name=\"ClientAttentionName\"></FieldRef>\n            <FieldRef Name=\"PhoneNo\"></FieldRef>\n            <FieldRef Name=\"Email\"></FieldRef>\n            </ViewFields>\n            <RowLimit>1</RowLimit><Query><Where>\n            <Eq><FieldRef Name=\"ClientCompanyNo\"/><Value Type=\"Text\">" + this.props.contactCompanyNo + "</Value></Eq>  \n            </Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query></View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.CONTACTCOMPANY_INTERNALANAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray_1 = [];
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
                            if (tempItem.ClientCompanyNo == _this.props.contactCompanyNo && isAccessLevelPresent) {
                                tempArray_1.push(tempItem);
                            }
                        });
                        tempArray_1.sort(function (a, b) { return (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0); });
                        item_1 = tempArray_1[0];
                        if (item_1 !== null) {
                            this.setState({
                                tbxContactComNo: item_1["ClientCompanyNo"],
                                tbxSocialName: item_1["Title"],
                                dpSector: Utils.GetDropdownStateValue(item_1["Sector"], this.state.dpSector),
                                //dpClientStatus: Utils.GetDropdownStateValue(item["ClientStatus"], this.state.dpClientStatus),
                                dpClientType: Utils.GetDropdownStateValue(item_1["ClientType"], this.state.dpClientType),
                                dpCountry: Utils.GetDropdownStateValue(item_1["Country"], this.state.dpCountry),
                                tbxClientAttenName: item_1["ClientAttentionName"],
                                tbxPhoneNo: item_1["PhoneNo"],
                                tbxEmail: item_1["Email"],
                                tbxFinanceEmail: item_1["FinanceEmail"],
                                dpExcludedFromClientInvoiceReminder: Utils.GetDropdownStateValue(item_1["ExcludeFromClientInvoiceReminder"] === true ? strings.strYes : strings.strNo, this.state.dpExcludedFromClientInvoiceReminder)
                            });
                            //rutvik 29-3-24
                            if (this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
                                this.setState({
                                    tbxLegalNameInArabic: item_1["LegalNameInArabic"],
                                    tbxArabicLine1: item_1["ArabicLine1"],
                                    tbxArabicLine2: item_1["ArabicLine2"],
                                    // tbxArabicZipcode: item["ArabicZipCode"],
                                    tbxArabicPostal: item_1["ArabicPostalDistrict"],
                                    tbxArabicCountryArea: item_1["ArabicCountryAreaRegion"],
                                });
                            }
                        }
                        _a.label = 2;
                    case 2:
                        if (!(this.props.data === null || this.props.data === undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.BindData()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (this.props.listData !== null && (this.props.data === null || this.props.data === undefined)) {
                            this.setState({
                                tbxLine2: this.props.listData["Line2"],
                                tbxZipcode: this.props.listData["Zipcode"],
                                tbxPostal: this.props.listData["Postal_District_City"],
                                tbxCountryArea: this.props.listData["Country_Area_Region"],
                                tbxCompanyRegNo: this.props.listData["CompanyRegistrationNo"],
                                dpCurrency: Utils.GetDropdownStateValue(this.props.listData["Currency"], this.state.dpCurrency),
                                //rutvik 13-3-2024
                                tbxLegalNameInArabic: this.props.listData["LegalNameInArabic"],
                                tbxArabicLine1: this.props.listData["ArabicLine1"],
                                tbxArabicLine2: this.props.listData["ArabicLine2"],
                                // tbxArabicZipcode: this.props.listData["ArabicZipCode"],
                                tbxArabicPostal: this.props.listData["ArabicPostalDistrict"],
                                tbxArabicCountryArea: this.props.listData["ArabicCountryAreaRegion"],
                                tbxFinanceEmail: this.props.listData["FinanceEmail"],
                                //end
                                dpExcludedFromClientInvoiceReminder: Utils.GetDropdownStateValue(this.props.listData["ExcludeFromClientInvoiceReminder"] === true ? strings.strYes : strings.strNo, this.state.dpExcludedFromClientInvoiceReminder) //rutvik 29-3-24
                            });
                            //rutvik 13-3-24
                            if (this.props.CountryOfCompany !== Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
                                this.setState({
                                    tbxLegalNameInArabic: '',
                                    tbxArabicLine1: '',
                                    tbxArabicLine2: '',
                                    // tbxArabicZipcode: '',
                                    tbxArabicPostal: '',
                                    tbxArabicCountryArea: '',
                                });
                            }
                            stateData = {};
                            this.props.listData["Title"] !== null && this.props.listData["Title"] !== "" ? stateData["tbxSocialName"] = this.props.listData["Title"] : null;
                            this.props.listData["Email"] !== null && this.props.listData["Email"] !== "" ? stateData["tbxEmail"] = this.props.listData["Email"] : null;
                            this.props.listData["FinanceEmail"] !== null && this.props.listData["FinanceEmail"] !== "" ? stateData["tbxFinanceEmail"] = this.props.listData["FinanceEmail"] : null; //rutvik 29-3-24
                            this.props.listData["PhoneNo"] !== null && this.props.listData["PhoneNo"] !== "" ? stateData["tbxPhoneNo"] = this.props.listData["PhoneNo"] : null;
                            this.props.listData["ClientAttentionName"] !== null && this.props.listData["ClientAttentionName"] !== "" ? stateData["tbxClientAttenName"] = this.props.listData["ClientAttentionName"] : null;
                            this.props.listData["Country"] !== null && this.props.listData["Country"] !== "" ? stateData["dpCountry"] = Utils.GetDropdownStateValue(this.props.listData["Country"], this.state.dpCountry) : null;
                            this.props.listData["Sector"] !== null && this.props.listData["Sector"] !== "" ? stateData["dpSector"] = Utils.GetDropdownStateValue(this.props.listData["Sector"], this.state.dpSector) : null;
                            //this.props.listData["ClientStatus"] !== null && this.props.listData["ClientStatus"] !== "" ? stateData["dpClientStatus"] = Utils.GetDropdownStateValue(this.props.listData["ClientStatus"], this.state.dpClientStatus) : null;
                            this.props.listData["ClientType"] !== null && this.props.listData["ClientType"] !== "" ? stateData["dpClientType"] = Utils.GetDropdownStateValue(this.props.listData["ClientType"], this.state.dpClientType) : null;
                            if (!this.isRequest8) {
                                this.setState(__assign({}, stateData));
                            }
                            else if (this.isRequest8 && this.state.tbxContactComNo === this.props.listData["ContactCompanyNo"]) {
                                this.setState(__assign({}, stateData));
                            }
                        }
                        if (this.props.data !== null && this.props.data !== undefined) {
                            this.setState(__assign({}, this.props.data), function () {
                                if (_this.isRequest8 && _this.props.data.tbxContactComNo !== _this.props.contactCompanyNo && item_1 !== null) {
                                    _this.setState({
                                        tbxContactComNo: item_1["ClientCompanyNo"],
                                        tbxSocialName: item_1["Title"],
                                        dpSector: Utils.GetDropdownStateValue(item_1["Sector"], _this.state.dpSector),
                                        //dpClientStatus: Utils.GetDropdownStateValue(item["ClientStatus"], this.state.dpClientStatus),
                                        dpClientType: Utils.GetDropdownStateValue(item_1["ClientType"], _this.state.dpClientType),
                                        dpCountry: Utils.GetDropdownStateValue(item_1["Country"], _this.state.dpCountry),
                                        tbxClientAttenName: item_1["ClientAttentionName"] === null ? "" : item_1["ClientAttentionName"],
                                        tbxPhoneNo: item_1["PhoneNo"] === null ? "" : item_1["PhoneNo"],
                                        tbxEmail: item_1["Email"] === null ? "" : item_1["Email"],
                                        tbxFinanceEmail: item_1["FinanceEmail"] === null ? "" : item_1["FinanceEmail"],
                                        dpExcludedFromClientInvoiceReminder: Utils.GetDropdownStateValue(item_1["ExcludeFromClientInvoiceReminder"] === true ? strings.strYes : strings.strNo, _this.state.dpExcludedFromClientInvoiceReminder) //rutvik 29-3-24
                                    });
                                }
                            });
                            //rutvik 13-3-24
                            if (this.props.CountryOfCompany !== Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
                                this.setState({
                                    tbxLegalNameInArabic: '',
                                    tbxArabicLine1: '',
                                    tbxArabicLine2: '',
                                    // tbxArabicZipcode: '',
                                    tbxArabicPostal: '',
                                    tbxArabicCountryArea: '',
                                });
                            }
                        }
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 5:
                        currentUserID = _a.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        return [4 /*yield*/, Utils.GetDropDownValuesForCompany(this.objWeb, this.props.context.pageContext.web.serverRelativeUrl + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, 'Company')];
                    case 6:
                        Companiesvalues = _a.sent();
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select('Company').get()];
                    case 7:
                        CurrentRequestData = _a.sent();
                        Boolean3OfSelectedCompany = Companiesvalues.filter(function (x) { return x.key === CurrentRequestData.Company; });
                        this.setState({ Boolean3Value: Boolean3OfSelectedCompany[0].Boolean3 });
                        if (!this.state.Boolean3Value) {
                            errors = this.state.errors;
                            errors.tbxFinanceEmail = "";
                            this.setState(__assign({}, this.state, { errors: errors }));
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        console.log("Request7/Section3.tsx/ComponentWillMount-->", error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Section3.prototype.render = function () {
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "card-primary", style: { position: "relative" } },
                React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                React.createElement("div", { className: "card-header" },
                    React.createElement("h3", null, strings.Section3Title)),
                React.createElement("div", { className: "card-body" },
                    this.isRequest8 ? React.createElement(React.Fragment, null,
                        React.createElement("h6", null, strings.Lbl_ContactCompany),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                React.createElement("label", null, strings.Lbl_ContactCompanyNo),
                                React.createElement("input", { id: "tbxContactComNo", disabled: true, className: "form-control", type: "text", value: this.state.tbxContactComNo, placeholder: "", maxLength: 255 })))) : "",
                    React.createElement("h6", null, strings.Lbl_Name),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_SocialName,
                                React.createElement("sub", null, "*")),
                            React.createElement("input", { id: "tbxSocialName", disabled: this.checkIfFieldDisabled("tbxSocialName"), className: "form-control", type: "text", value: this.state.tbxSocialName, placeholder: "", onChange: this._onTbxChange.bind(this), maxLength: 255 }),
                            this.state.errors.tbxSocialName.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.tbxSocialName,
                                    " ")) : null),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null, strings.Lbl_LegalName),
                            React.createElement("input", { id: "tbxlegalName", className: "form-control", type: "text", value: this.props.section2Data.tbxlegalName, placeholder: "", maxLength: 255, disabled: true })),
                        this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
                            React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", { className: 'arabic-right-text' },
                                        strings.Lbl_LegalNameInArabic,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxLegalNameInArabic", className: "form-control", dir: "rtl", type: "text", disabled: this.checkIfFieldDisabled("tbxLegalNameInArabic"), value: this.state.tbxLegalNameInArabic, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this) }),
                                    this.state.errors.tbxLegalNameInArabic.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxLegalNameInArabic,
                                            " ")) : null))
                            : null),
                    React.createElement("h6", null, strings.Lbl_Address),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null, strings.Lbl_Line1),
                            React.createElement("input", { id: "tbxLine1", className: "form-control", type: "text", value: this.props.section2Data.tbxLine1, placeholder: "", maxLength: 255, disabled: true })),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null, strings.Lbl_Line2),
                            React.createElement("input", { id: "tbxLine2", disabled: this.checkIfFieldDisabled("tbxLine2"), className: "form-control", type: "text", value: this.state.tbxLine2, placeholder: "", onChange: this._onTbxChange.bind(this), maxLength: 255 })),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_ZipCode,
                                this.state.dpCountry.value === Constants.SAUDI_ARABIA_COUNTRY && this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ? React.createElement("sub", null, "*") : null),
                            React.createElement("input", { id: "tbxZipcode", disabled: this.checkIfFieldDisabled("tbxZipcode"), className: "form-control", type: "text", value: this.state.tbxZipcode, placeholder: "", onChange: this._onTbxChange.bind(this) }),
                            this.state.errors.tbxZipcode.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.tbxZipcode,
                                    " ")) : null),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_Postal,
                                React.createElement("sub", null, "*")),
                            React.createElement("input", { id: "tbxPostal", disabled: this.checkIfFieldDisabled("tbxPostal"), className: "form-control", type: "text", value: this.state.tbxPostal, placeholder: "", onChange: this._onTbxChange.bind(this) }),
                            this.state.errors.tbxPostal.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.tbxPostal,
                                    " ")) : null),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null, strings.Lbl_CountryArea),
                            React.createElement("input", { id: "tbxCountryArea", disabled: this.checkIfFieldDisabled("tbxCountryArea"), className: "form-control", type: "text", value: this.state.tbxCountryArea, placeholder: "", onChange: this._onTbxChange.bind(this) })),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_Country,
                                React.createElement("sub", null, "*")),
                            React.createElement(Dropdown, { id: "dpCountry", disabled: this.checkIfFieldDisabled("dpCountry"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpCountry.value, options: this.state.dpCountry.options, onChange: this._onDpChange.bind(this) }),
                            this.state.errors.dpCountry.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.dpCountry,
                                    " ")) : null)),
                    this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
                        React.createElement(React.Fragment, null,
                            React.createElement("h6", null, strings.Lbl_ArabicAddress),
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", { className: 'arabic-right-text' },
                                        strings.Lbl_ArabicLine1,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxArabicLine1", className: "form-control", dir: "rtl", type: "text", value: this.state.tbxArabicLine1, placeholder: "", maxLength: 255, onChange: this._onTbxChange.bind(this), disabled: this.checkIfFieldDisabled("tbxArabicLine1") }),
                                    this.state.errors.tbxArabicLine1.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxArabicLine1,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", { className: 'arabic-right-text' },
                                        strings.Lbl_ArabicLine2,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxArabicLine2", disabled: this.checkIfFieldDisabled("tbxArabicLine2"), className: "form-control", dir: "rtl", type: "text", value: this.state.tbxArabicLine2, placeholder: "", onChange: this._onTbxChange.bind(this), maxLength: 255 }),
                                    this.state.errors.tbxArabicLine2.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxArabicLine2,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", { className: 'arabic-right-text' },
                                        strings.Lbl_ArabicPostal,
                                        React.createElement("sub", null, "*")),
                                    React.createElement("input", { id: "tbxArabicPostal", disabled: this.checkIfFieldDisabled("tbxArabicPostal"), className: "form-control", dir: "rtl", type: "text", value: this.state.tbxArabicPostal, placeholder: "", onChange: this._onTbxChange.bind(this) }),
                                    this.state.errors.tbxArabicPostal.length > 0 ? React.createElement("span", null,
                                        " ",
                                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                        React.createElement(Label, { className: "errormessage" },
                                            this.state.errors.tbxArabicPostal,
                                            " ")) : null),
                                React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                    React.createElement("label", { className: 'arabic-right-text' }, strings.Lbl_ArabicCountryArea),
                                    React.createElement("input", { id: "tbxArabicCountryArea", disabled: this.checkIfFieldDisabled("tbxArabicCountryArea"), className: "form-control", dir: "rtl", type: "text", value: this.state.tbxArabicCountryArea, placeholder: "", onChange: this._onTbxChange.bind(this) })))) : null,
                    React.createElement("h6", null, strings.Lbl_ContactDetails),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null, strings.Lbl_ClientAttentionName),
                            React.createElement("input", { id: "tbxClientAttenName", disabled: this.checkIfFieldDisabled("tbxClientAttenName"), className: "form-control", type: "text", value: this.state.tbxClientAttenName, placeholder: "", onChange: this._onTbxChange.bind(this) })),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_EmailAddress,
                                React.createElement("sub", null, "*")),
                            React.createElement("input", { id: "tbxEmail", disabled: this.checkIfFieldDisabled("tbxEmail"), className: "form-control", type: "email", value: this.state.tbxEmail, placeholder: "", onChange: this._onTbxChange.bind(this) }),
                            this.state.errors.tbxEmail.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.tbxEmail,
                                    " ")) : null),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_PhoneNo,
                                React.createElement("sub", null, "*")),
                            React.createElement("input", { id: "tbxPhoneNo", disabled: this.checkIfFieldDisabled("tbxPhoneNo"), className: "form-control", type: "text", value: this.state.tbxPhoneNo, placeholder: "", onChange: this._onTbxChange.bind(this) }),
                            this.state.errors.tbxPhoneNo.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.tbxPhoneNo,
                                    " ")) : null),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_FinanceEmailAddress,
                                this.state.Boolean3Value ? React.createElement("sub", null, "*") : null),
                            React.createElement("input", { id: "tbxFinanceEmail", disabled: this.checkIfFieldDisabled("tbxFinanceEmail"), className: "form-control", type: "text", value: this.state.tbxFinanceEmail, placeholder: "", onChange: this._onTbxChange.bind(this) }),
                            this.state.errors.tbxFinanceEmail.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.tbxFinanceEmail,
                                    " ")) : null),
                        this.state.Boolean3Value ?
                            React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                                React.createElement("label", null,
                                    strings.Lbl_ExcludedFromClientInvoiceReminders,
                                    React.createElement("sub", null, "*")),
                                React.createElement(Dropdown, { id: "dpExcludedFromClientInvoiceReminder", disabled: this.checkIfFieldDisabled("dpExcludedFromClientInvoiceReminder"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpExcludedFromClientInvoiceReminder.value, options: this.state.dpExcludedFromClientInvoiceReminder.options, onChange: this._onDpChange.bind(this) }),
                                this.state.errors.dpExcludedFromClientInvoiceReminder.length > 0 ? React.createElement("span", null,
                                    " ",
                                    React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                    React.createElement(Label, { className: "errormessage" },
                                        this.state.errors.dpExcludedFromClientInvoiceReminder,
                                        " ")) : null) : null),
                    React.createElement("h6", null, strings.Lbl_GeneralInfo),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_Currency,
                                React.createElement("sub", null, "*")),
                            React.createElement(Dropdown, { id: "dpCurrency", disabled: this.checkIfFieldDisabled("dpCurrency"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpCurrency.value, options: this.state.dpCurrency.options, onChange: this._onDpChange.bind(this) }),
                            this.state.errors.dpCurrency.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.dpCurrency,
                                    " ")) : null),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null, strings.Lbl_CompanyRegNo),
                            React.createElement("input", { id: "tbxCompanyRegNo", disabled: this.checkIfFieldDisabled("tbxCompanyRegNo"), className: "form-control", type: "text", value: this.state.tbxCompanyRegNo, placeholder: "", onChange: this._onTbxChange.bind(this) })),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_Sector,
                                React.createElement("sub", null, "*")),
                            React.createElement(Dropdown, { id: "dpSector", disabled: this.checkIfFieldDisabled("dpSector"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpSector.value, options: this.state.dpSector.options, onChange: this._onDpChange.bind(this) }),
                            this.state.errors.dpSector.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.dpSector,
                                    " ")) : null),
                        React.createElement("div", { className: "form-group col-sm-6 col-md-6 col-lg-4" },
                            React.createElement("label", null,
                                strings.Lbl_ClientType,
                                React.createElement("sub", null, "*")),
                            React.createElement(Dropdown, { id: "dpClientType", disabled: this.checkIfFieldDisabled("dpClientType"), placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpClientType.value, options: this.state.dpClientType.options, onChange: this._onDpChange.bind(this) }),
                            this.state.errors.dpClientType.length > 0 ? React.createElement("span", null,
                                " ",
                                React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                                React.createElement(Label, { className: "errormessage" },
                                    this.state.errors.dpClientType,
                                    " ")) : null))),
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
    //Shraddha 12-08-22 item 28
    Section3.prototype.BindData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempStateObj, i, options, tempObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempStateObj = {};
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < Constants.MASTER_DROPDOWNS_7_8.length)) return [3 /*break*/, 4];
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
                    case 4:
                        tempStateObj["loading"] = false;
                        this.setState(__assign({}, tempStateObj));
                        return [2 /*return*/];
                }
            });
        });
    };
    Section3.prototype.ValidateSection3 = function () {
        /// <summary>Validate section 3.</summary>
        var errors = this.state.errors;
        for (var i = 0; i < Constants.MASTER_DROPDOWNS_7_8.length; i++) {
            errors[Constants.MASTER_DROPDOWNS_7_8[i].key] = (Utils.CheckRequiredField(this.state[Constants.MASTER_DROPDOWNS_7_8[i].key].value) === false) ? strings.CantLeaveBlankMsg : "";
        }
        errors.tbxSocialName = (Utils.CheckRequiredField(this.state.tbxSocialName) === false) ? strings.CantLeaveBlankMsg : "";
        errors.tbxPostal = (Utils.CheckRequiredField(this.state.tbxPostal) === false) ? strings.CantLeaveBlankMsg : "";
        // errors.tbxClientAttenName = (Utils.CheckRequiredField(this.state.tbxClientAttenName) === false) ? strings.CantLeaveBlankMsg : "";
        errors.tbxEmail = Utils.CheckRequiredField(this.state.tbxEmail) === false ? strings.CantLeaveBlankMsg : "";
        errors.tbxPhoneNo = (Utils.CheckRequiredField(this.state.tbxPhoneNo) === false) ? strings.CantLeaveBlankMsg : "";
        //rutvik 13-3-24 & 28-3-24 validation of zip code
        if (this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
            if (this.state.dpCountry.value == Constants.SAUDI_ARABIA_COUNTRY) {
                errors.tbxZipcode = (Utils.CheckRequiredField(this.state.tbxZipcode) === false) ? strings.CantLeaveBlankMsg : (Utils.CheckZipCodeValidationForSaudiCompany(this.state.tbxZipcode) == false) ? strings.ZipCodeValidationString : "";
                // errors.tbxArabicZipcode = (Utils.CheckRequiredField(this.state.tbxArabicZipcode) === false) ? strings.CantLeaveBlankMsg : (Utils.CheckZipCodeValidationForSaudiCompany(this.state.tbxArabicZipcode) == false) ? strings.ZipCodeValidationString : "";
            }
            else {
                errors.tbxZipcode = "";
            }
            errors.tbxLegalNameInArabic = (Utils.CheckRequiredField(this.state.tbxLegalNameInArabic) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxArabicLine1 = (Utils.CheckRequiredField(this.state.tbxArabicLine1) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxArabicLine2 = (Utils.CheckRequiredField(this.state.tbxArabicLine2) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxArabicPostal = (Utils.CheckRequiredField(this.state.tbxArabicPostal) === false) ? strings.CantLeaveBlankMsg : "";
            //end
        }
        else {
            errors.tbxLegalNameInArabic = "";
            errors.tbxArabicLine1 = "";
            errors.tbxArabicLine2 = "";
            errors.tbxArabicPostal = "";
            // errors.tbxArabicZipcode = "";
        }
        //rutvik 29-3-24
        if (this.state.Boolean3Value) {
            errors.tbxFinanceEmail = (Utils.CheckRequiredField(this.state.tbxFinanceEmail) === false) ? strings.CantLeaveBlankMsg : "";
            errors.dpExcludedFromClientInvoiceReminder = (Utils.CheckRequiredField(this.state.dpExcludedFromClientInvoiceReminder.value) === false) ? strings.CantLeaveBlankMsg : "";
        }
        else {
            errors.tbxFinanceEmail = "";
            errors.dpExcludedFromClientInvoiceReminder = "";
        }
        this.setState({ errors: errors });
        var valid = true;
        Object.keys(errors).forEach(function (key) { errors[key].length > 0 ? valid = false : null; });
        return valid;
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
                            Title: Utils.TrimData(this.state.tbxSocialName),
                            Line2: Utils.TrimData(this.state.tbxLine2),
                            Zipcode: Utils.TrimData(this.state.tbxZipcode),
                            Postal_District_City: Utils.TrimData(this.state.tbxPostal),
                            Country_Area_Region: Utils.TrimData(this.state.tbxCountryArea),
                            Country: this.state.dpCountry.value,
                            Currency: this.state.dpCurrency.value,
                            CompanyRegistrationNo: Utils.TrimData(this.state.tbxCompanyRegNo),
                            Email: Utils.TrimData(this.state.tbxEmail),
                            PhoneNo: Utils.TrimData(this.state.tbxPhoneNo),
                            ClientAttentionName: Utils.TrimData(this.state.tbxClientAttenName),
                            Sector: this.state.dpSector.value,
                            //rutvik 20-7 25
                            //ClientStatus: this.state.dpClientStatus.value,
                            //endr
                            ClientType: this.state.dpClientType.value,
                            //Rutvik 13-3-24
                            LegalNameInArabic: Utils.TrimData(this.state.tbxLegalNameInArabic),
                            ArabicLine1: Utils.TrimData(this.state.tbxArabicLine1),
                            ArabicLine2: Utils.TrimData(this.state.tbxArabicLine2),
                            // ArabicZipCode: Utils.TrimData(this.state.tbxArabicZipcode),
                            ArabicPostalDistrict: Utils.TrimData(this.state.tbxArabicPostal),
                            ArabicCountryAreaRegion: Utils.TrimData(this.state.tbxArabicCountryArea),
                            //end
                            FinanceEmail: Utils.TrimData(this.state.tbxFinanceEmail),
                            ExcludeFromClientInvoiceReminder: this.state.Boolean3Value ? this.state.dpExcludedFromClientInvoiceReminder.value === strings.strYes ? true : false : false //rutvik 29-3-24
                        };
                        if (this.isRequest8) {
                            tempData["ContactCompanyNo"] = Utils.TrimData(this.state.tbxContactComNo);
                        }
                        if (!(this.props.itemID > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then(function (res) {
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        error_2 = _a.sent();
                        console.log("section 3 save data", error_2);
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
    Section3.prototype._onTbxChange = function (event) {
        var _a;
        /// <summary>Textbox change event.</summary>
        event.preventDefault();
        var _b = event.target, id = _b.id, value = _b.value;
        this.setState(__assign({}, this.state, (_a = {}, _a[id] = value, _a)));
        //rutvik validate change
        var errors = this.state.errors;
        if (id === "tbxSocialName")
            errors.tbxSocialName = '';
        if (id === "tbxPostal")
            errors.tbxPostal = '';
        if (id === "tbxZipcode")
            errors.tbxZipcode = ''; //rutvik 13-3-24
        if (id === "tbxClientAttenName")
            errors.tbxClientAttenName = '';
        if (id === "tbxEmail")
            errors.tbxEmail = '';
        if (id === "tbxPhoneNo")
            errors.tbxPhoneNo = '';
        //rutvik 13-3-24        
        if (id === "tbxLegalNameInArabic")
            errors.tbxLegalNameInArabic = '';
        if (id === "tbxArabicLine1")
            errors.tbxArabicLine1 = '';
        if (id === "tbxArabicLine2")
            errors.tbxArabicLine2 = '';
        // if (id === "tbxArabicZipcode") errors.tbxArabicZipcode = '';
        if (id === "tbxArabicPostal")
            errors.tbxArabicPostal = '';
        //rutvik 29-3-24
        if (id === "tbxFinanceEmail")
            errors.tbxFinanceEmail = "",
                this.setState({ errors: errors });
        //end        
    };
    Section3.prototype._onDpChange = function (event, item) {
        var _a;
        // <summary>Event called on dropdown value change.</summary>
        var tempObj = this.state[event.target.id];
        tempObj.value = item.text;
        this.setState(__assign({}, this.state, (_a = {}, _a[event.target.id] = tempObj, _a)));
        //rutvik validate change
        var errors = this.state.errors;
        if (event.target.id === "dpCountry")
            errors.dpCountry = '';
        if (event.target.id === "dpCurrency")
            errors.dpCurrency = '';
        if (event.target.id === "dpSector")
            errors.dpSector = '';
        if (event.target.id === "dpClientType")
            errors.dpClientType = '';
        if (event.target.id == "dpExcludedFromClientInvoiceReminder")
            errors.dpExcludedFromClientInvoiceReminder = ''; //rutvik 29-3-24
        //rutvik 13-3-2024
        if (event.target.id === "dpCountry" && item.text !== Constants.SAUDI_ARABIA_COUNTRY) {
            errors.tbxZipcode = '';
            // errors.tbxArabicZipcode = '';
        }
        this.setState({ errors: errors });
        //end        
    };
    Section3.prototype._NextClick = function () {
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
                            this.setState({ loading: false }, function () {
                                _this.props.dataChange("section3Data", _this.state);
                                _this.props.nextStep();
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Section3.prototype._BackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /// <summary>Back button event.</summary>
                this.props.dataChange("section3Data", this.state);
                this.props.backStep();
                return [2 /*return*/];
            });
        });
    };
    Section3.prototype._SaveForLaterClick = function () {
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
    Section3.prototype.SaveDataOperations = function () {
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
    return Section3;
}(React.Component));
export default Section3;
//# sourceMappingURL=Section3.js.map