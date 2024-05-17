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
import styles from './ClientRequests.module.scss';
import Request7 from './Request7/Request7';
import Request8 from './Request8/Request8';
import Request9 from './Request9/Request9';
import Request10 from './Request10/Request10';
import Request11 from './Request11/Request11';
import Request12 from './Request12/Request12';
import Request13 from './Request13/Request13';
import "@pnp/polyfill-ie11";
import 'core-js/es6/array';
import 'es6-map/implement';
import { Web } from 'sp-pnp-js';
require('../js/bootstrap.bundle.min.js');
require('../css/bootstrap.min.css');
require('../css/style.css');
require('../css/dev-style.css');
var ClientRequests = /** @class */ (function (_super) {
    __extends(ClientRequests, _super);
    function ClientRequests(props) {
        var _this = _super.call(this, props) || this;
        _this.objWeb = new Web(_this.props.context.pageContext.web.absoluteUrl);
        _this.state = {
            currentDate: null,
            isInMaintenance: false,
            displayMessage: ""
        };
        return _this;
    }
    ClientRequests.prototype.render = function () {
        return (React.createElement(React.Fragment, null, this.state.isInMaintenance === false ?
            React.createElement("div", { className: styles.clientRequests }, this.LoadRequestComponent(this.props.requestType)) :
            React.createElement("div", { className: styles.clientRequests },
                React.createElement("div", { className: styles.container + " container-fluid" },
                    React.createElement("h2", null, this.state.currentDate),
                    React.createElement("div", { id: 'richText', className: styles.richtext })))));
    };
    ClientRequests.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, tempData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date().toLocaleDateString();
                        this.setState({ currentDate: date });
                        return [4 /*yield*/, this.objWeb.lists.getByTitle('IsInMaintenance').items.select('Maintenance,DisplayMessage').getAll()];
                    case 1:
                        tempData = _a.sent();
                        if (tempData[0].Maintenance == true) {
                            this.setState({ isInMaintenance: true });
                            this.setState({ displayMessage: tempData[0].DisplayMessage }, function () { document.getElementById('richText').innerHTML = _this.state.displayMessage; });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientRequests.prototype.LoadRequestComponent = function (reqType) {
        /// <summary>Load request form component as per selection from property pane.</summary>
        switch (reqType) {
            case "7":
                return React.createElement(Request7, __assign({}, this.props));
            case "8":
                return React.createElement(Request8, __assign({}, this.props));
            case "9":
                return React.createElement(Request9, __assign({}, this.props));
            case "10":
                return React.createElement(Request10, __assign({}, this.props));
            case "11":
                return React.createElement(Request11, __assign({}, this.props));
            case "12":
                return React.createElement(Request12, __assign({}, this.props));
            case "13":
                return React.createElement(Request13, __assign({}, this.props));
            default:
                return React.createElement(Request7, __assign({}, this.props));
        }
    };
    return ClientRequests;
}(React.Component));
export default ClientRequests;
//# sourceMappingURL=ClientRequests.js.map