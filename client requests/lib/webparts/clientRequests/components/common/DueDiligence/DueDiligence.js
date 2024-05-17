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
import * as CommonConstants from '../../../Constants';
import * as Utils from '../../Utils';
import { Web } from 'sp-pnp-js';
import ClipLoader from "react-spinners/ClipLoader";
import CardFooter from '../CardFooter/CardFooter';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon, Label } from 'office-ui-fabric-react';
var DueDiligence = /** @class */ (function (_super) {
    __extends(DueDiligence, _super);
    function DueDiligence(props) {
        var _this = _super.call(this, props) || this;
        _this.questions = [];
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.state = {
            dpDDOptions: [{ questionKey: '', key: '' }],
            loading: true,
            rbtnWorkflowType: "Standard",
            itemID: 0,
            folderPath: '',
            questions: [],
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
            errors: {
                dpDDOptions: '',
                rbtnWorkflowType: ''
            },
            requestType: ''
        };
        return _this;
    }
    DueDiligence.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, currentUserID, requestoridd;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.setState({ loading: true });
                        if (!(this.props.requestType === "7")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setState({ requestType: strings.RequestType[0] })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.props.requestType === "8")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.setState({ requestType: strings.RequestType[1] })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.getDueDiligenceQuestions()];
                    case 5:
                        _b.sent();
                        if (!(this.props.itemID > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.setState({ itemID: this.props.itemID })];
                    case 6:
                        _a = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _a = null;
                        _b.label = 8;
                    case 8:
                        _a;
                        return [4 /*yield*/, this.ShowHideDependentQuestions()];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, this.setState({ loading: false })];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 11:
                        currentUserID = _b.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        return [2 /*return*/];
                }
            });
        });
    };
    DueDiligence.prototype.ShowHideDependentQuestions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempQuestions, replacedTempQuestions, tempQuestion, selectedAnswerKey, tempQuestionOptions, selectedAnswerText, rh;
            return __generator(this, function (_a) {
                tempQuestions = this.state.questions;
                tempQuestions = this.state["questions"];
                replacedTempQuestions = this.state["questions"];
                selectedAnswerText = [];
                rh = this;
                tempQuestions.some(function (tempItem, i) {
                    if (tempItem.IsDependentOnQuestion) {
                        tempQuestion = tempItem.DependentQuestionID ? tempQuestions.filter(function (x) { return x.key === tempItem.DependentQuestionID; })[0] : "";
                        selectedAnswerKey = tempQuestion ? tempQuestion.selectedAnswers : [];
                        tempQuestionOptions = tempQuestion ? tempQuestion.options.options : [];
                        if (selectedAnswerKey.length > 0) {
                            var tempAnswerArray_1 = [];
                            selectedAnswerKey.map(function (item) {
                                tempAnswerArray_1.push(tempQuestionOptions.filter(function (x) { return x.key === item; })[0].text);
                            });
                            selectedAnswerText = tempAnswerArray_1;
                        }
                        if (selectedAnswerText.length > 0) {
                            var index = void 0;
                            index = selectedAnswerText.filter(function (item) { return item === tempItem.DependentQuestionAnswer; }).length;
                            if (index == 0) {
                                var tempArray = rh.state['dpDDOptions'];
                                tempArray.filter(function (x) { return x.questionKey === tempItem.key.toString(); })[0].key = "";
                                rh.setState({ dpDDOptions: tempArray });
                            }
                            replacedTempQuestions[i].isActive = index > 0 ? true : false;
                            replacedTempQuestions[i].IsRequired = index > 0 ? true : false;
                        }
                        else {
                            replacedTempQuestions[i].isActive = false;
                            replacedTempQuestions[i].IsRequired = false;
                        }
                    }
                });
                this.setState({ questions: replacedTempQuestions });
                return [2 /*return*/];
            });
        });
    };
    DueDiligence.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "container-fluid" },
                React.createElement("div", { className: "card-primary", style: { position: "relative" } },
                    React.createElement("div", { className: "loading-css", style: { height: this.state.loading ? "100%" : "0%" } },
                        React.createElement(ClipLoader, { css: CommonConstants.LOADING_CSS, size: 50, color: CommonConstants.LOADER_COLOR, loading: this.state.loading })),
                    React.createElement("div", { className: "card-header" },
                        React.createElement("h3", { className: "" }, strings.DueDiligenceTitle)),
                    React.createElement("div", { className: "card-body" }, this.state.questions.map(function (question) { return (React.createElement("div", { className: "form-group text-left" },
                        question.isActive ? React.createElement("label", null,
                            question.text,
                            question.IsRequired === true ? React.createElement("sub", null, "*") : null) : "",
                        question.isActive ? React.createElement(Dropdown, { id: question.dprdwnID, disabled: _this.checkIfFieldDisabled(question.dprdwnID), placeholder: strings.dpPlaceHolder, onChange: _this.handleChange.bind(_this), defaultSelectedKeys: question.options.options.filter(function (x) { return x.IsDefault === true; }).length > 0 ? question.options.options.filter(function (x) { return x.IsDefault === true; })[0].key : "", defaultSelectedKey: question.options.options.filter(function (x) { return x.IsDefault === true; }).length > 0 ? question.options.options.filter(function (x) { return x.IsDefault === true; })[0].key : "", selectedKey: question.selectedAnswers.length > 0 ? question.selectedAnswers : [], selectedKeys: question.selectedAnswers.length > 0 ? question.selectedAnswers : [], multiSelect: question.IsMultiSelect, options: question.options.options }) : "",
                        question.isActive && question.errorMsg.length > 0 ? React.createElement("span", null,
                            " ",
                            React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                            React.createElement(Label, { className: "errormessage text-left" },
                                question.errorMsg,
                                " ")) : null,
                        question.isActive ? React.createElement("label", null, question.options.value) : "")); })),
                    React.createElement(CardFooter, __assign({}, this.props, { nextBtnMethod: this._NextClick.bind(this), saveForLaterBtnMethod: this._SaveForLaterClick.bind(this), backBtnMethod: this._BackClick.bind(this) }))))));
    };
    DueDiligence.prototype.checkIfFieldDisabled = function (tagID) {
        var listOfEditableFieldsSection1 = this.props.listOfEditableFields;
        //Shraddha 08-08-22 item 4
        var currentuser = this.state.currentUserid;
        var requestorid = this.state.requestorid;
        if (this.props.itemSubmitted && currentuser !== requestorid && !this.props.isFHDUser) { //R fhd change 20-9
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
    DueDiligence.prototype.handleChange = function (event, item) {
        var _this = this;
        // <summary>Event called on dropdown value change.</summary>
        try {
            var tempObj = this.state["dpDDOptions"];
            //New Change Start - 02/06/2021
            this.SetSelectedAnswer(tempObj, item["questionkey"], item["key"], item["selected"]).then(function (arr) {
                _this.setState(__assign({}, _this.state, { dpDDOptions: arr }));
            });
            //New Change End - 02/06/2021
            this.ShowHideDependentQuestions();
            //rutvik validate change            
            var tempQuestions = this.state.questions;
            var changeDp = tempQuestions.filter(function (x) { return x.key === item["questionkey"]; })[0];
            if (changeDp.selectedAnswers.length > 0 && changeDp.errorMsg !== "") {
                changeDp.errorMsg = '';
            }
            this.setState(__assign({}, this.state, { questions: tempQuestions }));
            //end
        }
        catch (error) {
            console.log("handleChange(Section1.tsx)--->", error);
        }
    };
    DueDiligence.prototype.getDueDiligenceQuestions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, data, i, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewXML = "<View><ViewFields>\n            <FieldRef Name=\"ID\"></FieldRef>\n            <FieldRef Name=\"Question\"></FieldRef>\n            <FieldRef Name=\"Sequence\"></FieldRef>\n            <FieldRef Name=\"IsMultiSelect\"></FieldRef>\n            <FieldRef Name=\"IsRequired\"></FieldRef>\n            <FieldRef Name=\"IsDependentOnQuestion\"></FieldRef>\n            <FieldRef Name=\"DependentQuestionID\"></FieldRef>\n            <FieldRef Name=\"DependentQuestionAnswer\"></FieldRef>\n            <FieldRef Name=\"IsFinanceDue\"></FieldRef>\n            </ViewFields>\n            <RowLimit>4999</RowLimit>\n            <Query><Where>\n            <And>\n                <Eq><FieldRef Name=\"IsActive\"/><Value Type=\"Integer\">1</Value></Eq>\n                <Eq><FieldRef Name=\"RequestType\"/><Value Type=\"Text\">" + this.state.requestType + "</Value></Eq>                \n            </And>    \n          </Where>\n          <OrderBy><FieldRef Name=\"Sequence\" Ascending=\"True\" /></OrderBy>\n          </Query>\n            </View>";
                        return [4 /*yield*/, this.objWeb.getList(this.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILQUESTIONSURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText')];
                    case 1:
                        data = _a.sent();
                        if (!data) return [3 /*break*/, 5];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < data.length)) return [3 /*break*/, 5];
                        if (!(data[i]["IsFinanceDue"] !== true)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.GetDueDiligenceOptions(data[i]["ID"])];
                    case 3:
                        options = _a.sent();
                        this.state.dpDDOptions.push({ questionKey: data[i]["ID"].toString(), key: null });
                        this.questions.push({
                            key: data[i]["ID"],
                            text: data[i]["Question"],
                            IsMultiSelect: data[i]["IsMultiSelect"],
                            IsRequired: data[i]["IsRequired"],
                            options: options,
                            errorMsg: "",
                            selectedAnswers: [],
                            dprdwnID: "dpDDOptions" + i,
                            isActive: true,
                            IsDependentOnQuestion: data[i]["IsDependentOnQuestion"] ? data[i]["IsDependentOnQuestion"] : false,
                            DependentQuestionID: data[i]["DependentQuestionIDId"] ? data[i]["DependentQuestionIDId"] : 0,
                            DependentQuestionAnswer: data[i]["DependentQuestionAnswer"] ? data[i]["DependentQuestionAnswer"] : "",
                        });
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.setState({ questions: this.questions })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.CheckRequestAvailable()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DueDiligence.prototype.GetDueDiligenceOptions = function (questionID) {
        return __awaiter(this, void 0, void 0, function () {
            var viewXML, data, tempoptions, i, options, tempObj, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        viewXML = "<View>\n        <ViewFields>\n        <FieldRef Name=\"ID\"></FieldRef> \n        <FieldRef Name=\"Title\"></FieldRef> \n        <FieldRef Name=\"IsDefault\"></FieldRef> \n        <FieldRef Name=\"Sequence\"></FieldRef> \n        <FieldRef Name=\"IsActive\"></FieldRef></ViewFields>\n        <RowLimit>1000</RowLimit>\n        <Query>\n            <Where>\n                <And>\n                    <Eq><FieldRef Name=\"IsActive\"/><Value Type=\"Integer\">1</Value></Eq>\n                    <Eq><FieldRef Name=\"QuestionID\"  LookupId=\"TRUE\"/><Value Type=\"Lookup\">" + questionID + "</Value></Eq>\n                </And>\n            </Where>\n            <OrderBy><FieldRef Name='Sequence' Ascending='True'></FieldRef></OrderBy>\n        </Query>\n        </View>";
                        return [4 /*yield*/, this.objWeb.getList(this.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILOPTIONSURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText')];
                    case 1:
                        data = _a.sent();
                        tempoptions = [];
                        if (data) {
                            for (i = 0; i < data.length; i++) {
                                tempoptions.push({
                                    questionkey: questionID,
                                    key: data[i]["ID"],
                                    text: data[i]["Title"],
                                    IsDefault: data[i]["IsDefault"]
                                });
                            }
                        }
                        options = { value: '', options: [] };
                        tempObj = options;
                        tempObj.options = tempoptions;
                        options = tempObj;
                        return [2 /*return*/, options];
                    case 2:
                        error_1 = _a.sent();
                        console.log("GetMaconomyData (Services.ts)--->", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DueDiligence.prototype.CheckRequestAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempArray, tempData, tempArray1_1, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempArray = this.state.dpDDOptions;
                        if (!(this.props.data === null || this.props.data === undefined)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(CommonConstants.DUEDILIGENCENAME).items.select().getAll()];
                    case 1:
                        tempData = _a.sent();
                        tempArray1_1 = [];
                        tempData.filter(function (item) {
                            if (item.Title == _this.props.itemID) {
                                tempArray1_1.push(item);
                            }
                        });
                        data = void 0;
                        data = tempArray1_1;
                        if (!(data.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var tempAnswers;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(element["AnswersId"] != null)) return [3 /*break*/, 2];
                                            tempAnswers = element["AnswersId"];
                                            return [4 /*yield*/, tempAnswers.forEach(function (ele) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, this.SetSelectedAnswer(tempArray, +element.QuestionId, +ele, true).then(function (arr) {
                                                                    tempArray = arr;
                                                                })];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.state.questions.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, element.options.options.forEach(function (ele) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!ele.IsDefault) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, this.SetSelectedAnswer(tempArray, ele.questionkey, ele.key, true).then(function (arr) {
                                                                tempArray = arr;
                                                            })];
                                                    case 1:
                                                        _a.sent();
                                                        _a.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.setState({ dpDDOptions: tempArray })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, this.props.data.questions.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, element.selectedAnswers.forEach(function (ele) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.SetSelectedAnswer(tempArray, +element.key, +ele, true).then(function (arr) {
                                                            tempArray = arr;
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.setState({ dpDDOptions: tempArray })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    DueDiligence.prototype.SetSelectedAnswer = function (arr, questionKey, key, selected) {
        return __awaiter(this, void 0, void 0, function () {
            var tempValue, tempQuestions, uniqueArray, tempArray, i, i, i, i, tempKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempValue = this.state.questions.filter(function (x) { return x.key === +questionKey; })[0];
                        tempQuestions = this.state.questions;
                        if (tempValue.IsMultiSelect) {
                            uniqueArray = [];
                            tempArray = [];
                            if (arr.filter(function (x) { return x.questionKey === questionKey.toString(); })[0].key !== null) {
                                tempArray = arr.filter(function (x) { return x.questionKey === questionKey.toString(); })[0].key.split(',');
                            }
                            for (i = 0; i < tempArray.length; i++) {
                                if (tempArray[i] === null || tempArray[i] === "" || tempArray[i] === 0) {
                                    tempArray.splice(i, 1);
                                }
                            }
                            if (selected === true) {
                                tempArray.push(key.toString());
                                for (i = 0; i < tempArray.length; i++) {
                                    if (uniqueArray.indexOf(tempArray[i]) === -1) {
                                        uniqueArray.push(tempArray[i]);
                                    }
                                }
                            }
                            else {
                                for (i = 0; i < tempArray.length; i++) {
                                    if (tempArray[i] === key.toString()) {
                                        tempArray.splice(i, 1);
                                    }
                                }
                                for (i = 0; i < tempArray.length; i++) {
                                    if (uniqueArray.indexOf(tempArray[i]) === -1) {
                                        uniqueArray.push(tempArray[i]);
                                    }
                                }
                            }
                            arr.filter(function (x) { return x.questionKey === questionKey.toString(); })[0].key = uniqueArray.join(',');
                            tempQuestions.filter(function (x) { return x.key === Number(questionKey); })[0].selectedAnswers = uniqueArray.map(function (i) { return Number(i); });
                        }
                        else {
                            arr.filter(function (x) { return x.questionKey === questionKey.toString(); })[0].key = key.toString();
                            tempKey = [key];
                            tempQuestions.filter(function (x) { return x.key === Number(questionKey); })[0].selectedAnswers = tempKey.map(function (i) { return Number(i); });
                        }
                        // this.questions = tempQuestions;
                        return [4 /*yield*/, this.setState({ questions: tempQuestions })];
                    case 1:
                        // this.questions = tempQuestions;
                        _a.sent();
                        return [2 /*return*/, arr];
                }
            });
        });
    };
    DueDiligence.prototype.ValidateDueDiligence = function () {
        var _this = this;
        //Validate due diligence
        var valid = true;
        var tempQuestions = this.state.questions;
        tempQuestions.forEach(function (ele) {
            if (ele.IsRequired) {
                var tempKey = _this.state.dpDDOptions.filter(function (x) { return x.questionKey === ele.key.toString(); })[0].key;
                if (tempKey === "" || tempKey === null) {
                    ele.errorMsg = strings.CantLeaveBlankMsg;
                    valid = false;
                }
                else {
                    ele.errorMsg = "";
                }
            }
        });
        this.setState({ questions: tempQuestions });
        return valid;
    };
    DueDiligence.prototype._NextClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // <summary>Call on next button click</summary>
                        this.setState({ loading: true }); //9-2-23
                        return [4 /*yield*/, this.SaveDataOperations()];
                    case 1:
                        if (_a.sent()) {
                            this.setState({ loading: false }, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.props.dataChange("dueDiligenceData", this.state)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.props.dataChange("itemID", this.state.itemID)];
                                        case 2:
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
    DueDiligence.prototype._BackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.dataChange("dueDiligenceData", this.state)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.props.backStep()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DueDiligence.prototype._SaveForLaterClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // <summary>Call on save for later click</summary>
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
    DueDiligence.prototype.SaveDataOperations = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ValidateDueDiligence()];
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
    DueDiligence.prototype.SaveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempArray_1, _loop_1, this_1, tempData, tempData1, i, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.setState({ loading: true });
                        tempArray_1 = this.state.dpDDOptions;
                        _loop_1 = function () {
                            var tempArray1_2, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(tempArray_1[i].questionKey !== "" && tempArray_1[i].questionKey !== '' && tempArray_1[i].questionKey !== null)) return [3 /*break*/, 6];
                                        tempData = {
                                            Title: this_1.props.itemID.toString(),
                                            QuestionId: Number(Utils.TrimData(tempArray_1[i].questionKey)),
                                            AnswersId: { results: tempArray_1[i].key.toString().split(',').map(Number) }
                                        };
                                        return [4 /*yield*/, this_1.objWeb.lists.getByTitle(CommonConstants.DUEDILIGENCENAME).items.select().getAll()];
                                    case 1:
                                        // await this.objWeb.getList(this.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILIGENCEURL)
                                        //     .items
                                        //     .filter(`Title eq '${this.props.itemID}' and QuestionId eq '${+Number(tempArray[i].questionKey)}'`)
                                        //     .get().then(async (data) => {
                                        tempData1 = _a.sent();
                                        tempArray1_2 = [];
                                        tempData1.filter(function (item) {
                                            if (item.Title == _this.props.itemID && item.QuestionId == Number(tempArray_1[i].questionKey)) {
                                                tempArray1_2.push(item);
                                            }
                                        });
                                        data = void 0;
                                        data = tempArray1_2;
                                        return [4 /*yield*/, data.length];
                                    case 2:
                                        if (!((_a.sent()) > 0)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this_1.objWeb.getList(this_1.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILIGENCEURL)
                                                .items
                                                .getById(data[0].ID)
                                                .update({ AnswersId: { results: tempArray_1[i].key.toString().split(',').map(Number) } }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    return [2 /*return*/];
                                                });
                                            }); })];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 6];
                                    case 4: return [4 /*yield*/, this_1.objWeb.getList(this_1.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILIGENCEURL)
                                            .items
                                            .add(tempData).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                return [2 /*return*/];
                                            });
                                        }); })];
                                    case 5:
                                        _a.sent();
                                        _a.label = 6;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < tempArray_1.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        this.setState({ loading: false });
                        console.log("SaveData(DueDiligence) --->", error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return DueDiligence;
}(React.Component));
export default DueDiligence;
//# sourceMappingURL=DueDiligence.js.map