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
import { cloneDeep, isEqual } from '@microsoft/sp-lodash-subset';
import { Web } from 'sp-pnp-js';
import ClipLoader from "react-spinners/ClipLoader";
import { initializeIcons, Icon, Label } from 'office-ui-fabric-react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import DataTable from 'react-data-table-component';
import { FileTypeIcon, IconType } from "@pnp/spfx-controls-react/lib/FileTypeIcon";
import CardFooter from '../CardFooter/CardFooter';
import * as Constants from '../../../Constants';
import * as Utils from '../../Utils';
import DataTableExtensions from 'react-data-table-component-extensions';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import * as English from "is-english";
initializeIcons();
var modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 800 } },
};
var dialogContentProps = {
    type: DialogType.normal,
    title: strings.BtnAddDocumentText,
};
var columns = [
    {
        name: strings.Grid_LinkHeader,
        selector: 'Link',
        width: '80px',
    },
    {
        name: strings.DocumentNameHeader,
        selector: 'DocName',
        wrap: true,
        minWidth: '200px',
        sortable: true,
    },
    {
        name: strings.DocumentDescriptionHeader,
        selector: 'Description',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DocumentTypeHeader,
        selector: 'Doctype',
        minWidth: '150px'
    },
    {
        name: strings.DocumentSizeHeader,
        selector: 'FileSize',
        sortable: true,
        minWidth: '200px'
    },
    {
        name: strings.DeleteHeader,
        selector: 'Delete',
    }
];
var Section5 = /** @class */ (function (_super) {
    __extends(Section5, _super);
    function Section5(props) {
        var _this = _super.call(this, props) || this;
        _this.serverRelativeURL = _this.props.context.pageContext.web.serverRelativeUrl;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.rows_selected = [];
        _this.submitData = {
            data: '',
            approverContribute: [],
            approverRead: [],
            notificationApprovers: [],
            body: '',
            notificationBody: '',
        };
        _this.state = {
            mainLoading: false,
            hiddenDialog: true,
            docDescription: '',
            fileInputLable: strings.Lbl_ChooseFile,
            documentsArray: [],
            loading: true,
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
            errors: {
                fpDocument: '',
                tbxDescription: '',
                approvalData: '',
            },
            toggledClearRows: false,
            //shraddha task 10
            validationmsg: [],
            //Shraddha 29-09-22 after test
            specialChar: [],
            charString: '',
            isFHDUser: false //R fhd change 20-9-2023
        };
        return _this;
    }
    Section5.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "container-xl", style: { position: "relative" } },
            React.createElement("div", { className: "loading-css", style: { display: this.state.mainLoading ? "block" : "none" } },
                React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.mainLoading })),
            React.createElement("div", { className: "card-primary" },
                React.createElement("div", { className: "card-header" },
                    React.createElement("div", { className: "row justify-content-between" },
                        React.createElement("div", { className: "col-auto" },
                            React.createElement("h3", { className: "mb-2" }, strings.AttachmentTitle)),
                        React.createElement("div", { className: "col-auto" },
                            React.createElement("button", { type: "button", className: "btn btn-icon btn-secondary mb-2", onClick: this._onBtnDeleteClick.bind(this) },
                                React.createElement("img", { className: "icon", src: require('../../../images/ic-delete.svg'), alt: "" }),
                                React.createElement("span", null, strings.BtnDeleteText)),
                            React.createElement("button", { type: "button", className: "btn btn-primary ml-2 mb-2", onClick: function () { return _this.setState({
                                    hiddenDialog: false,
                                    docDescription: '',
                                    fileInputLable: strings.Lbl_ChooseFile,
                                    errors: {
                                        fpDocument: '',
                                        tbxDescription: '',
                                        approvalData: '',
                                    },
                                }); } },
                                React.createElement("em", null, "+"),
                                React.createElement("span", null, strings.BtnAddDocumentText))))),
                React.createElement("div", { className: "card-body", style: { position: "relative" } },
                    React.createElement("div", { className: "loading-css", style: { height: this.state.loading ? '100%' : '0' } },
                        React.createElement(ClipLoader, { css: Constants.LOADING_CSS, size: 50, color: Constants.LOADER_COLOR, loading: this.state.loading })),
                    React.createElement("div", null,
                        React.createElement("p", null, this.state.validationmsg)),
                    React.createElement("div", { className: "table-responsive grid-table" },
                        React.createElement(DataTableExtensions, { data: this.state.documentsArray, columns: columns, print: false, export: false, filterHidden: false },
                            React.createElement(DataTable, { className: "table", data: this.state.documentsArray, columns: columns, responsive: true, pagination: true, paginationPerPage: 10, persistTableHead: true, paginationComponentOptions: { noRowsPerPage: true }, selectableRows: true, noHeader: true, sortIcon: React.createElement(Icon, { iconName: "SortDown" }), noContextMenu: true, noDataComponent: React.createElement("div", { className: "nodatadiv" },
                                    React.createElement("label", { className: "nodata" }, strings.NoRecordMSG)), onSelectedRowsChange: this.SelectDocument.bind(this), clearSelectedRows: this.state.toggledClearRows }))),
                    this.state.errors.approvalData !== undefined && this.state.errors.approvalData.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" }, this.state.errors.approvalData)) : null),
                (this.props.itemSubmitted && this.state.currentUserid !== this.state.requestorid && !this.state.isFHDUser) ?
                    React.createElement(CardFooter, __assign({}, this.props, { backBtnMethod: this._BackClick.bind(this), saveItemBtnMethod: this._SaveClick.bind(this) }))
                    :
                        React.createElement(CardFooter, __assign({}, this.props, { backBtnMethod: this._BackClick.bind(this), submitBtnMethod: this._SubmitClick.bind(this) }))),
            React.createElement(Dialog, { hidden: this.state.hiddenDialog, onDismiss: function () { return _this.setState({ hiddenDialog: true }); }, dialogContentProps: dialogContentProps, modalProps: modelProps },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null,
                        strings.lblDocument,
                        React.createElement("sub", null, "*")),
                    React.createElement("div", { className: "custom-file" },
                        React.createElement("input", { type: "file", name: "fileinput", className: "custom-file-input", id: "fileinput", onChange: this._onFpChange.bind(this) }),
                        React.createElement("label", { className: "custom-file-label", htmlFor: "fileinput" }, this.state.fileInputLable)),
                    this.state.errors.fpDocument.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.fpDocument,
                            " ")) : null),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null,
                        strings.lblDescription,
                        React.createElement("sub", null, "*")),
                    React.createElement("input", { className: "form-control", maxLength: 255, type: "text", id: "docDescription", value: this.state.docDescription, onChange: this._onInputChange.bind(this) }),
                    this.state.errors.tbxDescription.length > 0 ? React.createElement("span", null,
                        " ",
                        React.createElement(Icon, { iconName: 'error', className: "erroricon" }),
                        React.createElement(Label, { className: "errormessage" },
                            this.state.errors.tbxDescription,
                            " ")) : null),
                React.createElement(DialogFooter, null,
                    React.createElement("button", { type: "button", className: "btn btn-primary mb-1", onClick: this._onSaveClick.bind(this) },
                        " ",
                        strings.DialogBtnSaveText,
                        " "),
                    React.createElement("button", { type: "button", className: "btn btn-secondary ml-2 mb-1", style: { color: "black" }, onClick: this._onDialogCancelClick.bind(this) },
                        strings.DialogBtnCancelText,
                        " ")))));
    };
    //Validation message SHRADDHA 16-07-2022 
    Section5.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempItems, itemid, tempRequestorId, currentUserID, requestoridd, currentUPN, FHDUser, isCurrentFHDUser;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.objWeb.lists.getByTitle("ValidationMessage").items.filter("Title eq 'Documents'").select("ValidationMessage").getAll()];
                    case 1:
                        tempItems = _a.sent();
                        this.setState({ validationmsg: tempItems[0].ValidationMessage });
                        return [4 /*yield*/, this.BindDocumentData()];
                    case 2:
                        _a.sent();
                        itemid = this.props.itemID;
                        return [4 /*yield*/, this.objWeb.lists.getByTitle("Requests").items.filter("ID eq " + itemid).select("RequestorId").getAll()];
                    case 3:
                        tempRequestorId = _a.sent();
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 4:
                        currentUserID = _a.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : tempRequestorId[0].RequestorId.toString();
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        //Shraddha 08-08-22 item 4 end
                        //Shraddha 29-09-22 after test changes
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + Constants.SPECIALCHARACTERSLISTNAME).items.select("Title").getAll().then(function (item) {
                                _this.setState({ specialChar: item });
                                var charstring = "";
                                item.forEach(function (char) {
                                    if (charstring != "") {
                                        charstring = charstring + "," + char.Title;
                                    }
                                    else {
                                        charstring = char.Title;
                                    }
                                });
                                _this.setState({ charString: charstring });
                            })];
                    case 5:
                        //Shraddha 08-08-22 item 4 end
                        //Shraddha 29-09-22 after test changes
                        _a.sent();
                        return [4 /*yield*/, Utils.GetUserUPNFromGraphAPI(this.props.context)];
                    case 6:
                        currentUPN = _a.sent();
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.FHDUSERS).items
                                .filter("Email eq '" + currentUPN.toLowerCase() + "'")
                                .getAll()];
                    case 7:
                        FHDUser = _a.sent();
                        isCurrentFHDUser = FHDUser.length > 0 ? true : false;
                        this.setState({ isFHDUser: isCurrentFHDUser });
                        return [2 /*return*/];
                }
            });
        });
    };
    Section5.prototype._onBtnDeleteClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        if (!(this.rows_selected.length > 0)) return [3 /*break*/, 8];
                        if (!confirm(strings.DeleteConfirmMsg)) return [3 /*break*/, 8];
                        this.setState({ loading: true });
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.rows_selected.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.objWeb.getFileByServerRelativePath(this.rows_selected[i].RelativeURL).recycle()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.DeleteFile(this.rows_selected[i].DocName)];
                    case 3:
                        _a.sent(); //rutvik task 7
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [4 /*yield*/, this.SaveNoOfFiles(-this.rows_selected.length)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.BindDocumentData()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _a.sent();
                        console.log("_onBtnDeleteClick(Attachments.tsx)--->", error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Section5.prototype._onFpChange = function (event) {
        /// <summary>call on file input change event</summary>
        var filename = event.target.files.length > 0 ? event.target.files[0].name : strings.Lbl_ChooseFile;
        this.setState({ fileInputLable: filename });
        var errors = this.state.errors;
        if (Utils.CheckSpecialChar(this.state.specialChar, filename)) {
            errors.fpDocument = strings.SpecialChar + this.state.charString;
        }
        //rutvik 14-3-23 march CR #F
        else if (!English(filename)) {
            errors.fpDocument = strings.FileNameInEnglish;
        }
        else if (filename.split('.').length > 2) {
            errors.fpDocument = strings.NotAllowedTwoDots; //dec CR
        }
        else {
            errors.fpDocument = '';
        }
    };
    Section5.prototype.BindDocumentData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var docArray_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 5, 6]);
                        if (!(this.props.approvalData.folderPath !== null && this.props.approvalData.folderPath.length > 0)) return [3 /*break*/, 2];
                        docArray_1 = [];
                        return [4 /*yield*/, this.objWeb.getFolderByServerRelativeUrl(this.props.approvalData.folderPath).files.select("ServerRelativeUrl", "Name", "Length", "ListItemAllFields/File_x0020_Type").expand("ListItemAllFields").orderBy('Name').get().then(function (docs) { return __awaiter(_this, void 0, void 0, function () {
                                var _loop_1, this_1, i;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _loop_1 = function (i) {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this_1.objWeb.getFileByServerRelativePath(docs[i]['ServerRelativeUrl']).getItem().then(function (objfile) {
                                                                docArray_1.push({
                                                                    Link: React.createElement("a", { onClick: function (e) { e.preventDefault(); window.open(docs[i]['ServerRelativeUrl'] + "?web=1"), '_blank'; }, href: '' }, strings.Grid_LinkHeader),
                                                                    DocName: docs[i]['Name'],
                                                                    FileSize: Number((docs[i]['Length'] / 1048576).toFixed(2)),
                                                                    Description: objfile['Description'],
                                                                    RelativeURL: docs[i]['ServerRelativeUrl'],
                                                                    Id: objfile['Id'],
                                                                    Doctype: React.createElement(FileTypeIcon, { type: IconType.image, path: docs[i]['ServerRelativeUrl'] }),
                                                                    Delete: React.createElement("button", { className: 'btn icon-link btn-outline-secondary btnDelete', onClick: _this.DeleteDocument.bind(_this, docs[i]['ServerRelativeUrl'], docs[i]['Name']), value: docs[i]['ServerRelativeUrl'] },
                                                                        React.createElement("img", { src: require('../../../images/delete-s.svg'), alt: 'Delete' }))
                                                                });
                                                            })];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            };
                                            this_1 = this;
                                            i = 0;
                                            _a.label = 1;
                                        case 1:
                                            if (!(i < docs.length)) return [3 /*break*/, 4];
                                            return [5 /*yield**/, _loop_1(i)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 4:
                                            this.setState({
                                                documentsArray: cloneDeep(docArray_1),
                                                toggledClearRows: !this.state.toggledClearRows,
                                                docDescription: '',
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) {
                                throw error + 'Client_Attachment_BindDocumentData_getAllFileNames/Details';
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 6];
                    case 3:
                        error_2 = _a.sent();
                        return [4 /*yield*/, Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error_2)];
                    case 4:
                        _a.sent();
                        console.log("BindDocumentData(Attachments.tsx)--->", error_2);
                        return [3 /*break*/, 6];
                    case 5:
                        this.setState({ loading: false });
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Section5.prototype._onDialogCancelClick = function () {
        /// <summary>execute when click on cancel button from dialog</summary>
        try {
            this.setState({
                hiddenDialog: true,
                docDescription: '',
            });
        }
        catch (error) {
            console.log("_onDialogCancelClick(Attachments.tsx)--->", error);
        }
    };
    Section5.prototype.DeleteDocument = function (ev, docURL, FileName) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        if (!confirm(strings.DeleteConfirmMsg)) return [3 /*break*/, 2];
                        this.setState({ loading: true });
                        //rutvik pc changes, docurl and filename
                        return [4 /*yield*/, this.objWeb.getFileByServerRelativePath(FileName.currentTarget.value).recycle().then(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.SaveNoOfFiles(-1)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.DeleteFile(docURL)];
                                        case 2:
                                            _a.sent(); //rutvik task 7
                                            this.BindDocumentData();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        //rutvik pc changes, docurl and filename
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        error_3 = _a.sent();
                        this.setState({ loading: false });
                        return [4 /*yield*/, Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error_3 + 'Client_Attachment_DeleteDocument')];
                    case 4:
                        _a.sent();
                        console.log("DeleteDocument(Attachments.tsx)--->", error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //Shraddha Mehta 12-07-22 item 10 (validation for file name) 
    Section5.prototype.ValidateSection5 = function () {
        /// <summary>validate section data.</summary>
        try {
            var errors_1 = this.state.errors;
            var objfile = document.querySelector("#fileinput").files[0];
            if (objfile === null || objfile === undefined) {
                errors_1.fpDocument = strings.CantLeaveBlankMsg;
            }
            else if (objfile !== null || objfile !== undefined) {
                var newFileName = objfile.name;
                //var match = (new RegExp('[~#%\&{}+\|]|\\.\\.|^\\.|\\.$')).test(newFileName);
                if (Utils.CheckSpecialChar(this.state.specialChar, newFileName)) {
                    errors_1.fpDocument = strings.SpecialChar + this.state.charString;
                }
                //rutvik 14-3-23 march CR #F
                else if (!English(newFileName)) {
                    errors_1.fpDocument = strings.FileNameInEnglish;
                }
                else if (newFileName.split('.').length > 2) {
                    errors_1.fpDocument = strings.NotAllowedTwoDots; //dec CR
                }
                else if (objfile.size > 5242880) {
                    errors_1.fpDocument = strings.Valid_Filesize;
                }
                else if (Constants.INVALID_FILE_EXTENSIONS.indexOf(objfile.name.substring(objfile.name.lastIndexOf('.') + 1).trim().toLowerCase()) > -1) {
                    errors_1.fpDocument = strings.Valid_FileType;
                }
                //rutvik 10-5-24
                else if (objfile.name.substring(objfile.name.lastIndexOf('.') + 1).trim().toLowerCase() === 'jpg') {
                    errors_1.fpDocument = strings.Jpg_File_Not_Allowed;
                }
                //rutvik 25-4-24
                else if (this.containsNonASCII(newFileName)) {
                    errors_1.fpDocument = strings.NotContainsNonASCIILatters;
                }
                else {
                    errors_1.fpDocument = "";
                }
                ;
            }
            else {
                errors_1.fpDocument = "";
            }
            ;
            errors_1.tbxDescription = (Utils.CheckRequiredField(this.state.docDescription) === false) ? strings.CantLeaveBlankMsg : "";
            this.setState({ errors: errors_1 });
            var valid_1 = true;
            Object.keys(errors_1).forEach(function (key) { errors_1[key].length > 0 ? valid_1 = false : null; });
            return valid_1;
        }
        catch (error) {
            console.log("ValidateSection5(Attachments.tsx)--->", error);
        }
    };
    //Check for non-ASCII value in filename
    Section5.prototype.containsNonASCII = function (filename) {
        for (var i = 0; i < filename.length; i++) {
            if (filename.charCodeAt(i) > 127) {
                return true;
            }
        }
        return false;
    };
    Section5.prototype.SelectDocument = function (docURL) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /// <summary>method call on checkbox select Deselect</summary>
                try {
                    this.rows_selected = docURL.selectedRows;
                }
                catch (error) {
                    console.log("SelectDocument(Attachments.tsx)--->", error);
                }
                return [2 /*return*/];
            });
        });
    };
    Section5.prototype._onInputChange = function (ev) {
        var _a;
        /// <summary>method call on input text value change</summary>
        this.setState(__assign({}, this.state, (_a = {}, _a[ev.target.id] = ev.target.value, _a)));
        //rutvik validate change
        var errors = this.state.errors;
        if (ev.target.id === "docDescription")
            errors.tbxDescription = '';
        this.setState({ errors: errors });
        //end
    };
    Section5.prototype._onSaveClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isFileExist, objfile_1, tempfile, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 8]);
                        if (!this.ValidateSection5()) return [3 /*break*/, 5];
                        this.setState({
                            loading: true,
                            errors: {
                                fpDocument: '',
                                tbxDescription: ''
                            },
                            fileInputLable: strings.Lbl_ChooseFile,
                            hiddenDialog: true
                        });
                        isFileExist = true;
                        objfile_1 = document.querySelector("#fileinput").files[0];
                        tempfile = this.state.documentsArray.filter(function (x) { return x.DocName === objfile_1.name; });
                        if (tempfile.length > 0) {
                            isFileExist = confirm(strings.FileOverrideConfirmMsg);
                        }
                        if (!isFileExist) return [3 /*break*/, 4];
                        if (!(objfile_1.size <= 10485760)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.objWeb.getFolderByServerRelativeUrl(this.props.approvalData.folderPath).files.add(objfile_1.name, objfile_1, true).then(function (f) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, f.file.getItem().then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: 
                                                        //rutvik pc changes
                                                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/" + Constants.ATTACHMENTS_INTERNALNAME).items.getById(item["ID"])
                                                                .update({
                                                                Description: this.state.docDescription,
                                                                Title: objfile_1.name,
                                                                FileFromAttachment: true
                                                            }).then(function (res) { }).catch(function (error) {
                                                                throw error + 'Client_Attachment_onSaveClick_updateFileDetails';
                                                            })];
                                                        case 1:
                                                            //rutvik pc changes
                                                            _a.sent();
                                                            if (!(tempfile.length === 0)) return [3 /*break*/, 4];
                                                            return [4 /*yield*/, this.SaveNoOfFiles(1)];
                                                        case 2:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.SaveFileNames(objfile_1.name)];
                                                        case 3:
                                                            _a.sent(); //rutvik task 7
                                                            _a.label = 4;
                                                        case 4: return [2 /*return*/];
                                                    }
                                                });
                                            }); }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    throw error + 'Client_Attachment_onSaveClick_GetFiles';
                                                });
                                            }); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    throw error + 'Client_Attachment_onSaveClick_addFiles';
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.BindDocumentData()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.setState({ loading: false });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        error_4 = _a.sent();
                        this.setState({ loading: false });
                        return [4 /*yield*/, Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error_4)];
                    case 7:
                        _a.sent();
                        console.log("_onSaveClick(Attachments.tsx)--->", error_4);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Section5.prototype._BackClick = function () {
        /// <summary>Back button event.</summary>
        this.props.backStep();
    };
    Section5.prototype._SubmitClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var itemid, tempRequestorId, currentUserID, requestoridd, errors, _a, req8XML, tempData, tempArray_1, item, errors_2, errorsObj, viewXML, tempData, tempArray_2, requestData, errorsObj, companyViewXML, tempItems, tempDataArray_1, companyData, stage1Apprvers, company, approverViewXML, approverData, error_5, isAnyUpdate, fieldNameArray, gulfFieldNameArray, indiaFieldNameArray, italianFieldNameArray, saudiFieldNameArray, count, count, count, count, count, errorsObj, viewXML, tempData, tempArray_3, requestData, error_6, returnData, errors_3, errorsObj, queryParameters, id, currentUSerID, recordSaved, tempBody, e_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        /// <summary>Submit button event.</summary>
                        //change 10-5-23 submit and save button click change
                        this.setState({ mainLoading: true });
                        itemid = this.props.itemID;
                        return [4 /*yield*/, this.objWeb.lists.getByTitle("Requests").items.filter("ID eq " + itemid).select("RequestorId").getAll()];
                    case 1:
                        tempRequestorId = _b.sent();
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 2:
                        currentUserID = _b.sent();
                        requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : tempRequestorId[0].RequestorId.toString();
                        this.setState({ currentUserid: currentUserID });
                        this.setState({ requestorid: requestoridd });
                        if (!(this.props.itemSubmitted && this.state.currentUserid !== this.state.requestorid && !this.state.isFHDUser)) return [3 /*break*/, 3];
                        setTimeout(function () {
                            window.location.href = _this.props.context.pageContext.web.absoluteUrl;
                        }, 1000);
                        return [3 /*break*/, 33];
                    case 3:
                        _b.trys.push([3, 32, , 33]);
                        this.setState({ mainLoading: true });
                        errors = this.state.errors;
                        if (this.state.documentsArray.length > 0) {
                            errors.approvalData = '';
                            this.setState({ errors: errors });
                        }
                        else {
                            errors.approvalData = strings.NoDocumentsAddedMsg;
                            this.setState({
                                errors: errors,
                                mainLoading: false
                            });
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 4:
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
                        this.submitData.data = {
                            Submitted: true,
                            SubmittedDate: new Date(Date.now()),
                            //CR change - 27/10/2021 - start
                            StatusIndicator: "Submitted",
                            //CR change - 27/10/2021 - end,
                            //R fhd change 20-9-2023
                            SubmittedByFHDUser: this.state.isFHDUser,
                            SubmittedById: this.state.currentUserid
                        };
                        if (!(this.props.approvalData.requestType === strings.RequestType[1])) return [3 /*break*/, 6];
                        req8XML = "<View><ViewFields>\n                <FieldRef Name=\"ID\"></FieldRef>\n                <FieldRef Name=\"Title\"></FieldRef>\n                <FieldRef Name=\"ContactCompanyNo\"></FieldRef>\n                <FieldRef Name=\"RequestID\"></FieldRef>\n                <FieldRef Name=\"RequestType\"></FieldRef>\n                <FieldRef Name=\"Status\"></FieldRef>\n                </ViewFields>\n                <RowLimit>1</RowLimit>\n                <Query>\n                <Where>\n                <And>\n                <Eq><FieldRef Name=\"Status\"/><Value Type=\"Text\">Open</Value></Eq>\n                <And>\n                <Eq><FieldRef Name=\"Submitted\"/><Value Type=\"Boolean\">1</Value></Eq>\n                    <And>\n                    <Eq><FieldRef Name=\"ContactCompanyNo\"/><Value Type=\"Text\">" + this.props.approvalData.contactCompanyNo + "</Value></Eq>\n                    <Eq><FieldRef Name=\"RequestType\"/><Value Type=\"Text\">" + Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.text === _this.props.approvalData.requestType; })[0].text + "</Value></Eq>\n                    </And>\n                    </And>\n                </And>    \n                </Where>\n                </Query></View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 5:
                        tempData = _b.sent();
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
                            if (tempItem.Status == "Open" && tempItem.Submitted == true && tempItem.ContactCompanyNo == _this.props.approvalData.contactCompanyNo && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS.filter(function (e) { return e.text === _this.props.approvalData.requestType; })[0].text && isAccessLevelPresent) {
                                tempArray_1.push(tempItem);
                            }
                        });
                        item = tempArray_1[0];
                        errors_2 = this.state.errors;
                        if (item !== null && item !== undefined && this.props.itemID === 0) {
                            errors_2.approvalData = strings.ClientRequest_RunningMode[0] + item.RequestID + strings.ClientRequest_RunningMode[1];
                            this.setState({ errors: errors_2, mainLoading: false });
                            return [2 /*return*/];
                        }
                        else {
                            errors_2.approvalData = '';
                            this.setState({ errors: errors_2 });
                        }
                        _b.label = 6;
                    case 6:
                        if (!(this.props.approvalData.requestType === strings.RequestType[3])) return [3 /*break*/, 17];
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 16, , 17]);
                        if (!isEqual(this.props.requestJson, this.props.clientJson)) return [3 /*break*/, 8];
                        errorsObj = this.state.errors;
                        errorsObj.approvalData = strings.NoUpdateMsg;
                        this.setState({
                            errors: errorsObj,
                            mainLoading: false
                        });
                        return [2 /*return*/];
                    case 8:
                        viewXML = "<view>\n                            <ViewFields>\n                                <FieldRef Name=\"ID\"></FieldRef>\n                                <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                                <FieldRef Name=\"RequestType\"></FieldRef>\n                                <FieldRef Name=\"Status\"></FieldRef>\n                                <FieldRef Name=\"RequestID\"></FieldRef>\n                            </ViewFields>\n                            <RowLimit>1</RowLimit>\n                            <Query>\n                                <Where>\n                                    <And>                        \n                                        <Neq><FieldRef Name=\"ID\"></FieldRef><Value Type=\"Number\">" + this.props.itemID + "</Value></Neq>\n                                    <And>\n                                    <Eq><FieldRef Name=\"Status\"></FieldRef><Value Type=\"Choice\">" + strings.Status[0] + "</Value></Eq>\n                                <And>\n                                    <And>\n                                        <Eq><FieldRef Name=\"MaconomyAccountID\"></FieldRef><Value Type=\"Text\">" + this.props.approvalData.maconomyAccountID + "</Value></Eq>\n                                        <Eq><FieldRef Name=\"RequestType\"></FieldRef><Value Type=\"Choice\">" + Constants.REQUESTTYPE_OPTIONS[3].text + "</Value></Eq>\n                                    </And>\n                                <Eq><FieldRef Name=\"Submitted\"/><Value Type=\"Boolean\">1</Value></Eq>\n                                </And>\n                            </And>\n                        </And>\n                        </Where>\n                    </Query>\n                    </view>\n                    ";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 9:
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
                                    var accessLevelArrayFromUser_2 = [];
                                    accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
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
                            if (tempItem.ID != _this.props.itemID && tempItem.Status == strings.Status[0] && tempItem.MaconomyAccountID == _this.props.approvalData.maconomyAccountID && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[3].text && isAccessLevelPresent) {
                                tempArray_2.push(tempItem);
                            }
                        });
                        requestData = tempArray_2[0];
                        errorsObj = this.state.errors;
                        if (requestData !== null && requestData !== undefined && this.props.itemID === 0) {
                            errorsObj.approvalData = strings.ClientRequest_RunningMode[0] + requestData.RequestID + strings.ClientRequest_RunningMode[1];
                            this.setState({ errors: errorsObj, mainLoading: false });
                            return [2 /*return*/];
                        }
                        else {
                            errorsObj.approvalData = '',
                                this.setState({ errors: errorsObj });
                        }
                        companyViewXML = "<View><ViewFields>\n                        <FieldRef Name='Company' />\n                        <FieldRef Name='MaconomyAccountID' />\n                        </ViewFields>\n                        <Query>\n                        <Where>\n                        <And>\n                            <Eq>\n                                <FieldRef Name='MaconomyAccountID' />\n                                <Value Type='Text'>" + this.props.approvalData.maconomyAccountID + "</Value>\n                            </Eq>\n                            <Neq>\n                            <FieldRef Name='Company' />\n                            <Value Type='Text'>" + this.props.approvalData.company.split('-')[0].trim() + "</Value>\n                         </Neq>\n                        </And>\n                        </Where>\n                        </Query></View>";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.COMPANYCUSTOMERCARD_INTERNALNAME).items.select().getAll()];
                    case 10:
                        tempItems = _b.sent();
                        tempDataArray_1 = [];
                        tempItems.filter(function (item) {
                            var isAccessLevelPresent = false;
                            if (item.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (item["AccessLevel"] !== null && _this.props.accessLevel !== null) {
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
                            if (item.MaconomyAccountID == _this.props.approvalData.maconomyAccountID && item.Company != _this.props.approvalData.company.split('-')[0].trim() && isAccessLevelPresent) {
                                tempDataArray_1.push(item);
                            }
                        });
                        companyData = tempDataArray_1;
                        if (!(companyData !== null && companyData.length > 0)) return [3 /*break*/, 15];
                        stage1Apprvers = [];
                        company = 0;
                        _b.label = 11;
                    case 11:
                        if (!(company < companyData.length)) return [3 /*break*/, 14];
                        approverViewXML = "<View>\n                                 <ViewFields>\n                                <FieldRef Name='Stage1_required' />\n                                <FieldRef Name='Stage1_approver' />\n                                <FieldRef Name='Stage1_sub_approver' />\n                                <FieldRef Name='stage2_required' />\n                                <FieldRef Name='stage2_approver' />\n                                <FieldRef Name='stage2_sub_approver' />\n                                <FieldRef Name='stage3_required' />\n                                <FieldRef Name='stage3_approver' />\n                                <FieldRef Name='stage3_sub_approver' />\n                                <FieldRef Name='ID' />\n                                <FieldRef Name='WorkflowType' />\n                                <FieldRef Name='RequestType' />\n                                <FieldRef Name='Title' />\n                                </ViewFields>\n                                <RowLimit>1</RowLimit>\n                                <Query>\n                                <Where>\n                                    <And>\n                                        <BeginsWith>\n                                            <FieldRef Name='Title' />\n                                            <Value Type='Text'>" + companyData[company].Company + "</Value>\n                                            </BeginsWith>\n                                        <And>\n                                            <Eq>\n                                            <FieldRef Name='WorkflowType' />\n                                            <Value Type='Choice'>" + this.props.approvalData.workflowType + "</Value>\n                                            </Eq>\n                                            <Eq>\n                                            <FieldRef Name='RequestType' />\n                                            <Value Type='Choice'>" + this.props.approvalData.requestType + "</Value>\n                                            </Eq>\n                                        </And>\n                                    </And>\n                                </Where>\n                                </Query>\n                                </View>";
                        return [4 /*yield*/, Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.APPROVERMASTER_INTERNALNAME, approverViewXML)];
                    case 12:
                        approverData = _b.sent();
                        if (approverData !== null && approverData !== undefined) {
                            if (approverData.Stage1_required) {
                                stage1Apprvers.indexOf(approverData.Stage1_approverId) === -1 ? stage1Apprvers.push(approverData.Stage1_approverId) : null;
                                stage1Apprvers.indexOf(approverData.Stage1_sub_approverId) === -1 ? stage1Apprvers.push(approverData.Stage1_sub_approverId) : null;
                            }
                            else if (!approverData.Stage1_required && approverData.stage2_required) {
                                stage1Apprvers.indexOf(approverData.stage2_approverId) === -1 ? stage1Apprvers.push(approverData.stage2_approverId) : null;
                                stage1Apprvers.indexOf(approverData.stage2_sub_approverId) === -1 ? stage1Apprvers.push(approverData.stage2_sub_approverId) : null;
                            }
                            else if (!approverData.Stage1_required && !approverData.stage2_required && approverData.stage3_required) {
                                stage1Apprvers.indexOf(approverData.stage3_approverId) === -1 ? stage1Apprvers.push(approverData.stage3_approverId) : null;
                                stage1Apprvers.indexOf(approverData.stage3_sub_approverId) === -1 ? stage1Apprvers.push(approverData.stage3_sub_approverId) : null;
                            }
                        }
                        _b.label = 13;
                    case 13:
                        company++;
                        return [3 /*break*/, 11];
                    case 14:
                        stage1Apprvers = stage1Apprvers.filter(function (x) { return x != _this.requestorID; });
                        this.submitData.notificationBody["OtherCompanyApprovers"] = stage1Apprvers.join(',');
                        _b.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        error_5 = _b.sent();
                        console.log(error_5);
                        return [3 /*break*/, 17];
                    case 17:
                        if (!(this.props.approvalData.requestType === strings.RequestType[5])) return [3 /*break*/, 21];
                        _b.label = 18;
                    case 18:
                        _b.trys.push([18, 20, , 21]);
                        isAnyUpdate = false;
                        fieldNameArray = ["ClientAttentionName", "Email", "PhoneNo", "DefaultTaxCode", "PaymentTerms", "FinanceEmail", "ExcludeFromClientInvoiceReminder"];
                        gulfFieldNameArray = ["WithholdingTaxType", "Emirate"];
                        indiaFieldNameArray = ["PlaceofSupply", "GSTRegistrationType", "CIN", "TDSTaxRate"];
                        italianFieldNameArray = ["CustomerRemark4", "CustomerRemark5", "CustomerRemark8"];
                        saudiFieldNameArray = ["CustomerRemark7", "ClientIDType"];
                        for (count = 0; count < fieldNameArray.length; count++) {
                            if (this.props.requestJson[fieldNameArray[count]] !== this.props.clientJson[fieldNameArray[count]]) {
                                isAnyUpdate = true;
                                break;
                            }
                        }
                        if (Constants.GULF_COMPANIES.indexOf(this.props.approvalData.company.split('-')[0].trim()) > -1 && isAnyUpdate === false) {
                            for (count = 0; count < gulfFieldNameArray.length; count++) {
                                if (this.props.requestJson[gulfFieldNameArray[count]] !== this.props.clientJson[gulfFieldNameArray[count]]) {
                                    isAnyUpdate = true;
                                    break;
                                }
                            }
                        }
                        if (this.props.approvalData.company.split('-')[0].trim() === Constants.INDIA_COMPANY && isAnyUpdate === false) {
                            for (count = 0; count < indiaFieldNameArray.length; count++) {
                                if (this.props.requestJson[indiaFieldNameArray[count]] !== this.props.clientJson[indiaFieldNameArray[count]]) {
                                    isAnyUpdate = true;
                                    break;
                                }
                            }
                        }
                        //rutvik 12-7 24
                        if (this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY && isAnyUpdate === false) {
                            for (count = 0; count < italianFieldNameArray.length; count++) {
                                if (this.props.requestJson[italianFieldNameArray[count]] !== this.props.clientJson[italianFieldNameArray[count]]) {
                                    isAnyUpdate = true;
                                    break;
                                }
                            }
                        }
                        //endr
                        //Shraddha test 7
                        if (this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[0] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[1] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[2] && isAnyUpdate === false) {
                            for (count = 0; count < saudiFieldNameArray.length; count++) {
                                if (this.props.requestJson[saudiFieldNameArray[count]] !== this.props.clientJson[saudiFieldNameArray[count]]) {
                                    isAnyUpdate = true;
                                    break;
                                }
                            }
                        }
                        errorsObj = this.state.errors;
                        if (isAnyUpdate === false) {
                            errorsObj.approvalData = strings.NoUpdateMsg;
                            this.setState({
                                errors: errorsObj,
                                mainLoading: false
                            });
                            return [2 /*return*/];
                        }
                        viewXML = "<view>\n                        <ViewFields>\n                            <FieldRef Name=\"ID\"></FieldRef>\n                            <FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n                            <FieldRef Name=\"RequestType\"></FieldRef>\n                            <FieldRef Name=\"Status\"></FieldRef>\n                            <FieldRef Name=\"RequestID\"></FieldRef>\n                        </ViewFields>\n                        <RowLimit>1</RowLimit>\n                        <Query>\n                            <Where>\n                                <And>\n                                    <And>\n                                        <Eq><FieldRef Name=\"Status\"></FieldRef><Value Type=\"Choice\">" + strings.Status[0] + "</Value></Eq>\n                                        <Eq><FieldRef Name=\"Submitted\"/><Value Type=\"Boolean\">1</Value></Eq>\n                                    </And>\n                                    <And>\n                                        <Eq><FieldRef Name=\"MaconomyAccountID\"></FieldRef><Value Type=\"Text\">" + this.props.clientJson["MaconomyAccountID"] + "</Value></Eq>\n                                        <Eq><FieldRef Name=\"RequestType\"></FieldRef><Value Type=\"Choice\">" + Constants.REQUESTTYPE_OPTIONS[5].text + "</Value></Eq>\n                                    </And>\n                                </And>\n                            </Where>\n                        </Query>\n                        </view>\n                        ";
                        return [4 /*yield*/, this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll()];
                    case 19:
                        tempData = _b.sent();
                        tempArray_3 = [];
                        tempData.filter(function (tempItem) {
                            var isAccessLevelPresent = false;
                            if (tempItem.AccessLevel === _this.props.accessLevel) {
                                isAccessLevelPresent = true;
                            }
                            else {
                                if (tempItem["AccessLevel"] !== null && _this.props.accessLevel !== null) {
                                    var accessLevelArrayFromItem = [];
                                    var accessLevelArrayFromUser_4 = [];
                                    accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
                                    accessLevelArrayFromUser_4 = _this.props.accessLevel.split(',');
                                    accessLevelArrayFromItem.forEach(function (element) {
                                        accessLevelArrayFromUser_4.forEach(function (ele) {
                                            if (ele === element) {
                                                isAccessLevelPresent = true;
                                            }
                                        });
                                    });
                                }
                            }
                            if (tempItem.Submitted == true && tempItem.Status == strings.Status[0] && tempItem.MaconomyAccountID == _this.props.clientJson["MaconomyAccountID"] && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[5].text && isAccessLevelPresent) {
                                tempArray_3.push(tempItem);
                            }
                        });
                        requestData = tempArray_3[0];
                        if (requestData !== null && requestData !== undefined && this.props.itemID === 0) {
                            errorsObj.approvalData = strings.ClientRequest_RunningModeReq12[0] + requestData.RequestID + strings.ClientRequest_RunningModeReq12[1];
                            this.setState({ errors: errorsObj, mainLoading: false });
                            return [2 /*return*/];
                        }
                        else {
                            errorsObj.approvalData = '',
                                this.setState({ errors: errorsObj });
                        }
                        return [3 /*break*/, 21];
                    case 20:
                        error_6 = _b.sent();
                        console.log(error_6);
                        return [3 /*break*/, 21];
                    case 21: return [4 /*yield*/, Utils.GetSubmitDetails(this.submitData, strings, this.props.approvalData, this.requestorID, this.objWeb, this.serverRelativeURL, this.state.requestorid)];
                    case 22:
                        returnData = _b.sent();
                        if (returnData !== null) {
                            this.submitData = returnData;
                            errors_3 = this.state.errors;
                            errors_3.approvalData = "";
                            this.setState({ errors: errors_3 });
                        }
                        else {
                            errorsObj = this.state.errors;
                            errorsObj.approvalData = strings.ApprovalNotFoundMsg;
                            this.setState({ errors: errorsObj, mainLoading: false });
                            return [2 /*return*/];
                        }
                        if (!(this.props.itemID > 0)) return [3 /*break*/, 24];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(this.submitData.data).then(function (res) {
                            })];
                    case 23:
                        _b.sent();
                        _b.label = 24;
                    case 24:
                        queryParameters = new UrlQueryParameterCollection(window.location.href);
                        if (!queryParameters.getValue("itemID")) return [3 /*break*/, 28];
                        id = parseInt(queryParameters.getValue("itemID"));
                        return [4 /*yield*/, Utils.GetCurrentUserId(this.objWeb)];
                    case 25:
                        currentUSerID = _b.sent();
                        if (!(this.props.listData.RequestorId === currentUSerID)) return [3 /*break*/, 28];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.filter("ID eq " + this.props.listData.ID).getAll()];
                    case 26:
                        recordSaved = _b.sent();
                        if (!(recordSaved.length !== 0)) return [3 /*break*/, 28];
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.getById(this.props.listData.ID).recycle()];
                    case 27:
                        _b.sent();
                        _b.label = 28;
                    case 28:
                        if (!(!this.props.itemSubmitted || returnData !== null)) return [3 /*break*/, 31];
                        tempBody = {
                            Title: this.props.itemID.toString(),
                            FolderPath: this.props.approvalData.folderPath === undefined ? "" : this.props.approvalData.folderPath.toString(),
                            FolderContribute: this.submitData.body["FolderContribute"].concat(',', Constants.FHDUserGroupID),
                            UpdateReqRead: Constants.EVERYONE_ID.toString(),
                            UpdateRequestID: this.props.approvalData.updateRequestDataID === undefined ? "" : this.props.approvalData.updateRequestDataID.toString(),
                            FolderRead: this.submitData.body["FolderRead"],
                            ReqRead: this.submitData.body["ReqRead"],
                            ReqContribute: this.submitData.body["ReqContribute"].concat(',', Constants.FHDUserGroupID),
                            IsSubmitted: true //R 30-3
                        };
                        //jaymin change               	
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody)];
                    case 29:
                        //jaymin change               	
                        _b.sent();
                        return [4 /*yield*/, Utils.CallMSFlow(this.props.context, JSON.stringify(this.submitData.notificationBody), this.props.sendNotificationMSFlowUrl)];
                    case 30:
                        _b.sent();
                        _b.label = 31;
                    case 31:
                        setTimeout(function () {
                            window.location.href = _this.props.context.pageContext.web.absoluteUrl;
                        }, 1000);
                        return [3 /*break*/, 33];
                    case 32:
                        e_1 = _b.sent();
                        this.setState({ mainLoading: false });
                        return [3 /*break*/, 33];
                    case 33: return [2 /*return*/];
                }
            });
        });
    };
    //rutvik change
    Section5.prototype._SaveClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () {
                    window.location.href = _this.props.context.pageContext.web.absoluteUrl;
                }, 1000);
                return [2 /*return*/];
            });
        });
    };
    Section5.prototype.SaveNoOfFiles = function (NoOfFiles) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //Save number of files in requests list.
                    //CR change - 27/10/2021 - start
                    return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID)
                            .update({ NoOfAttachedDocs: this.state.documentsArray.length + NoOfFiles })
                            .then(function (res) { }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                throw error + 'Client_Attachment_SaveNoOfFiles_RequestList';
                            });
                        }); })];
                    case 1:
                        //Save number of files in requests list.
                        //CR change - 27/10/2021 - start
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //rutvik task 7
    Section5.prototype.SaveFileNames = function (FileName) {
        return __awaiter(this, void 0, void 0, function () {
            var Files, FileNames, error_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        Files = {
                            AttachmentFileNames: ""
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select("AttachmentFileNames").get()
                                .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    throw error + 'Client_Attachment_saveFileNames_getfilesnames_RequestLists';
                                });
                            }); })];
                    case 1:
                        FileNames = _a.sent();
                        if (FileNames.AttachmentFileNames == null) {
                            Files.AttachmentFileNames = FileName;
                        }
                        else {
                            Files.AttachmentFileNames = FileNames.AttachmentFileNames.concat(",", FileName);
                        }
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID)
                                .update(Files).then(function (res) { }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    throw error + 'Client_Attachment_saveFileNames_updatefilesnames_RequestLists';
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_7 = _a.sent();
                        this.setState({ loading: false });
                        return [4 /*yield*/, Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error_7)];
                    case 4:
                        _a.sent();
                        console.log("SaveFileNames(Attachments.tsx)--->", error_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //rutvik task 7
    Section5.prototype.DeleteFile = function (filename) {
        return __awaiter(this, void 0, void 0, function () {
            var FileNameString, FileNames, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        FileNameString = {
                            AttachmentFileNames: ""
                        };
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select("AttachmentFileNames,NoOfAttachedDocs").get()];
                    case 1:
                        FileNames = _a.sent();
                        if (FileNames.AttachmentFileNames !== null) {
                            if (FileNames.NoOfAttachedDocs == 1) {
                                FileNameString.AttachmentFileNames = FileNames.AttachmentFileNames.replace(filename, "");
                            }
                            else {
                                FileNameString.AttachmentFileNames = FileNames.AttachmentFileNames.replace("," + filename, "");
                            }
                        }
                        return [4 /*yield*/, this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID)
                                .update(FileNameString).then(function (res) { }).catch(function (error) {
                                throw error + 'Client_attachment_DeleteFile_UpdateFileString';
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_8 = _a.sent();
                        this.setState({ loading: false });
                        return [4 /*yield*/, Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error_8)];
                    case 4:
                        _a.sent();
                        console.log("DeleteFileNames(Attachments.tsx)--->", error_8);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Section5;
}(React.Component));
export default Section5;
//# sourceMappingURL=Attachments.js.map