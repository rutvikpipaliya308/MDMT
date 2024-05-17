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
import CardFooter from '../../common/CardFooter/CardFooter';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
var Section1 = /** @class */ (function (_super) {
    __extends(Section1, _super);
    function Section1(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.state = {
            dpCompany: '',
            countryOfCompany: '',
            loading: true,
            rbtnWorkflowType: 'Standard',
            requestor: 0,
            itemID: 0,
            office: '',
            folderPath: '',
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
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
                            });
                        }
                        if (this.props.data !== null) {
                            this.setState(__assign({}, this.props.data));
                        }
                        if (this.props.data === null || this.props.data === undefined) {
                            this.setState({ loading: false });
                        }
                        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 6:
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
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "card-primary card-responsible text-center d-table w-auto m-auto", style: { position: "relative" } },
                React.createElement("div", { className: "loading-css", style: { display: this.state.loading ? "block" : "none" } },
                    React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                React.createElement("div", { className: "card-header" },
                    React.createElement("h3", { className: "border-0 pl-0" }, strings.Sec1Question)),
                React.createElement("div", { className: "card-body" },
                    React.createElement(CompanySection, __assign({ ref: this.companySectionRef, isDisable: this.checkIfFieldDisabled("dpCompany") }, this.props, { dpCompany: this.state.dpCompany, countryOfCompany: this.state.countryOfCompany, isWorkflowTypeNeeded: true, rbtnWorkflowType: this.state.rbtnWorkflowType, setLoader: this.SetLoader.bind(this), requestType: strings.RequestType[0], accessLevel: this.props.accessLevel }))),
                React.createElement(CardFooter, __assign({}, this.props, { nextBtnMethod: this._NextClick.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this) })))));
    };
    Section1.prototype.checkIfFieldDisabled = function (tagID) {
        var listOfEditableFieldsSection1 = this.props.listOfEditableFields;
        //Shraddha 08-08-22 item 4
        var currentuser = this.state.currentUserid;
        var requestorid = this.state.requestorid;
        if (this.props.itemSubmitted) { //R fhd change 20-9
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
    Section1.prototype.SaveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var accessLevel, companyNumber, tempData, queryParameters, id, currentUSerID, recordSaved, folderPath, body, tempBody, error_1, errordata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, 15, 16]);
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
                            ReqContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID) //FHD change 19-9-23
                        };
                        // Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);	
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody)];
                    case 11:
                        // Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);	
                        _a.sent();
                        _a.label = 12;
                    case 12: return [3 /*break*/, 16];
                    case 13:
                        error_1 = _a.sent();
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
                        return [3 /*break*/, 16];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    Section1.prototype.SetLoader = function (status) {
        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ loading: status });
        }
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
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.companySectionRef.current.ValidateCompanySection();
                        if (data === null) {
                            this.setState({ loading: false }); //9-2-23
                            return [2 /*return*/, false];
                        }
                        this.setState({
                            dpCompany: data.dpCompany,
                            countryOfCompany: data.countryOfCompany,
                            rbtnWorkflowType: data.rbtnWorkflowType,
                        });
                        return [4 /*yield*/, this.SaveData(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return Section1;
}(React.Component));
export default Section1;
//# sourceMappingURL=Section1.js.map