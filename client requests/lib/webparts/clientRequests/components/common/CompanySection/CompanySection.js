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
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon, Label } from 'office-ui-fabric-react';
import { isEqual } from '@microsoft/sp-lodash-subset';
import { Web } from 'sp-pnp-js';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
var CardFooter = /** @class */ (function (_super) {
    __extends(CardFooter, _super);
    function CardFooter(props) {
        var _this = _super.call(this, props) || this;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.state = {
            dpCompanyOptions: [],
            dpCompany: '',
            countryOfCompany: '',
            companyValuesWithCountry: '',
            rbtnWorkflowType: 'Standard',
            currentCompanyAccessLevel: '',
            companyAccessLevelCompare: '',
            errors: {
                dpCompany: '',
                rbtnWorkflowType: ''
            }
        };
        return _this;
    }
    CardFooter.prototype.componentWillReceiveProps = function (newProps) {
        if (!isEqual(this.props.dpCompany, newProps.dpCompany)) {
            this.setState({
                dpCompany: Utils.CheckRequiredField(newProps.dpCompany) === false ? '' : (this.state.dpCompanyOptions.filter(function (x) { return x.text === newProps.dpCompany; }).length > 0 ? this.state.dpCompanyOptions.filter(function (x) { return x.text === newProps.dpCompany; })[0].text : ''),
            });
        }
        //rutvik 13-3-24
        if (!isEqual(this.props.countryOfCompany, newProps.countryOfCompany)) {
            this.setState({
                countryOfCompany: newProps.countryOfCompany
            });
        }
        if (!isEqual(this.props.rbtnWorkflowType, newProps.rbtnWorkflowType)) {
            this.setState({
                rbtnWorkflowType: newProps.rbtnWorkflowType
            });
        }
    };
    CardFooter.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, currentUserEmail, companyNumberArray, filteredOptions, companyNumberArrayRange, tempcompanyNumberArrayRange;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.props.setLoader(true);
                        return [4 /*yield*/, Utils.GetMasterListItems(this.objWeb, this.props.context.pageContext.web.serverRelativeUrl + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, 'Company')];
                    case 1:
                        options = _a.sent();
                        return [4 /*yield*/, Utils.GetUserUPNFromGraphAPI(this.props.context)];
                    case 2:
                        currentUserEmail = _a.sent();
                        companyNumberArray = [];
                        filteredOptions = [];
                        companyNumberArrayRange = [];
                        tempcompanyNumberArrayRange = [];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.USERACCESSLEVEL_INTERNALNAME).items.select("CompanyNumber", "Email", "CompanyNumberRange").getAll().then(function (record) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (record != null) {
                                        record.filter(function (tempItem) {
                                            if (tempItem.Email != null) {
                                                if (tempItem.Email.toLowerCase() === currentUserEmail.toLowerCase()) {
                                                    if (tempItem.CompanyNumber != null) {
                                                        companyNumberArray = tempItem.CompanyNumber.split(',');
                                                    }
                                                    if (tempItem.CompanyNumberRange != null) {
                                                        tempItem.CompanyNumberRange = tempItem.CompanyNumberRange.split(',');
                                                        tempItem.CompanyNumberRange.forEach(function (element) {
                                                            tempcompanyNumberArrayRange = element.split('-');
                                                            companyNumberArrayRange = companyNumberArrayRange.concat(tempcompanyNumberArrayRange);
                                                        });
                                                    }
                                                }
                                            }
                                        });
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        options.filter(function (tempItem) {
                            if (tempItem["text"] !== null) {
                                var accessLevelArrayFromItem_1 = [];
                                var accesslevelfound_1 = false;
                                accessLevelArrayFromItem_1 = tempItem["text"].split('-');
                                if (companyNumberArray.length != 0) {
                                    companyNumberArray.forEach(function (element) {
                                        if (accessLevelArrayFromItem_1[0].trim() == element.trim() && accesslevelfound_1 != true) {
                                            filteredOptions.push(tempItem);
                                            accesslevelfound_1 = true;
                                        }
                                    });
                                }
                                if (!accesslevelfound_1 && companyNumberArrayRange.length >= 2) {
                                    for (var i = 0; i < companyNumberArrayRange.length - 1; i++) {
                                        var accessLevel = parseInt(accessLevelArrayFromItem_1[0].trim());
                                        var lowerRange = parseInt(companyNumberArrayRange[i]);
                                        var upperRange = parseInt(companyNumberArrayRange[i + 1]);
                                        if (accessLevel >= lowerRange && accessLevel <= upperRange && accesslevelfound_1 != true) {
                                            filteredOptions.push(tempItem);
                                            accesslevelfound_1 = true;
                                        }
                                        i = i + 1;
                                    }
                                }
                            }
                        });
                        filteredOptions.length > 0 ? this.setState({
                            dpCompanyOptions: filteredOptions.filter(function (x) { return x.IncludeInList === true; })
                        }) : [];
                        //rutvik 13-3-24 , add countryOfCompany
                        this.setState({ dpCompany: this.props.dpCompany, countryOfCompany: this.props.countryOfCompany, rbtnWorkflowType: this.props.rbtnWorkflowType }, function () {
                            _this.props.setLoader(false);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CardFooter.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Companiesvalues, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Utils.GetDropDownValuesForCompany(this.objWeb, this.props.context.pageContext.web.serverRelativeUrl + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, 'Company')];
                    case 1:
                        Companiesvalues = _a.sent();
                        this.setState({ companyValuesWithCountry: Companiesvalues });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("CompanySection/ComponentDidMount-->", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CardFooter.prototype.render = function () {
        return (React.createElement("div", { className: "m-auto", style: { maxWidth: '500px' } },
            React.createElement(React.Fragment, null,
                React.createElement("div", { className: "form-group text-left" },
                    React.createElement("label", null,
                        strings.CompanyFieldLabel,
                        React.createElement("sub", null, "*")),
                    React.createElement(Dropdown, { disabled: this.props.isDisable !== undefined ? (this.props.isDisable === true ? true : false) : false, id: "dpCompany", placeholder: strings.dpPlaceHolder, selectedKey: this.state.dpCompany, options: this.state.dpCompanyOptions, onChange: this._onDpChange.bind(this) }),
                    this.state.errors.dpCompany.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.dpCompany,
                            " ")) : null))));
    };
    CardFooter.prototype.ValidateCompanySection = function () {
        /// <summary>Validate Company Section.</summary>
        var errors = this.state.errors;
        if ((this.props.requestType === strings.RequestType[3] || this.props.requestType === strings.RequestType[4] || this.props.requestType === strings.RequestType[5]) && this.props.itemID > 0 && Utils.CheckRequiredField(this.state.dpCompany) === false) {
            errors.dpCompany = "";
        }
        else {
            errors.dpCompany = (Utils.CheckRequiredField(this.state.dpCompany) === false) ? strings.CantLeaveBlankMsg : "";
        }
        this.props.isWorkflowTypeNeeded ?
            errors.rbtnWorkflowType = (Utils.CheckRequiredField(this.state.rbtnWorkflowType) === false) ? strings.SelectAnyOptionMsg : ""
            : "";
        this.setState({ errors: errors });
        var valid = true;
        Object.keys(errors).forEach(function (key) { errors[key].length > 0 ? valid = false : null; });
        var returnObj = null;
        if (valid) {
            returnObj = {};
            returnObj["dpCompany"] = this.state.dpCompany;
            returnObj["countryOfCompany"] = this.state.countryOfCompany; //rutvik 13-3-24
            this.props.isWorkflowTypeNeeded ? returnObj["rbtnWorkflowType"] = this.state.rbtnWorkflowType
                : "";
        }
        return returnObj;
    };
    CardFooter.prototype._onDpChange = function (event, item) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, coutryOfSelectedCompany, SelectedCompany_1, accessLevels, accessLevelRangeItems, errors;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        coutryOfSelectedCompany = this.state.companyValuesWithCountry.filter(function (x) { return x.key === item.text; });
                        //rutvik 13-3-24
                        this.setState(__assign({}, this.state, (_a = {}, _a[event.target.id] = item.text, _a.countryOfCompany = coutryOfSelectedCompany[0].Country, _a)));
                        if (!(this.props.requestType === strings.RequestType[3] || this.props.requestType === strings.RequestType[6])) return [3 /*break*/, 3];
                        SelectedCompany_1 = item.text.split('-')[0].trim();
                        accessLevels = this.props.accessLevel.split(',');
                        if (!(accessLevels.length > 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.objWeb.lists.getByTitle('AccessLevelRange').items.select().getAll()];
                    case 1:
                        accessLevelRangeItems = _b.sent();
                        accessLevelRangeItems.forEach(function (item) {
                            if (Number(SelectedCompany_1) >= item.LowerRange && Number(SelectedCompany_1) <= item.UpperRange) {
                                _this.setState({ currentCompanyAccessLevel: item.AccessLevel });
                                return true;
                            }
                        });
                        if (this.state.companyAccessLevelCompare !== this.state.currentCompanyAccessLevel) {
                            this.props.setCurrentCompanyAccessLevel(this.state.currentCompanyAccessLevel);
                            this.setState({ companyAccessLevelCompare: this.state.currentCompanyAccessLevel });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.setState({ currentCompanyAccessLevel: this.props.accessLevel });
                        _b.label = 3;
                    case 3:
                        if (this.props.setSelectedCompany !== undefined) {
                            this.props.setSelectedCompany(item.text);
                        }
                        errors = this.state.errors;
                        errors.dpCompany = '';
                        this.setState({ errors: errors });
                        return [2 /*return*/];
                }
            });
        });
    };
    CardFooter.prototype._onRadioBtnChange = function (event) {
        /// <summary>execute when trip type changes</summary
        this.setState({ rbtnWorkflowType: event.target["value"] });
    };
    return CardFooter;
}(React.Component));
export default CardFooter;
//# sourceMappingURL=CompanySection.js.map