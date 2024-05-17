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
var CardFooter = /** @class */ (function (_super) {
    __extends(CardFooter, _super);
    function CardFooter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.siteURL = _this.props.context.pageContext.web.absoluteUrl;
        return _this;
    }
    CardFooter.prototype.render = function () {
        return (React.createElement("div", { className: "card-footer" },
            React.createElement("div", { className: "row justify-content-between" },
                React.createElement("div", { className: "col-auto" },
                    this.props.backBtnMethod ?
                        React.createElement("button", { className: "btn btn-icon btn-secondary mb-1", onClick: this._BackClick.bind(this) },
                            React.createElement("img", { className: "icon", src: require('../../../images/back-arrow.svg'), alt: "back" }),
                            React.createElement("span", null, strings.BtnBackText))
                        : "",
                    this.props.cancelReqMethod ?
                        React.createElement("p", { className: "d-inline-block ml-2" },
                            " ",
                            React.createElement("button", { onClick: this._CancelRequest.bind(this), className: "btn btn-secondary text-black mb-1" },
                                React.createElement("span", { className: "cancle-link-btn" }, strings.Lbl_CancelRequest),
                                " ")) : ""),
                React.createElement("div", { className: "col-auto" },
                    React.createElement("button", { type: "button", className: "btn btn-secondary mb-1", onClick: this._CancelClick.bind(this) },
                        React.createElement("span", null, strings.BtnCancelText)),
                    this.props.saveForLaterBtnMethod ?
                        React.createElement("button", { type: "button", className: "btn btn-secondary ml-2 mb-1", onClick: this._SaveForLaterClick.bind(this) },
                            React.createElement("span", null, strings.BtnSaveForLaterText))
                        : "",
                    this.props.nextBtnMethod ?
                        React.createElement("button", { className: "btn btn-icon-right btn-primary ml-2 mb-1", onClick: this._NextClick.bind(this) },
                            React.createElement("span", null, strings.BtnNextText),
                            React.createElement("img", { className: "icon", src: require('../../../images/next-arrow.svg'), alt: "Next" }))
                        : "",
                    this.props.submitBtnMethod ?
                        React.createElement("button", { type: "button", className: "btn btn-primary ml-2 mb-1", onClick: this._SubmitClick.bind(this) },
                            React.createElement("span", null, strings.BtnSubmitText))
                        : "",
                    this.props.saveItemBtnMethod ?
                        React.createElement("button", { type: "button", className: "btn btn-primary ml-2 mb-1", onClick: this._SaveItemClick.bind(this) },
                            React.createElement("span", null, strings.BtnSaveItemText))
                        : ""))));
    };
    CardFooter.prototype._NextClick = function () {
        /// <summary>Next button event.</summary>
        this.props.nextBtnMethod();
    };
    CardFooter.prototype._BackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /// <summary>Back button event.</summary>
                    return [4 /*yield*/, this.props.backBtnMethod()];
                    case 1:
                        /// <summary>Back button event.</summary>
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CardFooter.prototype._CancelClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /// <summary>Cancel button event.</summary>
                window.location.href = this.siteURL;
                return [2 /*return*/];
            });
        });
    };
    CardFooter.prototype._CancelRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /// <summary>Cancel request event.</summary>
                    return [4 /*yield*/, this.props.cancelReqMethod()];
                    case 1:
                        /// <summary>Cancel request event.</summary>
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CardFooter.prototype._SaveForLaterClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /// <summary>Save for later button event.</summary>
                    return [4 /*yield*/, this.props.saveForLaterBtnMethod()];
                    case 1:
                        /// <summary>Save for later button event.</summary>
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CardFooter.prototype._SubmitClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /// <summary>Submit button event.</summary>
                    return [4 /*yield*/, this.props.submitBtnMethod()];
                    case 1:
                        /// <summary>Submit button event.</summary>
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CardFooter.prototype._SaveItemClick = function () {
        /// <summary>Submit button event.</summary>
        this.props.saveItemBtnMethod();
    };
    return CardFooter;
}(React.Component));
export default CardFooter;
//# sourceMappingURL=CardFooter.js.map