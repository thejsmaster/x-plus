"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = exports.paginateArray = exports.hasScrollReachedTheEnd = exports.usePagination = exports.XEvents = exports.useQ = exports.useXForm = exports.hasNonEmptyValue = exports.useXAsync = exports.useXFetch = exports.xFetch = exports.XFetchConfig = exports.ValueRenderer = exports.UseXDevTools = exports.Treeview = exports.XPlusWrapper = exports.Switch = exports.StateView = exports.LabelRenderer = exports.ErrorBoundary = exports.ErrorComponent = exports.Collapsable = exports.useX = exports.findDiff = exports.getCallStack = exports.getParentState = exports.listeners = exports.xConfig = exports.xRefs = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./App.css");
exports.xRefs = {};
exports.xConfig = {
    enableDebugging: false,
    enableConsoleLogging: false,
    autoDestructureState: false,
};
exports.listeners = {
    onStateChange: null,
};
function getParentState(CL) {
    //
    var item = exports.xRefs[CL.name];
    if (!item) {
        throw Error("Error Occured in getParentState. The requested state is not created by any of the parent components.");
    }
    return { state: item.state, set: item.renderer };
}
exports.getParentState = getParentState;
// let tempCallStack: any = [];
// function call(fn: any, state: any) {
//   if (tempCallStack.indexOf(fn) === -1) {
//     tempCallStack.push(fn);
//     setTimeout(() => {
//       fn.call(state);
//       tempCallStack = tempCallStack.filter((item: any) => item !== fn);
//     }, 0);
//   }
// }
function getCallStack(splitIndex) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (splitIndex === void 0) { splitIndex = 3; }
    var stack = new Error().stack;
    var stackLines = ((_b = (_a = stack === null || stack === void 0 ? void 0 : stack.split("\n")[splitIndex]) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.split("(")) || [];
    var functionName = (stackLines === null || stackLines === void 0 ? void 0 : stackLines.length) > 1
        ? (_c = stackLines === null || stackLines === void 0 ? void 0 : stackLines[0]) === null || _c === void 0 ? void 0 : _c.split(" ")[1].trim()
        : "Anonymous";
    var fileNameLineNumber = stackLines === null || stackLines === void 0 ? void 0 : stackLines[(stackLines === null || stackLines === void 0 ? void 0 : stackLines.length) > 1 ? 1 : 0];
    var fileNames = (_e = (_d = fileNameLineNumber === null || fileNameLineNumber === void 0 ? void 0 : fileNameLineNumber.split("?")) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.split("/");
    var fileName = fileNames === null || fileNames === void 0 ? void 0 : fileNames[(fileNames === null || fileNames === void 0 ? void 0 : fileNames.length) - 1];
    var lineNumber = (_h = (_g = (_f = fileNameLineNumber === null || fileNameLineNumber === void 0 ? void 0 : fileNameLineNumber.split("?")) === null || _f === void 0 ? void 0 : _f[1]) === null || _g === void 0 ? void 0 : _g.split(":")) === null || _h === void 0 ? void 0 : _h[1];
    return {
        functionName: functionName,
        fileName: fileName,
        lineNumber: lineNumber,
    };
}
exports.getCallStack = getCallStack;
function findDiff(obj1, obj2, path) {
    if (path === void 0) { path = ""; }
    var changes = {};
    if (typeof obj1 === "object" &&
        obj1 !== null &&
        typeof obj2 === "object" &&
        obj2 !== null) {
        for (var key in obj1) {
            var newPath = path ? "".concat(path, ".").concat(key) : key;
            if (obj2.hasOwnProperty(key)) {
                var nestedChanges = findDiff(obj1[key], obj2[key], newPath);
                Object.assign(changes, nestedChanges);
            }
            else {
                changes["".concat(newPath, " [D]")] = undefined;
            }
        }
        for (var key in obj2) {
            var newPath = path ? "".concat(path, ".").concat(key) : key;
            if (!obj1.hasOwnProperty(key)) {
                changes["".concat(newPath, " [A]")] = obj2[key];
            }
        }
    }
    else if (obj1 !== obj2) {
        changes["".concat(path, " [M]")] = obj2;
    }
    return changes;
}
exports.findDiff = findDiff;
// export let actions: any = [];
// called actions
// function extractSubstring(inputString: string) {
//   const lastIndex = inputString.lastIndexOf(" [");
//   if (lastIndex !== -1) {
//     return inputString.slice(0, lastIndex);
//   }
//   return inputString;
// }
function useX(CL, label) {
    var _a = (0, react_1.useState)(0), count = _a[0], setCount = _a[1];
    if (!label) {
        label = CL.name;
    }
    var intiate = function () {
        if (!exports.xRefs[label]) {
            var state = new CL();
            exports.xRefs[label] = {
                state: state,
                label: label,
                setLogs: [],
                index: 0,
                copy: deepClone(state),
            };
            //@ts-ignore
            state && state.onChange && state.onChange();
        }
    };
    var setAgain = function () {
        if (!exports.xRefs[label]) {
            intiate();
        }
        exports.xRefs[label].renderer = function (fn) {
            var props = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                props[_i - 1] = arguments[_i];
            }
            var copy = deepClone(exports.xRefs[label].state);
            var errorOccured = false;
            var errorMessage = "";
            try {
                if (typeof fn === "function") {
                    fn.apply(exports.xRefs[label].state, props);
                    // actions.push(fn);
                    // xRefs[label].state = { ...xRefs[label].state };
                }
            }
            catch (e) {
                console.error(e);
                errorOccured = true;
                errorMessage = e === null || e === void 0 ? void 0 : e.message;
            }
            if (typeof fn !== "function") {
                throw new Error("set is called and no action is passed");
            }
            var _a = getCallStack(), fileName = _a.fileName, functionName = _a.functionName, lineNumber = _a.lineNumber;
            var fname = fileName.split("/")[fileName.split("/").length - 1];
            var updateSet = function () {
                var _a;
                console.time();
                var changeList = {};
                if (copy) {
                    changeList = findDiff(copy, exports.xRefs[label].state);
                    if (changeList && Object.keys(changeList).length > 0) {
                        __spreadArray([], Object.keys(changeList), true).forEach(function (key) {
                            changeList["state." + key] = changeList[key];
                            delete changeList[key];
                        });
                    }
                }
                Object.keys(changeList).forEach(function (path) {
                    updateNestedObject(exports.xRefs[label].state, path
                        .split(".")
                        .slice(1, path.split(".").length - 1)
                        .join("."));
                });
                if (exports.xConfig.enableDebugging) {
                    var log = {
                        fileName: fname.split("?")[0],
                        functionName: functionName,
                        lineNumber: lineNumber,
                        changeList: changeList,
                        props: props,
                        index: exports.xRefs[label].index + 1,
                        name: fn.name || "",
                        errorOccured: errorOccured,
                        errorMessage: errorMessage,
                    };
                    exports.xConfig.enableConsoleLogging &&
                        console.log("useX - " + log.name, log);
                    exports.xConfig.enableConsoleLogging &&
                        console.log("useX - updated state", (_a = exports.xRefs[label]) === null || _a === void 0 ? void 0 : _a.state);
                    exports.xRefs[label].setLogs.unshift(log);
                    exports.xRefs[label].index++;
                    exports.xRefs[label].setLogs.length > 10 && exports.xRefs[label].setLogs.pop();
                }
                console.timeEnd();
            };
            exports.xRefs[label].state.onChange && exports.xRefs[label].state.onChange();
            updateSet();
            exports.xRefs[label].state = destructureWithProto(exports.xRefs[label].state);
            setCount(count + 1);
            (exports.listeners === null || exports.listeners === void 0 ? void 0 : exports.listeners.onStateChange) && exports.listeners.onStateChange();
        };
        exports.xRefs[label].actionRenderer = function (fn) {
            var props = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                props[_i - 1] = arguments[_i];
            }
            var copy = {};
            if (exports.xConfig.enableDebugging) {
                copy = deepClone(exports.xRefs[label].state);
            }
            var errorOccured = false;
            var errorMessage = "";
            try {
                if (typeof fn === "function") {
                    fn.apply(exports.xRefs[label].state, props);
                    exports.xRefs[label].onPlus && exports.xRefs[label].onPlus(fn);
                    // actions.push(fn);
                    // xRefs[label].state = { ...xRefs[label].state };
                }
            }
            catch (e) {
                console.error(e);
                errorOccured = true;
                errorMessage = e === null || e === void 0 ? void 0 : e.message;
            }
            if (typeof fn !== "function") {
                throw new Error("set is called and no action is passed");
            }
            var _a = getCallStack(), fileName = _a.fileName, functionName = _a.functionName, lineNumber = _a.lineNumber;
            var fname = fileName.split("/")[fileName.split("/").length - 1];
            var updateSet = function () {
                var _a;
                var changeList = {};
                if (copy) {
                    changeList = findDiff(copy, exports.xRefs[label].state);
                    if (changeList && Object.keys(changeList).length > 0) {
                        __spreadArray([], Object.keys(changeList), true).forEach(function (key) {
                            changeList["state." + key] = changeList[key];
                            delete changeList[key];
                        });
                    }
                }
                var log = {
                    fileName: fname.split("?")[0],
                    functionName: functionName,
                    lineNumber: lineNumber,
                    changeList: changeList,
                    props: props,
                    index: exports.xRefs[label].index + 1,
                    name: fn.name || "",
                    errorOccured: errorOccured,
                    errorMessage: errorMessage,
                };
                exports.xConfig.enableConsoleLogging && console.log("useX - " + log.name, log);
                exports.xConfig.enableConsoleLogging &&
                    console.log("useX - updated state", (_a = exports.xRefs[label]) === null || _a === void 0 ? void 0 : _a.state);
                exports.xRefs[label].setLogs.unshift(log);
                exports.xRefs[label].index++;
                exports.xRefs[label].setLogs.length > 10 && exports.xRefs[label].setLogs.pop();
            };
            exports.xRefs[label].state.onChange && exports.xRefs[label].state.onChange();
            exports.xConfig.enableDebugging && updateSet();
            exports.xRefs[label].state = destructureWithProto(exports.xRefs[label].state);
            setCount(count + 1);
            (exports.listeners === null || exports.listeners === void 0 ? void 0 : exports.listeners.onStateChange) && exports.listeners.onStateChange();
        };
    };
    setAgain();
    (0, react_1.useEffect)(function () {
        setAgain();
        return function () {
            delete exports.xRefs[label];
            (exports.listeners === null || exports.listeners === void 0 ? void 0 : exports.listeners.onStateChange) && exports.listeners.onStateChange();
        };
    }, []);
    return {
        state: exports.xRefs[label].state,
        set: exports.xRefs[label].renderer,
        stateChanged: count,
        plus: exports.xRefs[label].actionRenderer,
        onPlus: function (fn) {
            if (typeof fn === "function")
                exports.xRefs[label].onPlus = fn;
        },
        saveCopy: function () {
            exports.xRefs[label].copy = deepClone(exports.xRefs[label].state);
        },
        resetState: function () {
            exports.xRefs[label].renderer(function reset() {
                exports.xRefs[label].state = __assign(__assign({}, destructureWithProto(exports.xRefs[label].state)), exports.xRefs[label].copy);
            });
        },
        // trigger(fn: Function) {
        //   if (typeof fn === "function") {
        //     setCount(count + 1);
        //     return fn();
        //   }
        // },
    };
}
exports.useX = useX;
// export const onPlus = (actionsList: any) => {
//   return actionsList.find((item: any) => actions.find(item));
// };
// export const useXEffect = (fn: Function, isActionCalled: boolean) => {
//   if (isActionCalled) {
//     fn();
//   }
// };
// export const useXMemo = (fn: Function, isActionCalled: boolean) => {
//   let returnVal = null;
//   const [state, setState] = useState("not yet called!!!__");
//   if (isActionCalled || state === "not yet called!!!__") {
//     returnVal = fn();
//     setState(returnVal);
//   }
//   return returnVal || state;
// };
function destructureWithProto(obj) {
    var result = __assign({}, obj);
    var prototype = Object.getPrototypeOf(obj);
    if (prototype) {
        var prototypeProps = Object.getOwnPropertyNames(prototype);
        for (var _i = 0, prototypeProps_1 = prototypeProps; _i < prototypeProps_1.length; _i++) {
            var prop = prototypeProps_1[_i];
            result[prop] = prototype[prop];
        }
    }
    return result;
}
function updateNestedObject(obj, path) {
    var keys = path.split(".");
    var newObj = obj;
    var current = newObj;
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        current[key] = Array.isArray(current[key])
            ? __spreadArray([], current[key], true) : __assign({}, current[key]);
        current = current[key];
    }
    return newObj;
}
var Collapsable = function (_a) {
    var children = _a.children, label = _a.label;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    return exports.xRefs[label] ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    padding: "12px 15px",
                    borderTop: "1px solid rgb(232 238 231)",
                    borderLeft: !open ? "2px solid #CCC" : "2px solid rgb(2, 137, 101)",
                    borderImage: "initial",
                    background: "rgb(243 243 243)",
                    cursor: "pointer",
                    fontWeight: !open ? "normal" : 700,
                    color: "rgb(92 92 92)",
                    textAlign: "left",
                    overflow: "auto",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000002,
                }, onMouseDown: function () { return setOpen(!open); }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                            display: "inline-block",
                            paddingLeft: "5px",
                            fontSize: "16px",
                        }, children: (0, jsx_runtime_1.jsx)("b", { children: label }) }), " ", !open && ((0, jsx_runtime_1.jsx)("b", { style: { float: "right", color: "green", fontSize: "small" }, children: exports.xRefs[label].index > 0 ? exports.xRefs[label].index : "" }))] }, label), open && ((0, jsx_runtime_1.jsx)("div", { style: {
                    padding: "10px 30px",
                    background: "rgb(250 250 250)",
                    fontSize: "14px",
                    paddingBottom: "45px",
                }, children: children }))] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
};
exports.Collapsable = Collapsable;
var ErrorComponent = function (_a) {
    var Error = _a.Error, message = _a.message;
    console.error(Error);
    return ((0, jsx_runtime_1.jsxs)("span", { title: (Error === null || Error === void 0 ? void 0 : Error.stack) || "", style: { color: "red" }, children: [message, " check console for details"] }));
};
exports.ErrorComponent = ErrorComponent;
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            error: null,
            errorMessage: "",
        };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error) {
        this.setState({
            error: error,
            errorMessage: error.message,
        });
    };
    ErrorBoundary.prototype.render = function () {
        var _a = this.state, error = _a.error, errorMessage = _a.errorMessage;
        var Error = this.props.Error;
        if (error) {
            return (0, jsx_runtime_1.jsx)(Error, { error: error, message: errorMessage });
        }
        return this.props && this.props.children ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: this.props.children })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Error" }));
    };
    return ErrorBoundary;
}(react_1.Component));
exports.ErrorBoundary = ErrorBoundary;
var LabelRenderer = function (_a) {
    var label = _a.label;
    return ((0, jsx_runtime_1.jsx)("span", { children: label.endsWith("[M]") ? ((0, jsx_runtime_1.jsxs)("span", { title: "Modified", style: { color: "#bc7a00" }, children: [label.substr(0, label.length - 3), " "] })) : label.endsWith("[A]") ? ((0, jsx_runtime_1.jsxs)("span", { title: "Added", style: { color: "green" }, children: [label.substr(0, label.length - 3), " "] })) : label.endsWith("[D]") ? ((0, jsx_runtime_1.jsxs)("span", { title: "Deleted", style: { color: "#df0000" }, children: [label.substr(0, label.length - 3), " "] })) : ((0, jsx_runtime_1.jsx)("span", { children: label })) }));
};
exports.LabelRenderer = LabelRenderer;
var StateView = function (_a) {
    var state = _a.state, _b = _a.boldFont, boldFont = _b === void 0 ? true : _b, _c = _a.autoOpenFirstLevel, autoOpenFirstLevel = _c === void 0 ? false : _c;
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)("div", { style: { marginLeft: "-30px" }, children: (0, jsx_runtime_1.jsx)(exports.Treeview, { autoOpenFirstLevel: autoOpenFirstLevel, state: state, boldFont: boldFont }) }) }));
};
exports.StateView = StateView;
var Switch = function (_a) {
    var _b, _c, _d;
    var State = _a.State;
    var _e = (0, react_1.useState)(0), selectedTab = _e[0], setSelectedTab = _e[1];
    var tabs = ["State", "Set/Action", "memos", "events"];
    var _f = (0, react_1.useState)(0), count = _f[0], setCount = _f[1];
    var spanStyle = function (isSelected) {
        return {
            border: " 1px solid #DDD",
            color: isSelected ? "white" : "#444",
            padding: "3px 10px",
            marginRight: "7px",
            borderRadius: "7px",
            background: isSelected ? "rgb(2 137 101)" : "none",
            display: "inline-block",
            verticalAlign: "top",
            width: "auto",
            textAlign: "center",
            cursor: "pointer",
        };
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "left" }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    paddingBottom: "5px",
                    width: "100%",
                    margin: "0 auto",
                    marginBottom: "10px",
                    textAlign: "left",
                }, children: tabs.map(function (item, i) { return ((0, jsx_runtime_1.jsxs)("span", { onMouseDown: function () { return setSelectedTab(i); }, 
                    //@ts-ignore
                    style: spanStyle(selectedTab === i), children: [item, " ", i === 1 && (0, jsx_runtime_1.jsx)(exports.ValueRenderer, { text: State.index })] })); }) }), (0, jsx_runtime_1.jsx)("div", { style: { display: selectedTab === 0 ? "block" : "none" }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { state: State.state }) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 1 ? "block" : "none" }, children: [State.setLogs.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: "right" }, children: (0, jsx_runtime_1.jsx)("span", { style: { textDecoration: "underline", cursor: "pointer" }, onClick: function () {
                                State.setLogs = [];
                                State.index = 0;
                                setCount(count + 1);
                            }, children: (0, jsx_runtime_1.jsx)("i", { children: "Clear Logs" }) }) })), (_b = State.setLogs) === null || _b === void 0 ? void 0 : _b.map(function (log, index) {
                        var _a;
                        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                borderBottom: "1px solid #CCC",
                                marginBottom: "5px",
                                paddingBottom: "5px",
                                position: "relative",
                            }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                        display: "inline-block",
                                        verticalAlign: "top",
                                    }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { autoOpenFirstLevel: false, state: (_a = {},
                                            _a[log.name] = {
                                                changes: log.changeList,
                                                props: log.props,
                                                "Triggered by": log.functionName,
                                                from: log.fileName,
                                                status: log.errorOccured
                                                    ? "Error!" + log.errorMessage
                                                    : "Success",
                                            },
                                            _a) || {} }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                                        position: "absolute",
                                        textAlign: "center",
                                        marginTop: "10px",
                                        right: "5px",
                                        top: "-3px",
                                    }, children: log.index }), (0, jsx_runtime_1.jsx)("div", { title: log.errorOccured
                                        ? "check console for error deails"
                                        : "Success", style: {
                                        position: "absolute",
                                        textAlign: "center",
                                        marginTop: "10px",
                                        right: "30px",
                                        top: "3px",
                                        borderRadius: "30px",
                                        width: "10px",
                                        height: "10px",
                                        background: log.errorOccured ? "red" : "green",
                                    } })] }, " set " + index + log.name));
                    })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: "10px" } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 2 ? "block" : "none" }, children: [(0, jsx_runtime_1.jsx)(exports.StateView, { state: ((_c = State.state) === null || _c === void 0 ? void 0 : _c.memos) || {}, autoOpenFirstLevel: true }), " "] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 3 ? "block" : "none" }, children: [(0, jsx_runtime_1.jsx)(exports.StateView, { state: ((_d = State.state) === null || _d === void 0 ? void 0 : _d.events) || {}, autoOpenFirstLevel: true }), " "] })] }));
};
exports.Switch = Switch;
function XPlusWrapper(props) {
    var _a = props.enableDevTools, enableDevTools = _a === void 0 ? true : _a;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: props.children && props.children }), enableDevTools && ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)(exports.UseXDevTools, __assign({}, props)) }))] }));
}
exports.XPlusWrapper = XPlusWrapper;
var Treeview = function (_a) {
    var state = _a.state, _b = _a.autoOpenFirstLevel, autoOpenFirstLevel = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)([]), openList = _c[0], setOpen = _c[1];
    (0, react_1.useEffect)(function () {
        setOpen(autoOpenFirstLevel && typeof state === "object" ? Object.keys(state) : []);
    }, []);
    var toggleOpen = function (key) {
        if (openList.includes(key)) {
            setOpen(openList.filter(function (item) { return item !== key; }));
        }
        else {
            setOpen(__spreadArray(__spreadArray([], openList, true), [key], false));
        }
    };
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                paddingLeft: "25px",
                textAlign: "left",
                paddingBottom: "2px",
                minWidth: "300px",
                height: "auto",
                transition: "height 0.3s ease",
                color: "rgb(92 92 92)",
            }, children: [" ", Object.keys(state).length === 0 && ((0, jsx_runtime_1.jsxs)("i", { style: { color: "#999" }, children: [Array.isArray(state) ? "Array " : "Object ", " is Empty"] })), Object.keys(state)
                    .filter(function (key) { return typeof state[key] !== "function"; })
                    .map(function (item) {
                    return typeof state[item] === "object" && state[item] !== null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "x-devtools-treview-header", style: {
                                    cursor: "pointer",
                                    marginTop: "003px",
                                    paddingBottom: "5px",
                                    paddingLeft: "4px",
                                }, onMouseDown: function () { return toggleOpen(item); }, children: [" ", (0, jsx_runtime_1.jsxs)("b", { children: [(0, jsx_runtime_1.jsx)("span", { style: { display: "inline-block", paddingTop: "5px" }, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", height: "13", viewBox: "0 -960 960 960", width: "24", style: {
                                                        transform: !openList.includes(item)
                                                            ? "rotate(-32deg)"
                                                            : "rotate(60deg)",
                                                        transition: "transform ease 0.2s",
                                                        marginRight: "0px",
                                                        fill: "#444",
                                                    }, children: (0, jsx_runtime_1.jsx)("path", { d: "m80-160 400-640 400 640H80Z" }) }) }), (0, jsx_runtime_1.jsx)(exports.LabelRenderer, { label: item }), " "] }), ":", " ", Array.isArray(state[item]) ? ((0, jsx_runtime_1.jsx)("b", { children: (0, jsx_runtime_1.jsx)("i", { title: "Array", children: state[item].length > 0 ? " [..]" : " []" }) })) : ((0, jsx_runtime_1.jsx)("b", { children: (0, jsx_runtime_1.jsx)("i", { title: "Object", children: Object.keys(state[item]).length > 0 ? " {..}" : " {}" }) }))] }), openList.includes(item) &&
                                state[item] &&
                                typeof state[item] === "object" && ((0, jsx_runtime_1.jsx)(exports.Treeview, { state: state[item] }))] })) : ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: "3px", width: "auto" }, children: [(0, jsx_runtime_1.jsxs)("b", { style: { marginLeft: "10px" }, children: [(0, jsx_runtime_1.jsx)(exports.LabelRenderer, { label: item }), " "] }), ": ", (0, jsx_runtime_1.jsx)(exports.ValueRenderer, { text: state[item] })] }));
                })] }) }));
};
exports.Treeview = Treeview;
var UseXDevTools = function (_a) {
    var _b = _a.XIconPosition, XIconPosition = _b === void 0 ? { bottom: "50px", right: "50px" } : _b, _c = _a.enableConsoleLogging, enableConsoleLogging = _c === void 0 ? false : _c, _d = _a.hideXPlusIcon, hideXPlusIcon = _d === void 0 ? false : _d, _e = _a.disableToggleESCKey, disableToggleESCKey = _e === void 0 ? false : _e;
    var _f = (0, react_1.useState)(false), showTools = _f[0], setShowTools = _f[1];
    var _g = (0, react_1.useState)(0), count = _g[0], setCount = _g[1];
    (0, react_1.useEffect)(function () {
        function handleKeyPress(event) {
            if (event.key === "Escape") {
                setShowTools(!showTools);
            }
        }
        if (!disableToggleESCKey) {
            window.addEventListener("keydown", handleKeyPress);
            return function () {
                window.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, [showTools, setShowTools]);
    (0, react_1.useEffect)(function () {
        exports.listeners.onStateChange = function () {
            setTimeout(function () { return setCount(count + 1); }, 50);
        };
        return function () {
            exports.listeners.onStateChange = null;
        };
    }, [setCount, count]);
    exports.xConfig.enableDebugging = true;
    exports.xConfig.enableConsoleLogging = enableConsoleLogging;
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsxs)("div", { id: "xplus-devtools-container", children: [" ", (0, jsx_runtime_1.jsxs)("div", { id: "usex-devtools", style: {
                        zIndex: 1000000000,
                        height: "100%",
                        width: "400px",
                        position: "fixed",
                        // background: "rgb(250,250,250)",
                        background: "rgb(250, 250, 250)",
                        transition: "right 0.2s ",
                        top: 0,
                        right: showTools ? "0px" : "-400px",
                        color: "#444",
                        overflow: "auto",
                        boxShadow: " 0 0 4px 0px #b0d9d5",
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                textAlign: "center",
                                background: "rgb(250, 250, 250)",
                                borderLeft: "1px solid #CCC",
                                padding: "10px",
                            }, children: (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: "bold", fontSize: "18px" }, children: "x-plus Dev Tools" }) }), (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: Object.keys(exports.xRefs).map(function (key) {
                                var stateValue = exports.xRefs[key];
                                return stateValue ? ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(exports.Collapsable, { label: key, state: stateValue, children: (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)(exports.Switch, { State: stateValue }) }) }) }, key)) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
                            }) }), Object.keys(exports.xRefs).length === 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "center", marginTop: "10px" }, children: [" ", (0, jsx_runtime_1.jsx)("i", { children: "No States are created using useX" })] }))] }), !hideXPlusIcon && ((0, jsx_runtime_1.jsx)("div", { onMouseDown: function () {
                        setShowTools(!showTools);
                    }, id: "usex-devtools-holder", style: __assign({ zIndex: 1000000001, width: "50px", height: "50px", 
                        //background: "#E74C3C",
                        background: "green", borderRadius: "50px", position: "fixed", boxShadow: "0px 0px 10px 1px #CCC", cursor: "pointer" }, XIconPosition), children: (0, jsx_runtime_1.jsxs)("span", { style: {
                            left: "14px",
                            position: "absolute",
                            top: "3px",
                            fontFamily: '"Comic Sans MS", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontWeight: "bold",
                            fontSize: "25px",
                            color: "white",
                            fontStyle: "italic",
                        }, children: ["x", (0, jsx_runtime_1.jsx)("span", { style: {
                                    display: "inline-block",
                                    marginTop: "6px",
                                    fontSize: "20px",
                                    verticalAlign: "top",
                                }, children: "+" })] }) }))] }) }));
};
exports.UseXDevTools = UseXDevTools;
var ValueRenderer = function (_a) {
    var text = _a.text;
    var _b = (0, react_1.useState)(false), highlighted = _b[0], setHighlighted = _b[1];
    var _c = (0, react_1.useState)(true), firstRender = _c[0], setFirstRender = _c[1];
    (0, react_1.useEffect)(function () {
        if (!firstRender) {
            setHighlighted(true);
            var timer_1 = setTimeout(function () {
                setHighlighted(false);
            }, 300);
            return function () { return clearTimeout(timer_1); };
        }
        else {
            setFirstRender(false);
        }
    }, [text]);
    var highlightStyle = highlighted
        ? {
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            transition: "background-color 0s",
        }
        : {
            backgroundColor: "rgba(0, 255, 0, 0)",
            transition: "background-color 2s",
        };
    return ((0, jsx_runtime_1.jsx)("span", { title: text + "", style: __assign(__assign({}, highlightStyle), { padding: "0px 5px", borderRadius: "4px" }), children: text === null ? ("null") : text === undefined ? ("undefined") : typeof text === "function" ? ((0, jsx_runtime_1.jsx)("b", { children: "Function" })) : text === "" ? ((0, jsx_runtime_1.jsx)("i", { children: "''" })) : typeof text === "string" ? ("'".concat(text, "'")) : ((text + "").slice(0, 100) + "" + ((text + "").length > 100 ? "..." : "")) }));
};
exports.ValueRenderer = ValueRenderer;
exports.XFetchConfig = {
    onBeforeFetch: undefined,
};
function xFetch(url, method, payload, qsObj, headers, signal) {
    if (url === void 0) { url = "/"; }
    if (method === void 0) { method = "get"; }
    if (payload === void 0) { payload = null; }
    if (qsObj === void 0) { qsObj = {}; }
    if (headers === void 0) { headers = {}; }
    if (signal === void 0) { signal = null; }
    return __awaiter(this, void 0, void 0, function () {
        var options, _a, queryString, response, data, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        url: url,
                        method: method,
                        headers: __assign({ "Content-Type": "application/json" }, headers),
                        qsObj: qsObj,
                        payload: payload,
                    };
                    _a = exports.XFetchConfig.onBeforeFetch;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, exports.XFetchConfig.onBeforeFetch(options)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    _a;
                    // if (payload) options.body = JSON.stringify(payload);
                    if (options.qsObj) {
                        queryString = Object.keys(options.qsObj)
                            .map(function (key) {
                            return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(options.qsObj[key]));
                        })
                            .join("&");
                        url += "?".concat(queryString);
                    }
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, fetch(url, {
                            headers: options.headers || {},
                            body: options.payload ? JSON.stringify(options.payload) : undefined,
                            method: options.method,
                            signal: signal,
                        })];
                case 4:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    data = _b.sent();
                    if (response.ok) {
                        return [2 /*return*/, data]; // Resolve with the data if the API call is successful
                    }
                    else {
                        throw new Error(data.message || "An error occurred while making the API call");
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    throw error_1; // Reject with the error if there's an issue with the API call
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.xFetch = xFetch;
var useXFetch = function (url, qsObj, method, payload, headers) {
    if (url === void 0) { url = "/"; }
    if (qsObj === void 0) { qsObj = {}; }
    if (method === void 0) { method = "get"; }
    if (payload === void 0) { payload = null; }
    if (headers === void 0) { headers = {}; }
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(null), data = _c[0], setData = _c[1];
    var _d = (0, react_1.useState)(""), status = _d[0], setStatus = _d[1];
    var _e = (0, react_1.useState)(0), count = _e[0], setCount = _e[1];
    var _f = (0, react_1.useState)(false), loadSilently = _f[0], setLoadSilently = _f[1];
    var _g = (0, react_1.useState)(null), controller = _g[0], setController = _g[1];
    var cancel = function () {
        if (controller && controller.abort())
            setStatus("cancelled");
        setController(null);
    };
    (0, react_1.useEffect)(function () {
        if (count > 0) {
            if (controller) {
                cancel();
                setCount(count + 1);
            }
            else {
                !loadSilently && setIsLoading(true);
                setError(null);
                setData(null);
                setStatus("loading");
                var controller_1 = new AbortController();
                setController(controller_1);
                xFetch(url, method, payload, qsObj, headers, controller_1.signal)
                    .then(function (data) {
                    setData(data);
                    setStatus("success");
                    setError(null);
                })
                    .catch(function (error) {
                    if ((error === null || error === void 0 ? void 0 : error.name) !== "AbortError") {
                        setError(error);
                        setStatus("error");
                    }
                })
                    .finally(function () {
                    setController(null);
                    setIsLoading(false);
                    setLoadSilently(false);
                });
            }
        }
    }, [count]);
    (0, react_1.useEffect)(function () {
        return function () {
            cancel();
        };
    }, []);
    var call = function () {
        setCount(count + 1);
    };
    var callSilently = function () {
        setCount(count + 1);
        setLoadSilently(true);
    };
    return { isLoading: isLoading, data: data, error: error, status: status, call: call, cancel: cancel, callSilently: callSilently };
};
exports.useXFetch = useXFetch;
var useXAsync = function (asyncFunction) {
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = (0, react_1.useState)(null), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)("idle"), status = _d[0], setStatus = _d[1];
    var call = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!isLoading) return [3 /*break*/, 5];
                        setIsLoading(true);
                        setStatus("loading");
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, asyncFunction.apply(void 0, args)];
                    case 2:
                        result = _a.sent();
                        setData(result);
                        setError(null);
                        setStatus("success");
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        if ((err_1 === null || err_1 === void 0 ? void 0 : err_1.name) !== "AbortError") {
                            setError(err_1);
                            setData(null);
                            setStatus("error");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return {
        isLoading: isLoading,
        data: data,
        error: error,
        status: status,
        call: call,
    };
};
exports.useXAsync = useXAsync;
function hasNonEmptyValue(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
            if (typeof obj[key] === "string" && obj[key].trim() !== "") {
                return true;
            }
            else if (typeof obj[key] === "object" && hasNonEmptyValue(obj[key])) {
                return true;
            }
        }
    }
    return false;
}
exports.hasNonEmptyValue = hasNonEmptyValue;
function useXForm(Obj, validateForm) {
    var _a = (0, react_1.useState)(Obj), data = _a[0], setD = _a[1];
    var _b = (0, react_1.useState)(false), showValidations = _b[0], setShowValidations = _b[1];
    var resetErrors = function () {
        return resetPrimitiveValues(deepClone(data));
    };
    var _c = (0, react_1.useState)(resetErrors()), errors = _c[0], setE = _c[1];
    var _d = (0, react_1.useState)(0), count = _d[0], setCount = _d[1];
    var setData = function (fn) {
        typeof fn === "function" && fn();
        resetErrors();
        showValidations && validateForm(data, errors);
        if (hasNonEmptyValue(errors)) {
        }
        else {
            setShowValidations(false);
        }
        setCount(count + 1);
        //@ts-ignore
        setD(Array.isArray(data) ? __spreadArray([], data, true) : __assign({}, data));
    };
    var setErrors = function (fn) {
        typeof fn === "function" && fn();
        setCount(count + 1);
        setE(errors);
    };
    return {
        data: data,
        errors: errors,
        resetForm: function (resetWith) {
            if (resetWith === void 0) { resetWith = Obj; }
            setD(resetWith);
            setTimeout(function () { return resetErrors(); }, 100);
        },
        setData: setData,
        // showErrors: showValidations,
        // setShowErros: setShowValidations,
        setErrors: setErrors,
        validate: function () {
            validateForm(data, errors);
            setShowValidations(true);
            setCount(count + 1);
            if (hasNonEmptyValue(errors)) {
                return false;
            }
            else {
                return true;
            }
        },
        resetErrors: resetErrors,
    };
}
exports.useXForm = useXForm;
function resetPrimitiveValues(obj) {
    // Base case: if obj is not an object, return an empty string
    if (typeof obj !== "object" || obj === null) {
        return "";
    }
    // Recursive case: obj is an object, so we iterate over its properties
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Reset primitive values to an empty string
            if (typeof obj[key] !== "object" || obj[key] === null) {
                obj[key] = "";
            }
            else {
                // Recursively reset values in nested objects
                obj[key] = resetPrimitiveValues(obj[key]);
            }
        }
    }
    return obj;
}
// quick state
function useQ(val) {
    var setState = function (val) {
        if (typeof val === "function") {
            val();
            set(__assign({}, state));
        }
        else {
            set(__assign(__assign({}, state), { val: val }));
        }
    };
    var _a = (0, react_1.useState)({
        val: val,
        set: setState,
    }), state = _a[0], set = _a[1];
    state.set = setState;
    return state;
}
exports.useQ = useQ;
function XEvents() {
    var eventNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eventNames[_i] = arguments[_i];
    }
    var events = eventNames.reduce(function (a, b) {
        // let temp = {
        //   name: b,
        //   trigger() {
        //     a[b] = { ...temp };
        //   },
        // };
        a[b] = 0;
        return a;
    }, {});
    return events;
}
exports.XEvents = XEvents;
// export function triggerEvent() {}
// export function useXEvent<T extends string[]>(
//   ...eventNames: T
// ): ParamsToObject<T> {
//   const [events] = useState<Partial<ParamsToObject<T>>>(
//     eventNames.reduce((a: any, b) => {
//       a[b] = 0;
//       return a;
//     }, {})
//   );
//   return events as ParamsToObject<T>;
//   //   trigger(eventName: T) {
//   //     setEvents({
//   //       ...events,
//   //       [eventName as string]: events[eventName as string]++,
//   //     });
//   //     setCount(count + 1);
//   //   },
//   //   count,
//   // };
// }
// export type TXEvent = {
//   [key: string]: IXEvent;
// };
// export const useXEffect = (fn: () => void, eventsArray: any) => {
//   useEffect(
//     fn,
//     eventsArray.map((event) => xRefs[])
//   );
// };
// export const useXMemo = (fn: () => void, eventsArray:any) => {
//   return useMemo(
//     fn,
//     eventsArray.map((event) => event.count)
//   );
// };
function usePagination(initialPage, initialTotalPages, initialItemsPerPage) {
    if (initialPage === void 0) { initialPage = 1; }
    if (initialTotalPages === void 0) { initialTotalPages = -1; }
    if (initialItemsPerPage === void 0) { initialItemsPerPage = 10; }
    var _a = (0, react_1.useState)(initialPage), currentPage = _a[0], setPage = _a[1];
    var _b = (0, react_1.useState)(initialTotalPages), totalPages = _b[0], setTotalPages = _b[1];
    var _c = (0, react_1.useState)(initialItemsPerPage), itemsPerPage = _c[0], setItemsPerPage = _c[1];
    var next = function () {
        setPage(function (prevPage) { return prevPage + 1; });
    };
    var prev = function () {
        setPage(function (prevPage) { return Math.max(prevPage - 1, 1); });
    };
    var resetPage = function () {
        setPage(1);
        setTotalPages(-1);
    };
    return {
        currentPage: currentPage,
        setPage: setPage,
        next: next,
        prev: prev,
        setTotalPages: setTotalPages,
        itemsPerPage: itemsPerPage,
        totalPages: totalPages,
        setItemsPerPage: setItemsPerPage,
        resetPage: resetPage,
    };
}
exports.usePagination = usePagination;
function hasScrollReachedTheEnd(event, reverse) {
    if (reverse === void 0) { reverse = false; }
    if (event.target === document) {
        // Document scroll
        var windowHeight = window.innerHeight;
        var scrollY_1 = window.scrollY;
        var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        if (reverse) {
            return scrollY_1 === 0;
        }
        else {
            return scrollY_1 + windowHeight >= documentHeight;
        }
    }
    else if (event.target instanceof HTMLElement) {
        // Element scroll
        var element = event.target;
        var scrollTop = element.scrollTop;
        var scrollHeight = element.scrollHeight;
        var clientHeight = element.clientHeight;
        if (reverse) {
            return scrollTop === 0;
        }
        else {
            return scrollTop + clientHeight >= scrollHeight;
        }
    }
    else {
        // Window scroll
        var scrollHeight = document.documentElement.scrollHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = window.innerHeight;
        if (reverse) {
            return scrollTop === 0;
        }
        else {
            return scrollTop + clientHeight >= scrollHeight;
        }
    }
}
exports.hasScrollReachedTheEnd = hasScrollReachedTheEnd;
function paginateArray(array, currentPage, itemsPerPage) {
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
}
exports.paginateArray = paginateArray;
function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(function (item) { return deepClone(item); });
    }
    return Object.keys(obj).reduce(function (acc, key) {
        acc[key] = deepClone(obj[key]);
        return acc;
    }, {});
}
exports.deepClone = deepClone;
